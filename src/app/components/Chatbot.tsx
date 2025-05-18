"use client";

import { FormEvent, KeyboardEvent } from 'react';
import styles from './Chatbot.module.css';
import ChatHeader from './ChatHeader';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import MessageInput from './MessageInput';
import EmptyState from './EmptyState';
import { useChatMessages, useChatApi, Message as MessageType } from '../hooks/useChatHooks';

export default function Chatbot() {
  const {
    messages,
    inputValue,
    messagesEndRef,
    addMessage,
    handleInputChange,
    clearInput
  } = useChatMessages();

  const { isTyping, sendMessage } = useChatApi();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Add user message to chat
    const userMessage: MessageType = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    addMessage(userMessage);
    clearInput();

    // Send message to API
    const result = await sendMessage(userMessage.text);

    // Add bot response to chat
    const botMessage: MessageType = {
      id: (Date.now() + 1).toString(),
      text: result.success ? result.response! : result.error!,
      sender: 'bot',
      timestamp: new Date(),
    };

    addMessage(botMessage);
  };

  return (
    <div className={styles.chatbotContainer}>
      <ChatHeader />

      <div className={styles.chatWindow}>
        {messages.length === 0 && <EmptyState />}

        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}

        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      <MessageInput
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onSubmit={handleSubmit}
      />
    </div>
  );
}