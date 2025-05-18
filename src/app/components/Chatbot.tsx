'use client';

import { useState } from 'react';
import { Message } from '../types/message';
import { getBotResponse } from '../services/chatbotService';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { v4 as uuidv4 } from 'uuid';

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (text: string) => {
    const userMessage: Message = { id: uuidv4(), from: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    const botText = await getBotResponse(text);
    const botMessage: Message = { id: uuidv4(), from: 'bot', text: botText };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow bg-gray-50">
      <h2 className="text-lg font-bold mb-2">Lost Girls Chatbot</h2>
      <MessageList messages={messages} isTyping={isTyping} />
      <MessageInput onSend={sendMessage} disabled={isTyping} />
    </div>
  );
}
