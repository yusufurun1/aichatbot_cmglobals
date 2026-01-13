import { Suggestion, Language } from './types';

export const APP_NAME = "CM Globals Assistant";

/**
 * DATA SOURCES (high-level)
 * - Home: https://cmglobalswebsite.netlify.app/
 * - Corporate: https://cmglobalswebsite.netlify.app/corporate/cmglobals/
 * - License: https://cmglobalswebsite.netlify.app/corporate/license-and-regulation/
 * - Partnership: https://cmglobalswebsite.netlify.app/partnership/
 * - Support: https://cmglobalswebsite.netlify.app/support/
 * - Knowledge Hub: https://cmglobalswebsite.netlify.app/knowledge-hub/
 */

// Multilingual UI Strings
export const UI_TEXT = {
  en: {
    title: "CM Globals Assistant",
    subtitle: "AI Powered Support & Learning",
    placeholder:
      "Type your question (e.g., What is spread?, How to install MT5?, Account types, Deposit/withdraw...)",
    sending: "Sending...",
    online: "System Online",
    clear: "Clear Chat",
    disclaimer:
      "Risk Warning: CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage. 73.42% of retail investor accounts lose money when trading CFDs with this provider. This is not investment advice.",
    welcome: `Hello! 👋 I'm the **CM Globals AI Assistant**.

I can help you with:

- 🏦 **Account Types** (Low-Spread, Islamic, Pro)
- 💹 **Trading Conditions** (Spreads, Leverage, Commissions)
- 💻 **Platforms** (MT5 Download & Setup)
- 💳 **Transactions** (Deposit & Withdrawal)
- 🛰️ **Infrastructure** (Liquidity & Data Centers)
- 🤝 **Partnerships** (IB Program, Affiliate, Master IB)
- 🛡️ **Regulation** (ASIC & FINTRAC Licenses)
- 📞 **Support** (Live Chat, Email)

How can I assist you today?`,
    chips_title: "Suggested Topics:",
    context_badge: "Learning Mode Active",
    source_badge: "Official Website Data"
  }
} as const;

export const SUGGESTIONS: Record<Language, Suggestion[]> = {
  en: [
    {
      id: "1",
      text: "📊 Account Types",
      query: "Give me a brief comparison of CM Globals account types (Low-Spread, Islamic, Pro) in a table format showing leverage, spreads, swaps, and best use case. Include a link to open an account."
    },
    {
      id: "2",
      text: "💹 Spreads & Fees",
      query: "What are CM Globals spreads and commission fees? Keep it short with key numbers."
    },
    {
      id: "3",
      text: "🧮 Lot Size & Leverage",
      query: "Explain CM Globals minimum lot size and maximum leverage briefly. What leverage options are available?"
    },
    {
      id: "4",
      text: "💻 MT5 Setup",
      query: "How do I download and install MT5? Give me download links for Windows, iOS, and Android."
    },
    {
      id: "5",
      text: "💳 Deposit / Withdraw",
      query: "What are the deposit and withdrawal methods at CM Globals? List the payment options."
    },
    {
      id: "6",
      text: "🛡️ Regulation",
      query: "Is CM Globals regulated? What are your license numbers? Keep it brief."
    },
    {
      id: "7",
      text: "🤝 IB Partnership",
      query: "How do I become a CM Globals IB partner? List the steps briefly and explain the partnership programs."
    }
  ]
};

