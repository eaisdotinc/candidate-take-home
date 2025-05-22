import { ChatState, Message } from '@/app/types/chat';
import { ChatAction, INITIALIZE_CHAT, ADD_MESSAGE, SET_TYPING, SET_ERROR, AddMessagePayload } from '@/app/actions/chatActions';
import { fetchBotResponse } from '@/app/utils/api';
import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ChatApiResponse } from '@/app/types/api';

const WELCOME_MESSAGE = "Welcome to Lost Girls Vintage! How can I help you find the perfect vintage piece today?";

const initialState: ChatState = {
  messages: [],
  isTyping: false,
  error: null,
  lastRequestId: undefined,
  lastProcessingTime: undefined,
};

// Async thunk for sending messages
export const sendMessageThunk = createAsyncThunk<
  ChatApiResponse,
  string,
  {
    rejectValue: ChatApiResponse;
  }
>(
  'chat/sendMessage',
  async (message: string, { rejectWithValue }) => {
    try {
      const response = await fetchBotResponse(message);
      if (!response.success || !response.data) {
        return rejectWithValue(response);
      }
      return response;
    } catch (error) {
      const errorResponse: ChatApiResponse = {
        success: false,
        error: {
          code: 'UNKNOWN_ERROR',
          message: error instanceof Error ? error.message : 'An unknown error occurred',
        },
        metadata: {
          timestamp: new Date().toISOString(),
          requestId: `err_${Date.now()}`,
          processingTime: 0
        }
      };
      return rejectWithValue(errorResponse);
    }
  }
);

// Helper function to create a user message
const createUserMessage = (text: string): Message => ({
  id: `msg_${Date.now()}_user`,
  text,
  sender: 'user',
  timestamp: new Date().toISOString(),
});

// Helper function to create a bot message from API response
const createBotMessageFromResponse = (data: NonNullable<ChatApiResponse['data']>): Message => ({
  id: data.messageId,
  text: data.message,
  sender: 'bot',
  timestamp: data.timestamp,
  metadata: data.metadata,
});

// Helper function to create an error message
const createErrorMessage = (text: string): Message => ({
  id: `msg_${Date.now()}_error`,
  text,
  sender: 'bot',
  timestamp: new Date().toISOString(),
  isError: true,
});

// Type guard for ADD_MESSAGE action
function isAddMessageAction(action: ActionTypes): action is ChatAction & { type: typeof ADD_MESSAGE; payload: AddMessagePayload } {
  return action.type === ADD_MESSAGE;
}

// Type guard for SET_TYPING action
function isSetTypingAction(action: ActionTypes): action is ChatAction & { type: typeof SET_TYPING; payload: boolean } {
  return action.type === SET_TYPING;
}

// Type guard for SET_ERROR action
function isSetErrorAction(action: ActionTypes): action is ChatAction & { type: typeof SET_ERROR; payload: string | null } {
  return action.type === SET_ERROR;
}

type ActionTypes = ChatAction | PayloadAction<ChatApiResponse> | PayloadAction<unknown>;

// Reducer
export default function chatReducer(
  state = initialState,
  action: ActionTypes
): ChatState {
  switch (action.type) {
    case INITIALIZE_CHAT:
      return {
        ...state,
        messages: [createBotMessageFromResponse({
          message: WELCOME_MESSAGE,
          messageId: 'msg_welcome',
          timestamp: new Date().toISOString(),
          metadata: {}
        })],
      };

    case ADD_MESSAGE:
      if (isAddMessageAction(action)) {
        return {
          ...state,
          messages: [
            ...state.messages,
            createUserMessage(action.payload.text),
          ],
        };
      }
      return state;

    case SET_TYPING:
      if (isSetTypingAction(action)) {
        return {
          ...state,
          isTyping: action.payload,
        };
      }
      return state;

    case SET_ERROR:
      if (isSetErrorAction(action)) {
        return {
          ...state,
          error: action.payload,
        };
      }
      return state;

    case sendMessageThunk.pending.type:
      return {
        ...state,
        isTyping: true,
        error: null,
      };

    case sendMessageThunk.fulfilled.type: {
      const thunkAction = action as PayloadAction<ChatApiResponse>;
      const payload = thunkAction.payload;
      
      if (payload.success && payload.data) {
        return {
          ...state,
          isTyping: false,
          messages: [
            ...state.messages,
            createBotMessageFromResponse(payload.data)
          ],
          lastRequestId: payload.metadata?.requestId,
          lastProcessingTime: payload.metadata?.processingTime,
          error: null,
        };
      }
      
      // This case should never happen since we rejectWithValue for unsuccessful responses
      return {
        ...state,
        isTyping: false,
        error: payload.error?.message || 'Failed to get response',
        messages: [
          ...state.messages,
          createErrorMessage(payload.error?.message || 'Failed to get response')
        ],
      };
    }

    case sendMessageThunk.rejected.type: {
      const thunkAction = action as PayloadAction<ChatApiResponse>;
      const errorResponse = thunkAction.payload;
      const errorMessage = errorResponse?.error?.message || 'An unknown error occurred';
      
      return {
        ...state,
        isTyping: false,
        error: errorMessage,
        messages: [
          ...state.messages,
          createErrorMessage(errorMessage)
        ],
      };
    }

    default:
      return state;
  }
} 