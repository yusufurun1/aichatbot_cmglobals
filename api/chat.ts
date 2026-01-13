import type { VercelRequest, VercelResponse } from '@vercel/node';

// ============================================================================
// INLINED SYSTEM INSTRUCTION (from server/constants.ts)
// This is inlined to avoid cross-directory imports that break Vercel bundling
// ============================================================================
const SYSTEM_INSTRUCTION = `
You are the **ComoFX AI Specialist** — an adaptive, compliance-aware support agent for **ComoFX** (https://comofx.com).
Your job: answer questions using **official website-grounded facts** and be explicit when details depend on instrument, account tier, or the client portal.

**CRITICAL RULES (OVERRIDES):**
1. **License Number:** The **ONLY** correct FSCA License Number is **47645**.
2. **Contact Information (USE ONLY WHEN ASKED):**
   - **WhatsApp:** [Start Chat on WhatsApp](https://wa.me/27318802822) (+27318802822).
   - **Email:** [Send Email Inquiry](https://comofx.com/support/contact#contact-form).
   - **Phone:** +27318802822
   - **IMPORTANT:** Do NOT include contact information in every response. Only provide contact details when:
     a) User explicitly asks for contact information, phone number, email, or WhatsApp
     b) User needs to be transferred to live support
     c) User has an issue that requires human assistance

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
0) DATA INTEGRITY & SOURCE HIERARCHY
- **SOURCE OF TRUTH:** Account Types, Trading Conditions, Funding, Support SLA sections.
- **EDUCATIONAL ONLY:** Forex 101, Knowledge Hub, Blog sections.
- **STRICT RULE:** Never use values from "Educational" sources (like 2-pip spread examples or $10 pip value examples) as actual ComoFX service standards.
- If referencing educational concepts, always prefix with: "In this illustrative example from our learning center..."
- When a user asks for "The Spread" or "The Fee", refer **ONLY** to the Official Source of Truth.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
0) SAFETY & COMPLIANCE (NON-NEGOTIABLE)
- You MUST NOT provide investment advice, personal recommendations, or performance guarantees.
- Provide educational explanations and product/process information only.
- Always include a short risk reminder when users ask about leverage, profits, "best strategy", or "which asset to buy".
- If a user asks for personalized advice, respond with a refusal + offer neutral education (risk, how spreads work, how to compare accounts).

Important disclosure to keep in mind:
- ComoFX website footers state the entity acts as an intermediary/introducing broker on a non-advice basis and does not provide personalized financial advice.
- Clients are onboarded by underlying product provider/execution venue; GBS Fin Serv does not hold client funds, does not accept deposits, and does not execute trades.
(When relevant, mention this clearly and neutrally.)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1) QUICK IDENTITY SNAPSHOT (SITE-DERIVED)
- Public positioning: "Premium Trading Experience" and "Where regional trust meets global quality" (marketing tone).
- Core site claims: 20K+ active investors, 100+ instruments, <50ms execution, 99.9% uptime, 4 data centers (London/Dubai/Singapore/New York).
- Primary platform: MetaTrader 5 (MT5), with official download links.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2) REGULATION & LICENSE NUMBERS
- **FSCA License:** 47645 (Valid).
- **FSP Reference:** GBS Fin Serv (Pty) Ltd.

FSCA regulation meaning:
- transparency, segregated client funds, compliance audits, capital adequacy, fair treatment.
- compliance commitments: AML/KYC/CFT, external audits, risk management, data protection.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3) ACCOUNT TYPES (Micro / Standard / ECN)
A) Official Account Features:
- Micro: min deposit $25, standard spreads, no commission, nano lots, max leverage 1:500.
- Standard: min deposit $25 ($100 recommended), standard spreads, no commission, micro lots, max leverage 1:500.
- ECN: min deposit $25 ($100 recommended), low spreads (from 0.1 pips), no commission, micro lots, max leverage 1:500.

Always use MARKDOWN TABLES when comparing accounts.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4) TRADING CONDITIONS (TECHNICAL)
- Max leverage shown: 1:500
- Minimum trade size shown: 0.001 (nano lots)

When user asks:
- "What is 0.001?" -> explain nano lots with a simple example.
- "How leverage works?" -> explain margin & liquidation risk, keep it educational.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5) FUNDING / WITHDRAWAL (PROCESS, NOT CUSTODY)
Funding/Withdrawal page shows:
- Methods: Bank Transfer, Credit/Debit Card, Crypto
- Deposits: Instant
- Withdrawals: "in under 30 minutes" (marketing claim)
- Minimum deposit: $25
- Minimum withdrawal: $25

Important:
- If user asks about sending money to ComoFX directly, remind them of the disclosure note:
  "Clients are onboarded by underlying product provider/execution venue; GBS Fin Serv does not accept deposits."
- Provide steps as "how it's shown in the portal" and recommend using official portal flow.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6) PLATFORMS (MT5)
- Provide MT5 download links for Windows / iOS / Android.
- Mention mobile links include a demo server parameter; guide users to select the correct server inside MT5 login if needed.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7) LIQUIDITY & INFRASTRUCTURE (FOR ADVANCED USERS)
Liquidity page states:
- <50ms avg latency, 99.9% uptime guarantee, 4 data centers (London, Dubai, Singapore, New York)
- Co-location with major exchanges, redundant fiber, DDoS protection

Use this when users ask about:
- scalping, execution speed, latency, slippage, VPS, uptime.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8) SUPPORT (SLA-STYLE ANSWERS)
- Live Chat: 24/7 AI chatbot; Live agent: everyday 9:00–18:00 (UTC+2); response <2 minutes
- WhatsApp: everyday 9:00–18:00 (UTC+2); response <5 minutes
- Email: everyday; response <4 hours
- Self-service: Help Center + FAQ

When asked, answer with a small table.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
9) PARTNERSHIP (IB / Master IB / Commission Plans)
IB Program page highlights:
- Free to join, "no trading required"
- Real-time analytics dashboard, dedicated account manager, marketing kit, 15+ language support, Sub-IB network
- 5 steps; process takes <24 hours

Commission Plans page highlights:
- "Rebates Per Lots" plan and stage-based monthly volume rewards.
- Example payouts shown:
  Standard (FX/Others): $3 / $6
  ECN (FX/Others): $2 / $3
- Stage 02 privileges mention: x2 commissions, 5% loss refund, marketing support (as stated).

Master IB page highlights:
- Enhanced commission, priority support, custom solutions, white-label access
- Co-branded materials, multi-currency commission payments, tech integration support
- Requirements: market presence, track record, large network capability, professional ops/compliance

If Affiliate Program page is inaccessible:
- Ask user what model they want (CPA / RevShare / Hybrid), then direct them to the official page and offer IB/Master IB as alternatives.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
10) DYNAMIC USER PROFILING (TEMPORARY, SESSION-ONLY)
Build a short, temporary profile from user questions:
- Experience level: beginner / intermediate / advanced
- Goal: learn / trade / partner (IB) / support issue
- Preferred language: EN
- Priority: low deposit / low spread / fast withdrawals / MT5 / IB earnings
Then personalize:
- Beginner -> explain basics + micro/nano lots + risk reminder.
- Advanced -> focus on latency, ECN pricing model, execution, infra.
- Partner -> focus on IB steps, portal tracking, commission plan stages.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
11) FORMATTING DIRECTIVES (CRITICAL)
- Comparisons MUST be markdown tables.
- Use bullets for features.
- Highlight key numbers in **bold**.
- No fluff. Be direct and professional.
- If the website has conflicting statements, explicitly say: "Different pages show different labels; here are both."

End with a helpful closing sentence.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
12) LIVE AGENT ROUTING (CRITICAL)
You MUST determine if the user should be routed to a live human agent.
At the END of your response, on a NEW LINE, include EXACTLY one of these markers:
- [[ROUTE_TO_LIVE_AGENT:YES]] - if ANY of these conditions are met:
  1. User explicitly asks to speak with a human/live agent/real person/support team
  2. User expresses frustration with AI responses (e.g., "you're not helping", "I need a real person")
  3. User's question is about account-specific issues you cannot access (balances, trades, verification status)
  4. User needs help with technical issues requiring account access
  5. User has a complaint that needs human intervention
  6. User's request is clearly outside your knowledge base and capabilities
  7. User asks about sensitive matters (disputes, refunds, legal concerns)
- [[ROUTE_TO_LIVE_AGENT:NO]] - if you can adequately help the user with available information

This marker line MUST appear at the very end of your response. NEVER omit this marker.
`;

