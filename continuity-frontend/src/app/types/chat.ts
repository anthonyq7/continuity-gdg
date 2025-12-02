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