import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get('q');

  if (!q) {
    return NextResponse.json({ error: 'Invalid query parameter' }, { status: 400 });
  }

  // Add a slight delay to simulate network latency
  await new Promise(resolve => setTimeout(resolve, 800));

  switch (q.toLowerCase()) {
    case 'hello':
      return NextResponse.json({ response: 'Hello! How can I help you today?' });
    case 'what is your name?':
    case 'what is your name':
      return NextResponse.json({ response: "I'm a chatbot built by MAS." });
    case 'error':
      return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    default:
      return NextResponse.json({ response: "Sorry, I didn't understand that." });
  }
}