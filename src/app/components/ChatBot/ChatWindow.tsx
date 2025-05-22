'use client';

import { forwardRef, useMemo } from 'react';
import { ChatWindowProps, Message } from '@/app/types/chat';
import { SOURCE_TYPES } from '@/app/constants/chat.constants';
import { ERROR_MESSAGES } from '@/app/constants/error.constants';

const MessageBubble = ({ message }: { message: Message }) => {
  const formattedTime = useMemo(() => {
    try {
      return new Date(message.timestamp).toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      console.error('Error formatting timestamp:', error);
      return '';
    }
  }, [message.timestamp]);

  const bubbleClassName = useMemo(() => {
    const baseClass = 'max-w-[70%] rounded-lg p-3';
    if (message.sender === 'user') {
      return `${baseClass} bg-blue-500 text-white`;
    }
    return message.isError
      ? `${baseClass} bg-red-100 text-red-700`
      : `${baseClass} bg-gray-100 text-gray-800`;
  }, [message.sender, message.isError]);

  return (
    <div className={bubbleClassName}>
      <p className="text-sm break-words">{message.text}</p>
      <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} items-center mt-1`}>
        <div className="text-xs opacity-70">
          {formattedTime || ERROR_MESSAGES.PROCESSING_ERROR}
          {message.metadata?.source === SOURCE_TYPES.EXTERNAL && (
            <span className="ml-2 text-xs text-gray-500">(External)</span>
          )}
        </div>
      </div>
    </div>
  );
};

const TypingIndicator = () => (
  <div className="bg-gray-100 rounded-lg p-3">
    <div className="flex space-x-1">
      <span className="text-sm">Bot is typing</span>
      <span className="animate-bounce">.</span>
      <span className="animate-bounce delay-100">.</span>
      <span className="animate-bounce delay-200">.</span>
    </div>
  </div>
);

const ChatWindow = forwardRef<HTMLDivElement, ChatWindowProps>(
  ({ messages = [], isTyping }, ref) => {
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <MessageBubble message={message} />
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <TypingIndicator />
          </div>
        )}
        <div ref={ref} />
      </div>
    );
  }
);

ChatWindow.displayName = 'ChatWindow';

export default ChatWindow; 