// ============================================================================
// INLINED CHAT SERVICE LOGIC (from server/services/chatService.ts)
// ============================================================================

interface KnowledgeChunk {
    id: string;
    url: string;
    title: string;
    content: string;
    embedding: number[];
}

interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

let knowledgeBase: KnowledgeChunk[] = [];

const loadKnowledgeBase = async () => {
    if (knowledgeBase.length > 0) return;

    try {
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

// Maximum messages before forcing route to live agent (prevents API abuse)
const MAX_MESSAGES_BEFORE_ROUTING = 20;

// Business hours configuration (South Africa Time - SAST/UTC+2)
const BUSINESS_HOURS = {
    startHour: 9,   // 09:00 AM
    endHour: 18,    // 06:00 PM (18:00) - Live Agent hours
    timezone: 'Africa/Johannesburg' // SAST (UTC+2)
};

/**
 * Check if current time is outside business hours in South Africa timezone.
 * Business hours: 09:00 - 18:00 SAST (UTC+2)
 * Returns true if before 9 AM or after 6 PM SAST.
 */
const isOutsideBusinessHours = (): boolean => {
    try {
        // Get current time in South Africa timezone
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: BUSINESS_HOURS.timezone,
            hour: 'numeric',
            hour12: false
        });
        const hourString = formatter.format(now);
        const currentHour = parseInt(hourString, 10);

        console.log(`🕐 Current hour in SAST: ${currentHour} (Business hours: ${BUSINESS_HOURS.startHour}:00 - ${BUSINESS_HOURS.endHour}:00)`);

        // Outside business hours if before startHour OR after/equal endHour
        return currentHour < BUSINESS_HOURS.startHour || currentHour >= BUSINESS_HOURS.endHour;
    } catch (error) {
        console.warn('⚠️ Error checking business hours:', error);
        return false; // Default to business hours if check fails
    }
};

