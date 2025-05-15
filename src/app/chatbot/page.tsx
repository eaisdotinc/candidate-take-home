'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';

export default function ChatbotPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ 
    text: string; 
    sender: 'user' | 'bot'; 
    isError?: boolean; 
    originalMessage?: string;
  }[]>([

    { text: 'Hello! How can I help you today?', sender: 'bot' }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change or loading state changes
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };

  const fetchBotResponse = async (userMessage: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/chat?message=${encodeURIComponent(userMessage)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch bot response');
      }
      
      const data = await response.json();
      
      // Add bot response to chat
      setMessages(prev => [...prev, { 
        text: 'Sorry, something went wrong. Please try again later.', 
        sender: 'bot',
        isError: true,
        originalMessage: userMessage
      }]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
      
      // Add error message if API call fails
      setMessages(prev => [...prev, { 
        text: 'Sorry, I encountered an error. Please try again later.', 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const userMessage = textToSend || message.trim();
  
    if (userMessage === '' || isLoading) return;

    // Add user message to chat if it's a new message (not a retry)
    if (!textToSend) {
      setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
      // Clear input field
      setMessage('');
    }
    
    // Fetch bot response from API
    fetchBotResponse(userMessage);
  };

  const handleRetry = (originalMessage: string) => {
    // Remove the error message
    setMessages(prev => prev.filter(msg => !msg.isError));
    // Try again with the original message
    handleSendMessage(originalMessage);
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
      
      <div ref={chatWindowRef} className={styles.chatWindow}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              msg.sender === 'user' ? styles.userMessage : styles.botMessage
            } ${msg.isError ? styles.errorMessage : ''}`}
          >
            {msg.text}
            {msg.isError && msg.originalMessage && (
              <button 
                onClick={() => handleRetry(msg.originalMessage!)}
                className={styles.retryButton}
              >
                Retry
              </button>
            )}
          </div>
        ))}
        {isLoading && (
          <div className={`${styles.message} ${styles.botMessage} ${styles.typingIndicator}`}>
            <div className={styles.typingText}>Bot is typing</div>
              <div className={styles.loadingDots}>
                <span>.</span><span>.</span><span>.</span>
              </div>
          </div>
        )}
      </div>
      
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message here..."
          className={styles.messageInput}
          disabled={isLoading}
        />
        <button 
          onClick={() => handleSendMessage()}
          className={styles.sendButton}
          disabled={isLoading || message.trim() === ''}
        >
          Send
        </button>
      </div>
    </div>
  );
} 
