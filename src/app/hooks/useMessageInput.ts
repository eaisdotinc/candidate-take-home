import { useState, ChangeEvent } from 'react';

export function useMessageInput() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const clearInput = () => {
    setInputValue('');
  };

  return {
    inputValue,
    handleInputChange,
    clearInput
  };
}
