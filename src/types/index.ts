// Types setting for Sender
export type Sender = 'user' | 'bot' | 'error' | 'typing';

export interface Message {
  id: string;
  sender: Sender;
  text: string;
}