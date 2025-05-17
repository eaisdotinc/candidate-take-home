import { NextApiRequest, NextApiResponse } from 'next';
import { ChatRequestBody, ChatResponseData, ChatApiResponse } from '@/server/types/api';
import { createApiResponse, CustomApiError, handleApiError, validateRequestBody } from '@/server/utils/api-utils';
import { ChatService } from '@/server/services/chat.service';
import { ChatValidator } from '@/server/validators/chat.validator';

// Type guard for request body validation
export function validateChatRequest(body: unknown): ChatRequestBody {
  const chatBody = body as ChatRequestBody;
  if (!(
    typeof chatBody === 'object' &&
    chatBody !== null &&
    typeof chatBody.message === 'string' &&
    chatBody.message.trim().length > 0 &&
    (chatBody.context === undefined ||
      (typeof chatBody.context === 'object' &&
        chatBody.context !== null))
  )) {
    throw new CustomApiError(
      'INVALID_REQUEST',
      'Invalid request body',
      { details: 'Request body validation failed' }
    );
  }
  return chatBody;
}

// Process chat message and generate response
export async function processChatMessage(message: string, context?: ChatRequestBody['context']): Promise<ChatResponseData> {
  const startTime = Date.now();
  const messageId = `msg_${Date.now()}`;
  const timestamp = new Date().toISOString();

  // Convert message to lowercase for case-insensitive matching
  const lowerMessage = message.toLowerCase();

  let responseText: string;
  let confidence = 1.0;
  let source = 'predefined';

  switch (lowerMessage) {
    case 'hello':
      responseText = 'Hello! How can I help you today?';
      break;
    case 'what is your name?':
      responseText = "I'm a chatbot built by MAS.";
      break;
    case 'error':
      throw new CustomApiError(
        'PROCESSING_ERROR',
        'Something went wrong',
        { originalError: 'Simulated error response' }
      );
    default:
      responseText = "Sorry, I didn't understand that.";
      confidence = 0.7; // Lower confidence for default response
      break;
  }

  return {
    message: responseText,
    messageId,
    timestamp,
    metadata: {
      confidence,
      source,
      context,
    },
  };
}

export default async function handler(
  req: NextApiRequest | any,
  res: NextApiResponse<ChatApiResponse> | any
) {
  const startTime = Date.now();
  const chatService = new ChatService();

  try {
    if (req.method === 'GET') {
      const message = ChatValidator.validateQueryMessage(req.query.q);
      const responseData = await chatService.processMessage(message);
      const apiResponse = createApiResponse<ChatResponseData>(responseData, undefined, {
        processingTime: Date.now() - startTime,
      });

      return res.status(200).json(apiResponse);
    } else if (req.method === 'POST') {
      const validatedBody = ChatValidator.validateRequest(req.body);
      const responseData = await chatService.processMessage(validatedBody.message, validatedBody.context);
      const apiResponse = createApiResponse<ChatResponseData>(responseData, undefined, {
        processingTime: Date.now() - startTime,
      });

      return res.status(200).json(apiResponse);
    } else {
      throw new CustomApiError(
        'INVALID_REQUEST',
        'Method not allowed'
      );
    }
  } catch (error) {
    const apiError = handleApiError(error);
    const errorResponse = createApiResponse<ChatResponseData>(undefined, apiError, {
      processingTime: Date.now() - startTime,
    });

    const statusCode = apiError.code === 'INVALID_REQUEST' ? 400 : 500;
    return res.status(statusCode).json(errorResponse);
  }
} 