// Extra structured data (optional but useful for routing + grounded answers)
export const SITE_URLS = {
  base: "https://cmglobalswebsite.netlify.app",
  www_base: "https://www.cmglobals.com",

  portal: "https://client.cmglobals.com",
  register: "https://client.cmglobals.com/register",
  login: "https://client.cmglobals.com/login",

  corporate: {
    about: "https://cmglobalswebsite.netlify.app/corporate/cmglobals/",
    cortez_morgan: "https://cmglobalswebsite.netlify.app/corporate/cortez-morgan-group/",
    vision_mission: "https://cmglobalswebsite.netlify.app/corporate/vision-mission/",
    values: "https://cmglobalswebsite.netlify.app/corporate/values/",
    regulation: "https://cmglobalswebsite.netlify.app/corporate/license-and-regulation/"
  },

  partnership: {
    programs: "https://cmglobalswebsite.netlify.app/partnership/programs/",
    ib_program: "https://cmglobalswebsite.netlify.app/partnership/ib/",
    affiliate_program: "https://cmglobalswebsite.netlify.app/partnership/affiliate/",
    master_ib: "https://cmglobalswebsite.netlify.app/partnership/master-ib/"
  },

  knowledge_hub: {
    forex_101: "https://cmglobalswebsite.netlify.app/knowledge-hub/forex-101/",
    technical_analysis: "https://cmglobalswebsite.netlify.app/knowledge-hub/technical-analysis/",
    fundamental_analysis: "https://cmglobalswebsite.netlify.app/knowledge-hub/fundamental-analysis/",
    trading_psychology: "https://cmglobalswebsite.netlify.app/knowledge-hub/trading-psychology/",
    blog: "https://cmglobalswebsite.netlify.app/knowledge-hub/blog/"
  },

  support: {
    main: "https://cmglobalswebsite.netlify.app/support/",
    faq: "https://cmglobalswebsite.netlify.app/support/faq/",
    legal: "https://cmglobalswebsite.netlify.app/support/legal/"
  }
} as const;

/**
 * Canonical facts (site-derived)
 */
export const COMPANY_FACTS = {
  positioning: {
    headline: "Trust Meets Power",
    tagline: "Global Markets + Unlimited Opportunities",
    highlights: [
      "200,000+ investors",
      "100+ instruments",
      "12 countries served",
      "6 Liquidity Providers",
      "4 back-offices worldwide",
      "24,000,000 AUD paid-in capital"
    ]
  },
  headquarters: {
    city: "Melbourne",
    country: "Australia",
    address: "Suite 118, 252 Russell Street, Melbourne VIC 3000",
    role: "Headquarters & Regulatory Hub"
  },
  parent_company: {
    name: "Cortez Morgan Family Company",
    history: "100-year history",
    industries: ["Mining", "Iron-Steel", "Precious Earth Mines", "Machine Pieces Industry"],
    brokerage_since: 2012
  },
  regulation: {
    authorities: [
      {
        name: "ASIC",
        full_name: "Australian Securities and Investments Commission",
        entity: "CM (AUST) PTY LTD",
        license_number: "AR: 245 075 498",
        description: "Regulated by one of the world's most respected financial authorities"
      },
      {
        name: "FINTRAC",
        full_name: "Financial Transactions and Reports Analysis Centre of Canada",
        entity: "COMO TRADE PTY LIMITED Canada",
        license_number: "MSB: M21737310",
        description: "Compliant with Canadian anti-money laundering regulations"
      }
    ],
    regulatory_standards: [
      "Investor protection",
      "Quarterly independent audits",
      "Anti-money laundering compliance",
      "5x investor equity maintained in blocked accounts",
      "Segregated client funds",
      "Negative balance protection"
    ]
  },
  awards: [
    { name: "Most Transparent Broker 2022", source: "forexdailyinfo.com" },
    { name: "Best Customer Service 2022", source: "intlbm.com" },
    { name: "Most User-Friendly Broker 2024", source: "forexdailyinfo.com" }
  ]
} as const;

export const TRADING_INFRASTRUCTURE = {
  execution: "High liquidity with superior execution speeds",
  platform: "MetaTrader 5 (MT5)",
  support: "24/5 dedicated investor assistants",
  instruments: "100+ globally traded symbols"
} as const;

/**
 * Account Types - CM Globals offers 3 main account types
 */
export const ACCOUNT_TYPES = {
  low_spread: {
    label: "Low-Spread Account",
    tagline: "Come closer with the Low-Spread Account!",
    leverage_majors: "1:500",
    leverage_minors: "1:500",
    commission: "Commission FREE",
    swaps: "Standard",
    bonus: "Up to $1,500",
    contract_size: "100,000",
    personal_assistant: true,
    best_for: "Traders seeking lowest spreads with high leverage"
  },
  islamic: {
    label: "Islamic Account",
    tagline: "Time is now on your side, no swap fees!",
    leverage_majors: "1:100",
    leverage_minors: "1:100",
    commission: "Commission FREE",
    swaps: "Swap FREE",
    bonus: "Up to $1,000",
    contract_size: "100,000",
    personal_assistant: true,
    best_for: "Traders requiring Sharia-compliant trading"
  },
  pro: {
    label: "Pro Account",
    tagline: "For professionals!",
    leverage_majors: "1:400",
    leverage_minors: "1:400",
    commission: "Commission FREE",
    swaps: "Standard",
    bonus: "Up to $3,500",
    contract_size: "100,000",
    personal_assistant: true,
    best_for: "Professional traders seeking premium features"
  }
} as const;

