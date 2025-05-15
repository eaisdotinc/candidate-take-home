"use client";
import React, { useState, KeyboardEvent, FormEvent } from 'react';

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend, disabled = false }) => {
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-300 p-3">
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={disabled ? "Connection lost..." : "Type your message..."}
          className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          disabled={disabled}
        />
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 disabled:opacity-50"
        >
          Send
        </button>
      </div>
      {disabled && (
        <div className="text-red-500 text-xs mt-1">
          You are currently offline. Please check your internet connection.
        </div>
      )}
    </form>
  );
};

export default MessageInput;