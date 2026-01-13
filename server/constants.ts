import { Suggestion, Language } from '../types';

export const APP_NAME = "ComoFX Assistant";

/**
 * DATA SOURCES (high-level)
 * - Home: https://comofx.com/  (product claims + awards highlights + account cards) :contentReference[oaicite:5]{index=5}
 * - Account Types: https://comofx.com/trading/account-types :contentReference[oaicite:6]{index=6}
 * - Trading Conditions: https://comofx.com/trading/trading-conditions :contentReference[oaicite:7]{index=7}
 * - Funding/Withdrawal: https://comofx.com/trading/funding-withdrawal :contentReference[oaicite:8]{index=8}
 * - Liquidity: https://comofx.com/trading/liquidity :contentReference[oaicite:9]{index=9}
 * - Platforms (MT5): https://comofx.com/trading/platforms :contentReference[oaicite:10]{index=10}
 * - Regulation: https://comofx.com/corporate/regulation :contentReference[oaicite:11]{index=11}
 * - Offices: https://comofx.com/corporate/offices :contentReference[oaicite:12]{index=12}
 * - Mission/Vision: https://comofx.com/corporate/mission-vision :contentReference[oaicite:13]{index=13}
 * - Awards: https://comofx.com/corporate/awards :contentReference[oaicite:14]{index=14}
 * - IB Program: https://comofx.com/partnership/ib-program :contentReference[oaicite:15]{index=15}
 * - Master IB: https://comofx.com/partnership/master-ib :contentReference[oaicite:16]{index=16}
 * - Commission Plans: https://comofx.com/partnership/commission-plans :contentReference[oaicite:17]{index=17}
 * - Live Support / Contact: https://www.comofx.com/support/live-support & /support/contact :contentReference[oaicite:18]{index=18}
 */

