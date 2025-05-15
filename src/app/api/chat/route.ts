import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const message = searchParams.get('message');

  if (!message) {
    return NextResponse.json(
      { error: 'Message parameter is required' },
      { status: 400 }
    );
  }

  // Add a slight delay to simulate processing
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simple response logic based on message content
  let response = '';
  const messageLower = message.toLowerCase();

  // Check for exact matches first (original cases)
  if (messageLower === 'error') {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  } 
  // Then check for partial matches
  else if (messageLower.includes('hello') || messageLower.includes('hi')) {
    response = 'Hello! How can I help you with your vintage clothing needs today?';
  } else if (messageLower.includes('your name')) {
    response = "I'm a chatbot, my name is Lost Girl Vintage Support.";
  } else if (messageLower.includes('hours') || messageLower.includes('open')) {
    response = 'Our store is open Monday-Saturday from 10am to 7pm, and Sunday from 12pm to 5pm.';
  } else {
    // Default case from original
    response = "Sorry, I didn't understand that.";
  }

  return NextResponse.json({ response });
}