export const TRADING_CONDITIONS = {
  max_leverage: {
    low_spread: "1:500",
    islamic: "1:100",
    pro: "1:400"
  },
  commission: "Commission FREE on all accounts",
  pricing_notes: [
    "All account types feature commission-free trading",
    "Islamic account is swap-free",
    "Personal assistant available for all account types"
  ]
} as const;

export const FUNDING_WITHDRAWAL = {
  deposit_methods: [
    "Visa",
    "Mastercard",
    "Wire Transfer",
    "Bitcoin",
    "USDT",
    "Binance",
    "PayPal",
    "Coinbase",
    "POLi",
    "BPAY",
    "eWAY",
    "Neteller",
    "Skrill"
  ],
  processing_times: {
    deposits: "Instant",
    withdrawals: "24/5 processing"
  },
  security: [
    "SSL encrypted transactions",
    "Segregated client funds"
  ]
} as const;

export const PLATFORMS = {
  primary: "MetaTrader 5 (MT5)",
  downloads: {
    windows: "https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/mt5setup.exe",
    ios: "https://download.mql5.com/cdn/mobile/mt5/ios?server=CMGlobals-Demo",
    android: "https://download.mql5.com/cdn/mobile/mt5/android?server=CMGlobals-Demo"
  },
  notes: [
    "MT5 iOS/Android links include demo server parameter (CMGlobals-Demo).",
    "Select CM Globals server list inside MT5 during login for live trading."
  ]
} as const;

export const SUPPORT = {
  live_chat: {
    availability: "24/7 (AI Chatbot) / Business hours (Live Agent)",
    response_time: "< 2 minutes"
  },
  email: {
    address: "info@cmglobals.com",
    availability: "Everyday",
    response_time: "< 4 hours"
  },
  self_service: ["FAQ", "Knowledge Hub"]
} as const;

export const PARTNERSHIP = {
  affiliate: {
    name: "Affiliate Program",
    target: "Website publishers, bloggers, digital marketers, social media influencers",
    benefits: [
      "Competitive CPA structures",
      "Revenue share models",
      "Custom tracking links"
    ],
    url: "https://cmglobalswebsite.netlify.app/partnership/affiliate/"
  },
  ib_program: {
    name: "Introducing Broker (IB) Program",
    target: "Forex trainers, investment advisors, market analysts",
    benefits: [
      "Attractive rebate structures",
      "Real-time reporting",
      "Marketing materials"
    ],
    process: {
      steps: [
        "Application - Apply online and link your profile",
        "Activation - Team verifies your partner account",
        "Integration - Link clients and access marketing kits",
        "Optimization - Scale business with dedicated support"
      ]
    },
    url: "https://cmglobalswebsite.netlify.app/partnership/ib/"
  },
  master_ib: {
    name: "Master IB Program",
    target: "Experienced introducing brokers with large networks and sub-IBs",
    benefits: [
      "Multi-level hierarchies",
      "Exclusive rewards",
      "Dedicated manager"
    ],
    url: "https://cmglobalswebsite.netlify.app/partnership/master-ib/"
  }
} as const;

export const TRADING_INSTRUMENTS = {
  forex: {
    description: "Major, Minor, and Exotic currency pairs",
    examples: ["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD"]
  },
  indices: {
    description: "Global stock market indices",
    examples: ["S&P 500", "NASDAQ 100", "DAX 40"]
  },
  metals: {
    description: "Precious metals trading",
    examples: ["Gold (XAU/USD)", "Silver (XAG/USD)"]
  },
  energies: {
    description: "Energy commodities",
    examples: ["Brent", "WTI", "Natural Gas"]
  },
  crypto: {
    description: "Cryptocurrency CFDs",
    examples: ["Bitcoin", "Ethereum"]
  }
} as const;

/**
 * ADVANCED SYSTEM INSTRUCTION (site-grounded, production-oriented)
 */
