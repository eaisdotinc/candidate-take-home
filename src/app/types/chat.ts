// Message Types
export type MessageSender = 'user' | 'bot';

export interface Message {
  id: string;
  text: string;
  sender: MessageSender;
  timestamp: string;
  isError?: boolean;
  metadata?: {
    confidence?: number;
    source?: string;
    context?: Record<string, unknown>;
  };
}

// Component Props Types
export interface ChatWindowProps {
  messages: Message[];
  isTyping: boolean;
}

export interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isDisabled?: boolean;
  placeholder?: string;
  maxLength?: number;
}

// State Types
export interface ChatState {
  messages: Message[];
  isTyping: boolean;
  error: string | null;
  lastRequestId?: string;
  lastProcessingTime?: number;
}

// API Types
export interface ChatResponse {
  response: string;
  error?: string;
}

// Constants
export const DEFAULT_MAX_MESSAGE_LENGTH = 500; 