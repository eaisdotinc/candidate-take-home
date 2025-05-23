"use client";

import { FormEvent, KeyboardEvent, ChangeEvent } from 'react';
import styles from './Chatbot.module.css';
import { PLACEHOLDER_TEXT } from '../constants/messages';

interface MessageInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  isTyping?: boolean;
}

export default function MessageInput({
  value,
  onChange,
  onKeyDown,
  onSubmit,
  isTyping = false,
}: MessageInputProps) {
  return (
    <form className={styles.inputContainer} onSubmit={onSubmit}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={PLACEHOLDER_TEXT}
        className={styles.messageInput}
        disabled={isTyping}
      />
      <button
        type="submit"
        className={styles.sendButton}
        disabled={isTyping || !value.trim()}
      >
        Send
      </button>
    </form>
  );
}