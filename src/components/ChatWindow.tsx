"use client";

import React from "react";
import styles from "../app/ChatPage.module.css";
import { MessageType } from "../hooks/useChat";
import MessageBubble from "./MessageBubble";

interface ChatWindowProps {
  messages: MessageType[];
  isBotTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  chatWindowRef: React.RefObject<HTMLDivElement>;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  isBotTyping,
  messagesEndRef,
  chatWindowRef,
}) => {
  return (
    <div className={styles.chatWindow} ref={chatWindowRef}>
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`${styles.messageRow} ${
            msg.sender === "user" ? styles.messageRowUser : styles.messageRowBot
          }`}
        >
          <MessageBubble message={msg} />
        </div>
      ))}
      {isBotTyping && (
        <div className={`${styles.messageRow} ${styles.messageRowBot}`}>
          <div className={`${styles.messageBubble} ${styles.typingIndicator}`}>
            <p className={styles.messageText}>Bot is typing...</p>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;
