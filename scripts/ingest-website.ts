
import axios from 'axios';
import * as cheerio from 'cheerio';
// @ts-ignore
import TurndownService from 'turndown';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
    console.error("❌ Error: GEMINI_API_KEY is not defined in .env.local");
    process.exit(1);
}

// @ts-ignore
import { gfm } from 'turndown-plugin-gfm';

const turndownService = new TurndownService();
turndownService.use(gfm); // Enable GitHub Flavored Markdown (Tables, etc.)
turndownService.addRule('remove-scripts', {
    filter: ['script', 'style', 'nav', 'footer', 'iframe', 'noscript'],
    replacement: () => ''
});

// Configuration
const BASE_URL = 'https://cmglobals.com';
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'knowledge_base.json');
const MAX_DEPTH = 5; // Deep dive mode
const IGNORE_PATTERNS = ['/login', '/register', '/demo', '?lang=', '#', 'mailto:', 'tel:', 'javascript:', '.jpg', '.png', '.pdf'];

// Explicitly add critical sections that might be missed or are important entry points
const SEED_URLS = [
    'https://cmglobals.com/',
    'https://cmglobals.com/trading/account-types',
    'https://cmglobals.com/trading/markets',
    'https://cmglobals.com/trading/platforms',
    'https://cmglobals.com/partnership/ib-program',
    'https://cmglobals.com/corporate/about-us',
    'https://cmglobals.com/corporate/regulation',
    'https://cmglobals.com/knowledge-hub',
    'https://cmglobals.com/knowledge-hub/blog',
    'https://cmglobals.com/knowledge-hub/guides',
    'https://cmglobals.com/knowledge-hub/glossary'
];

interface KnowledgeChunk {
    id: string;
    url: string;
    title: string;
    content: string;
    embedding?: number[];
}

const visitedUrls = new Set<string>();
const knowledgeBase: KnowledgeChunk[] = [];
// Initialize queue with all seed URLs
let pendingUrls: { url: string; depth: number }[] = SEED_URLS.map(url => ({ url, depth: 0 }));

// Helper to delay execution (avoid rate limits)
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function getEmbedding(text: string): Promise<number[] | undefined> {
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${API_KEY}`,
            {
                content: {
                    parts: [{ text }]
                }
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
        return response.data.embedding.values;
    } catch (error) {
        // @ts-ignore
        console.error(`⚠️ Failed to generate embedding:`, error.response?.data?.error?.message || error.message);
        return undefined;
    }
}

// Smart Chunking: Splits markdown by headers (H1, H2, H3)
function smartSplit(markdown: string, url: string, title: string): string[] {
    const lines = markdown.split('\n');
    const chunks: string[] = [];
    let currentChunk = '';

    // Initial cleanup
    const cleanLines = lines.filter(line => line.trim() !== '');

    for (const line of cleanLines) {
        // Detect detailed split points: Headers (H1-H4) or Bold Starters
        const isHeader = line.startsWith('#');
        const isBoldItem = line.trim().startsWith('**') || line.trim().startsWith('- **');

        if (isHeader || isBoldItem) {
            // Lower threshold to 100 chars for "Micro-Chunking"
            if (currentChunk.length > 100) {
                chunks.push(currentChunk.trim());
                currentChunk = '';
            }
        }
        currentChunk += line + '\n';
    }

    if (currentChunk.trim().length > 50) {
        chunks.push(currentChunk.trim());
    }

    return chunks;
}

async function processQueue() {
    while (pendingUrls.length > 0) {
        const { url, depth } = pendingUrls.shift()!;

        if (visitedUrls.has(url) || depth > MAX_DEPTH) continue;
        visitedUrls.add(url);

        console.log(`🕷️ Crawling: ${url} (Depth: ${depth})`);

        try {
            const response = await axios.get(url, {
                headers: { 'User-Agent': 'Bot' },
                validateStatus: (status) => status < 400
            });

            const $ = cheerio.load(response.data);
            const title = $('title').text().trim() || url;

            // Clean content aggressively to remove noise
            $('script, style, nav, footer, header, noscript, iframe, .cookie-notice, .popup, .ad-banner, .sidebar, .related-posts, .social-share').remove();

            // Remove empty elements to clean up structure
            $('div:empty, span:empty, p:empty').remove();

            // Extract links for recursion
            if (depth < MAX_DEPTH) {
                $('a').each((_, el) => {
                    const href = $(el).attr('href');
                    if (!href) return;

                    let absoluteUrl = href;
                    if (href.startsWith('/')) {
                        absoluteUrl = `${BASE_URL}${href}`;
                    }

                    if (absoluteUrl.startsWith(BASE_URL) && !visitedUrls.has(absoluteUrl)) {
                        // Check ignore patterns
                        const shouldIgnore = IGNORE_PATTERNS.some(p => absoluteUrl.includes(p));
                        if (!shouldIgnore) {
                            pendingUrls.push({ url: absoluteUrl, depth: depth + 1 });
                        }
                    }
                });
            }

            // Convert to Markdown
            let markdown = turndownService.turndown($('body').html() || '');

            // Apply Smart Chunking
            const chunks = smartSplit(markdown, url, title);

            console.log(`   📄 Found ${chunks.length} semantic chunks.`);

            for (const [index, content] of chunks.entries()) {
                console.log(`   🧠 Embedding chunk ${index + 1}/${chunks.length}...`);
                const embedding = await getEmbedding(content);
                if (embedding) {
                    knowledgeBase.push({
                        id: `${url}#${index}`,
                        url,
                        title,
                        content,
                        embedding
                    });
                }
                await sleep(100); // Gentle rate limit
            }

        } catch (error) {
            console.error(`❌ Failed to process ${url}:`); // Less verbose error
        }

        await sleep(500); // Politeness delay between pages
    }
}

async function main() {
    console.log("🚀 Starting Smart RAG Ingestion...");
    await processQueue();

    if (!fs.existsSync(path.dirname(OUTPUT_FILE))) {
        fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
    }

    console.log(`💾 Saving ${knowledgeBase.length} smart chunks to ${OUTPUT_FILE}...`);
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(knowledgeBase, null, 2));
    console.log("✅ Ingestion complete!");
}

main();
