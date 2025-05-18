'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './ChatInterface.module.css';

type Message = {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
};



export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: generateId(),
            text: "Hi there! I'm your Lost Girls Vintage assistant. Ask me about vintage fashion!",
            isUser: false,
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isBotTyping, setIsBotTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isBotTyping]);

    function generateId() {
        return Math.random().toString(36).substring(2, 9);
    }

    const handleSend = async () => {
        if (!inputValue.trim() || isLoading) return;

        // Add user message immediately
        const userMessage: Message = {
            id: generateId(),
            text: inputValue,
            isUser: true,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);
        setIsBotTyping(true);

        try {
            // Simulate typing delay before making the request
            await new Promise(resolve => setTimeout(resolve, 500));

            const response = await fetch(`/api?q=${encodeURIComponent(inputValue)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store'
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            // Simulate typing delay before showing response
            await new Promise(resolve => setTimeout(resolve, 0+ 0));

            setMessages((prev) => [
                ...prev,
                {
                    id: generateId(),
                    text: data.response || "Interesting! Could you tell me more about what you're looking for?",
                    isUser: false,
                    timestamp: new Date(),
                },
            ]);
        } catch (err) {
            console.error('Chat error:', err);
            setMessages((prev) => [
                ...prev,
                {
                    id: generateId(),
                    text: "Sorry, I'm having trouble connecting. Please try your question again!",
                    isUser: false,
                    timestamp: new Date(),
                },
            ]);
        } finally {
            setIsLoading(false);
            setIsBotTyping(false);
        }
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.messagesContainer}>
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`${styles.message} ${message.isUser ? styles.userMessage : styles.botMessage}`}
                    >
                        <div className={styles.messageContent}>{message.text}</div>
                        <div className={styles.timestamp}>
                            {message.timestamp.toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                            }).toLowerCase()}
                        </div>
                    </div>
                ))}

                {/* Enhanced typing indicator */}
                {isBotTyping && (
                    <div className={`${styles.message} ${styles.botMessage}`}>
                        <div className={styles.typingContainer}>
                            <span className={styles.typingText}>Bot is typing</span>
                            <div className={styles.typingIndicator}>
                                <span className={styles.typingDot}></span>
                                <span className={styles.typingDot}></span>
                                <span className={styles.typingDot}></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className={styles.inputContainer}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about vintage fashion..."
                    disabled={isLoading}
                    aria-label="Type your message"
                />
                <button
                    onClick={handleSend}
                    disabled={isLoading || !inputValue.trim()}
                    aria-label="Send message"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}