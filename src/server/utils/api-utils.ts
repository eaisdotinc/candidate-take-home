import { ApiResponse, ApiError, ApiMetadata } from '../types/api';

export class CustomApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'CustomApiError';
  }
}

export function createApiResponse<T>(
  data?: T,
  error?: ApiError,
  metadata?: Partial<ApiMetadata>
): ApiResponse<T> {
  const baseMetadata: ApiMetadata = {
    timestamp: new Date().toISOString(),
    requestId: generateRequestId(),
    ...metadata,
  };

  if (error) {
    return {
      success: false,
      error,
      metadata: baseMetadata,
    };
  }

  return {
    success: true,
    data,
    metadata: baseMetadata,
  };
}

export function handleApiError(error: unknown): ApiError {
  if (error instanceof CustomApiError) {
    return {
      code: error.code,
      message: error.message,
      details: error.details,
    };
  }

  if (error instanceof Error) {
    return {
      code: 'INTERNAL_SERVER_ERROR',
      message: error.message,
    };
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: 'An unexpected error occurred',
  };
}

function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function validateRequestBody<T>(
  body: unknown,
  validator: (body: unknown) => body is T
): T {
  if (!validator(body)) {
    throw new CustomApiError(
      'INVALID_REQUEST',
      'Invalid request body',
      { details: 'Request body validation failed' }
    );
  }
  return body;
} 