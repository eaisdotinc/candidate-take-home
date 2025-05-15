export enum MessageType {
  USER = 'user',
  BOT = 'bot',
}

export interface Message {
  id: string;
  text: string;
  type: MessageType;
  timestamp: Date;
}

export interface ChatResponse {
  response: string;
}