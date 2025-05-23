"use client";

import { Message as MessageType } from '../hooks/useMessages';
import styles from './Chatbot.module.css';

interface MessageProps {
  message: MessageType;
}

export default function Message({ message }: MessageProps) {
  const messageClass = message.sender === 'user'
    ? styles.userMessage
    : message.error
      ? `${styles.botMessage} ${styles.errorMessage}`
      : styles.botMessage;

  return (
    <div className={`${styles.messageBubble} ${messageClass}`}>
      {message.text}
    </div>
  );
}