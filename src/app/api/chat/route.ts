import { NextRequest, NextResponse } from 'next/server';

const botResponses = [
  "Thanks for reaching out! How can I help you with your vintage clothing search today?",
  "We have a great selection of vintage pieces from the 70s and 80s in stock right now!",
  "Our store hours are 10am to 6pm Monday through Saturday, and 12pm to 5pm on Sundays.",
  "All items in our online store can be returned within 14 days of purchase.",
  "We source our vintage clothing from estate sales, thrift stores, and direct donations.",
  "Yes, we do offer international shipping! Rates vary depending on the destination.",
  "Our most popular category right now is vintage denim jackets from the 90s.",
  "We authenticate all of our designer vintage pieces before listing them.",
  "Feel free to visit our physical store located at 123 Vintage Lane, Chicago.",
  "We're currently running a 20% off promotion on all accessories!",
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const message = searchParams.get('message');
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message parameter is required' },
        { status: 400 }
      );
    }
    
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1500 + 500));
    
    let response;
    
    if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
      response = "Hello there! Welcome to Lost Girls Vintage. How can I help you today?";
    } else if (message.toLowerCase().includes('price') || message.toLowerCase().includes('cost')) {
      response = "Our vintage pieces range from $25 to $250 depending on the era, brand, and condition. Is there something specific you're looking for?";
    } else if (message.toLowerCase().includes('shipping')) {
      response = "We offer free shipping on orders over $75 within the US. International shipping starts at $15.";
    } else if (message.toLowerCase().includes('sale') || message.toLowerCase().includes('discount')) {
      response = "We're currently running a Spring Vintage sale with 15% off all items from the 1960s!";
    } else if (message.toLowerCase().includes('return') || message.toLowerCase().includes('refund')) {
      response = "We accept returns within 14 days of purchase. Items must be in original condition with tags attached. Store credit is also available for exchanges.";
    } else if (message.toLowerCase().includes('location') || message.toLowerCase().includes('address')) {
      response = "Our store is located at 123 Vintage Lane, Chicago, IL 60605. We're open Monday through Saturday from 10am to 6pm, and Sundays from 12pm to 5pm.";
    } else if (message.toLowerCase().includes('contact') || message.toLowerCase().includes('email') || message.toLowerCase().includes('phone')) {
      response = "You can reach our customer service team at support@lostgirlsvintage.com or call us at (555) 123-4567 during business hours.";
    } else {
      response = botResponses[Math.floor(Math.random() * botResponses.length)];
    }
    
    if (Math.random() < 0.1) {
      return NextResponse.json(
        { error: 'An unexpected error occurred' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ response });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}