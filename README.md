# Lost Girls Vintage Chatbot
A responsive chatbot interface for Lost Girls Vintage clothing store built with Next.js, React, and TypeScript.

## Overview
This project implements a conversational chatbot that helps customers interact with Lost Girls Vintage's support team. The chatbot handles common customer inquiries about products, returns, sizing, and store information.

## Features
- Responsive chat interface for desktop and mobile
- User and bot message bubbles
- "Bot is typing..." indicator
- Error handling with retry mechanism
- Clean, modern UI

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000] in your browser

## Project Structure

The main components are:
- `src/app/api/chat/route.ts` - API endpoint for chat responses
- `src/app/components/Chatbot/` - Chat interface components
- `src/lib/types.ts` - TypeScript type definitions

## Testing

Try sending messages like:
- "Hello" for a greeting
- "what is your name?" for return policy information
- "Error" to test error handling

## Implementation

This chatbot satisfies all requirements from the assigned tickets:
- Basic layout with chat window, input field, and send button
- User message display functionality
- API integration for bot responses
- Error handling and typing indicators

## Additional Implementation for Enhancement of Chatbot

- Automatic retry mechanism for failed API requests (up to 2 retries)
- Request timeout handling with 10-second limit to prevent hanging requests
- Specific error messages based on error type
- Error recovery UI with retry and dismiss options
- Auto-scrolling to latest messages for better user experience
- Responsive design that works well on both desktop and mobile devices
- Properly typed components with TypeScript for code quality
- Clean component architecture with separation of concerns