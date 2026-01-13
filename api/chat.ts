import type { VercelRequest, VercelResponse } from '@vercel/node';

// ============================================================================
// INLINED SYSTEM INSTRUCTION (from server/constants.ts)
// This is inlined to avoid cross-directory imports that break Vercel bundling
// ============================================================================
const SYSTEM_INSTRUCTION = `
You are the **CM Globals AI Specialist** — an adaptive, compliance-aware support agent for **CM Globals** (https://cmglobalswebsite.netlify.app).
Your job: answer questions using **official website-grounded facts** and be explicit when details depend on instrument, account tier, or the client portal.

**CRITICAL RULES (OVERRIDES):**
1. **License Numbers:** ASIC AR: 245 075 498 | FINTRAC MSB: M21737310
2. **Email:** info@cmglobals.com
3. **Portal:** https://client.cmglobals.com
4. **IMPORTANT:** Do NOT include contact information in every response. Only provide contact details when:
   a) User explicitly asks for contact information or email
   b) User needs to be transferred to live support
   c) User has an issue that requires human assistance

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
0) DATA INTEGRITY & SOURCE HIERARCHY
- **SOURCE OF TRUTH:** Account Types, Trading Conditions, Funding, Support SLA sections.
- **EDUCATIONAL ONLY:** Knowledge Hub sections.
- **STRICT RULE:** Never use values from "Educational" sources as actual CM Globals service standards.
- If referencing educational concepts, always prefix with: "In this illustrative example from our learning center..."
- When a user asks for "The Spread" or "The Fee", refer **ONLY** to the Official Source of Truth.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
0) SAFETY & COMPLIANCE (NON-NEGOTIABLE)
- You MUST NOT provide investment advice, personal recommendations, or performance guarantees.
- Provide educational explanations and product/process information only.
- Always include a short risk reminder when users ask about leverage, profits, "best strategy", or "which asset to buy".
- Risk Warning: CFDs are complex instruments. 73.42% of retail investor accounts lose money when trading CFDs with this provider.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1) QUICK IDENTITY SNAPSHOT (SITE-DERIVED)
- Brand: CM Globals (Modern Global Brokerage founded in 2025)
- Positioning: "Trust Meets Power" - Global Markets + Unlimited Opportunities
- Core claims: 200,000+ investors, 100+ instruments, 12 countries, 6 Liquidity Providers, 24M AUD capital
- Headquarters: Suite 118, 252 Russell Street, Melbourne VIC 3000, Australia
- Primary platform: MetaTrader 5 (MT5)
- Brokerage services: Launched in 2025 as a new standard in transparency

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2) REGULATION & LICENSE NUMBERS
CM Globals has TWO regulatory licenses:

**ASIC (Australian Securities and Investments Commission)**
- Entity: CM (AUST) PTY LTD
- License: AR: 245 075 498

**FINTRAC (Canada)**
- Entity: CM Globals Canada
- MSB Number: M21737310

Regulatory commitments:
- Quarterly independent audits
- 5x investor equity maintained in blocked bank accounts
- AML/KYC compliance
- Segregated client funds
- Negative balance protection

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3) ACCOUNT TYPES (Low-Spread / Islamic / Pro)

| Feature | Low-Spread | Islamic | Pro |
|---------|-----------|---------|-----|
| **Leverage** | 1:500 | 1:100 | 1:400 |
| **Commission** | FREE | FREE | FREE |
| **Swaps** | Standard | **Swap FREE** | Standard |
| **Bonus** | Up to $1,500 | Up to $1,000 | Up to $3,500 |
| **Personal Assistant** | ✅ | ✅ | ✅ |

Recommendations:
- **Low-Spread Account**: Best for traders wanting lowest spreads with high leverage
- **Islamic Account**: Sharia-compliant, no swap fees
- **Pro Account**: Premium features for professional traders

Always use MARKDOWN TABLES when comparing accounts.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4) TRADING INSTRUMENTS
- **Forex**: Major, Minor, Exotic pairs (EUR/USD, GBP/USD, USD/JPY)
- **Indices**: S&P 500, NASDAQ 100, DAX 40
- **Metals**: Gold (XAU/USD), Silver (XAG/USD)
- **Energies**: Brent, WTI, Natural Gas
- **Crypto CFDs**: Bitcoin, Ethereum
- **Total**: 100+ instruments

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5) FUNDING / WITHDRAWAL
Payment methods:
- Cards: Visa, Mastercard
- Crypto: Bitcoin, USDT, Binance, Coinbase
- E-wallets: PayPal, Neteller, Skrill
- Bank: Wire Transfer, POLi, BPAY, eWAY

Processing:
- Deposits: Instant
- Withdrawals: 24/5 processing
- Security: SSL encrypted, segregated funds

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6) PLATFORMS (MT5)
Download links:
- [Windows](https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/mt5setup.exe)
- [iOS](https://download.mql5.com/cdn/mobile/mt5/ios?server=CMGlobals-Demo)
- [Android](https://download.mql5.com/cdn/mobile/mt5/android?server=CMGlobals-Demo)

Note: Mobile links include demo server. Select CM Globals server for live trading.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7) SUPPORT
- **AI Chatbot**: 24/7
- **Email**: info@cmglobals.com (response < 4 hours)
- **Self-service**: FAQ, Knowledge Hub

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
8) PARTNERSHIP PROGRAMS

**Affiliate Program**
- For: Bloggers, digital marketers, influencers
- Features: CPA structures, revenue share, custom tracking

**Introducing Broker (IB)**
- For: Forex trainers, investment advisors
- Features: Rebates, real-time reporting, marketing materials
- Process: Application → Activation → Integration → Optimization

**Master IB**
- For: Experienced IBs with large networks
- Features: Multi-level hierarchies, exclusive rewards, dedicated manager

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
9) AWARDS & RECOGNITION
- Most Transparent Broker 2022 (forexdailyinfo.com)
- Best Customer Service 2022 (intlbm.com)
- Most User-Friendly Broker 2024 (forexdailyinfo.com)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
10) DYNAMIC USER PROFILING (TEMPORARY, SESSION-ONLY)
Build a short, temporary profile from user questions:
- Experience level: beginner / intermediate / advanced
- Goal: learn / trade / partner (IB) / support issue
- Priority: low spread / swap-free / high bonus / leverage
Then personalize:
- Beginner -> explain basics + recommend Low-Spread Account
- Advanced -> focus on Pro Account features, execution
- Partner -> focus on IB steps, portal tracking

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
11) FORMATTING DIRECTIVES (CRITICAL)
- Comparisons MUST be markdown tables.
- Use bullets for features.
- Highlight key numbers in **bold**.
- No fluff. Be direct and professional.
- Include relevant links when available.

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

// Business hours configuration (Australian Eastern Time)
const BUSINESS_HOURS = {
    startHour: 9,   // 09:00 AM
    endHour: 18,    // 06:00 PM (18:00)
    timezone: 'Africa/Johannesburg'
};

/**
 * Check if current time is outside business hours.
 * Business hours: 09:00 - 18:00 AEST
 * Returns true if before 9 AM or after 6 PM.
 */
const isOutsideBusinessHours = (): boolean => {
    try {
        // Get current time in Australia timezone
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: BUSINESS_HOURS.timezone,
            hour: 'numeric',
            hour12: false
        });
        const hourString = formatter.format(now);
        const currentHour = parseInt(hourString, 10);

        console.log(`🕐 Current hour in AEST: ${currentHour} (Business hours: ${BUSINESS_HOURS.startHour}:00 - ${BUSINESS_HOURS.endHour}:00)`);

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
You are the authorized AI Support Agent for CM Globals.
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

        // Retry logic with exponential backoff for 429 errors
        const maxRetries = 3;
        let lastError: any = null;

        for (let attempt = 0; attempt < maxRetries; attempt++) {
            if (attempt > 0) {
                const waitTime = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
                console.log(`⏳ Rate limited, waiting ${waitTime / 1000}s before retry ${attempt + 1}/${maxRetries}...`);
                await new Promise(resolve => setTimeout(resolve, waitTime));
            }

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
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
                    responseText += "\n\n---\n\n*Live support is available during business hours (09:00 AM - 06:00 PM AEST). Our AI assistant is here to help you 24/7.*";
                }

                if (routeToLiveAgent === "true") {
                    console.log(`📞 Routing to live agent requested (LLM decision: ${routeMatch ? routeMatch[1] : 'N/A'}, Chat too long: ${isChatTooLong})`);
                }

                return { text: responseText, routeToLiveAgent };
            }

            // Handle 429 - retry
            if (response.status === 429) {
                lastError = new Error("RATE_LIMIT_EXCEEDED");
                console.log(`⚠️ Rate limited on attempt ${attempt + 1}/${maxRetries}`);
                continue; // Go to next retry
            }

            // Other errors - don't retry
            const errorData = await response.json().catch(() => ({}));
            console.error(`❌ Gemini API Error [${response.status}]:`, JSON.stringify(errorData, null, 2));
            throw new Error(`Gemini API Error: ${response.status} ${(errorData as any).error?.message || response.statusText}`);
        }

        // All retries exhausted
        throw lastError || new Error("RATE_LIMIT_EXCEEDED");

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
        origin === 'https://chat.cmglobals.com' ||
        origin === 'https://cmglobals-chatbot.vercel.app' ||
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
            errorOrigin === 'https://chat.cmglobals.com' ||
            errorOrigin === 'https://cmglobals-chatbot.vercel.app' ||
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
