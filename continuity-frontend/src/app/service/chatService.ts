import { Message, ChatResponse, MessageHistoryResponse } from '@/app/types/chat';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'; // Your FastAPI backend URL

export const chatService = {
  // Fetch message history (all messages from current session)
  async fetchMessageHistory(): Promise<Message[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat/history`, {
        method: 'GET',
        credentials: 'include', // Important: sends cookies for anonymous sessions
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Transform backend format to frontend Message format
      return data.messages.map((msg: any) => ({
        id: msg.id.toString(),
        query: msg.message.type === 'human' ? msg.message.content : '',
        response: msg.message.type === 'ai' ? msg.message.content : '',
        timestamp: new Date(msg.created_at || Date.now()),
      })).filter((msg: Message) => msg.query || msg.response); // Filter out empty messages
      
    } catch (error) {
      console.error('Error fetching message history:', error);
      return []; // Return empty array instead of throwing
    }
  },

  // Send query to backend and get response
  async sendQuery(query: string): Promise<ChatResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        credentials: 'include', // Important: sends cookies for anonymous sessions
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: query }), // Backend expects "message" not "query"
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Extract the AI response from the n8n webhook response
      // The exact structure depends on what your n8n webhook returns
      // You may need to adjust this based on your actual response format
      return {
        id: Date.now().toString(),
        response: data.output || data.response || data.message || 'No response received',
      };
    } catch (error) {
      console.error('Error sending query:', error);
      throw error;
    }
  },
};