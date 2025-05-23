"use client";

import styles from './Chatbot.module.css';
import { EMPTY_STATE_MESSAGE } from '../constants/messages';

export default function EmptyState() {
  return (
    <div className={styles.emptyState}>
      <p>{EMPTY_STATE_MESSAGE}</p>
    </div>
  );
}