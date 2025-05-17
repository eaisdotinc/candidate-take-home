'use client';

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Box } from '@mui/material';
import { ChatHeader } from '@/components/ChatHeader';
import { ChatWindow } from '@/components/ChatWindow';
import { ChatInput } from '@/components/ChatInput';
import { sendUserMessageToBot } from '@/app/utils/message';
import { Message } from '@/types';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (text: string) => {
    setMessages(prev => [...prev, { id: uuidv4(), sender: 'user', text }]);
    setIsTyping(true);

    // Simulate bot typing
    setTimeout(async () => {
      try {
        const response = await sendUserMessageToBot(text);
        setMessages(prev => [...prev, { id: uuidv4(), sender: 'bot', text: response }]);
      } catch {
        setMessages(prev => [...prev, { id: uuidv4(), sender: 'error', text: 'Sorry, something went wrong.' }]);
      } finally {
        setIsTyping(false);
      }
    }, 700);
  };

  const displayMessages = isTyping
    ? [...messages, { id: 'typing', sender: 'typing', text: '' }]
    : messages;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#e5ddd5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        p: 2,
      }}
    >
      <Box
        sx={{
          width: 360,
          height: 'calc(100vh - 32px)',
          maxHeight: 640,
          bgcolor: '#fff',
          borderRadius: '24px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <ChatHeader name="Lost Girls Vintage Support" avatarUrl="/avatar.png" status="Online" />
        <ChatWindow messages={displayMessages} />
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </Box>
    </Box>
  );
}
