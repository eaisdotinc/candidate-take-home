'use client';

import React, { useState, FormEvent } from 'react';
import { TextField, IconButton, InputAdornment, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface ChatInput {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ComponentInput =  ({ onSend, disabled }: ChatInput) =>{
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText('');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 1,
        bgcolor: '#fff',
        borderTop: '1px solid #ddd',
      }}
    >
      <TextField
        fullWidth
        placeholder="Ask me anything!"
        variant="outlined"
        size="small"
        disabled={disabled}
        value={text}
        onChange={(e) => setText(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="submit"
                color="primary"
                disabled={disabled || !text.trim()}
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            bgcolor: '#f0f0f0',
            borderRadius: '20px',
          },
        }}
      />
    </Box>
  );
};