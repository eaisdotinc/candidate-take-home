export const CHAT_RESPONSES = {
  HELLO: 'Hello! How can I help you today?',
  NAME_QUERY: "I'm a chatbot built by MAS.",
  DEFAULT: "Sorry, I didn't understand that.",
} as const;

export const CONFIDENCE_LEVELS = {
  HIGH: 1.0,
  MEDIUM: 0.7,
  LOW: 0.5,
} as const;

export const SOURCE_TYPES = {
  PREDEFINED: 'predefined',
  DYNAMIC: 'dynamic',
  EXTERNAL: 'external',
} as const;

export const ERROR_CODES = {
  INVALID_REQUEST: 'INVALID_REQUEST',
  PROCESSING_ERROR: 'PROCESSING_ERROR',
} as const;

export const ERROR_MESSAGES = {
  INVALID_REQUEST_BODY: 'Invalid request body',
  INVALID_QUERY_PARAM: 'Missing or invalid query parameter "q"',
  METHOD_NOT_ALLOWED: 'Method not allowed',
  PROCESSING_ERROR: 'Something went wrong',
} as const; 