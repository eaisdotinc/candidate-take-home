'use client';

import { useState, useCallback, KeyboardEvent } from 'react';
import { ChatInputProps } from '@/app/types/chat';
import { CHAT_RESPONSES } from '@/app/constants/chat.constants';
import { ERROR_MESSAGES } from '@/app/constants/error.constants';

const DEFAULT_MAX_MESSAGE_LENGTH = 500;

export default function ChatInput({
  onSendMessage,
  isDisabled = false,
  placeholder = CHAT_RESPONSES.INPUT_PLACEHOLDER,
  maxLength = DEFAULT_MAX_MESSAGE_LENGTH,
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSend = useCallback(() => {
    if (!message.trim()) {
      setValidationError(ERROR_MESSAGES.INVALID_REQUEST_BODY);
      return;
    }
    
    if (!isDisabled) {
      onSendMessage(message);
      setMessage('');
      setValidationError('');
    }
  }, [message, onSendMessage, isDisabled]);

  const handleKeyPress = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  const charactersLeft = maxLength - message.length;
  const isNearLimit = charactersLeft <= 50;

  return (
    <div className="border-t p-4 flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value.slice(0, maxLength));
            setValidationError('');
          }}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={isDisabled}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          aria-label="Chat message input"
        />
        <button
          onClick={handleSend}
          disabled={!message.trim() || isDisabled}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          Send
        </button>
      </div>
      {validationError && (
        <div className="text-red-500 text-sm" role="alert">
          {validationError}
        </div>
      )}
      {isNearLimit && (
        <div className="text-right text-sm">
          <span className={charactersLeft <= 10 ? 'text-red-500' : 'text-gray-500'}>
            {charactersLeft} characters left
          </span>
        </div>
      )}
    </div>
  );
} 