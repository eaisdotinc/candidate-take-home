export const CHAT_RESPONSES = {
  HELLO: 'Hello! How can I help you today?',
  NAME_QUERY: "I'm a chatbot built by MAS.",
  DEFAULT: "Sorry, I didn't understand that.",
  TITLE: 'Chat Assistant',
  INPUT_PLACEHOLDER: 'Type your message...'
} as const;


export const SOURCE_TYPES = {
  PREDEFINED: 'predefined',
  DYNAMIC: 'dynamic',
  EXTERNAL: 'external'
} as const; 