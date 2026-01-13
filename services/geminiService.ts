import { Message } from '../types';

// Determine API URL based on environment
// In production (Vercel), default to relative path '/api/chat' if VITE_API_URL is missing
// In development, default to localhost:3001
const getApiUrl = () => {
  let url = import.meta.env.VITE_API_URL;
  if (url) {
    // Remove trailing slash if present
    return url.endsWith('/') ? url.slice(0, -1) : url;
  }
  return import.meta.env.PROD ? '/api/chat' : 'http://localhost:3001/api/chat';
};

const API_URL = getApiUrl();

// Response type from chat API
export interface ChatResponse {
  text: string;
  routeToLiveAgent: boolean;
}

export const initializeChat = async (): Promise<void> => {
  console.log("Chat service initialized (Backend Mode)");
};

export const sendMessage = async (message: string, history: Message[] = []): Promise<ChatResponse> => {
  try {
    const validHistory = history
      .filter(msg => !msg.isError)
      .map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        text: msg.text
      }));

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        history: validHistory
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API Error: ${response.statusText}`);
    }

    const data = await response.json();

    // Parse routeToLiveAgent - API returns string "true"/"false"
    const shouldRoute = data.routeToLiveAgent === "true" || data.routeToLiveAgent === true;

    return {
      text: data.text,
      routeToLiveAgent: shouldRoute
    };

  } catch (error: any) {
    console.error("Chat API Error:", error);
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Unable to connect to chat server. Please check your internet connection or if the backend is running.');
    }
    throw error;
  }
};