// Multilingual UI Strings
export const UI_TEXT = {
    en: {
        title: "ComoFX Assistant",
        subtitle: "AI Powered Support & Learning",
        placeholder:
            "Type your question (e.g., What is spread?, How to install MT5?, Account types, Deposit/withdraw...)",
        sending: "Sending...",
        online: "System Online",
        clear: "Clear Chat",
        disclaimer:
            "Risk Warning: CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage. This is not investment advice.",
        welcome: `Hello! 👋 I'm the **ComoFX AI Assistant**.

I can help you with:

- 🏦 **Account Types** (Micro, Standard, Pro, ECN)
- 💹 **Trading Conditions** (Spreads, Leverage, Lot)
- 💻 **Platforms** (MT5 Download & Setup)
- 💳 **Transactions** (Deposit & Withdrawal)
- 🛰️ **Infrastructure** (Liquidity & Data Centers)
- 🤝 **Partnerships** (IB Program & Master IB)
- 🛡️ **Regulation** (FSCA License & Compliance)
- 📞 **Support** (Live Chat, WhatsApp, Email)

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
            query:
                "Give me a brief comparison of ComoFX account types (Micro, Standard, ECN) in a table format showing minimum deposit, spreads, lot size, and best use case. Include a link to the account types page."
        },
        {
            id: "2",
            text: "💹 Spreads & Fees",
            query:
                "What are ComoFX spreads and commission fees? Keep it short with key numbers and link to trading conditions page."
        },
        {
            id: "3",
            text: "🧮 Lot Size & Leverage",
            query:
                "Explain ComoFX minimum lot size and maximum leverage briefly. What does nano lot mean?"
        },
        {
            id: "4",
            text: "💻 MT5 Setup",
            query:
                "How do I download and install MT5? Give me download links for Windows, iOS, and Android."
        },
        {
            id: "5",
            text: "💳 Deposit / Withdraw",
            query:
                "What are the deposit and withdrawal methods, minimums, and processing times at ComoFX? Include a link to funding page."
        },
        {
            id: "6",
            text: "�️ Regulation",
            query:
                "Is ComoFX regulated? What is your license number? Keep it brief."
        },
        {
            id: "7",
            text: "🤝 IB Partnership",
            query:
                "How do I become a ComoFX IB partner? List the steps briefly and explain commission options. Include links to IB program and commission plans pages."
        }
    ]
};

// Extra structured data (optional but useful for routing + grounded answers)
export const SITE_URLS = {
    base: "https://comofx.com",
    www_base: "https://www.comofx.com",

    portal: "https://client.comofx.com",
    live_register: "https://client.comofx.com/live-register",

    corporate: {
        about: "https://comofx.com/corporate/about",
        mission_vision: "https://comofx.com/corporate/mission-vision",
        regulation: "https://comofx.com/corporate/regulation",
        offices: "https://comofx.com/corporate/offices",
        awards: "https://comofx.com/corporate/awards",
        careers: "https://comofx.com/corporate/careers"
    },

    trading: {
        account_types: "https://comofx.com/trading/account-types",
        trading_conditions: "https://comofx.com/trading/trading-conditions",
        markets: "https://comofx.com/trading/markets",
        platforms: "https://comofx.com/trading/platforms",
        funding_withdrawal: "https://comofx.com/trading/funding-withdrawal",
        liquidity: "https://comofx.com/trading/liquidity"
    },

    partnership: {
        ib_program: "https://comofx.com/partnership/ib-program",
        affiliate_program: "https://comofx.com/partnership/affiliate-program",
        master_ib: "https://comofx.com/partnership/master-ib",
        commission_plans: "https://comofx.com/partnership/commission-plans"
    },

    education: {
        forex_101: "https://comofx.com/education/forex-101",
        technical_analysis: "https://comofx.com/education/technical-analysis",
        fundamental_analysis: "https://comofx.com/education/fundamental-analysis",
        trading_psychology: "https://comofx.com/education/trading-psychology",
        glossary: "https://comofx.com/education/glossary",
        ebooks_guides: "https://comofx.com/education/guides",
        blog: "https://comofx.com/education/blog",
        calculators: "https://comofx.com/education/calculators"
    },

    support: {
        help_center: "https://comofx.com/support/help-center",
        faq: "https://comofx.com/support/faq",
        live_support_www: "https://www.comofx.com/support/live-support",
        contact_www: "https://www.comofx.com/support/contact"
    }
} as const;

/**
 * Canonical facts (site-derived) — note: some pages contain inconsistent license labels/numbers.
 */
export const COMPANY_FACTS = {
    positioning: {
        headline: "Premium Trading Experience",
        highlights: [
            "20K+ active investors",
            "100+ instruments",
            "<50ms average execution",
            "99.9% uptime guarantee",
            "4 global data centers"
        ]
    },
    headquarters: {
        city: "Pretoria",
        country: "South Africa",
        role: "Headquarters & Regulatory Hub",
        registered_address:
            "PO Box 38278, Garsfontein, Pretoria 0042, Gauteng, South Africa"
    },
    regulation: {
        authority: "FSCA (Financial Sector Conduct Authority) — South Africa",
        numbers_observed_on_site: [
            { label: "License Number (Regulation page)", value: "47645" },
            { label: "License # (Offices page)", value: "47645" },
            { label: "FSP No. (Footer)", value: "47645" }
        ],
        regulatory_standards: [
            "Full transparency in operations",
            "Segregated client funds",
            "Regular compliance audits",
            "Strict capital adequacy requirements",
            "Fair treatment of customers"
        ],
        compliance_commitments: [
            "AML compliance",
            "KYC protocols",
            "CFT (Combating Financing of Terrorism)",
            "Regular external audits",
            "Risk management framework",
            "Data protection & privacy"
        ]
    },
    disclosure_notice_summary: {
        role: "Intermediary & introducing broker (non-advice basis)",
        not_provided: [
            "Financial advice",
            "Portfolio management",
            "Execution services",
            "Discretionary investment recommendations"
        ],
        operational_notes: [
            "Clients are onboarded by underlying product provider or execution venue",
            "GBS Fin Serv does not hold client funds",
            "Does not accept deposits",
            "Does not execute trades"
        ]
    }
} as const;

export const TRADING_INFRASTRUCTURE = {
    latency: "<50ms avg latency",
    uptime: "99.9% uptime guarantee",
    data_centers: ["London, UK", "Dubai, UAE", "Singapore", "New York, USA"],
    server_specifications: [
        "Co-located with major exchanges",
        "Redundant fiber connections (failover)",
        "DDoS protection"
    ]
} as const;

/**
 * Account mapping:
 * - Account Types page lists: Micro / Standard / Pro with min deposits 10 / 100 / 500 and Pro has “low commission”.
 * - Trading Conditions page lists: Micro / Standard / ECN with 1.0 / 1.0 / 0.1 spreads and “No commission”.
 * Implementation strategy:
 * - Treat “ECN” as the institutional pricing concept.
 * - When answering, provide BOTH: (a) Account Types page data, (b) Trading Conditions page “ECN” statement,
 *   and add a short clarification that exact costs may vary by instrument/portal.
 */
export const ACCOUNT_TYPES = {
    micro: {
        label: "Micro",
        min_deposit_usd: 25,
        spreads: "Standard",
        bonus: "Up to 100%",
        commission: "No",
        instruments: "All markets",
        lot_size: "Nano lots",
        max_leverage: "1:500"
    },
    standard: {
        label: "Standard",
        min_deposit_usd: 25,
        spreads: "Standard",
        bonus: "Up to 100%",
        commission: "No",
        instruments: "All markets",
        lot_size: "Micro lots",
        max_leverage: "1:500",
        note: "Minimum $100 balance recommended."
    },
    ecn: {
        label: "ECN",
        min_deposit_usd: 25,
        spreads: "Low",
        bonus: "Up to 100%",
        commission: "No",
        instruments: "All markets",
        lot_size: "Micro lots",
        max_leverage: "1:500",
        note: "Minimum $100 balance recommended."
    }
} as const;

export const TRADING_CONDITIONS = {
    spreads_from_pips: {
        micro: 1.0,
        standard: 1.0,
        ecn: 0.1
    },
    max_leverage: "1:500",
    min_trade_size: 0.001,
    min_trade_size_label: "0.001 (Nano lots)",
    pricing_notes: [
        "All account types (Micro, Standard, ECN) feature no commission trading.",
        "ECN account offers the lowest spreads (from 0.1 pips)."
    ]
} as const;

export const FUNDING_WITHDRAWAL = {
    deposit_methods: ["Bank Transfer", "Credit/Debit Card", "Crypto"],
    processing_times: {
        deposits: "Instant",
        withdrawals: "In under 30 minutes (marketing claim)"
    },
    minimums_usd: {
        minimum_deposit: 25,
        minimum_withdrawal: 25
    }
} as const;

export const PLATFORMS = {
    primary: "MetaTrader 5 (MT5)",
    downloads: {
        windows:
            "https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/mt5setup.exe",
        ios: "https://download.mql5.com/cdn/mobile/mt5/ios?server=ComoFXGlobal-Demo",
        android:
            "https://download.mql5.com/cdn/mobile/mt5/android?server=ComoFXGlobal-Demo"
    },
    notes: [
        "MT5 iOS/Android links include demo server parameter (ComoFXGlobal-Demo).",
        "If user needs live server, guide them to select ComoFX server list inside MT5 during login."
    ]
} as const;

export const SUPPORT = {
    live_chat: {
        availability: "24/7 (AI Chatbot) / Everyday 9 a.m. - 11 p.m. (UTC+2) (Live Agent)",
        response_time: "< 2 minutes"
    },
    whatsapp: {
        availability: "Everyday 9 a.m. - 11 p.m. (UTC+2)",
        response_time: "< 5 minutes"
    },
    email: { availability: "Everyday", response_time: "< 4 hours" },
    self_service: ["Help Center", "FAQ"]
} as const;

export const PARTNERSHIP = {
    ib_program: {
        position: "Introducing Broker (IB) Program",
        who_is_ib:
            "An Introducing Broker (IB) is a trusted partner who introduces clients to ComoFX and earns competitive commissions based on their trading activity. Whether you're a financial influencer, trading educator, or community leader, our IB program provides everything you need to support your network.",
        key_benefits: [
            "Competitive commission structure (per lot or revenue share)",
            "Real-time analytics dashboard",
            "Dedicated account manager",
            "Professional marketing kit (banners, videos, landing pages, promo materials)",
            "Multi-language support (15+ languages)",
            "Sub-IB network (multi-tier capability)"
        ],
        process: {
            total_steps: 6,
            approval_time: "<24 hours",
            steps: [
                "Step 1: Register as Client - Complete the online application form with your details",
                "Step 2: Complete KYC Verification - Submit required documents for compliance verification through client portal",
                "Step 3: Register as Partner - Use your client portal to create your IB account via 'Register as a Partner' page",
                "Step 4: Sign Agreements - Our team will send agreements to your email. Sign them online via Docusign",
                "Step 5: Access Partner Portal - Get your unique referral links and marketing materials",
                "Step 6: Introduce Clients - Share ComoFX trading services with your network and community"
            ]
        },
        registration_url: "https://client.comofx.com",
        info_url: "https://comofx.com/partnership/ib-program"
    },
    commission_plans: {
        plan_1: {
            name: "Rebates Per Lots",
            type: "Fixed Payment Per Lot",
            best_for: "IBs with active trading communities",
            description: "Earn a fixed amount for every lot traded by qualified client referral",
            features: [
                "Fixed payout per asset classes (FX: $3/lot, Others: $6/lot)",
                "Quick earnings on client signup",
                "Extra benefits based on trading volume",
                "Passive income generation",
                "Performance bonuses available",
                "Lifetime revenue from referred clients"
            ],
            highlights: [
                "Get paid with a fixed amount when client trades",
                "Different fixed amounts per asset classes",
                "Tier-based bonuses for volume"
            ]
        },
        plan_2: {
            name: "Revenue Share",
            type: "Fixed % spread share per trade",
            best_for: "IBs with active trading communities",
            description: "Earn a percentage of the revenue generated by referred clients",
            features: [
                "Lifetime revenue from referred clients",
                "Earnings scale with client activity",
                "No ceiling on earning potential",
                "Passive income generation",
                "Extra benefits for larger volumes",
                "Transparent revenue tracking"
            ],
            highlights: [
                "Earn as long as your clients trade",
                "Performance-based tier upgrades",
                "Compound earnings as network grows"
            ]
        },
        volume_stages: [
            {
                stage: "Stage 01 — Starter Volume",
                lots_per_month: "0–10",
                base_commission: "FX: $3/lot, Others: $6/lot",
                privileges: ["Base IB commissions", "Standard support"]
            },
            {
                stage: "Stage 02 — Growth Volume",
                lots_per_month: "10–20",
                multiplier: "x2",
                privileges: ["x2 Double commissions", "5% Loss refund", "Marketing support"]
            },
            {
                stage: "Stage 03 — Pro Volume",
                lots_per_month: "20+",
                multiplier: "x3",
                privileges: ["x3 Triple commissions", "10% Loss refund", "Marketing support", "Education support"]
            }
        ],
        important_notes: [
            "Flexible Terms: Commission plans can be customized based on your business model and expected volume",
            "Tier Upgrades: Higher performance tiers unlock better commission rates and additional benefits",
            "Daily and Monthly Payouts: Base commissions are paid daily with extra benefits added monthly",
            "No Hidden Fees: What you see is what you get - no deductions or hidden charges",
            "Cryptos are currently ineligible for rebates",
            "Volumes are calculated monthly across the whole IB tree"
        ],
        info_url: "https://comofx.com/partnership/commission-plans"
    },
    master_ib: {
        definition:
            "Premium partners with large networks, established market presence, and significant trading volume. High-volume IBs may qualify for exclusive commission rates and additional bonuses.",
        headline_benefits: [
            "Enhanced commission (custom rates)",
            "Priority (VIP) support",
            "Custom solutions",
            "White-label access"
        ],
        additional_advantages: [
            "Co-branded marketing materials",
            "Priority access to new products/features",
            "VIP events/invitations",
            "Flexible payment schedules/methods",
            "Joint campaigns/co-branding",
            "Technical integration support",
            "Multi-currency commission payments"
        ],
        requirements: [
            "Established market presence",
            "Proven track record (forex/financial services)",
            "Large network capability",
            "Professional operations & compliance framework"
        ],
        contact_note: "Contact our partnership team to discuss a tailored plan that fits your business needs."
    }
} as const;

/**
 * ADVANCED SYSTEM INSTRUCTION (site-grounded, long, production-oriented)
 */
export const SYSTEM_INSTRUCTION = `
You are the **ComoFX AI Specialist** — an adaptive, compliance-aware support agent for **ComoFX** (${SITE_URLS.base}).
Your job: answer questions using **official website-grounded facts** and be explicit when details depend on instrument, account tier, or the client portal.

**CRITICAL RULES (OVERRIDES):**
1. **License Number:** The **ONLY** correct FSCA License Number is **47645**.
2. **Contact Links (MANDATORY):**
   - **WhatsApp:** [Start Chat on WhatsApp](https://wa.me/27318802822) (+27318802822).
   - **Email:** [Send Email Inquiry](https://comofx.com/support/contact#contact-form).
   - **Phone:** +27318802822

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
- Always include a short risk reminder when users ask about leverage, profits, “best strategy”, or “which asset to buy”.
- If a user asks for personalized advice, respond with a refusal + offer neutral education (risk, how spreads work, how to compare accounts).

Important disclosure to keep in mind:
- ComoFX website footers state the entity acts as an intermediary/introducing broker on a non-advice basis and does not provide personalized financial advice.
- Clients are onboarded by underlying product provider/execution venue; GBS Fin Serv does not hold client funds, does not accept deposits, and does not execute trades.
(When relevant, mention this clearly and neutrally.)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1) QUICK IDENTITY SNAPSHOT (SITE-DERIVED)
- Public positioning: “Premium Trading Experience” and “Where regional trust meets global quality” (marketing tone).
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
- “What is 0.001?” -> explain nano lots with a simple example.
- “How leverage works?” -> explain margin & liquidation risk, keep it educational.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5) FUNDING / WITHDRAWAL (PROCESS, NOT CUSTODY)
Funding/Withdrawal page shows:
- Methods: Bank Transfer, Credit/Debit Card, Crypto
- Deposits: Instant
- Withdrawals: “in under 30 minutes” (marketing claim)
- Minimum deposit: $25
- Minimum withdrawal: $25

Important:
- If user asks about sending money to ComoFX directly, remind them of the disclosure note:
  “Clients are onboarded by underlying product provider/execution venue; GBS Fin Serv does not accept deposits.”
- Provide steps as “how it’s shown in the portal” and recommend using official portal flow.

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
- Free to join, “no trading required”
- Real-time analytics dashboard, dedicated account manager, marketing kit, 15+ language support, Sub-IB network
- 5 steps; process takes <24 hours

Commission Plans page highlights:
- “Rebates Per Lots” plan and stage-based monthly volume rewards.
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
- If the website has conflicting statements, explicitly say: “Different pages show different labels; here are both.”

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
12) FAQ KNOWLEDGE BASE (PRIORITY REFERENCE)
When users ask common questions, use the FAQ Knowledge Base as your PRIMARY reference:

**Categories available:**
- General Company & Platform (What is ComoFX, services, licensing, safety)
- Account Types & Registration (How to open account, documents, account types, demo)
- Deposits & Withdrawals (Methods, minimums, processing times)
- Trading Conditions (Spreads, leverage, commissions, margin, slippage)
- Tradable Instruments (Forex pairs, metals, crypto, indices, commodities)
- Platform & Technology (Mobile app, EA, hedging, scalping)
- Security & Data Protection (SSL, segregated funds, privacy)
- Education & Support (Courses, analysis, support hours)
- Bonuses & Campaigns (Terms, cancellations)
- Legal & Technical (KYC, locked accounts, document verification)
- Intent-Based Questions (Beginners, recommendations, troubleshooting)

**How to use:**
1. Match user question intent to the relevant FAQ category
2. Provide the exact answer from the FAQ Knowledge Base
3. Supplement with additional context from other knowledge sections if needed
4. Always maintain the same professional, concise tone

End with a helpful closing sentence.
`;

// Optional: quick answer templates (you can wire these into your router)
export const QUICK_ANSWERS = {
    en: {
        account_types: `**ComoFX Account Types**

| Account | Min Deposit | Spreads | Lot Size | Best For |
|---------|-------------|---------|----------|----------|
| **Micro** | $25 | From 1.0 pips | Nano lots | Beginners |
| **Standard** | $25 | From 1.0 pips | Micro lots | Daily traders |
| **ECN** | $25 | From 0.1 pips | Micro lots | Low spread lovers |

No commission on all accounts. [Compare all accounts](https://comofx.com/trading/account-types)`,

        spreads_fees: `**Spreads & Fees**
- Micro/Standard: From **1.0 pips** (no commission)
- ECN: From **0.1 pips** (no commission)
- Swap fees apply for overnight positions

[View trading conditions](https://comofx.com/trading/trading-conditions)`,

        lot_leverage: `**Lot Size & Leverage**
- Minimum trade: **0.001 lots** (nano lot = 100 units)
- Maximum leverage: Up to **1:500** for forex

Leverage varies by instrument.`,

        mt5_setup: `**MT5 Download**
- [Windows](https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/mt5setup.exe)
- [iOS](https://download.mql5.com/cdn/mobile/mt5/ios?server=ComoFXGlobal-Demo)
- [Android](https://download.mql5.com/cdn/mobile/mt5/android?server=ComoFXGlobal-Demo)

Select **ComoFX** server during login.`,

        deposit_withdraw: `**Deposit & Withdrawal**
| Method | Speed |
|--------|-------|
| E-wallets | Instant / Same day |
| Crypto | Instant / Network-dependent |
| Local transfers | Same day |

Minimum: **$25** | No fees from ComoFX
[View all methods](https://comofx.com/trading/funding-withdrawal)`,

        regulation: `**Regulation**
- **FSCA Regulated** (South Africa)
- License Number: **47645**
- Segregated funds | 256-bit SSL

[View regulation details](https://comofx.com/corporate/regulation)`,

        ib_partnership: `**IB Partnership**

**6 Steps:** Register as Client → KYC → Register as Partner → Sign Agreements → Access Portal → Introduce Clients

**Commissions:** $3/lot (FX), $6/lot (Others) | Volume bonuses: x2 (Growth), x3 (Pro)

[IB Program](https://comofx.com/partnership/ib-program) | [Commission Plans](https://comofx.com/partnership/commission-plans)`
    }
} as const;

