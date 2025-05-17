"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import styles from "./page.module.css"

type Message = {
  id: string
  text: string
  sender: "user" | "bot"
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputValue.trim()) return

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
    }

    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInputValue("")

    // Show typing indicator
    setIsTyping(true)

    try {
      // Fetch response from API
      const response = await fetch(`/api/chat?q=${encodeURIComponent(inputValue)}`)

      if (!response.ok) {
        throw new Error("API request failed")
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      // Add bot response to chat
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: "bot",
      }

      setMessages((prevMessages) => [...prevMessages, botMessage])
    } catch (error) {
      console.error("Error fetching response:", error)

      // Add error message to chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, something went wrong. Please try again.",
        sender: "bot",
      }

      setMessages((prevMessages) => [...prevMessages, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <main className={styles.container}>
      <div className={styles.chatHeader}>
        <h1>Lost Girls Vintage Support</h1>
      </div>

      <div className={styles.chatWindow}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${message.sender === "user" ? styles.userMessage : styles.botMessage}`}
          >
            {message.text}
          </div>
        ))}

        {isTyping && (
          <div className={`${styles.message} ${styles.botMessage} ${styles.typingIndicator}`}>
            <span>●</span>
            <span>●</span>
            <span>●</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className={styles.messageInput}
          disabled={isTyping}
        />
        <button type="submit" className={styles.sendButton} disabled={isTyping || !inputValue.trim()}>
          Send
        </button>
      </form>
    </main>
  )
}
