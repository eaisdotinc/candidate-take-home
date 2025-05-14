'use client';
import { useChat } from '../hooks/UseChat';
import styles from '../app/page.module.css';
import MessageBubble from '../components/MessageBubble';
import InputBar from '../components/InputBar';

const ChatWindow = () => {
  const { messages, input, setInput, handleSend, isBotTyping, bottomRef } = useChat();

  return (
    <>
      <div className={styles.chatWindow}>
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} sender={msg.sender} text={msg.text} />
        ))}

        {isBotTyping && (
          <div className={`${styles.messageRow} ${styles.bot}`}>
            <div className={`${styles.messageBubble} ${styles.typingBubble}`}>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <InputBar input={input} setInput={setInput} onSend={handleSend} />
    </>
  );
};

export default ChatWindow;
