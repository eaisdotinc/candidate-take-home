"use client";

import styles from './Chatbot.module.css';

export default function TypingIndicator() {
  return (
    <div className={`${styles.messageBubble} ${styles.botMessage} ${styles.typingIndicator}`}>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
    </div>
  );
}