"use client";
import React, { useState, useRef, useEffect } from 'react';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';
import { Message, MessageType } from '../../../lib/types';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Send message function
  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      type: MessageType.USER,
      timestamp: new Date()
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);

    // typing indicator
    setIsTyping(true);
    setError(null);

    // Error handling with retry mechanism
    let retries = 2;
    let success = false;

    while (retries >= 0 && !success) {
      try {
        // Added timeout to prevent hanging requests
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout

        const response = await fetch(`/api/chat?message=${encodeURIComponent(text)}`, {
          method: 'GET',
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        // Handle different HTTP status codes
        if (!response.ok) {
          if (response.status === 429) {
            throw new Error('Too many requests. Please try again in a moment.');
          } else if (response.status === 404) {
            throw new Error('Chat service not available.');
          } else {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `Server error: ${response.status}`);
          }
        }

        const data = await response.json();

        // Add bot message to chat
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          type: MessageType.BOT,
          timestamp: new Date()
        };

        setMessages(prevMessages => [...prevMessages, botMessage]);
        success = true;
      } catch (err) {
        retries--;
        console.error('Error fetching bot response:', err);

        // Only set error after all retries fail
        if (retries < 0) {
          // Handle different error types
          if (err instanceof DOMException && err.name === 'AbortError') {
            setError('Request timed out. Please try again.');
          } else if (err instanceof TypeError && err.message.includes('NetworkError')) {
            setError('Network connection issue. Please check your internet connection.');
          } else {
            setError(err instanceof Error ? err.message : 'Sorry, something went wrong. Please try again.');
          }
        } else {
          // Wait a bit before retrying
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } finally {
        if (retries < 0 || success) {
          setIsTyping(false);
        }
      }
    }
  };

  const retryLastMessage = () => {
    if (messages.length > 0) {
      const lastUserMessage = [...messages].reverse().find(msg => msg.type === MessageType.USER);
      if (lastUserMessage) {
        sendMessage(lastUserMessage.text);
      }
    }
  };

  return (
    <div className="flex flex-col h-[500px] w-full max-w-md rounded-lg border border-gray-300 bg-white shadow-md overflow-hidden">
      <div className="bg-purple-600 text-white py-3 px-4 font-bold">
        <span>Lost Girls Vintage Support</span>
        <span className="text-xs bg-green-500 text-white px-2 py-1 ml-4 rounded-full">Online</span>
      </div>
      <ChatWindow
        messages={messages}
        retryLastMessage={retryLastMessage}
        isTyping={isTyping}
        error={error}
        setError={setError}
      />
      <MessageInput onSend={sendMessage} />
    </div>
  );
};

export default Chatbot;