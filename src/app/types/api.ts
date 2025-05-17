// Base API Types
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ApiMetadata {
  timestamp?: string;
  requestId?: string;
  processingTime?: number;
  [key: string]: unknown;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  metadata?: ApiMetadata;
}

// Chat-specific Types
export interface ChatRequestBody {
  message: string;
  context?: {
    sessionId?: string;
    userId?: string;
    metadata?: Record<string, unknown>;
  };
}

export interface ChatResponseData {
  message: string;
  messageId: string;
  timestamp: string;
  metadata?: {
    confidence?: number;
    source?: string;
    context?: Record<string, unknown>;
  };
}

// Chat API Response Type
export type ChatApiResponse = ApiResponse<ChatResponseData>; 