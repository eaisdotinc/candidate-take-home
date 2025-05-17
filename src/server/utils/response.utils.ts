import { ChatResponseData, ChatRequestBody } from '@/server/types/api';
import { SOURCE_TYPES } from '@/server/constants/chat.constants';

export class ResponseFormatter {
  static formatChatResponse(
    message: string,
    confidence: number,
    context?: ChatRequestBody['context']
  ): ChatResponseData {
    return {
      message,
      messageId: `msg_${Date.now()}`,
      timestamp: new Date().toISOString(),
      metadata: {
        confidence,
        source: SOURCE_TYPES.PREDEFINED,
        context,
      },
    };
  }
} 