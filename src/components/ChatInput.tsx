import React from "react";
import styles from "../app/ChatPage.module.css";

const CameraIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
    <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm4 4a2 2 0 104 0 2 2 0 00-4 0zM4 18a2 2 0 002 2h8a2 2 0 002-2V6h-2v10H6V6H4v12z"></path>
  </svg>
);

const PaperclipIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
    <path
      fillRule="evenodd"
      d="M7.03 3.03a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L11.586 10 7.03 5.464A1 1 0 017.03 3.03zm-3.06 9.616a1 1 0 011.414-1.414l4.95-4.95a2.5 2.5 0 113.536 3.536l-4.95 4.95a1 1 0 01-1.414-1.414l4.243-4.243a.5.5 0 10-.707-.707L6.22 12.65a2.5 2.5 0 003.536 3.535l4.95-4.95a1 1 0 111.414 1.414l-4.95 4.95a4.5 4.5 0 01-6.364-6.364l4.95-4.95a1 1 0 011.414 1.414L5.378 9.622a2.5 2.5 0 000 3.536.5.5 0 01-.707.707z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 16.571V11.5a1 1 0 011-1h.094a1 1 0 01.866.503l1.063 2.126 5.169-1.476A1 1 0 0017.894 10L10.894 2.553zM10 14.531V12.5h-.094a1 1 0 01-.866-.503L8 9.87V15.42a1 1 0 00.212.628l1.788-3.577zM11 12.5h2.106l-3.75 1.071L11 12.5z"></path>
  </svg>
);

interface ChatInputProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  isBotTyping: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  onInputChange,
  onSubmit,
  isBotTyping,
}) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onInputChange(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleTextareaKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  return (
    <div className={styles.chatInputContainer}>
      <form
        className={styles.chatInputForm}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
          if (textareaRef.current) textareaRef.current.style.height = "auto";
        }}
      >
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={handleTextareaChange}
          onKeyDown={handleTextareaKeyDown}
          placeholder="Reply to  Lost Girls Vintage AI..."
          className={styles.chatInputTextarea}
          disabled={isBotTyping}
          rows={1}
        />
        <div className={styles.chatInputActions}>
          <div className={styles.chatInputIconsLeft}>
            <button
              type="button"
              className={styles.chatInputIconButton}
              aria-label="Attach image"
            >
              <CameraIcon />
            </button>
            <button
              type="button"
              className={styles.chatInputIconButton}
              aria-label="Attach file"
            >
              <PaperclipIcon />
            </button>
          </div>
          <button
            type="submit"
            className={styles.chatInputIconButton}
            aria-label="Send message"
            disabled={isBotTyping || !inputValue.trim()}
          >
            <SendIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
