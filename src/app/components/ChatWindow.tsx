"use client";

import styles from './Chatbot.module.css';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import EmptyState from './EmptyState';
import { Message as MessageType } from '../hooks/useMessages';

interface ChatWindowProps {
  messages: MessageType[];
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export default function ChatWindow({ messages, isTyping, messagesEndRef }: ChatWindowProps) {
  return (
    <div className={styles.chatWindow}>
      {messages.length === 0 && <EmptyState />}

      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}

      {isTyping && <TypingIndicator />}

      <div ref={messagesEndRef} />
    </div>
  );
}