
import dotenv from 'dotenv';
import path from 'path';
import fetch from 'node-fetch';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
const apiKey = process.env.GEMINI_API_KEY;

async function listModels() {
    const keysStr = process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || '';
    const keys = keysStr.split(',').map(k => k.trim()).filter(k => k.length > 0);

    if (keys.length === 0) {
        console.error("No API keys found in environment.");
        return;
    }

    for (const key of keys) {
        console.log(`--- Testing Key: ${key.substring(0, 6)}... ---`);
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
            const data = await response.json() as any;
            if (data.error) {
                console.error(`Error for key ${key.substring(0, 6)}:`, data.error.message);
            } else {
                console.log(`Successfully listed ${data.models?.length || 0} models.`);
                if (keys.indexOf(key) === 0) {
                    data.models.forEach((m: any) => console.log(m.name));
                }
            }
        } catch (e: any) {
            console.error(`Request failed for key ${key.substring(0, 6)}:`, e.message);
        }
    }
}

listModels();
