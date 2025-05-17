import { API_ENDPOINTS, API_METHODS, REQUEST_HEADERS, API_ERROR_MESSAGES } from '@/app/constants/api.constants';
import { ChatRequestBody, ChatApiResponse } from '../types/api';

export class ApiClientError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = 'ApiClientError';
  }
}

export async function fetchBotResponse(message: string): Promise<ChatApiResponse> {
  const startTime = Date.now();

  try {
    // First try POST request
    try {
      const requestBody: ChatRequestBody = {
        message,
        context: {
          sessionId: getSessionId(),
          metadata: {
            clientTimestamp: new Date().toISOString(),
            userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
          },
        },
      };

      const response = await fetch(API_ENDPOINTS.CHAT, {
        method: API_METHODS.POST,
        headers: {
          [REQUEST_HEADERS.CONTENT_TYPE]: REQUEST_HEADERS.CONTENT_TYPE_JSON,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json() as ChatApiResponse;

      if (!response.ok || !data.success) {
        throw new ApiClientError(
          data.error?.message || API_ERROR_MESSAGES.FAILED_TO_SEND,
          response.status
        );
      }

      return data;
    } catch (postError) {
      // If POST fails with 405 (Method Not Allowed), try GET
      if (postError instanceof ApiClientError && postError.statusCode === 405) {
        const response = await fetch(`${API_ENDPOINTS.CHAT}?q=${encodeURIComponent(message)}`, {
          method: API_METHODS.GET,
          headers: {
            [REQUEST_HEADERS.CONTENT_TYPE]: REQUEST_HEADERS.CONTENT_TYPE_JSON,
          },
        });

        const data = await response.json() as ChatApiResponse;

        if (!response.ok || !data.success) {
          throw new ApiClientError(
            data.error?.message || API_ERROR_MESSAGES.FAILED_TO_SEND,
            response.status
          );
        }

        return data;
      }
      throw postError;
    }
  } catch (error) {
    console.error('Error fetching bot response:', error);
    
    // Create a proper error response
    return {
      success: false,
      error: {
        code: error instanceof ApiClientError ? API_ERROR_MESSAGES.API_ERROR : API_ERROR_MESSAGES.UNKNOWN_ERROR,
        message: error instanceof Error ? error.message : API_ERROR_MESSAGES.UNKNOWN_ERROR,
      },
      metadata: {
        timestamp: new Date().toISOString(),
        requestId: `err_${Date.now()}`,
        processingTime: Date.now() - startTime,
      },
    };
  }
}

// Helper function to get or create a session ID
function getSessionId(): string {
  if (typeof window === 'undefined') {
    return `sess_${Date.now()}`;
  }

  const storageKey = 'chat_session_id';
  let sessionId = localStorage.getItem(storageKey);

  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(storageKey, sessionId);
  }

  return sessionId;
} 