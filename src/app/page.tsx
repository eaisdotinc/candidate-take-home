'use client';

import styles from './page.module.css';
import { Poppins } from 'next/font/google';
import ChatWindow from '../components/ChatWindow';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'] });

export default function Home() {
  return (
    <div className={`${styles.chatPage} ${poppins.className}`}>
      <header className={styles.header}>
        <span className={styles.logo}>🤖</span>
        <h1>ChatBot</h1>
      </header>

      <ChatWindow />
    </div>
  );
}
