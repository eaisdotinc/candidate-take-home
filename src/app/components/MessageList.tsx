'use client';

import { Message } from '../types/message';

interface Props {
  messages: Message[];
  isTyping: boolean;
}

export function MessageList({ messages, isTyping }: Props) {
  return (
    <div className="p-4 border h-80 overflow-y-auto space-y-2 bg-white">
      {messages.map(msg => (
        <div
          key={msg.id}
          className={`text-sm p-2 rounded max-w-xs ${
            msg.from === 'user' ? 'ml-auto bg-blue-100 text-right' : 'mr-auto bg-green-100'
          }`}
        >
          {msg.text}
        </div>
      ))}
      {isTyping && (
        <div className="italic text-gray-500">🤖 Bot is typing...</div>
      )}
    </div>
  );
}
