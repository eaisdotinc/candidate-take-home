import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Chatbot Demo</h1>
        <p className={styles.description}>
          A simple chatbot UI built with Next.js
        </p>
        <Link href="/chatbot" className={styles.button}>
          Open Chatbot
        </Link>
      </div>
    </main>
  );
}
