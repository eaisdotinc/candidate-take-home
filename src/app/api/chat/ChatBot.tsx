"use client";
import { useState, useRef, useEffect } from "react";

const ERROR_MESSAGES = {
  NETWORK_ERROR: "Sorry, I couldn't connect to the server. Please check your internet connection.",
  SERVER_ERROR: "Sorry, something went wrong. Please try again later.",
};

const PLACEHOLDER_TEXT = "Type your message...";
const EMPTY_STATE_MESSAGE = "How can we help you today?";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  error?: boolean;
}

function createUserMessage(text: string): Message {
  return {
    id: Date.now().toString(),
    text,
    sender: "user",
    timestamp: new Date(),
  };
}

function createBotMessage(text: string, isError = false): Message {
  return {
    id: (Date.now() + 1).toString(),
    text,
    sender: "bot",
    timestamp: new Date(),
    error: isError,
  };
}

function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, submit: (e: React.FormEvent) => void) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    submit(e as any);
  }
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(message: string) {
    setIsTyping(true);
    try {
      const response = await fetch("/api/chat?q=" + encodeURIComponent(message), {
        method: "GET",
        headers: { "Accept": "application/json" },
      });
      const contentType = response.headers.get("content-type") || "";
      let data: any = {};
      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        setIsTyping(false);
        return { success: false, error: ERROR_MESSAGES.SERVER_ERROR };
      }
      setIsTyping(false);
      if (response.ok && typeof data.response === "string") {
        return { success: true, response: data.response };
      } else if (data && data.error) {
        return { success: false, error: data.error };
      } else {
        return { success: false, error: ERROR_MESSAGES.SERVER_ERROR };
      }
    } catch {
      setIsTyping(false);
      return { success: false, error: ERROR_MESSAGES.NETWORK_ERROR };
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    const userMsg = createUserMessage(trimmed);
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    const result = await sendMessage(userMsg.text);
    const botMsg = createBotMessage(result.success ? result.response : result.error, !result.success);
    setMessages((prev) => [...prev, botMsg]);
  }

  function MessageBubble({ message }: { message: Message }) {
    const cls = message.sender === "user"
      ? "chatbot-unified-message chatbot-unified-user"
      : message.error
        ? "chatbot-unified-message chatbot-unified-bot chatbot-unified-error"
        : "chatbot-unified-message chatbot-unified-bot";
    return (
      <div className={cls} role="listitem" aria-label={message.sender === "user" ? "User message" : "Bot message"}
        style={{ fontFamily: message.sender === "user" ? 'var(--font-geist-sans)' : 'var(--font-geist-mono)' }}>
        {message.text}
      </div>
    );
  }

  return (
    <div className="chatbot-unified-outer-wrapper">
      <div className="chatbot-unified-container" role="region" aria-label="Chatbot">
        <header className="chatbot-unified-header" aria-label="Chatbot Header">
          <h2>Lost Girls Vintage</h2>
          <div className="status-row">
            <span>Customer Support</span>
            <span className="online-dot" title="Online" />
          </div>
        </header>
        <section className="chatbot-unified-window" aria-label="Chat messages" role="list">
          {messages.length === 0 && (
            <div className="chatbot-unified-empty" aria-live="polite">
              <p>{EMPTY_STATE_MESSAGE}</p>
            </div>
          )}
          {messages.map((m) => <MessageBubble key={m.id} message={m} />)}
          {isTyping && (
            <div className="chatbot-unified-message chatbot-unified-bot chatbot-unified-typing" aria-live="polite" aria-label="Bot is typing">
              <span className="chatbot-unified-dot" />
              <span className="chatbot-unified-dot" />
              <span className="chatbot-unified-dot" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </section>
        <form className="chatbot-unified-input-container" onSubmit={handleSubmit} autoComplete="off" aria-label="Send a message">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => handleKeyDown(e, handleSubmit)}
            placeholder={PLACEHOLDER_TEXT}
            className="chatbot-unified-input"
            disabled={isTyping}
            aria-label="Type your message"
            autoFocus
          />
          <button
            type="submit"
            className="chatbot-unified-send"
            disabled={isTyping || !inputValue.trim()}
            aria-label="Send message"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
