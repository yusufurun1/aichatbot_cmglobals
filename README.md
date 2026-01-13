# CM Globals AI Chatbot

AI-powered customer support chatbot for CM Globals using Google Gemini.

## 🚀 Quick Start

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your values:
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `VITE_API_URL`: Local API endpoint (default: `http://localhost:3001/api/chat`)

3. **Run development server:**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:3001`

## 🌐 Vercel Deployment

### Environment Variables (Vercel Dashboard)

Add these environment variables in your Vercel project settings:

| Variable | Value | Description |
|----------|-------|-------------|
| `GEMINI_API_KEY` | `your_api_key` | Google Gemini API key |
| `VITE_API_URL` | `https://chat.cmglobals.com/api/chat` | Production API endpoint |

### Deploy

```bash
git push origin main
```

Vercel will automatically deploy on push.

## 📁 Project Structure

- `/services/geminiService.ts` - Frontend API service
- `/server/` - Backend API server
- `/components/` - React components
- `/constants.ts` - CM Globals knowledge base

## 🔧 Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **AI**: Google Gemini API
- **Deployment**: Vercel (Serverless Functions)
