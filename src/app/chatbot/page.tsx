'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './page.module.css';
import Link from 'next/link';

export default function ChatbotPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ 
    text: string; 
    sender: 'user' | 'bot'; 
    isError?: boolean; 
    originalMessage?: string;
  }[]>([
    { text: 'Hello! Welcome to the chatbot demo. How can I help you today?', sender: 'bot' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom whenever messages change or loading state changes
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Focus input field on load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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
        text: data.message, 
        sender: 'bot' 
      }]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
      
      // Add error message if API call fails
      setMessages(prev => [...prev, { 
        text: 'Sorry, something went wrong. Please try again later.', 
        sender: 'bot',
        isError: true,
        originalMessage: userMessage
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
        <Link href="/" className={styles.backLink}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Home
        </Link>
        <h1>AI Assistant</h1>
        <div className={styles.spacer}></div>
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
            <div className={styles.typingText}>AI is thinking</div>
            <div className={styles.loadingDots}>
              <span>.</span><span>.</span><span>.</span>
            </div>
          </div>
        )}
      </div>
      
      <div className={styles.inputContainer}>
        <input
          ref={inputRef}
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
          <span>Send</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
} 