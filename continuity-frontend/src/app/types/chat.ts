export interface Message {
  id: string;
  query: string;
  response: string;
  timestamp: Date;
}

export interface ChatResponse {
  id: string;
  response: string;
}

export interface MessageHistoryResponse {
  messages: Message[];
}

// Backend message format (from Supabase n8n_chat_histories table)
export interface BackendMessage {
  id: number;
  session_id: string;
  message: {
    type: 'human' | 'ai';
    content: string;
  };
  created_at?: string;
}