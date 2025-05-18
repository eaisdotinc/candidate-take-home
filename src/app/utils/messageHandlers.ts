import { FormEvent } from 'react';
import { Message } from '../hooks/useMessages';

export const createUserMessage = (text: string): Message => ({
  id: Date.now().toString(),
  text,
  sender: 'user',
  timestamp: new Date(),
});

export const createBotMessage = (
  text: string,
  isError: boolean = false
): Message => ({
  id: (Date.now() + 1).toString(),
  text,
  sender: 'bot',
  timestamp: new Date(),
  error: isError
});

export const handleKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  submitHandler: (e: FormEvent) => void
) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    submitHandler(e);
  }
};