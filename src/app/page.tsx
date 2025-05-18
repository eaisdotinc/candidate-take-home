'use client';

import { useState, useEffect, useRef } from 'react';
import styles from "./page.module.css";
import axios from 'axios';

export default function ChatPage() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };

    // Add user's message and temporary "Bot is typing..." message
    setMessages((prev) => [...prev, userMessage, { sender: 'bot', text: 'Bot is typing...' }]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('/api/chat', {
        message: input,
      });

      const responseData = res.data.reply;

      // Replace "Bot is typing..." with actual response
      setMessages((prev) => [
        ...prev.slice(0, -1), // Remove "Bot is typing..."
        { sender: 'bot', text: responseData },
      ]);
    } catch (error) {
      // Replace "Bot is typing..." with error message
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { sender: 'bot', text: 'Something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatWindow}>
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'user' ? styles.userMsg : styles.botMsg}>
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className={styles.inputSection}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
}
