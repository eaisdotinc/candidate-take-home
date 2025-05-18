'use client';

import { useMutation } from '@tanstack/react-query';
import { Message } from './../types/chat';

export interface BotResponse {
  response: string;
  error?: string;
}

/**
 * Chat service for interacting with the chat API
 */
export class ChatService {
  private static readonly API_URL = '/api/chat';
  
  /**
   * Fetches a response from the chat API
   * @param message The user's message
   * @returns Promise with the bot's response
   * @throws Error if the API request fails
   */
  static async getBotResponse(message: string): Promise<BotResponse> {
    try {
      const response = await fetch(`${this.API_URL}?message=${encodeURIComponent(message)}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.error || `Error: ${response.status}`;
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      return data as BotResponse;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }
}

/**
 * React Query hook for sending messages to the chat API
 */
export function useChatMessage() {
  return useMutation({
    mutationFn: async (message: string) => {
      return await ChatService.getBotResponse(message);
    }
  });
}

/**
 * Creates a new message object
 */
export function createMessage(content: string, sender: 'user' | 'bot'): Message {
  return {
    id: Date.now().toString(),
    content,
    sender,
    timestamp: new Date(),
  };
}