'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function ChatbotPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([
    { text: 'Hello! How can I help you today?', sender: 'bot' }
  ]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    // Add user message to chat
    setMessages([...messages, { text: message, sender: 'user' }]);
    
    setMessage('');
    
    // Simulate bot response (in a real app, this would be an API call)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: 'Thanks for your message! This is a demo chatbot.', 
        sender: 'bot' 
      }]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <h1>Chatbot</h1>
      </div>
      
      <div className={styles.chatWindow}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              msg.sender === 'user' ? styles.userMessage : styles.botMessage
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message here..."
          className={styles.messageInput}
        />
        <button 
          onClick={handleSendMessage} 
          className={styles.sendButton}
        >
          Send
        </button>
      </div>
    </div>
  );
} 
