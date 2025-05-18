// app/page.tsx
'use client';

import { useState } from 'react';
import ChatWindow from './chat.window';
import MessageInput from './message.input';
import styles from './chat/chat-page.module.css';

export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = (msg: string) => {
    setMessages((prev) => [...prev, msg]);
  };

  return (
    <div className={styles['chat-page-wrapper']}>
      <div className={styles['chat-container']}>
        <ChatWindow messages={messages} />
        <MessageInput onSend={handleSendMessage} />
      </div>
    </div>
  );
}
