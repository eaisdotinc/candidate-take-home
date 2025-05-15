import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');

  if (!q) {
    return new Response(JSON.stringify({ error: 'Missing query parameter' }), { status: 400 });
  }

  const question = q.toLowerCase().trim();

  switch (question) {
    case 'hello':
    case 'hi':
    case 'hey':
      return Response.json({ response: 'Hey there! 😊 How’s it going?' });

    case 'how are you?':
    case 'how are you doing?':
      return Response.json({ response: "I'm doing great, thanks for asking! How about you?" });

    case 'i am fine':
    case 'i am good':
    case 'i am doing well':
      return Response.json({ response: "That's great to hear! 😊 What would you like to talk about?" });

    case 'what is your name?':
      return Response.json({ response: "I'm Midwest AI Solution's BOT — your friendly neighborhood assistant 🤖" });

    case 'what can you do?':
      return Response.json({ response: "I can chat with you, answer simple questions, or just keep you company!" });

    case 'thank you':
    case 'thanks':
      return Response.json({ response: "You're welcome! Always here if you need me 😊" });

    case 'bye':
    case 'goodbye':
    case 'see you':
      return Response.json({ response: "Bye for now! Talk to you soon 👋" });

    case 'what are you doing?':
      return Response.json({ response: "Just hanging out here, ready to chat with you!" });

    case 'can you help me?':
    case 'help':
      return Response.json({ response: "Of course! You can ask me questions ..." });

    case 'error':
      return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });

    default:
      return Response.json({ response: "Hmm... I’m not sure how to respond to that yet. Try asking me something else!" });
  }
}
