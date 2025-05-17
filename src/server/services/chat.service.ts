import { ChatRequestBody, ChatResponseData } from '@/server/types/api';
import { CustomApiError } from '@/server/utils/api-utils';
import { CHAT_RESPONSES, CONFIDENCE_LEVELS, ERROR_CODES, ERROR_MESSAGES } from '@/server/constants/chat.constants';
import { ResponseFormatter } from '@/server/utils/response.utils';

export class ChatService {
  async processMessage(message: string, context?: ChatRequestBody['context']): Promise<ChatResponseData> {
    const messageId = `msg_${Date.now()}`;
    const timestamp = new Date().toISOString();

    // Convert message to lowercase for case-insensitive matching
    const lowerMessage = message.toLowerCase();

    let responseText: string;
    let confidence: number = CONFIDENCE_LEVELS.HIGH;
    let source = 'predefined';

    switch (lowerMessage) {
      case 'hello':
        responseText = CHAT_RESPONSES.HELLO;
        break;
      case 'what is your name?':
        responseText = CHAT_RESPONSES.NAME_QUERY;
        break;
      case 'error':
        throw new CustomApiError(
          ERROR_CODES.PROCESSING_ERROR,
          ERROR_MESSAGES.PROCESSING_ERROR,
          { originalError: 'Simulated error response' }
        );
      default:
        responseText = CHAT_RESPONSES.DEFAULT;
        confidence = CONFIDENCE_LEVELS.MEDIUM;
        break;
    }

    return ResponseFormatter.formatChatResponse(responseText, confidence, context);
  }
} 