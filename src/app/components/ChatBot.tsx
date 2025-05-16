"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

type MessageType = {
  id: string;
  text: string;
  sender: "user" | "bot" | "error";
};

export default function ChatBot() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const chatWindowRef = useRef<HTMLDivElement>(null);
  const chatHeaderRef = useRef<HTMLDivElement>(null);
  const chatInputContainerRef = useRef<HTMLFormElement>(null);

  const handleMinimize = () => setIsMinimized(true);
  const handleMaximize = () => setIsMinimized(false);

  useEffect(() => {
    gsap.from(chatHeaderRef.current, {
      y: -30,
      opacity: 100,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(chatInputContainerRef.current, {
      y: 30,
      opacity: 100,
      duration: 1,
      delay: 0.4,
      ease: "power3.out",
    });

    gsap.from(chatWindowRef.current, {
      opacity: 100,
      scale: 0.95,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;

      if (messages.length > 0) {
        const lastMessageElement = document.getElementById(
          `message-${messages[messages.length - 1].id}`
        );
        if (lastMessageElement) {
          gsap.from(lastMessageElement, {
            opacity: 100,
            y: 20,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      }
    }
  }, [messages, isTyping]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    const userMessage: MessageType = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch(
        `/api/chat?q=${encodeURIComponent(inputValue)}`
      );
      const data = await response.json();
      setIsTyping(false);

      if (!response.ok) throw new Error(data.error || "Something went wrong");

      const botMessage: MessageType = {
        id: Date.now().toString(),
        text: data.response,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setIsTyping(false);
      const errorMessage: MessageType = {
        id: Date.now().toString(),
        text:
          error instanceof Error
            ? error.message
            : "Sorry, something went wrong",
        sender: "error",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Minimized bar */}
      {isMinimized ? (
        <div
          className="flex items-center justify-between bg-white/80 border border-gray-200 rounded-3xl shadow-xl px-4 py-2 cursor-pointer select-none transition-all duration-300 mt-2"
          onClick={handleMaximize}
        >
          <span className="font-semibold text-gray-700 text-sm flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-700"
            >
              <rect x="3" y="11" width="18" height="7" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Chat Assistant
          </span>
          <button
            aria-label="Maximize chat"
            className="p-1 rounded-full hover:bg-gray-200 transition"
            onClick={handleMaximize}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="bg-white/60 backdrop-blur-md text-black border border-gray-200 rounded-3xl shadow-xl p-4 xs:p-6 sm:p-8 md:p-10 relative overflow-hidden transition-all duration-300">
          {/* Minimize button */}
          <button
            aria-label="Minimize chat"
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/70 hover:bg-gray-200 border border-gray-300 shadow transition"
            onClick={handleMinimize}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="7" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </button>
          {/* Background ambient glows */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute -top-1/3 -left-1/3 w-2/3 h-2/3 bg-gradient-to-br from-purple-100 via-transparent to-transparent rounded-full blur-3xl opacity-40 animate-pulse"></div>
            <div className="absolute -bottom-1/3 -right-1/3 w-2/3 h-2/3 bg-gradient-to-tl from-blue-100 via-transparent to-transparent rounded-full blur-3xl opacity-30 animate-pulse-slower"></div>
          </div>
          {/* Header */}
          <div
            className="relative z-10 text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-4 sm:mb-6 border-b border-gray-200 pb-2 sm:pb-3 flex items-center gap-2 sm:gap-3 text-gray-800"
            ref={chatHeaderRef}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-700"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-clip-text text-transparent">
              Chat Assistant
            </span>
          </div>
          {/* Chat window */}
          <div
            className="relative z-10 h-72 xs:h-80 sm:h-96 md:h-[28rem] overflow-y-auto space-y-3 sm:space-y-4 p-2 xs:p-3 sm:p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200 scroll-smooth shadow-inner"
            ref={chatWindowRef}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                id={`message-${message.id}`}
                className={`px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 sm:py-3 max-w-[95%] xs:max-w-[90%] sm:max-w-[85%] rounded-2xl text-xs xs:text-sm md:text-base shadow-md transition-all duration-300 flex flex-col
            ${
              message.sender === "user"
                ? "bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white self-end ml-auto animate-slide-in-right items-end"
                : message.sender === "error"
                ? "bg-red-100 text-red-700 border border-red-300 animate-shake items-start"
                : "bg-gradient-to-br from-gray-100 via-gray-50 to-white text-gray-800 self-start mr-auto animate-slide-in-left items-start"
            }`}
              >
                <span className="font-medium block mb-0.5 text-[10px] xs:text-xs opacity-60">
                  {message.sender === "user"
                    ? "You"
                    : message.sender === "bot"
                    ? "Assistant"
                    : "Error"}
                </span>
                <span>{message.text}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center justify-start mt-1 sm:mt-2 gap-1 sm:gap-2 pl-1 sm:pl-2 animate-pulse">
                <div className="flex gap-0.5 sm:gap-1">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
                </div>
                <span className="text-[10px] xs:text-xs text-gray-500">
                  Assistant is typing...
                </span>
              </div>
            )}
          </div>

          {/* Input field */}
          <form
            onSubmit={handleSubmit}
            className="relative z-10 flex items-center gap-2 sm:gap-3 mt-4 sm:mt-6"
            ref={chatInputContainerRef}
          >
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Message Assistant..."
              disabled={isLoading}
              className="flex-1 px-3 xs:px-4 sm:px-5 py-2.5 xs:py-3 sm:py-3.5 rounded-full border border-gray-700 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white shadow-sm transition-all duration-200 text-xs xs:text-sm"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="bg-black text-white font-medium p-2.5 xs:p-3 rounded-full transition-all hover:scale-105 hover:bg-gray-800 disabled:opacity-50 disabled:hover:scale-100 shadow-md flex items-center justify-center w-10 h-10 xs:w-12 xs:h-12"
              aria-label="Send message"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
