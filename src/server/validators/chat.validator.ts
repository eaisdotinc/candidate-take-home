import { ChatRequestBody } from '@/server/types/api';
import { CustomApiError } from '@/server/utils/api-utils';
import { ERROR_CODES, ERROR_MESSAGES } from '@/server/constants/chat.constants';

export class ChatValidator {
  static validateRequest(body: unknown): ChatRequestBody {
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
        ERROR_CODES.INVALID_REQUEST,
        ERROR_MESSAGES.INVALID_REQUEST_BODY,
        { details: 'Request body validation failed' }
      );
    }
    return chatBody;
  }

  static validateQueryMessage(message: unknown): string {
    if (typeof message !== 'string') {
      throw new CustomApiError(
        ERROR_CODES.INVALID_REQUEST,
        ERROR_MESSAGES.INVALID_QUERY_PARAM
      );
    }
    return message;
  }
} 