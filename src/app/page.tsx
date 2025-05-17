"use client";

import { useState } from "react";
import ChatInput from "@/components/ChatInput";
import MessageWindow from "@/components/MessageWindow";
import SettingsModal from "@/components/SettingsModal";
import { ChatHistory, ChatSettings, Message, MessageRole } from "@/types";

export default function Home() {
  const [history, setHistory] = useState<ChatHistory>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<ChatSettings>({
    temperature: 1,
    model: "gemini-1.5-flash",
    systemInstruction: "you are a helpful assistant",
  });
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async (message: string) => {
    setError(null);
    const newUserMessage: Message = {
      role: "user" as MessageRole,
      parts: [{ text: message }],
    };

    const updatedHistory = [...history, newUserMessage];
    setHistory(updatedHistory);
    setIsBotTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessage: message,
          history: updatedHistory,
          settings: settings,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError("Bot failed to respond. Please try again.");
        return;
      }

      const aiMessage: Message = {
        role: "model" as MessageRole,
        parts: [{ text: data.response }],
      };

      setHistory([...updatedHistory, aiMessage]);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsBotTyping(false);
    }
  };

  const handleOpenSettings = () => setIsSettingsOpen(true);
  const handleCloseSettings = () => setIsSettingsOpen(false);
  const handleSaveSettings = (newSettings: ChatSettings) => setSettings(newSettings);

  return (
    <div className="flex flex-col py-32">
      <MessageWindow history={history} />

      {isBotTyping && (
        <div className="text-gray-500 text-center my-2">Bot is typing...</div>
      )}

      {error && (
        <div className="text-red-500 text-center my-2">{error}</div>
      )}

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={handleCloseSettings}
        onSave={handleSaveSettings}
        currentSettings={settings}
      />

      <ChatInput onSend={handleSend} onOpenSettings={handleOpenSettings} />
    </div>
  );
}
