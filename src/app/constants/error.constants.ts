export const ERROR_CODES = {
  INVALID_REQUEST: 'INVALID_REQUEST',
  PROCESSING_ERROR: 'PROCESSING_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
} as const;

export const ERROR_MESSAGES = {
  INVALID_REQUEST_BODY: 'Invalid request body',
  INVALID_QUERY_PARAM: 'Missing or invalid query parameter',
  METHOD_NOT_ALLOWED: 'Method not allowed',
  PROCESSING_ERROR: 'Something went wrong',
  NETWORK_ERROR: 'Network error occurred',
  UNKNOWN_ERROR: 'An unexpected error occurred'
} as const; 