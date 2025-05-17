'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import styles from './page.module.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  isLoading : boolean
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text : inputValue.trim(),
      sender: 'user',
      isLoading: false,
    };

    // Add placeholder bot message
    const botPlaceholder: Message = {
      id: `bot-${Date.now()}`,
      text: '',
      sender: 'bot',
      isLoading: true,
    };

    setMessages(prev => [...prev, userMessage , botPlaceholder]);
    setInputValue('');

    const aiResponse = await getResponse(userMessage.text);

    if(aiResponse === null){
     setMessages(prev => {
        const withoutPlaceholder = prev.filter(m => m.id !== botPlaceholder.id);
        const errorMessage: Message = {
          ...botPlaceholder,
          text: 'Sorry, something went wrong...',
          isLoading: false,
        };
        return [...withoutPlaceholder, errorMessage];
      });
      return;
    }

    setMessages(prev => {
      const withoutPlaceholder = prev.filter(m => m.id !== botPlaceholder.id);
      const botMessage: Message = {
        ...botPlaceholder,
        text: aiResponse,
        isLoading: false,
      };
      return [...withoutPlaceholder, botMessage];
    });
  };

  const getResponse = async (message : string) : Promise<string | null> => {
    try{
      const url = `/api/chat?q=${encodeURIComponent(message)}`;
      const response = await fetch(url);

      if(!response.ok){
        console.log("api error : " , response.status);
        return null;
      }
      
      const result = await response.json();
      
      return result?.response as string | null;
    }catch(err){
      console.log("An error occured while getting response : " , err);
      return null;
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.chatContainer}>
        <div className={styles.chatWindow}>
          {messages.map(msg => (
            <div
              key={msg.id}
              className={
                msg.sender === 'user' ? styles.userBubble : styles.botBubble
              }
            >
              {
                msg.isLoading ? 'typing...' : msg.text
              }
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.inputField}
          />
          <button onClick={sendMessage} className={styles.sendButton}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}