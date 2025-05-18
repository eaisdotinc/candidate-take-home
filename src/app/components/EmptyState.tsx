"use client";

import styles from './Chatbot.module.css';

export default function EmptyState() {
  return (
    <div className={styles.emptyState}>
      <p>How can we help you today?</p>
    </div>
  );
}