export const SYSTEM_INSTRUCTION = `
You are the **CM Globals AI Specialist** — an adaptive, compliance-aware support agent for **CM Globals** (${SITE_URLS.base}).
Your job: answer questions using **official website-grounded facts** and be explicit when details depend on instrument, account tier, or the client portal.
**If a response is naturally long, split it into clear sections and keep each part highly concise.**

**CRITICAL RULES:**
1. **RESPOND IN ENGLISH:** Always respond in English, regardless of the user's language.
2. **NO CONTACT INFO:** Never show phone numbers unless specifically asked.
3. **BE CONCISE:** Maximum 2 sentences per part.
4. **MUST SPLIT:** If answer has more than 2 paragraphs, you MUST use [SPLIT] between them. Every long answer MUST be at least 2 parts separated by [SPLIT].
5. **LIVE AGENT HANDOFF:** If the user asks for a live agent, human, or "live support", you MUST include the text [LIVE_AGENT_BUTTON] at the end of your response. Example: "I'll connect you to our live support team now. [LIVE_AGENT_BUTTON]"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
0) SAFETY & COMPLIANCE (NON-NEGOTIABLE)
- You MUST NOT provide investment advice, personal recommendations, or performance guarantees.
- Provide educational explanations and product/process information only.
- Always include a short risk reminder when users ask about leverage, profits, "best strategy", or "which asset to buy".
- Risk Warning: CFDs are complex instruments. 73.42% of retail investor accounts lose money when trading CFDs with this provider.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1) QUICK IDENTITY SNAPSHOT (SITE-DERIVED)
- Brand: CM Globals (subsidiary of Cortez Morgan Family Company with 100-year history)
- Positioning: "Trust Meets Power" - Global Markets + Unlimited Opportunities
- Core claims: 200,000+ investors, 100+ instruments, 12 countries, 6 Liquidity Providers, 24M AUD capital
- Headquarters: Suite 118, 252 Russell Street, Melbourne VIC 3000, Australia
- Primary platform: MetaTrader 5 (MT5)
- Brokerage services since: 2012

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2) REGULATION & LICENSE NUMBERS
CM Globals has TWO regulatory licenses:

**ASIC (Australian Securities and Investments Commission)**
- Entity: CM (AUST) PTY LTD
- License: AR: 245 075 498
- Verify: https://connectonline.asic.gov.au/RegistrySearch/

**FINTRAC (Canada)**
- Entity: COMO TRADE PTY LIMITED Canada
- MSB Number: M21737310
- Verify: https://www10.fintrac-canafe.gc.ca/msb-esm/

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
10) FORMATTING DIRECTIVES (CRITICAL)
- Comparisons MUST be markdown tables.
- Use bullets for features.
- Highlight key numbers in **bold**.
- No fluff. Be direct and professional.
- Include relevant links when available.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
11) KEY LINKS
- Register: https://client.cmglobals.com/register
- Login: https://client.cmglobals.com/login
- Regulation: https://cmglobalswebsite.netlify.app/corporate/license-and-regulation/
- IB Program: https://cmglobalswebsite.netlify.app/partnership/ib/
- FAQ: https://cmglobalswebsite.netlify.app/support/faq/
`;

