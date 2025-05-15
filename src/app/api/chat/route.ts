import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Get the message from the URL query parameters
  const searchParams = request.nextUrl.searchParams;
  const message = searchParams.get('message') || '';
  
  // Simulate processing time (between 500ms and 1.5s)
  const delay = Math.floor(Math.random() * 1000) + 500;
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // Simulate an error occasionally (for testing purposes)
  // If the message contains "error" or "fail", we'll simulate an error
  if (message.toLowerCase().includes('error') || message.toLowerCase().includes('fail')) {
    return new NextResponse(null, {
      status: 500,
      statusText: 'Internal Server Error'
    });
  }
  
  // Generate a dummy response based on the user's message
  let response = '';
  
  if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
    response = 'Hello there! How can I assist you today?';
  } else if (message.toLowerCase().includes('help')) {
    response = 'I\'m here to help! What do you need assistance with?';
  } else if (message.toLowerCase().includes('weather')) {
    response = 'I\'m sorry, I don\'t have access to real-time weather data. This is just a demo.';
  } else if (message.toLowerCase().includes('name')) {
    response = 'I\'m a demo chatbot created for this project.';
  } else if (message.toLowerCase().includes('thank')) {
    response = 'You\'re welcome! Is there anything else I can help with?';
  } else if (message.toLowerCase().includes('bye') || message.toLowerCase().includes('goodbye')) {
    response = 'Goodbye! Have a great day!';
  } else {
    // Default responses for any other input
    const defaultResponses = [
      'Interesting point! Can you tell me more?',
      'I understand. How else can I assist you?',
      'Thanks for sharing that information.',
      'That\'s a good question. In this demo, I can only provide basic responses.',
      'I see what you mean. Is there anything specific you\'d like to know?'
    ];
    
    // Select a random default response
    const randomIndex = Math.floor(Math.random() * defaultResponses.length);
    response = defaultResponses[randomIndex];
  }
  
  return NextResponse.json({ 
    message: response,
    timestamp: new Date().toISOString()
  });
} 
