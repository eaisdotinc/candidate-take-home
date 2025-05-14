import { useEffect, useRef, useState } from 'react';
import { Message } from '../types/message';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsBotTyping(true);

    const typingIndicator: Message = { sender: 'bot', text: 'Bot is typing...' };
    setMessages((prev) => [...prev, typingIndicator]);

    try {
      const res = await fetch(`/api/chat?q=${encodeURIComponent(input)}`);
      const data = await res.json();

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { sender: 'bot', text: data.response || "Sorry, I didn't understand that." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { sender: 'bot', text: "Sorry, something went wrong." },
      ]);
    } finally {
      setIsBotTyping(false);
    }
  };

  return { messages, input, setInput, handleSend, isBotTyping, bottomRef };
}
