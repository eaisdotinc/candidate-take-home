import { useState, useRef, useEffect } from 'react';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Custom hook for managing chat messages
export function useChatMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat window whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const clearInput = () => {
    setInputValue('');
  };

  return {
    messages,
    inputValue,
    messagesEndRef,
    addMessage,
    handleInputChange,
    clearInput
  };
}

// Custom hook for API calls
export function useChatApi() {
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (message: string): Promise<{ success: boolean; response?: string; error?: string }> => {
    // Start typing indicator
    setIsTyping(true);

    try {
      // Fetch response from API
      const response = await fetch(`/api/chat?q=${encodeURIComponent(message)}`);
      const data = await response.json();

      // Stop typing indicator
      setIsTyping(false);

      if (response.ok) {
        return { success: true, response: data.response };
      } else {
        return {
          success: false,
          error: data.error || "Sorry, something went wrong. Please try again later."
        };
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Stop typing indicator
      setIsTyping(false);

      return {
        success: false,
        error: "Sorry, I couldn't connect to the server. Please check your internet connection."
      };
    }
  };

  return {
    isTyping,
    sendMessage
  };
}