import { useEffect, useRef } from 'react';
import styles from './chat-page.module.css';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface ChatWindowProps {
  messages: Message[];
  isTyping: boolean;
}

export default function ChatWindow({ messages, isTyping }: ChatWindowProps) {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles['chat-window']}>
      {messages.map((msg, index) => (
        <div
          key={index}
          className={
            msg.sender === 'user'
              ? styles['user-message']
              : styles['bot-message']
          }
        >
          <div className={styles['message-bubble']}>
            <span className={styles['message-text']}>{msg.text}</span>
          </div>
        </div>
      ))}
      {isTyping && (
        <div className={styles['bot-message']}>
          <div className={styles['typing-indicator']}>Typing...</div>
        </div>
      )}
      <div ref={chatEndRef} />
    </div>
  );
}
