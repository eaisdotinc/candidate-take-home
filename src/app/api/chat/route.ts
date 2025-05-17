// moved the api to 'server/chat' to '/api/chat/route.ts' in order for nextjs to detect this endpoint

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (!q) {
    return NextResponse.json({ error: 'Invalid query parameter' }, { status: 400 });
  }

  // delay of 1 sec to show "typing..."
  await new Promise(resolve => setTimeout(resolve, 1000));

  switch (q.toLowerCase()) {
    case 'hello':
      return NextResponse.json({ response: 'Hello! How can I help you today?' } , { status : 200 });
    case 'what is your name?':
      return NextResponse.json({ response: "I'm a chatbot built by MAS." } , { status : 200 });
    case 'error':
      return NextResponse.json({ error: 'Something went wrong' } , { status : 500 });
    default:
      return NextResponse.json({ response: "Sorry, I didn't understand that." } , { status : 200 });
  }
}
