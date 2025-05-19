'use client';

import { useState } from 'react';
import styles from './chat/chat-page.module.css';
import MessageInput from './chat/message.input';
import ChatWindow from './chat/chat.window';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message: string) => {
    const userMessage = { text: message, sender: 'user' as const };
    setMessages((prev) => [...prev, userMessage]);

    setIsTyping(true); // show typing...
    
    try {
      const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(message)}`);

      await new Promise((resolve) => setTimeout(resolve, 20000));
      const data = await res.json();

      if (!res.ok || !data?.reply) {
        throw new Error('Invalid response');
      }

      const botMessage = { text: data.reply, sender: 'bot' as const };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.log('Error: ', err);
      setMessages((prev) => [
        ...prev,
        { text: 'Sorry, something went wrong.', sender: 'bot' },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={styles['chat-page-wrapper']}>
      <div className={styles['chat-container']}>
      <ChatWindow messages={messages} isTyping={isTyping} />
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}
