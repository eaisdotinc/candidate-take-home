"use client";

import React, { FormEvent } from "react";
import styles from "../app/ChatPage.module.css";

interface InputBarProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  isBotTyping: boolean;
}

const InputBar: React.FC<InputBarProps> = ({
  inputValue,
  onInputChange,
  onSubmit,
  isBotTyping,
}) => {
  const handleSubmitProxy = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <footer className={styles.inputAreaFooter}>
      <form onSubmit={handleSubmitProxy} className={styles.inputForm}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Ask me anything..."
          className={styles.messageInput}
          aria-label="Message input"
          disabled={isBotTyping}
        />
        <button
          type="submit"
          className={styles.sendButton}
          disabled={isBotTyping || !inputValue.trim()}
        >
          Send
        </button>
      </form>
    </footer>
  );
};

export default InputBar;
