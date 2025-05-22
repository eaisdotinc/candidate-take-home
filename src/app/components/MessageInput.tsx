import React, { useState, FormEvent } from 'react';
import styles from '../styles/Chatbot.module.css';

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function MessageInput({ onSend, disabled }: MessageInputProps) {
  const [input, setInput] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setInput('');
  }

  return (
    <form className={styles.inputArea} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.inputField}
        placeholder="Type your message..."
        value={input}
        onChange={e => setInput(e.target.value)}
        disabled={disabled}
        aria-label="Chat message input"
      />
      <button
        type="submit"
        className={styles.sendButton}
        disabled={disabled || input.trim() === ''}
        aria-label="Send message"
      >
        Send
      </button>
    </form>
  );
}
