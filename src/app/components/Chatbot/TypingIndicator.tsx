import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start mb-3">
      <div className="bg-gray-200 text-gray-600 rounded-lg px-4 py-2 rounded-bl-none flex items-center">
        <span className="mr-1">Bot is typing</span>
        <span className="flex">
          <span className="h-2 w-2 bg-gray-600 rounded-full mx-0.5 animate-bounce" style={{ animationDelay: '0ms' }}></span>
          <span className="h-2 w-2 bg-gray-600 rounded-full mx-0.5 animate-bounce" style={{ animationDelay: '150ms' }}></span>
          <span className="h-2 w-2 bg-gray-600 rounded-full mx-0.5 animate-bounce" style={{ animationDelay: '300ms' }}></span>
        </span>
      </div>
    </div>
  );
};

export default TypingIndicator;