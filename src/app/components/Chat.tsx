'use client';

import { useState, useRef, useEffect } from 'react';
import { Message } from '../types/chat';
import { useChatMessage, createMessage } from '../services/chat';
import VintageCorner from './VintageColor';
import VintageBorder from './VintageBorder';
import Header from './Header';
import WelcomePrompts from './WelcomePrompts';

export default function Chat() {
  const [inputMessage, setInputMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  
  const { mutate: sendMessage, isPending, error, reset } = useChatMessage();
  
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages, isPending]);
  
  const handleSendMessage = () => {
    if (inputMessage.trim() === '' || isPending) return;
    
    const userMessage = createMessage(inputMessage, 'user');
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    
    const messageText = inputMessage;
    setInputMessage('');
    
    sendMessage(messageText, {
      onSuccess: (data) => {
        const botMessage = createMessage(data.response, 'bot');
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      },
    });
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const handleRetry = () => {
    if (messages.length === 0) return;
    
    const lastUserMessage = [...messages].reverse().find(msg => msg.sender === 'user');
    
    if (lastUserMessage) {
      reset();
      sendMessage(lastUserMessage.content, {
        onSuccess: (data) => {
          const botMessage = createMessage(data.response, 'bot');
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        },
      });
    }
  };
  
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-[#F9F5F1] relative font-sans">
      <div className="hidden md:block">
        <VintageCorner position="top-left" />
        <VintageCorner position="top-right" />
        <VintageCorner position="bottom-left" />
        <VintageCorner position="bottom-right" />
      </div>
      
      <div className="absolute inset-0 border-4 md:border-8 border-[#F9E4D4] rounded-lg pointer-events-none"></div>
      <VintageBorder />
      
      <Header />
      
      <WelcomePrompts
        messageContainerRef={messageContainerRef}
        messages={messages}
        setInputMessage={setInputMessage}
        isPending={isPending}
        error={error}
      />
      
      {error && (
        <div className="flex justify-center p-2 md:p-3 bg-amber-50">
          <button 
            onClick={handleRetry}
            className="py-1.5 md:py-2 px-3 md:px-4 bg-amber-700 hover:bg-amber-800 text-white border-none rounded-full cursor-pointer text-xs md:text-sm transition-colors flex items-center gap-2"
          >
            <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try Again
          </button>
        </div>
      )}
      
      <div className="p-3 md:p-5 bg-[#F9E4D4] border-t-2 border-amber-200 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-amber-700 opacity-10"></div>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            placeholder="Ask about our vintage collection..."
            className="flex-1 py-2 md:py-3 px-3 md:px-4 bg-amber-50 border-2 border-amber-300 rounded-lg outline-none text-sm md:text-base focus:border-amber-500 placeholder-amber-400 focus:ring-2 focus:ring-amber-200"
            disabled={isPending}
          />
          <button 
            onClick={handleSendMessage}
            className="p-2 md:p-3 bg-rose-700 hover:bg-rose-800 text-white border-none rounded-lg cursor-pointer transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center disabled:opacity-50"
            disabled={inputMessage.trim() === '' || isPending}
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="flex justify-center mt-2 md:mt-3">
          <p className="text-amber-800 text-xs font-light italic">Est. 2012 · Timeless Fashion Reimagined</p>
        </div>
      </div>
    </div>
  );
}