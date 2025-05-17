"use client";

import React from "react";
import styles from "./ChatPage.module.css";
import { useChat } from "../hooks/useChat";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import AppHeader from "../components/AppHeader";

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
    if (inputValue.trim()) {
      handleSubmit(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <AppHeader />

      <div className={styles.chatAreaContainer}>
        <ChatWindow
          messages={messages}
          isBotTyping={isBotTyping}
          messagesEndRef={messagesEndRef}
          chatWindowRef={chatWindowRef}
        />
        <ChatInput
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSubmit={handleFormSubmit}
          isBotTyping={isBotTyping}
        />
      </div>
    </div>
  );
}
