import styles from './page.module.css';
import dynamic from 'next/dynamic';

const Chatbot = dynamic(() => import('./api/chat/ChatBot'), { ssr: false });

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Chatbot />
      </main>
    </div>
  );
}