"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
	{messages.map((msg, index) => (
	  <div
		key={index}
		className={`${styles.message} ${
		  msg.sender === "user"
			? styles.user
			: msg.sender === "bot"
			? styles.bot
			: styles.typing
		}`}
	  >
		{msg.text}
	  </div>
	))}
 const handleSend = async () => {
  const trimmedInput = input.trim();
  if (trimmedInput === "") return;

  // Add user's message
  setMessages((prev) => [...prev, { text: trimmedInput, sender: "user" }]);
  setInput("");

  // Show typing indicator
  setMessages((prev) => [...prev, { text: "Bot is typing...", sender: "typing" }]);

  // Add delay to make typing visible
  setTimeout(async () => {
    try {
      const res = await fetch(`/api/chat?q=${encodeURIComponent(trimmedInput)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Replace typing with bot response
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { text: data.response || "No response", sender: "bot" },
      ]);
    } catch (error) {
      // Replace typing with error message
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { text: "Sorry, something went wrong.", sender: "bot" },
      ]);
    }
  }, 1200); // 1.2 second delay
};


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Simple Chatbot</h1>

        <div className={styles.chatWindow}>
          {messages.map((msg, index) => (
            <div key={index} className={`${styles.message} ${styles[msg.sender]}`}>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.chatInput}>
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </main>
    </div>
  );
}
