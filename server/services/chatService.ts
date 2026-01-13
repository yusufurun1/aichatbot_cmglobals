// @ts-ignore
import { SYSTEM_INSTRUCTION } from '../constants';

interface KnowledgeChunk {
    id: string;
    url: string;
    title: string;
    content: string;
    embedding: number[];
}

let knowledgeBase: KnowledgeChunk[] = [];

const loadKnowledgeBase = async () => {
    if (knowledgeBase.length > 0) return;

    try {
        // In serverless environment, fetch the public file via HTTP
        // Construct absolute URL dynamically
        let baseUrl = 'http://localhost:3001';

        if (process.env.VERCEL_URL) {
            baseUrl = `https://${process.env.VERCEL_URL}`;
        } else if (process.env.VITE_API_URL && process.env.VITE_API_URL.startsWith('http')) {
            baseUrl = process.env.VITE_API_URL.replace('/api/chat', '');
        }

        const kbUrl = `${baseUrl}/knowledge_base.json`;

        console.log("🔄 Fetching knowledge base from:", kbUrl);

        const response = await fetch(kbUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch knowledge base: ${response.statusText}`);
        }

        const data = await response.json();
        knowledgeBase = data as KnowledgeChunk[];
        console.log("📚 Knowledge Base loaded via HTTP:", knowledgeBase.length, "chunks");

    } catch (error) {
        console.warn("⚠️ Error loading knowledge base:", error);
        // Fallback or non-fatal error - chat can work without RAG (just less smart)
    }
};

const cosineSimilarity = (vecA: number[], vecB: number[]) => {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (magA * magB);
};

const getEmbedding = async (text: string): Promise<number[] | undefined> => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return undefined;

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/embedding-001:embedContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: { parts: [{ text }] }
                })
            }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.warn(`⚠️ Embedding API error [${response.status}]:`, JSON.stringify(errorData));
            return undefined;
        }

        const data = await response.json() as any;
        return data.embedding?.values;
    } catch (error) {
        console.warn("⚠️ Embedding generation failed:", error);
        return undefined;
    }
};

const findRelevantChunks = async (query: string, limit = 10): Promise<KnowledgeChunk[]> => {
    await loadKnowledgeBase();
    if (knowledgeBase.length === 0) return [];

    const queryEmbedding = await getEmbedding(query);
    if (!queryEmbedding) return [];

    const scoredChunks = knowledgeBase.map(chunk => ({
        chunk,
        score: cosineSimilarity(queryEmbedding, chunk.embedding)
    }));

    scoredChunks.sort((a, b) => b.score - a.score);
    return scoredChunks.slice(0, limit).map(item => item.chunk);
};

interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

export const processChatMessage = async (lastUserMessage: string, history: ChatMessage[]): Promise<string> => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("No API key configured");
    }

    try {
        // RAG Retrieval
        const relevantChunks = await findRelevantChunks(lastUserMessage);
        let augmentedMessage = lastUserMessage;

        if (relevantChunks.length > 0) {
            const context = relevantChunks.map(c => `[Source: ${c.title}](${c.url})\n${c.content}`).join("\n\n---\n\n");
            augmentedMessage = `
You are the authorized AI Support Agent for CM Globals.
Answer the user's question using the following context and your instructions.
- Prioritize context for website details but ALWAYS follow SYSTEM INSTRUCTIONS for logic.
- NEVER include contact numbers/emails unless asked.
- Split long answers into 2-3 parts using [SPLIT].
- If info is missing, say: "I couldn't find specific information about that on the website."

---
${context}
---

Question: ${lastUserMessage}
      `.trim();
            console.log("🧠 Augmented Prompt with", relevantChunks.length, "chunks");
        }

        console.log(`Sending chat request to Gemini REST API...`);

        // Gemini expects history to start with 'user' and alternate roles.
        const contents: any[] = [];
        const mappedHistory = history
            .filter(h => h.text && h.text.trim().length > 0)
            .map(h => ({
                role: h.role === 'model' ? 'model' : 'user',
                parts: [{ text: h.text }]
            }));

        // Merge consecutive same-role messages to ensure strictly alternating
        for (const item of mappedHistory) {
            if (contents.length === 0) {
                if (item.role === 'user') {
                    contents.push(item);
                }
                // Skip if first is model
                continue;
            }

            const lastItem = contents[contents.length - 1];
            if (item.role === lastItem.role) {
                // Merge text instead of skipping
                lastItem.parts[0].text += "\n\n" + item.parts[0].text;
            } else {
                contents.push(item);
            }
        }

        // Final check: if it ends with 'user', we'll merge the current message into it
        if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
            contents[contents.length - 1].parts[0].text += "\n\n" + augmentedMessage;
        } else {
            contents.push({
                role: 'user',
                parts: [{ text: augmentedMessage }]
            });
        }

        const requestBody = {
            contents,
            system_instruction: {
                parts: [{ text: SYSTEM_INSTRUCTION }]
            },
            generationConfig: {
                temperature: 0.7,
            }
        };

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            }
        );

        if (response.ok) {
            const data = await response.json() as any;
            let responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Üzgünüm, şu an yanıt veremiyorum.";

            // --- SERVER-SIDE POST-PROCESSING ---

            // 0. Detect if user asked for live agent (in original message)
            const liveAgentKeywords = [
                'canlı', 'canli', 'live', 'agent', 'human', 'gerçek', 'gercek',
                'temsilci', 'insan', 'bağlan', 'baglan', 'yönlendir', 'yonlendir',
                'destek', 'support', 'operator', 'operatör'
            ];
            const userAskedForLiveAgent = liveAgentKeywords.some(keyword =>
                lastUserMessage.toLowerCase().includes(keyword)
            );

            // 1. Force removal of contact details if they leaked through
            const contactPatterns = [
                /\+27318802822/g,
                /WhatsApp:.*?\)/gi,
                /WhatsApp:.*?(\n|$)/gi,
                /E-posta:.*?\)?/gi,
                /E-posta:.*?(\n|$)/gi,
                /Email:.*?(\n|$)/gi,
                /Telefon:.*?(\n|$)/gi,
                /\[Start Chat on WhatsApp\].*?\)/gi,
                /\[Send Email Inquiry\].*?\)/gi,
                /Destek ekibimizle iletişime.*?(\n|$)/gi,
                /aşağıdaki kanallardan.*?(\n|$)/gi
            ];

            contactPatterns.forEach(pattern => {
                responseText = responseText.replace(pattern, '');
            });

            // 2. If user asked for live agent, ensure button is present
            if (userAskedForLiveAgent && !responseText.includes('[LIVE_AGENT_BUTTON]')) {
                // Force add the button
                responseText = responseText.trim() + "\n\nI'll connect you to our live support team now. [LIVE_AGENT_BUTTON]";
            }

            // 3. Auto-split if response is long but lacks [SPLIT] delimiter
            if (!responseText.includes('[SPLIT]') && responseText.length > 500) {
                // Split by paragraphs if possible
                const paragraphs = responseText.split(/\n\n+/);
                if (paragraphs.length >= 2) {
                    // Inject [SPLIT] between paragraphs to force client-side splitting
                    const midPoint = Math.ceil(paragraphs.length / 2);
                    const part1 = paragraphs.slice(0, midPoint).join('\n\n');
                    const part2 = paragraphs.slice(midPoint).join('\n\n');
                    responseText = `${part1}\n\n[SPLIT]\n\n${part2}`;
                }
            }

            console.log("Response processed and cleaned.", userAskedForLiveAgent ? "[Live Agent Request Detected]" : "");
            return responseText.trim();
        }

        if (response.status === 429) {
            throw new Error("RATE_LIMIT_EXCEEDED");
        }

        const errorData = await response.json().catch(() => ({}));
        console.error(`❌ Gemini API Error [${response.status}]:`, JSON.stringify(errorData, null, 2));
        console.error("❌ Request Body sent:", JSON.stringify(requestBody, null, 2));
        throw new Error(`Gemini API Error: ${response.status} ${errorData.error?.message || response.statusText}`);

    } catch (error: any) {
        console.error("❌ Gemini API Catch Detail:", {
            message: error.message,
            status: error.status
        });

        if (error.message?.includes('429') || error.status === 429 || error.message === "RATE_LIMIT_EXCEEDED") {
            throw new Error("RATE_LIMIT_EXCEEDED");
        }

        throw error;
    }
};
