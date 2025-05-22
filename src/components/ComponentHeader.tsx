'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box } from '@mui/material';
import MySvgIcon from './ChatBot';

interface ChatHeader {
  name: string;
  avatarUrl: string;
  status?: string;
}

export const ComponentHeader = ({ name, avatarUrl, status }: ChatHeader) => (
  <AppBar position="static" elevation={1} sx={{ bgcolor: '#e8baba', color: '#000' }}>
    <Toolbar
      variant="dense"
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        py: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: "10px" }}>
        {/* <Avatar
          src={avatarUrl}
          alt={name}
          sx={{ width: 32, height: 32, mr: 1 }}
        /> */}
        <MySvgIcon />
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