"use client";

import { useState } from "react";
import ChatInput from "./ChatInput";
import MessageWindow from "./MessageWindow";
import { Message, MessageRole } from "@/types";

export default function ChatContainer() {
  const [history, setHistory] = useState<Message[]>([
    {
      role: "model" as MessageRole,
      parts: [{ text: "Hi there! How can I help you today?" }],
    },
  ]);

  const handleSend = (message: string) => {
    const userMessage: Message = {
      role: "user" as MessageRole,
      parts: [{ text: message }],
    };

    // Append only user message for now. Bot response logic can be added later.
    setHistory((prev) => [...prev, userMessage]);
  };

  const handleOpenSettings = () => {
    console.log("Settings opened");
    // Placeholder: settings modal logic can be integrated here
  };

  return (
    <div className="flex flex-col h-screen">
      <MessageWindow history={history} />
      <ChatInput onSend={handleSend} onOpenSettings={handleOpenSettings} />
    </div>
  );
}
