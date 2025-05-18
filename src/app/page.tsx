import styles from './page.module.css';
import dynamic from 'next/dynamic';

const Chatbot = dynamic(() => import('./components/Chatbot'), { ssr: false });

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Lost Girls Vintage</h1>
        <p className={styles.subtitle}>Customer Support Chatbot</p>
        <Chatbot />
      </main>
    </div>
  );
}