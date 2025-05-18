 
import ChatInterface from '@/components/chat/ChatInterface';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Lost Girls Vintage Support</h1>
        <p>How can we help you today?</p>
      </header>
      <main className={styles.main}>
        <ChatInterface/>
      </main>
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Lost Girls Vintage</p>
      </footer>
    </div>
  );
}