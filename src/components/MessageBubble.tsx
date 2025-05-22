"use client";

import React from "react";
import styles from "../app/ChatPage.module.css";
import { MessageType } from "../hooks/useChat";

interface MessageBubbleProps {
  message: MessageType;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { text, sender, timestamp } = message;

  const getBubbleStyle = () => {
    switch (sender) {
      case "user":
        return styles.userMessage;
      case "bot":
        return styles.botMessage;
      case "error":
        return styles.errorMessage;
      default:
        return "";
    }
  };

  return (
    <div className={`${styles.messageBubble} ${getBubbleStyle()}`}>
      <p className={styles.messageText}>{text}</p>
      <p className={styles.messageTimestamp}>
        {timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  );
};

export default MessageBubble;
