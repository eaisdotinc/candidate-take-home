import { NextRequest, NextResponse } from 'next/server';
import { ChatApiResponse } from '@/app/types/api';
import { processChatMessage, validateChatRequest } from '@/server/api/chat';
import { createApiResponse, CustomApiError, handleApiError } from '@/app/utils/api-utils';

export async function GET(request: NextRequest) {
  const startTime = Date.now();

  try {
    const { searchParams } = new URL(request.url);
    const message = searchParams.get('q');

    if (!message) {
      throw new CustomApiError(
        'INVALID_REQUEST',
        'Missing query parameter "q"'
      );
    }

    const responseData = await processChatMessage(message);
    const apiResponse = createApiResponse(responseData, undefined, {
      processingTime: Date.now() - startTime,
    });

    return NextResponse.json(apiResponse);
  } catch (error) {
    const apiError = handleApiError(error);
    const errorResponse = createApiResponse(undefined, apiError, {
      processingTime: Date.now() - startTime,
    });

    const statusCode = apiError.code === 'INVALID_REQUEST' ? 400 : 500;
    return NextResponse.json(errorResponse, { status: statusCode });
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const body = await request.json();
    const validatedBody = validateChatRequest(body);

    const responseData = await processChatMessage(validatedBody.message, validatedBody.context);
    const apiResponse = createApiResponse(responseData, undefined, {
      processingTime: Date.now() - startTime,
    });

    return NextResponse.json(apiResponse);
  } catch (error) {
    const apiError = handleApiError(error);
    const errorResponse = createApiResponse(undefined, apiError, {
      processingTime: Date.now() - startTime,
    });

    const statusCode = apiError.code === 'INVALID_REQUEST' ? 400 : 500;
    return NextResponse.json(errorResponse, { status: statusCode });
  }
} 