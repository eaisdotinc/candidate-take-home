"use client";

import { useState, useEffect, useRef, FormEvent, useCallback } from "react";

export interface MessageType {
  id: string;
  text: string;
  sender: "user" | "bot" | "error";
  timestamp: Date;
}

export function useChat() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const chatWindowRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    const chatWindow = chatWindowRef.current;
    if (chatWindow) {
      const { scrollTop, scrollHeight, clientHeight } = chatWindow;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      if (isNearBottom) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSubmit = useCallback(async (currentInputValue: string) => {
    if (!currentInputValue.trim()) return;

    const userMessage: MessageType = {
      id: Date.now().toString() + "-user",
      text: currentInputValue,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsBotTyping(true);

    try {
      const response = await fetch(
        `/api/chat?message=${encodeURIComponent(userMessage.text)}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const botMessage: MessageType = {
        id: Date.now().toString() + "-bot",
        text: data.response,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Failed to fetch bot response:", error);
      const errorMessage: MessageType = {
        id: Date.now().toString() + "-error",
        text: "Sorry, something went wrong. Please try again.",
        sender: "error",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsBotTyping(false);
    }
  }, []);

  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem("chat_history");
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages).map(
          (msg: MessageType) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })
        );
        setMessages(parsedMessages);
      }
    } catch (error) {
      console.error("Failed to load chat history from localStorage:", error);
      localStorage.removeItem("chat_history");
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem("chat_history", JSON.stringify(messages));
      } catch (error) {
        console.error("Failed to save chat history to localStorage:", error);
      }
    }
  }, [messages]);

  return {
    messages,
    inputValue,
    setInputValue,
    isBotTyping,
    handleSubmit,
    messagesEndRef,
    chatWindowRef,
  };
}
