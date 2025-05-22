import { Message } from "./chat";

export interface WelcomePrompt {
  messageContainerRef: React.RefObject<HTMLDivElement>;
  messages: Message[];
  setInputMessage: (message: string) => void;
  isPending: boolean;
  error: Error | null;
}