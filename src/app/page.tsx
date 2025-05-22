'use client';

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Box } from '@mui/material';
import { ComponentHeader } from '@/components/ComponentHeader';
import { ComponentWindow } from '@/components/ComponentWindow';
import { ComponentInput } from '@/components/ComponentInput';
import { sendUserMessageToBot } from '@/app/utils/message';
import { Message } from '@/types';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([{ id: '001', sender: 'bot', text: 'Your personal guide to Lost Girls Vintage — let’s find your next classic.' }]);
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
          width: 600,
          height: 'calc(100vh - 32px)',
          maxHeight: 800,
          bgcolor: '#c27676',
          borderRadius: '10px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <ComponentHeader name="Vintage Chat Assistant" avatarUrl="/avatar.png" status="Live" />
        <ComponentWindow messages={displayMessages} />
        <ComponentInput onSend={handleSend} disabled={isTyping} />
      </Box>
    </Box>
  );
}
