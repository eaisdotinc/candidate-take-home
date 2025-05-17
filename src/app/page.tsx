"use client";

import React from "react";
import styles from "./ChatPage.module.css";
import { useChat } from "../hooks/useChat";
import ChatWindow from "../components/ChatWindow";
import InputBar from "../components/InputBar";

export default function ChatPage() {
  const {
    messages,
    inputValue,
    setInputValue,
    isBotTyping,
    handleSubmit,
    messagesEndRef,
    chatWindowRef,
  } = useChat();

  const handleFormSubmit = () => {
    handleSubmit(inputValue);
    setInputValue("");
  };

  return (
    <div className={styles.chatPageContainer}>
      <header className={styles.chatHeader}>
        <h1 className={styles.chatHeaderTitle}>Lost Girls Vintage Chat</h1>
      </header>

      <div className={styles.chatPanel}>
        <ChatWindow
          messages={messages}
          isBotTyping={isBotTyping}
          messagesEndRef={messagesEndRef}
          chatWindowRef={chatWindowRef}
        />
        <InputBar
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSubmit={handleFormSubmit}
          isBotTyping={isBotTyping}
        />
      </div>
    </div>
  );
}
