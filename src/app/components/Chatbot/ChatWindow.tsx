"use client";
import React, { useRef, useEffect } from 'react';
import { Message, MessageType } from '../../../lib/types';
import TypingIndicator from './TypingIndicator';

interface ChatWindowProps {
  messages: Message[];
  isTyping: boolean;
  error: string | null;
  retryLastMessage: () => void;
  setError: (error: string | null) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isTyping, error, retryLastMessage, setError }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, error]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex mb-3 ${message.type === MessageType.USER ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] rounded-lg px-4 py-2 ${message.type === MessageType.USER
                ? 'bg-purple-600 text-white rounded-br-none'
                : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
          >
            {message.text}
          </div>
        </div>
      ))}

      {isTyping && <TypingIndicator />}

      {error && (
        <div className="flex justify-start mb-3">
          <div className="bg-red-100 text-red-600 rounded-lg px-4 py-2 rounded-bl-none">
            <div>{error}</div>
            <div className="mt-2 flex space-x-2">
              <button
                onClick={retryLastMessage}
                className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Retry
              </button>
              <button
                onClick={() => setError(null)}
                className="text-sm border border-red-600 text-red-600 px-3 py-1 rounded hover:bg-red-50"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;