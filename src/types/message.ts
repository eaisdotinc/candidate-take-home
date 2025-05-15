export type Sender = 'user' | 'bot';

export interface Message {
  sender: Sender;
  text: string;
}
