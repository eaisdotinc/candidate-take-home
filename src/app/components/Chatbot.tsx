"use client";

import { useState, useRef, useEffect } from 'react';
import styles from './Chatbot.module.css';
import ChatHeader from './ChatHeader';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import MessageInput from './MessageInput';
import EmptyState from './EmptyState';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat window whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Show "typing" indicator
    setIsTyping(true);

    try {
      // Fetch response from API
      const response = await fetch(`/api/chat?q=${encodeURIComponent(inputValue)}`);
      const data = await response.json();

      setIsTyping(false);

      if (response.ok) {
        // Add bot response to chat
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          sender: 'bot',
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, botMessage]);
      } else {
        // Handle API error
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Sorry, something went wrong. Please try again later.",
          sender: 'bot',
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, errorMessage]);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setIsTyping(false);

      // Handle network error
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I couldn't connect to the server. Please check your internet connection.",
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div className={styles.chatbotContainer}>
      <ChatHeader />

      <div className={styles.chatWindow}>
        {messages.length === 0 && <EmptyState />}

        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}

        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      <MessageInput
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onSubmit={handleSubmit}
      />
    </div>
  );
}