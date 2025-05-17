'use client';

import { useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { sendMessageThunk } from '@/app/reducer/chatReducer';
import { initializeChat, addMessage, setTyping, setError } from '@/app/actions/chatActions';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import type { RootState } from '@/app/store/store';
import { CHAT_RESPONSES } from '@/app/constants/chat.constants';
import { ERROR_MESSAGES } from '@/app/constants/error.constants';

export default function ChatBot() {
  const dispatch = useAppDispatch();
  const { messages, isTyping, error, lastRequestId, lastProcessingTime } = useAppSelector((state: RootState) => state.chat);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(initializeChat());
  }, [dispatch]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    try {
      // Add user message
      dispatch(addMessage({
        text,
        sender: 'user',
      }));

      // Send message to bot
      const resultAction = await dispatch(sendMessageThunk(text));
      
      if (isRejectedWithValue(resultAction)) {
        return;
      }
    } catch (error) {
      console.error('Unexpected chat error:', error);
      dispatch(setError(error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR));
      dispatch(addMessage({
        text: ERROR_MESSAGES.PROCESSING_ERROR,
        sender: 'bot',
        isError: true,
      }));
    }
  };

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto border rounded-lg shadow-lg bg-white">
      <div className="bg-gray-50 p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">{CHAT_RESPONSES.TITLE}</h2>
        <p className="text-sm text-gray-600">Ask us anything about vintage!</p>
        {error && (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {lastRequestId && (
          <p className="mt-2 text-xs text-gray-500">
            Request ID: {lastRequestId}
            {lastProcessingTime !== undefined && ` (${lastProcessingTime}ms)`}
          </p>
        )}
      </div>
      
      <ChatWindow 
        messages={messages} 
        isTyping={isTyping} 
        ref={chatEndRef}
      />
      
      <ChatInput 
        onSendMessage={handleSendMessage}
        isDisabled={isTyping}
        placeholder={CHAT_RESPONSES.INPUT_PLACEHOLDER}
      />
    </div>
  );
} 