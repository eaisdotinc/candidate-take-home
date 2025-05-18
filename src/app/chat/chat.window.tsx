import { useEffect, useRef } from 'react';
import styles from './chat-page.module.css';

interface ChatWindowProps {
  messages: string[];
}

export default function ChatWindow({ messages }: ChatWindowProps) {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles['chat-window']}>
      {messages.map((msg, idx) => (
        <div key={idx} className={styles['message-bubble']}>
          <span className={styles['message-text']}>{msg}</span>
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
}
