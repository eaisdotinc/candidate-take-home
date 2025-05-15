import { useEffect, useRef, useState } from 'react';
import { Message } from '../types/message';
import { askBot } from '../lib/api/chat';
import toast from 'react-hot-toast';

const BOTTOM_THRESHOLD = 60;

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);

  const bottomRef   = useRef<HTMLDivElement>(null);
  const windowRef   = useRef<HTMLDivElement>(null);

  const userIsNearBottom = () => {
    const node = windowRef.current;
    if (!node) return true;
    const { scrollTop, clientHeight, scrollHeight } = node;
    return scrollHeight - (scrollTop + clientHeight) < BOTTOM_THRESHOLD;
  };

  const maybeScrollToBottom = () => {
    if (userIsNearBottom()) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('chat_history');
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('chat_history', JSON.stringify(messages));
  }, [messages]);

  const handleSend = async (prompt = input) => {
    if (!prompt.trim()) return;

    if (prompt.startsWith('/')) {
      runCommand(prompt.trim().toLowerCase());
      setInput('');
      return;
    }

    const userMsg: Message = { sender: 'user', text: prompt };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setIsBotTyping(true);
    setMessages((prev) => [...prev, { sender: 'bot', text: '' }]);

    try {
      const reply = await askBot(prompt);
      setMessages(prev => [...prev, { sender: 'bot', text: '' }]);
      await streamBotText(reply, 25);
    } catch (err) {
      console.error(err);
      toast.error('Bot failed to answer');

      replaceLastBotMessage('⚠️ Oops, I had a problem — please try again.');
    } finally {
      setIsBotTyping(false);
    }
  };

  const replaceLastBotMessage = (text: string) =>
    setMessages((prev) => [...prev.slice(0, -1), { sender: 'bot', text }]);

  const streamBotText = async (full: string, ms = 30) => {
    for (let i = 0; i < full.length; i++) {
      await new Promise((r) => setTimeout(r, ms));
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.sender === 'bot') {
          return [
            ...prev.slice(0, -1),
            { sender: 'bot', text: last.text + full[i] },
          ];
        }
        return prev;
      });
      maybeScrollToBottom();
    }
  };

  const runCommand = (cmd: string) => {
    switch (cmd) {
      case '/help':
        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: 'Available commands:\n/help – list commands\n/clear – clear chat\n/reset – reset chat',
          },
        ]);
        break;

      case '/clear':
      case '/reset':
        setMessages([]);
        break;

      default:
        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: 'Unknown command. Try /help' },
        ]);
        break;
    }
  };

  return {
    messages,
    input,
    setInput,
    handleSend,
    isBotTyping,
    bottomRef,
    windowRef,
  };
}
