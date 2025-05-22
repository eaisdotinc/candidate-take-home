'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box } from '@mui/material';

interface ChatHeaderProps {
  name: string;
  avatarUrl: string;
  status?: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  name,
  avatarUrl,
  status,
}) => (
  <AppBar position="static" elevation={1} sx={{ bgcolor: '#fff', color: '#000' }}>
    <Toolbar
      variant="dense"
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        py: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          src={avatarUrl}
          alt={name}
          sx={{ width: 32, height: 32, mr: 1 }}
        />
        <Typography variant="subtitle1">{name}</Typography>
      </Box>

      {status && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 0.5,
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              bgcolor: 'green',
              borderRadius: '50%',
              mr: 0.5,
            }}
          />
          <Typography variant="caption" color="text.secondary">
            {status}
          </Typography>
        </Box>
      )}
    </Toolbar>
  </AppBar>
);