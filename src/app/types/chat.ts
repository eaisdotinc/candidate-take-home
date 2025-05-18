export type MessageSender = 'user' | 'bot';

export interface Message {
  id: string;
  content: string;
  sender: MessageSender;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  error: string | null;
}