// Quick answer templates
export const QUICK_ANSWERS = {
  en: {
    account_types: `**CM Globals Account Types**

| Account | Leverage | Commission | Swaps | Bonus |
|---------|----------|------------|-------|-------|
| **Low-Spread** | 1:500 | FREE | Standard | Up to $1,500 |
| **Islamic** | 1:100 | FREE | **Swap FREE** | Up to $1,000 |
| **Pro** | 1:400 | FREE | Standard | Up to $3,500 |

All accounts include a personal assistant. [Open Account](https://client.cmglobals.com/register)`,

    spreads_fees: `**Spreads & Fees**
- All accounts: **Commission FREE** trading
- Islamic Account: **Swap FREE**
- Competitive spreads on all instruments`,

    lot_leverage: `**Leverage Options**
- Low-Spread Account: Up to **1:500**
- Pro Account: Up to **1:400**
- Islamic Account: Up to **1:100**

Leverage varies by account type and instrument.`,

    mt5_setup: `**MT5 Download**
- [Windows](https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/mt5setup.exe)
- [iOS](https://download.mql5.com/cdn/mobile/mt5/ios?server=CMGlobals-Demo)
- [Android](https://download.mql5.com/cdn/mobile/mt5/android?server=CMGlobals-Demo)

Select **CM Globals** server during login.`,

    deposit_withdraw: `**Deposit & Withdrawal Methods**
| Method | Examples |
|--------|----------|
| Cards | Visa, Mastercard |
| Crypto | Bitcoin, USDT, Binance, Coinbase |
| E-wallets | PayPal, Neteller, Skrill |
| Bank | Wire Transfer, POLi, BPAY |

Deposits: **Instant** | Withdrawals: **24/5 processing**`,

    regulation: `**Regulation**
CM Globals holds **two licenses**:

| Authority | License |
|-----------|---------|
| **ASIC** (Australia) | AR: 245 075 498 |
| **FINTRAC** (Canada) | MSB: M21737310 |

[View regulation details](https://cmglobalswebsite.netlify.app/corporate/license-and-regulation/)`,

    ib_partnership: `**Partnership Programs**

**4 Steps to Become IB:**
1. Application - Apply online
2. Activation - Account verification
3. Integration - Access marketing kits
4. Optimization - Scale with support

[IB Program](https://cmglobalswebsite.netlify.app/partnership/ib/) | [Affiliate](https://cmglobalswebsite.netlify.app/partnership/affiliate/) | [Master IB](https://cmglobalswebsite.netlify.app/partnership/master-ib/)`
  }
} as const;

/**
 * COMPREHENSIVE FAQ KNOWLEDGE BASE
 * Structured Q&A pairs for AI chatbot training
 * Source: CM Globals official website
 */
