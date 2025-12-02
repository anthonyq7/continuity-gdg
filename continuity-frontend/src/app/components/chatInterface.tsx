import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, History } from 'lucide-react';
import { chatService } from '@/app/service/chatService';
import { Message } from '@/app/types/chat';

interface ChatInterfaceProps {
  onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onClose }) => {
  const [query, setQuery] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chattype, setChattype] = useState<string>('Start a conversation');

  // Fetch message history on component mount
  useEffect(() => {
    loadMessageHistory();
  }, []);

  const loadMessageHistory = async () => {
    try {
      const history = await chatService.fetchMessageHistory();
      setMessages(history);
    } catch (error) {
      console.error('Failed to load message history:', error);
    }
  };

  const historyclick = () => {
    setChattype(prevText =>
      prevText === 'Start a conversation' 
        ? 'Chat History' 
        : 'Start a conversation'
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim() !== '') {
      submitQuery();
    }
  };

  const submitQuery = async () => {
    if (query.trim() === '') return;

    setIsLoading(true);
    const currentQuery = query;
    setQuery(''); // Clear input immediately

    try {
      const data = await chatService.sendQuery(currentQuery);

      const newMessage: Message = {
        id: data.id || Date.now().toString(),
        query: currentQuery,
        response: data.response,
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (error) {
      console.error('Error submitting query:', error);
      
      const errorMessage: Message = {
        id: Date.now().toString(),
        query: currentQuery,
        response: 'Error: Failed to get response from server',
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="chatappear fixed bottom-6 right-6 bg-white shadow-2xl z-[9999] w-[450px] flex flex-col"
      style={{ height: "600px" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b" style={{ backgroundColor: "#e35540" }}>
        <div className="flex gap-3 items-center">
          <MessageCircle className="text-white h-5 w-auto" />
          <h3 className="text-lg font-bold text-white">Chat</h3>
        </div>
        <div className="flex gap-3">
          <button onClick={historyclick}>
            <History className="text-white hover:cursor-pointer h-5 w-auto" />
          </button>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X size={20} className="hover:cursor-pointer" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="text-gray-700 flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.length === 0 && !isLoading && (
          <p className="text-gray-500 text-sm text-center">
            {chattype}
          </p>
        )}

        {chattype === 'Start a conversation' && (
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-2">
                <div className="bg-blue-100 p-3 rounded-lg ml-auto max-w-[80%]">
                  <p className="text-gray-900 text-sm">{message.query}</p>
                </div>
                <div className="bg-white p-3 rounded-lg mr-auto max-w-[80%] border border-gray-200">
                  <p className="text-gray-900 text-sm">{message.response}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="bg-white p-3 rounded-lg mr-auto max-w-[80%] border border-gray-200">
                <p className="text-gray-600 text-sm">Typing...</p>
              </div>
            )}
          </div>
        )}

        {chattype === 'Chat History' && (
          <div className="mt-4 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className="p-3 bg-white border border-gray-200 rounded hover:bg-gray-100 transition-colors cursor-pointer">
                <p className="text-gray-900 font-semibold truncate">{message.query}</p>
                <p className="text-gray-600 text-sm mt-1">
                  {new Date(message.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={isLoading}
            className="flex-1 px-3 py-2 border focus:outline-none focus:ring-2 text-gray-800"
            style={{ outlineColor: "#e35540" }}
          />
          <button
            onClick={submitQuery}
            disabled={isLoading || query.trim() === ''}
            className="text-white p-2 transition-colors hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#e35540" }}
            onMouseEnter={(e) => !isLoading && query.trim() !== '' && (e.currentTarget.style.backgroundColor = "#8e3123ff")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e35540")}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;