/**
 * COMPREHENSIVE FAQ KNOWLEDGE BASE
 * Structured Q&A pairs for AI chatbot training
 * Source: Official ComoFX FAQ documentation
 */
export const FAQ_KNOWLEDGE_BASE = {
    // ═══════════════════════════════════════════════════════════════════════════
    // 1️⃣ GENERAL COMPANY & PLATFORM
    // ═══════════════════════════════════════════════════════════════════════════
    general_company: [
        {
            question: "What is ComoFX?",
            answer: "ComoFX is a forex brokerage regulated by the South African Financial Sector Conduct Authority (FSCA). It is a strong, modern, and technology-focused broker that actively serves clients in multiple countries across Africa and Asia."
        },
        {
            question: "What services does ComoFX offer?",
            answer: "ComoFX offers trading in multiple asset classes including forex, indices, metals (gold, silver), energies, and crypto CFDs. We also provide educational resources (Forex 101, technical/fundamental analysis, trading psychology, e-books, blog, calculators), demo accounts, partnership programs, and various events to build the relationship between investment and investors."
        },
        {
            question: "Who is ComoFX suitable for?",
            answer: "ComoFX is suitable for investors in Africa and Asia, from beginners to professionals. We offer different account types (Micro, Standard, ECN) to meet various needs. Both individual and institutional investors can trade with confidence."
        },
        {
            question: "Which countries does ComoFX serve?",
            answer: "ComoFX serves many countries in Africa and Asia, though specific countries are not listed individually. We are headquartered in South Africa and provide global access."
        },
        {
            question: "Is ComoFX legal and licensed?",
            answer: "Yes, ComoFX is legal and licensed. We are regulated by the South African Financial Sector Conduct Authority (FSCA) with FSP No. 47645. We offer intermediary services for derivatives, short/long-term deposits, and crypto assets."
        },
        {
            question: "What makes ComoFX different from other brokers?",
            answer: "ComoFX stands out with: FSCA regulation, ultra-fast deposits/withdrawals optimized for Africa, Tier-1 liquidity, low-latency order execution (12ms), human-centered support, transparent pricing, and global access from our South African headquarters. We invest in technology and local relationships rather than advertising."
        },
        {
            question: "Is trading with ComoFX safe?",
            answer: "Yes, trading with ComoFX is considered safe. We are protected by FSCA regulation, segregated client funds, 256-bit SSL encryption, strong authentication, and data protection standards. However, CFDs carry high risk and capital loss is possible."
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════════
    // 2️⃣ ACCOUNT TYPES & REGISTRATION
    // ═══════════════════════════════════════════════════════════════════════════
    account_registration: [
        {
            question: "How can I open an account with ComoFX?",
            answer: "Go to [client.comofx.com](https://client.comofx.com) and click the 'Open Account' button. Enter your personal information (name, email, phone, address), select account type, base currency, and leverage. Upload your KYC documents and wait for verification. For more details, visit our [Account Types page](https://comofx.com/trading/account-types)."
        },
        {
            question: "What documents are required?",
            answer: "You need to provide: (1) A valid government-issued photo ID (passport, driver's license, or national ID card), and (2) Proof of address dated within the last 3 months (utility bill, bank statement, or government letter). Documents must be clear, complete, and show all four corners."
        },
        {
            question: "Is opening an account free?",
            answer: "Yes, opening an account is free. A minimum deposit of $25 is required to start trading. This is the minimum amount needed in your account to begin trading, but there is no fee to open the account itself."
        },
        {
            question: "How many account types are there?",
            answer: "There are three account types: Micro, Standard, and ECN. Compare features and choose what fits your strategy at our [Account Types page](https://comofx.com/trading/account-types)."
        },
        {
            question: "Which account type is right for me?",
            answer: "For beginners: Micro (nano lots, standard spreads). For daily traders: Standard (micro lots, standard spreads). For those who prefer low spreads: ECN (low spreads from 0.1 pips). [Compare all account types here](https://comofx.com/trading/account-types)."
        },
        {
            question: "Is there a demo account?",
            answer: "Yes, demo accounts are available. You can [open a demo account here](https://client.comofx.com/register-demo) to practice trading without risking real money."
        },
        {
            question: "Can the same person open multiple accounts?",
            answer: "Yes, you can open multiple trading accounts under a single client profile. This allows you to test different strategies, use different account types (Standard, ECN, or Micro), or separate your trading activities. All accounts can be managed from a single client portal."
        },
        {
            question: "Can I open a corporate account?",
            answer: "Yes, corporate accounts are available. Separate KYC documents are required for corporate accounts (company registration, shareholders, etc.)."
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════════
    // 3️⃣ DEPOSITS & WITHDRAWALS
    // ═══════════════════════════════════════════════════════════════════════════
    funding_withdrawal: [
        {
            question: "How can I deposit money to ComoFX?",
            answer: "You can deposit via cards, crypto, e-wallets, and local bank transfers. Fast methods optimized for Africa are offered. [View all deposit methods](https://comofx.com/trading/funding-withdrawal)."
        },
        {
            question: "What is the minimum deposit amount?",
            answer: "The minimum deposit amount is $25 for all account types."
        },
        {
            question: "What deposit methods are supported?",
            answer: "We accept: E-wallets (Skrill, Neteller, STICPAY, Payment Asia), Cryptocurrencies (Bitcoin, USDT, ETH), and Local Payment Methods (region-specific). The minimum deposit is $25 for all account types."
        },
        {
            question: "How long do deposits take?",
            answer: "Deposits are ultra-fast with automatic and manual support - instant or same-day processing. Processing times may vary depending on the method used."
        },
        {
            question: "How long do withdrawals take?",
            answer: "Withdrawal times vary by method: E-wallets: Same day, Cryptocurrencies: Network-dependent (usually <1 hour). Withdrawals are processed on business days. Additional verification may be required for first-time withdrawals."
        },
        {
            question: "Why is my withdrawal request pending?",
            answer: "This could be due to incomplete account verification, insufficient balance, or suspicious activity. Please contact the company for assistance."
        },
        {
            question: "Can I withdraw on the same day?",
            answer: "Yes, same-day withdrawals are possible depending on the withdrawal method chosen."
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════════
    // 4️⃣ TRADING CONDITIONS
    // ═══════════════════════════════════════════════════════════════════════════
    trading_conditions: [
        {
            question: "Are spreads fixed or variable?",
            answer: "Spreads are variable. Micro and Standard accounts start from 1.0 pips, while ECN accounts start from 0.1 pips. Spreads may vary depending on your account type and market conditions. [View full trading conditions](https://comofx.com/trading/trading-conditions)."
        },
        {
            question: "What is the leverage ratio?",
            answer: "Leverage ratios vary by instrument: up to 1:500 for currency pairs, with different ratios for precious metals and crypto."
        },
        {
            question: "What is the maximum leverage?",
            answer: "Maximum leverage of up to 1:500 is offered."
        },
        {
            question: "What is the minimum trade volume?",
            answer: "The minimum trade volume is 0.001 lots (nano lots)."
        },
        {
            question: "Is there a swap (overnight) fee?",
            answer: "Yes, funding/rollover fees apply for positions held overnight."
        },
        {
            question: "Is there a commission?",
            answer: "No, there is no commission fee on all account types."
        },
        {
            question: "What is slippage?",
            answer: "Slippage is the difference between the expected price of a trade and the actual price at which the trade is executed. It can occur during periods of high volatility or low liquidity."
        },
        {
            question: "What is the stop out level?",
            answer: "The stop out level is the margin level at which your positions will be automatically closed to prevent further losses. Please check the trading conditions for specific levels."
        },
        {
            question: "What is a margin call?",
            answer: "A margin call is a notification that your account equity has fallen below the required margin level. You need to deposit more funds or close positions to maintain your account."
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════════
    // 5️⃣ TRADABLE INSTRUMENTS
    // ═══════════════════════════════════════════════════════════════════════════
    instruments: [
        {
            question: "What products can I trade?",
            answer: "You can trade forex, indices, metals, energies, and crypto CFDs with 100+ instruments and a wide variety of trading options."
        },
        {
            question: "What forex pairs are available?",
            answer: "We offer 40+ major, minor, and exotic pairs including EUR/USD, GBP/USD, USD/JPY, and more. A diverse trading range is available."
        },
        {
            question: "Can I trade gold and silver?",
            answer: "Yes, you can trade precious metals including XAU/USD (gold), XAG/USD (silver), XPT/USD (platinum), and XPD/USD (palladium)."
        },
        {
            question: "Are crypto CFDs available?",
            answer: "Yes, crypto CFDs are available including Bitcoin, Ethereum, Litecoin, and Ripple."
        },
        {
            question: "Are index and commodity trades available?",
            answer: "Yes, you can trade 15+ indices (US100, GER40, etc.) and various commodities (WTI, Brent, natural gas)."
        },
        {
            question: "Are stock CFDs offered?",
            answer: "No, stock CFDs are not currently offered."
        },
        {
            question: "What are the trading hours?",
            answer: "Forex/indices: Available 24/5. Crypto: Available 24/7. For product-specific trading hours, please check the 'product specifications' option on your trading platform."
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════════
    // 6️⃣ PLATFORM & TECHNOLOGY
    // ═══════════════════════════════════════════════════════════════════════════
    platform_technology: [
        {
            question: "Is there a mobile app?",
            answer: "Yes, MT5 mobile app is available for both iOS and Android."
        },
        {
            question: "Is there delay (latency) on the platform?",
            answer: "Delay is very rare. Generally, fast order execution is achieved with low-latency order execution around 12ms, ensuring quick and reliable trade execution."
        },
        {
            question: "Can I use automated trading (EA)?",
            answer: "Yes, our platform supports Expert Advisors (EA). You can integrate and use EAs for your various trading strategies."
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
            answer: "Yes, your personal information is protected with encryption and secure access systems that exceed industry standards."
        },
        {
            question: "Is my data shared with third parties?",
            answer: "Yes, your personal information may be shared with regulators, financial institutions, service providers, and upon legal requests. However, your personal information is never used for marketing activities."
        },
        {
            question: "Are funds and client accounts segregated?",
            answer: "Yes, client funds are segregated. The company does not hold client funds directly."
        },
        {
            question: "Is SSL and encryption used?",
            answer: "Yes, 256-bit SSL and data encryption are used to protect all communications."
        },
        {
            question: "How can I secure my account?",
            answer: "Use strong authentication, keep your passwords confidential, and never share them with anyone. In case of suspicious activity, notify the company (new access credentials will be provided to you)."
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════════
    // 8️⃣ EDUCATION & SUPPORT
    // ═══════════════════════════════════════════════════════════════════════════
    education_support: [
        {
            question: "Do you offer education for beginners?",
            answer: "Yes, we offer Forex 101, technical/fundamental analysis, trading psychology, e-books, and guides for beginners."
        },
        {
            question: "Do you share market analysis?",
            answer: "Yes, we provide technical analysis handbooks, fundamental tools, and an economic calendar."
        },
        {
            question: "What are the customer support hours?",
            answer: "AI Chatbot: 24/7. Live agents: Everyday 9:00 AM - 6:00 PM (SAST/UTC+2)."
        },
        {
            question: "Is live support available?",
            answer: "Yes, live support is available during business hours (9:00 AM - 6:00 PM SAST) with response times under 2 minutes."
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════════
    // 9️⃣ BONUSES & CAMPAIGNS
    // ═══════════════════════════════════════════════════════════════════════════
    bonuses: [
        {
            question: "Can bonuses be cancelled?",
            answer: "Yes, the company reserves the right to cancel, modify, or make any changes to bonuses and campaigns in case of violation or misuse."
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════════
    // 🔟 LEGAL & TECHNICAL TOPICS
    // ═══════════════════════════════════════════════════════════════════════════
    legal_technical: [
        {
            question: "My account is locked, how can I unlock it?",
            answer: "You can notify the company through communication channels. In case of suspicious access, deactivation will occur and new credentials will be provided to you."
        },
        {
            question: "Why is KYC (identity verification) required?",
            answer: "Identity and address verification is required for AML (Anti-Money Laundering) compliance, crime prevention, and regulations enforced by licensing authorities."
        },
        {
            question: "What happens if my documents are not approved?",
            answer: "Your account will not be opened or may be closed. You can resubmit your documents for verification."
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════════
    // 🤖 INTENT-BASED QUESTIONS (AI Training)
    // ═══════════════════════════════════════════════════════════════════════════
    intent_based: [
        {
            question: "I'm a beginner, where should I start?",
            answer: "Read our Forex 101 and Beginner's Guide e-book, then determine your own strategy and start trading. We recommend starting with a demo account first."
        },
        {
            question: "Can you recommend a suitable account type for me?",
            answer: "If you're new: Micro account. Intermediate level: Standard account. For low spreads: ECN account."
        },
        {
            question: "What should I know before depositing money?",
            answer: "Complete your KYC verification, understand the risks (capital loss is possible), remember the minimum $25 deposit amount, and check the available deposit methods."
        },
        {
            question: "Why did the spreads widen?",
            answer: "You may see variable spreads due to market volatility or low liquidity conditions."
        },
        {
            question: "Why did my trade close?",
            answer: "This could be due to stop out, margin call, or manual closure. If you didn't close the trade manually, it may have closed due to low margin level."
        },
        {
            question: "Is leverage risky?",
            answer: "Yes, leverage amplifies both potential profits and losses. While it allows you to control larger positions with less capital, it also increases your risk of losing more than your initial investment. Always use leverage responsibly and understand the risks involved."
        }
    ]
} as const;
