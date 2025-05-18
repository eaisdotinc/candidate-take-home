'use client';

import { useState } from 'react';

interface Props {
  onSend: (text: string) => void;
  disabled: boolean;
}

export function MessageInput({ onSend, disabled }: Props) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input.trim());
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex mt-2">
      <input
        className="flex-grow border rounded p-2"
        value={input}
        onChange={e => setInput(e.target.value)}
        disabled={disabled}
        placeholder="Type a message..."
      />
      <button type="submit" className="ml-2 px-4 py-2 bg-black text-white rounded" disabled={disabled}>
        Send
      </button>
    </form>
  );
}