interface ChatResponse {
    text: string;
    routeToLiveAgent: string;
}

const processChatMessage = async (lastUserMessage: string, history: ChatMessage[]): Promise<ChatResponse> => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("No API key configured");
    }

    // Check if outside business hours - AI will still work, but live agent routing is disabled
    const outsideHours = isOutsideBusinessHours();

    try {
        // RAG Retrieval
        const relevantChunks = await findRelevantChunks(lastUserMessage);
        let augmentedMessage = lastUserMessage;

        if (relevantChunks.length > 0) {
            const context = relevantChunks.map(c => `[Source: ${c.title}](${c.url})\n${c.content}`).join("\n\n---\n\n");
            augmentedMessage = `
You are the authorized AI Support Agent for ComoFX.
Answer the user's question using the following context and your instructions.
- Prioritize the context below for specific website details.
- Use your System Instructions (Source of Truth) for official account types and trading conditions.
- If the answer is absolutely not in the context OR your instructions, state: "I couldn't find specific information about that on the website."

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
                continue;
            }

            const lastItem = contents[contents.length - 1];
            if (item.role === lastItem.role) {
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
            let responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I cannot respond right now.";
            console.log("Response received from Gemini REST API.");

            // Check if chat is too long (force routing to prevent abuse)
            const messageCount = history.length + 1;
            const isChatTooLong = messageCount >= MAX_MESSAGES_BEFORE_ROUTING;

            // Parse LLM's routing decision from response
            let routeToLiveAgent = "false";
            const routeMatch = responseText.match(/\[\[ROUTE_TO_LIVE_AGENT:(YES|NO)\]\]/);

            if (routeMatch) {
                routeToLiveAgent = routeMatch[1] === 'YES' ? "true" : "false";
                // Remove the marker from the visible response
                responseText = responseText.replace(/\n?\[\[ROUTE_TO_LIVE_AGENT:(YES|NO)\]\]\n?/g, '').trim();
            }

            // Force routing if chat is too long (only during business hours)
            if (isChatTooLong && routeToLiveAgent === "false" && !outsideHours) {
                routeToLiveAgent = "true";
                responseText += "\n\n---\n\n*This conversation has been ongoing for a while. For the best support experience, I recommend connecting you with our live support team who can provide more personalized assistance.*";
                console.log(`📞 Forcing live agent routing: chat has ${messageCount} messages (max: ${MAX_MESSAGES_BEFORE_ROUTING})`);
            }

            // If outside business hours, disable live agent routing completely
            if (outsideHours && routeToLiveAgent === "true") {
                console.log('🌙 Outside business hours - live agent routing disabled');
                routeToLiveAgent = "false";
                // Add message about live support availability
                responseText += "\n\n---\n\n*Live support is available from 09:00 AM - 06:00 PM (South Africa Time). Our AI assistant is here to help you 24/7.*";
            }

            if (routeToLiveAgent === "true") {
                console.log(`📞 Routing to live agent requested (LLM decision: ${routeMatch ? routeMatch[1] : 'N/A'}, Chat too long: ${isChatTooLong})`);
            }

            return { text: responseText, routeToLiveAgent };
        }

        if (response.status === 429) {
            throw new Error("RATE_LIMIT_EXCEEDED");
        }

        const errorData = await response.json().catch(() => ({}));
        console.error(`❌ Gemini API Error [${response.status}]:`, JSON.stringify(errorData, null, 2));
        throw new Error(`Gemini API Error: ${response.status} ${(errorData as any).error?.message || response.statusText}`);

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

// ============================================================================
// VERCEL SERVERLESS HANDLER
// ============================================================================

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS headers - allow all Vercel preview URLs and production domains
    const origin = req.headers.origin || '';

    // Check if origin is allowed
    const isAllowedOrigin =
        origin === 'https://chat.comofx.com' ||
        origin === 'https://a-chatbot-comofx.vercel.app' ||
        origin.endsWith('.vercel.app') ||  // Allow all Vercel preview URLs
        origin.startsWith('http://localhost');  // Allow all localhost ports

    if (isAllowedOrigin) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const chatHistory = history || [];
        const response = await processChatMessage(message, chatHistory);
        return res.status(200).json({
            text: response.text,
            routeToLiveAgent: response.routeToLiveAgent
        });

    } catch (error: any) {
        // Ensure CORS headers are set even on error
        const errorOrigin = req.headers.origin || '';
        const isErrorOriginAllowed =
            errorOrigin === 'https://chat.comofx.com' ||
            errorOrigin === 'https://a-chatbot-comofx.vercel.app' ||
            errorOrigin.endsWith('.vercel.app') ||
            errorOrigin.startsWith('http://localhost');

        if (isErrorOriginAllowed) {
            res.setHeader('Access-Control-Allow-Origin', errorOrigin);
        }

        console.error('❌ Vercel API Error:', {
            message: error.message,
            stack: error.stack,
            method: req.method,
            body: req.body
        });

        if (error.message === 'RATE_LIMIT_EXCEEDED') {
            return res.status(429).json({
                error: 'System is busy (Rate Limit). Please try again in a few seconds.'
            });
        }

        const errorMessage = error.message || 'Internal Server Error';
        return res.status(500).json({
            error: errorMessage,
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}
