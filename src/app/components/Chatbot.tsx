'use client';

import React, { useState } from 'react';
import { Message } from '../types/message';
import { getBotResponse } from '../services/chatbotService';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { v4 as uuidv4 } from 'uuid';
import styles from '../styles/Chatbot.module.css';

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      from: 'bot',
      text: '👋 Hello! Welcome to Lost Girls Vintage. How can I help you today?',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendMessage(text: string) {
    setError(null);
    const userMessage: Message = { id: uuidv4(), from: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const botText = await getBotResponse(text);
      const botMessage: Message = { id: uuidv4(), from: 'bot', text: botText };
      setMessages(prev => [...prev, botMessage]);
    } catch (e) {
      setError('Oops! Something went wrong. Please try again.');
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <section className={styles.chatbot} role="region" aria-label="Lost Girls Vintage Chatbot">
      <header className={styles.header}>Lost Girls Vintage Chatbot</header>

      <MessageList messages={messages} isTyping={isTyping} />

      {error && (
        <div
          role="alert"
          style={{ color: 'crimson', textAlign: 'center', margin: '0.5rem 0' }}
        >
          {error}
        </div>
      )}

      <MessageInput onSend={sendMessage} disabled={isTyping} />
    </section>
  );
}
