import { Message, ChatResponse, MessageHistoryResponse } from '@/app/types/chat';

const API_BASE_URL = '/api'; // Your backend URL

export const chatService = {
  // Fetch message history (first 20 messages)
  async fetchMessageHistory(): Promise<Message[]> {
    const response = await fetch(`${API_BASE_URL}/messages/history`);
    const data = await response.json();
    return data.messages.slice(0, 20);
  },

  // Send query to backend and get RAG response
  async sendQuery(query: string): Promise<ChatResponse> {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    return data;
  },
};