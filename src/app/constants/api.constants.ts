export const API_ENDPOINTS = {
  CHAT: '/api/chat',
  HEALTH: '/api/health',
} as const;

export const API_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

export const REQUEST_HEADERS = {
  CONTENT_TYPE: 'Content-Type',
  CONTENT_TYPE_JSON: 'application/json',
  AUTHORIZATION: 'Authorization',
} as const;

export const API_ERROR_MESSAGES = {
  FAILED_TO_SEND: 'Failed to send message',
  UNKNOWN_ERROR: 'Unknown error',
  API_ERROR: 'API error',
  NETWORK_ERROR: 'Network error',
  INVALID_RESPONSE: 'Invalid response from server',
} as const; 