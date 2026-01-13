export type Language = 'en';

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface Suggestion {
  id: string;
  text: string;
  query: string; // The actual text sent to AI
}