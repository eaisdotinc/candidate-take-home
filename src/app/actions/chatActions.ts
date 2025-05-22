import { Message } from '@/app/types/chat';

// Action Types
export const INITIALIZE_CHAT = 'chat/initialize' as const;
export const ADD_MESSAGE = 'chat/addMessage' as const;
export const SET_TYPING = 'chat/setTyping' as const;
export const SET_ERROR = 'chat/setError' as const;
export const SEND_MESSAGE = 'chat/sendMessage' as const;
export const SEND_MESSAGE_SUCCESS = 'chat/sendMessageSuccess' as const;
export const SEND_MESSAGE_ERROR = 'chat/sendMessageError' as const;

// Message payload type
export interface AddMessagePayload {
  text: string;
  sender: 'bot' | 'user';
  isError?: boolean;
}

// Action Creators
export const initializeChat = () => ({
  type: INITIALIZE_CHAT,
}) as const;

export const addMessage = (message: AddMessagePayload) => ({
  type: ADD_MESSAGE,
  payload: message,
}) as const;

export const setTyping = (isTyping: boolean) => ({
  type: SET_TYPING,
  payload: isTyping,
}) as const;

export const setError = (error: string | null) => ({
  type: SET_ERROR,
  payload: error,
}) as const;

export const sendMessage = (text: string) => ({
  type: SEND_MESSAGE,
  payload: text,
});

export const sendMessageSuccess = (response: string) => ({
  type: SEND_MESSAGE_SUCCESS,
  payload: response,
});

export const sendMessageError = (error: string) => ({
  type: SEND_MESSAGE_ERROR,
  payload: error,
});

// Action Types Union
export type ChatAction = 
  | ReturnType<typeof initializeChat>
  | ReturnType<typeof addMessage>
  | ReturnType<typeof setTyping>
  | ReturnType<typeof setError>
  | ReturnType<typeof sendMessage>
  | ReturnType<typeof sendMessageSuccess>
  | ReturnType<typeof sendMessageError>; 