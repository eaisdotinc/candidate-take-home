"use client";

import React, { useState, useEffect, useRef, FormEvent } from "react";
import styles from "./ChatPage.module.css";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot" | "error";
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString() + "-user",
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");
    setIsBotTyping(true);

    try {
      const response = await fetch(
        `/api/chat?message=${encodeURIComponent(userMessage.text)}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const botMessage: Message = {
        id: Date.now().toString() + "-bot",
        text: data.response,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Failed to fetch bot response:", error);
      const errorMessage: Message = {
        id: Date.now().toString() + "-error",
        text: "Sorry, something went wrong. Please try again.",
        sender: "error",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <div className={styles.chatPageContainer}>
      <header className={styles.chatHeader}>
        <h1 className={styles.chatHeaderTitle}>Lost Girls Vintage Chat</h1>
      </header>

      <div className={styles.chatPanel}>
        <div className={styles.chatWindow}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.messageRow} ${
                msg.sender === "user"
                  ? styles.messageRowUser
                  : styles.messageRowBot
              }`}
            >
              <div
                className={`${styles.messageBubble} ${
                  msg.sender === "user"
                    ? styles.userMessage
                    : msg.sender === "bot"
                    ? styles.botMessage
                    : styles.errorMessage
                }`}
              >
                <p className={styles.messageText}>{msg.text}</p>
                <p className={styles.messageTimestamp}>
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
          {isBotTyping && (
            <div className={`${styles.messageRow} ${styles.messageRowBot}`}>
              <div
                className={`${styles.messageBubble} ${styles.typingIndicator}`}
              >
                <p className={styles.messageText}>Bot is typing...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <footer className={styles.inputAreaFooter}>
          <form onSubmit={handleSubmit} className={styles.inputForm}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className={styles.messageInput}
              aria-label="Message input"
              disabled={isBotTyping}
            />
            <button
              type="submit"
              className={styles.sendButton}
              disabled={isBotTyping || !inputValue.trim()}
            >
              Send
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
}
