import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { processChatMessage } from './services/chatService';

import path from 'path';
import { fileURLToPath } from 'url';

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the parent .env.local file
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration - allow frontend domain
app.use(cors({
    origin: [
        'https://chat.cmglobals.com',
        'https://aichatbot-cmglobals.vercel.app',
        'http://localhost:5173', // for local development
        'http://localhost:3000'  // for local development
    ],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Serve static files from the public directory (specifically for knowledge_base.json)
app.use(express.static(path.join(__dirname, '../public')));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/chat', async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const responseText = await processChatMessage(message, history || []);
        res.json({ text: responseText });

    } catch (error: any) {
        console.error('API Error:', error);

        if (error.message === 'RATE_LIMIT_EXCEEDED') {
            return res.status(429).json({ error: 'System is busy (Rate Limit). Please try again in a few seconds.' });
        }

        // Return the actual error message if available, otherwise default to internal error
        const errorMessage = error.message || 'Internal Server Error';
        const statusCode = error.status || 500;

        res.status(statusCode).json({ error: errorMessage });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
