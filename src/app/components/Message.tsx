"use client";

import { Message as MessageType } from './Chatbot';
import styles from './Chatbot.module.css';

interface MessageProps {
  message: MessageType;
}

export default function Message({ message }: MessageProps) {
  return (
    <div
      className={`${styles.messageBubble} ${message.sender === 'user' ? styles.userMessage : styles.botMessage
        }`}
    >
      {message.text}
    </div>
  );
}