export const FAQ_KNOWLEDGE_BASE = {
  // ═══════════════════════════════════════════════════════════════════════════
  // 1️⃣ GENERAL COMPANY & PLATFORM
  // ═══════════════════════════════════════════════════════════════════════════
  general_company: [
    {
      question: "What is CM Globals?",
      answer: "CM Globals is a subsidiary of Cortez Morgan Family Company which has a long history of 100 years. Since 2012, CM Globals is a global brokerage house transmitting orders instantly into real markets. We are regulated by ASIC (Australia) and FINTRAC (Canada), serving 200,000+ investors across 12 countries."
    },
    {
      question: "What services does CM Globals offer?",
      answer: "CM Globals offers trading in multiple asset classes including Forex, Indices (S&P 500, NASDAQ 100, DAX 40), Metals (Gold, Silver), Energies (Brent, WTI, Natural Gas), and Crypto CFDs (Bitcoin, Ethereum). We also provide educational resources through our Knowledge Hub, demo accounts, and partnership programs."
    },
    {
      question: "Who is CM Globals suitable for?",
      answer: "CM Globals is suitable for traders worldwide, from beginners to professionals. We offer three account types (Low-Spread, Islamic, Pro) to meet various needs. Both individual and institutional investors can trade with confidence."
    },
    {
      question: "Is CM Globals legal and licensed?",
      answer: "Yes, CM Globals is legal and licensed. We are regulated by ASIC (Australian Securities and Investments Commission) with AR: 245 075 498, and FINTRAC (Canada) with MSB: M21737310. Our financial statements are subject to quarterly independent audits."
    },
    {
      question: "What makes CM Globals different from other brokers?",
      answer: "CM Globals stands out with: Dual regulation (ASIC + FINTRAC), 100-year parent company history, 24M AUD paid-in capital, 5x investor equity maintained in blocked accounts, commission-free trading, MetaTrader 5 platform, and multiple award recognitions including Most Transparent Broker and Best Customer Service."
    },
    {
      question: "Is trading with CM Globals safe?",
      answer: "Yes, trading with CM Globals is considered safe. We are protected by ASIC and FINTRAC regulation, segregated client funds, negative balance protection, quarterly audits, and SSL encrypted transactions. However, CFDs carry high risk - 73.42% of retail investor accounts lose money when trading CFDs."
    }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // 2️⃣ ACCOUNT TYPES & REGISTRATION
  // ═══════════════════════════════════════════════════════════════════════════
  account_registration: [
    {
      question: "How can I open an account with CM Globals?",
      answer: "Go to [client.cmglobals.com/register](https://client.cmglobals.com/register) and complete the registration form. Select your preferred account type (Low-Spread, Islamic, or Pro), upload your KYC documents, and wait for verification."
    },
    {
      question: "What documents are required?",
      answer: "You need to provide: (1) A valid government-issued photo ID (passport, driver's license, or national ID card), and (2) Proof of address dated within the last 3 months (utility bill, bank statement, or government letter). Documents must be clear, complete, and show all four corners."
    },
    {
      question: "How many account types are there?",
      answer: "There are three account types: Low-Spread (1:500 leverage), Islamic (1:100 leverage, swap-free), and Pro (1:400 leverage, highest bonus). All accounts are commission-free and include a personal assistant."
    },
    {
      question: "Which account type is right for me?",
      answer: "For lowest spreads with high leverage: Low-Spread Account (1:500). For Sharia-compliant trading: Islamic Account (swap-free). For professional features with highest bonus: Pro Account (up to $3,500 bonus)."
    },
    {
      question: "What is the Islamic Account?",
      answer: "The Islamic Account is a Sharia-compliant trading account with no swap fees. It offers 1:100 leverage, commission-free trading, up to $1,000 bonus, and a personal assistant. Ideal for traders who require swap-free trading for religious reasons."
    },
    {
      question: "Can the same person open multiple accounts?",
      answer: "Yes, you can open multiple trading accounts under a single client profile. This allows you to test different strategies or use different account types. All accounts can be managed from a single client portal."
    }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // 3️⃣ DEPOSITS & WITHDRAWALS
  // ═══════════════════════════════════════════════════════════════════════════
  funding_withdrawal: [
    {
      question: "How can I deposit money to CM Globals?",
      answer: "You can deposit via: Cards (Visa, Mastercard), Crypto (Bitcoin, USDT, Binance, Coinbase), E-wallets (PayPal, Neteller, Skrill), and Bank transfers (Wire Transfer, POLi, BPAY, eWAY)."
    },
    {
      question: "What deposit methods are supported?",
      answer: "We accept: Visa, Mastercard, Wire Transfer, Bitcoin, USDT, Binance, PayPal, Coinbase, POLi, BPAY, eWAY, Neteller, and Skrill. All deposits are processed with SSL encryption."
    },
    {
      question: "How long do deposits take?",
      answer: "Deposits are instant for most methods. Processing times may vary depending on the payment method used."
    },
    {
      question: "How long do withdrawals take?",
      answer: "Withdrawals are processed 24/5. Processing times vary by method - crypto withdrawals are typically network-dependent. Additional verification may be required for first-time withdrawals."
    },
    {
      question: "Are my funds safe?",
      answer: "Yes, client funds are held in segregated accounts separate from company assets. We also offer negative balance protection, ensuring you never lose more than your deposit."
    }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // 4️⃣ TRADING CONDITIONS
  // ═══════════════════════════════════════════════════════════════════════════
  trading_conditions: [
    {
      question: "What is the maximum leverage?",
      answer: "Maximum leverage varies by account: Low-Spread Account offers up to 1:500, Pro Account up to 1:400, and Islamic Account up to 1:100."
    },
    {
      question: "Is there a commission?",
      answer: "No, all CM Globals accounts are commission-free. You only pay the spread."
    },
    {
      question: "Are there swap fees?",
      answer: "Standard swap fees apply to Low-Spread and Pro accounts for positions held overnight. The Islamic Account is completely swap-free."
    },
    {
      question: "What is the contract size?",
      answer: "The standard contract size is 100,000 units for all account types."
    }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // 5️⃣ TRADABLE INSTRUMENTS
  // ═══════════════════════════════════════════════════════════════════════════
  instruments: [
    {
      question: "What products can I trade?",
      answer: "You can trade 100+ instruments including: Forex (major, minor, exotic pairs), Indices (S&P 500, NASDAQ 100, DAX 40), Metals (Gold, Silver), Energies (Brent, WTI, Natural Gas), and Crypto CFDs (Bitcoin, Ethereum)."
    },
    {
      question: "What forex pairs are available?",
      answer: "We offer major pairs (EUR/USD, GBP/USD, USD/JPY, AUD/USD), minor pairs, and exotic pairs. A diverse trading range is available."
    },
    {
      question: "Can I trade gold and silver?",
      answer: "Yes, you can trade precious metals including XAU/USD (gold) and XAG/USD (silver)."
    },
    {
      question: "Are crypto CFDs available?",
      answer: "Yes, crypto CFDs are available including Bitcoin and Ethereum."
    },
    {
      question: "Are index trades available?",
      answer: "Yes, you can trade major indices including S&P 500, NASDAQ 100, and DAX 40."
    }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // 6️⃣ PLATFORM & TECHNOLOGY
  // ═══════════════════════════════════════════════════════════════════════════
  platform_technology: [
    {
      question: "What trading platform does CM Globals use?",
      answer: "CM Globals uses MetaTrader 5 (MT5), the most preferred trading platform in the industry. It's available for Windows, iOS, and Android."
    },
    {
      question: "Is there a mobile app?",
      answer: "Yes, MT5 mobile app is available for both iOS and Android. Download from the App Store or Google Play."
    },
    {
      question: "Can I use automated trading (EA)?",
      answer: "Yes, our MT5 platform supports Expert Advisors (EA). You can integrate and use EAs for your various trading strategies."
    },
    {
      question: "Are hedging and scalping allowed?",
      answer: "Yes, you can use hedging and scalping strategies in your trades."
    }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // 7️⃣ SECURITY & DATA PROTECTION
  // ═══════════════════════════════════════════════════════════════════════════
  security: [
    {
      question: "Is my personal information safe?",
      answer: "Yes, your personal information is protected with SSL encryption and secure access systems. We comply with international data protection standards."
    },
    {
      question: "Are funds and client accounts segregated?",
      answer: "Yes, client funds are held separately from company assets in segregated accounts."
    },
    {
      question: "Is there negative balance protection?",
      answer: "Yes, CM Globals offers negative balance protection. You will never lose more than your deposit."
    }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // 8️⃣ EDUCATION & SUPPORT
  // ═══════════════════════════════════════════════════════════════════════════
  education_support: [
    {
      question: "Do you offer education for beginners?",
      answer: "Yes, our Knowledge Hub offers Forex 101, Technical Analysis, Fundamental Analysis, and Trading Psychology courses."
    },
    {
      question: "What are the customer support hours?",
      answer: "AI Chatbot: 24/7. Live support and email are available during business hours."
    },
    {
      question: "How can I contact support?",
      answer: "You can contact us via email at info@cmglobals.com or through the AI chatbot available 24/7."
    }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // 9️⃣ PARTNERSHIP PROGRAMS
  // ═══════════════════════════════════════════════════════════════════════════
  partnership: [
    {
      question: "What partnership programs does CM Globals offer?",
      answer: "CM Globals offers three partnership programs: Affiliate (for bloggers, marketers), Introducing Broker/IB (for forex trainers, advisors), and Master IB (for experienced IBs with large networks)."
    },
    {
      question: "How do I become an IB partner?",
      answer: "The IB process has 4 steps: 1) Application - Apply online, 2) Activation - Account verification, 3) Integration - Access marketing kits, 4) Optimization - Scale with dedicated support. Visit our IB page to apply."
    },
    {
      question: "What is the Master IB program?",
      answer: "Master IB is for experienced introducing brokers with large networks and sub-IBs. Benefits include multi-level hierarchies, exclusive rewards, and a dedicated manager."
    }
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // 🔟 REGULATION & COMPLIANCE
  // ═══════════════════════════════════════════════════════════════════════════
  regulation: [
    {
      question: "Is CM Globals regulated?",
      answer: "Yes, CM Globals is regulated by two authorities: ASIC (Australian Securities and Investments Commission) with AR: 245 075 498, and FINTRAC (Canada) with MSB: M21737310."
    },
    {
      question: "What is ASIC?",
      answer: "ASIC is the Australian Securities and Investments Commission, one of the world's most respected financial authorities. It ensures investor protection and regulatory compliance."
    },
    {
      question: "What is FINTRAC?",
      answer: "FINTRAC is the Financial Transactions and Reports Analysis Centre of Canada. It ensures compliance with anti-money laundering regulations."
    },
    {
      question: "How can I verify CM Globals licenses?",
      answer: "ASIC license can be verified at connectonline.asic.gov.au. FINTRAC registration can be verified at the official FINTRAC website."
    }
  ]
} as const;