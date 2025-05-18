"use client";

import { FormEvent } from 'react';
import styles from './Chatbot.module.css';
import ChatHeader from './ChatHeader';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';
import { useMessages } from '../hooks/useMessages';
import { useMessageInput } from '../hooks/useMessageInput';
import { useChatApi } from '../hooks/useChatApi';
import { createUserMessage, createBotMessage, handleKeyDown } from '../utils/messageHandlers';

export default function Chatbot() {
  const { messages, messagesEndRef, addMessage } = useMessages();
  const { inputValue, handleInputChange, clearInput } = useMessageInput();
  const { isTyping, sendMessage } = useChatApi();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    // Add user message to chat
    const userMessage = createUserMessage(trimmedInput);
    addMessage(userMessage);
    clearInput();

    // Send message to API
    const result = await sendMessage(userMessage.text);

    // Add bot response to chat
    const botMessage = createBotMessage(
      result.success ? result.response! : result.error!,
      !result.success
    );

    addMessage(botMessage);
  };

  const handleKeyDownWrapper = (e: React.KeyboardEvent<HTMLInputElement>) => {
    handleKeyDown(e, handleSubmit);
  };

  return (
    <div className={styles.chatbotContainer}>
      <ChatHeader />

      <ChatWindow
        messages={messages}
        isTyping={isTyping}
        messagesEndRef={messagesEndRef}
      />

      <MessageInput
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDownWrapper}
        onSubmit={handleSubmit}
        isTyping={isTyping}
      />
    </div>
  );
}