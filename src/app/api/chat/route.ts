import { NextRequest, NextResponse } from 'next/server';

// Define response types
interface SuccessResponse {
  response: string;
}

interface ErrorResponse {
  error: string;
}

type ApiResponse = SuccessResponse | ErrorResponse;

// Helper functions
const createSuccessResponse = (message: string): NextResponse<SuccessResponse> => {
  return NextResponse.json({ response: message });
};

const createErrorResponse = (message: string, status: number): NextResponse<ErrorResponse> => {
  return NextResponse.json({ error: message }, { status });
};

const simulateNetworkLatency = async (ms: number = 800) => {
  await new Promise(resolve => setTimeout(resolve, ms));
};

// Main handler
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get('q');

    if (!q) {
      return createErrorResponse('Invalid query parameter', 400);
    }

    // Add a slight delay to simulate network latency
    await simulateNetworkLatency();

    // Process the query
    return processQuery(q.toLowerCase());
  } catch (err) {
    console.error('Unexpected error in chat API:', err);
    return createErrorResponse('An unexpected error occurred', 500);
  }
}

// Query processor
function processQuery(query: string): NextResponse<ApiResponse> {
  switch (query) {
    case 'hello':
      return createSuccessResponse('Hello! How can I help you today?');

    case 'what is your name?':
    case 'what is your name':
      return createSuccessResponse("I'm a chatbot built by MAS.");

    case 'error':
      return createErrorResponse('Something went wrong', 500);

    default:
      return createSuccessResponse("Sorry, I didn't understand that.");
  }
}