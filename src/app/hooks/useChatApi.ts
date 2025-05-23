import { useState } from 'react';
import { ERROR_MESSAGES } from '../constants/messages';

interface ChatApiResponse {
  success: boolean;
  response?: string;
  error?: string;
}

export function useChatApi() {
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (message: string): Promise<ChatApiResponse> => {
    setIsTyping(true);

    try {
      const response = await fetch(`/api/chat?q=${encodeURIComponent(message)}`);
      const data = await response.json();

      setIsTyping(false);

      if (response.ok) {
        return { success: true, response: data.response };
      } else {
        return {
          success: false,
          error: data.error || ERROR_MESSAGES.SERVER_ERROR
        };
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setIsTyping(false);

      return {
        success: false,
        error: ERROR_MESSAGES.NETWORK_ERROR
      };
    }
  };

  return {
    isTyping,
    sendMessage
  };
}