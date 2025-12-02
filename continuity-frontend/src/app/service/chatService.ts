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
      
      // Transform backend format - each message is separate (human or AI)
      const messages = data.messages.map((msg: any) => {
        if (msg.message.type === 'human') {
          return {
            id: msg.id.toString(),
            query: msg.message.content,
            response: '',
            timestamp: new Date(msg.created_at || Date.now()),
            type: 'human'
          };
        } else {
          return {
            id: msg.id.toString(),
            query: '',
            response: msg.message.content,
            timestamp: new Date(msg.created_at || Date.now()),
            type: 'ai'
          };
        }
      });
      
      // Return only the newest 20 messages (last 20 from the array)
      return messages.slice(-20);
      
    } catch (error) {
      console.error('Error fetching message history:', error);
      return []; // Return empty array instead of throwing
    }
  },

  // Send query to backend and get response
  async sendQuery(query: string): Promise<ChatResponse> {
    try {
      console.log('Sending query to:', `${API_BASE_URL}/api/chat`);
      console.log('Query:', query);
      
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        credentials: 'include', // Important: sends cookies for anonymous sessions
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: query }), // Backend expects "message" not "query"
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      
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