import React from 'react';
import { Message } from '../types/message';
import styles from '../styles/Chatbot.module.css';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

export function MessageList({ messages, isTyping }: MessageListProps) {
  return (
    <div className={styles.messages} aria-live="polite" aria-atomic="false">
      {messages.map(msg => (
        <div
          key={msg.id}
          className={`${styles.message} ${
            msg.from === 'user' ? styles.messageUser : styles.messageBot
          }`}
        >
          {msg.text}
        </div>
      ))}
      {isTyping && (
        <div className={styles.typingIndicator} aria-live="assertive">
          🤖 Bot is typing...
        </div>
      )}
    </div>
  );
}
