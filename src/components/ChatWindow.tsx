'use client';

import React, { useEffect, useRef } from 'react';
import { Box, CircularProgress, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Message } from '@/types';

const Window = styled(Box)({
  flex: 1,
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  overflowX: 'visible',
  padding: 16,
});

const MessageRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  marginBottom: theme.spacing(2),
}));

const Bubble = styled(Box)<{ sender: 'user' | 'bot' | 'error' }>(({ theme, sender }) => {
  const bg = sender === 'user' ? '#0b93f6' : '#e5e5ea';
  const color = sender === 'user' ? '#fff' : '#000';
  return {
    position: 'relative',
    alignSelf: sender === 'user' ? 'flex-end' : 'flex-start',
    maxWidth: '75%',
    padding: theme.spacing(1, 2),
    backgroundColor: bg,
    color,
    borderRadius: 20,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      [sender === 'user' ? 'right' : 'left']: -8,
      border: '8px solid transparent',
      borderTopColor: bg,
    },
  };
});

export const ChatWindow: React.FC<{ messages: Message[] }> = ({ messages }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Window ref={containerRef}>
      {messages.map((msg) => {
        if (msg.sender === 'typing') {
          return (
            <MessageRow key={msg.id}>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Bot is typing…
              </Typography>
            </MessageRow>
          );
        }

        const isUser = msg.sender === 'user';
        return (
          <MessageRow
            key={msg.id}
            sx={{ justifyContent: isUser ? 'flex-end' : 'flex-start' }}
          >
            {!isUser && <Avatar src="/avatar.png" sx={{ width: 24, height: 24, mr: 1 }} />}

            <Bubble sender={msg.sender}>{msg.text}</Bubble>

            {isUser && <Avatar src="/user-avatar.png" sx={{ width: 24, height: 24, ml: 1 }} />}
          </MessageRow>
        );
      })}
    </Window>
  );
};
