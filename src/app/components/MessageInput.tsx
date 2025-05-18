"use client";

import { FormEvent, KeyboardEvent, ChangeEvent } from 'react';
import styles from './Chatbot.module.css';

interface MessageInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
}

export default function MessageInput({
  value,
  onChange,
  onKeyDown,
  onSubmit,
}: MessageInputProps) {
  return (
    <form className={styles.inputContainer} onSubmit={onSubmit}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Type your message..."
        className={styles.messageInput}
      />
      <button type="submit" className={styles.sendButton}>
        Send
      </button>
    </form>
  );
}