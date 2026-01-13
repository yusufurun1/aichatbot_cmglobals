# Vercel Environment Variables Setup

Bu dosya, Vercel dashboard'da ayarlanması gereken environment variable'ları açıklar.

## 📋 Vercel Dashboard'da Eklenecek Environment Variables

Vercel projenizin **Settings → Environment Variables** bölümüne gidin ve aşağıdaki değişkenleri ekleyin:

### 1. GEMINI_API_KEY
- **Value**: `AIzaSyDG1rbCNbn-Q_EQrde7REyxMicUZRw3uZ0` (veya güncel API key'iniz)
- **Environment**: Production, Preview, Development (hepsini seçin)
- **Description**: Google Gemini API anahtarı (Backend'de kullanılır)

### 2. VITE_API_URL
- **Value**: `https://chat.cmglobals.com/api/chat`
- **Environment**: Production, Preview
- **Description**: Production API endpoint URL'si

## ⚠️ Önemli Notlar

1. **GEMINI_API_KEY**: Bu değer backend'de kullanılır ve client-side'a expose edilmez.
2. **VITE_API_URL**: `VITE_` prefix'li olduğu için client-side'a expose edilir (güvenlik sorunu yok, sadece URL).
3. Local development için `.env.local` dosyasını kullanın (bu dosya GitHub'a push edilmez).

## 🔄 Deployment Sonrası

Vercel'da environment variable'ları ekledikten sonra:
1. Projeyi yeniden deploy edin (Deployments → Redeploy)
2. Veya yeni bir commit push'layın, otomatik deploy olacaktır

## 📝 Local vs Production

| Environment | VITE_API_URL |
|-------------|--------------|
| **Local** | `http://localhost:3001/api/chat` |
| **Vercel (Production)** | `https://chat.cmglobals.com/api/chat` |
