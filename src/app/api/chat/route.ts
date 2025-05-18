import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) {
    return new Response(JSON.stringify({ error: "Invalid query parameter" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  switch (q.toLowerCase()) {
    case "hello":
      return new Response(
        JSON.stringify({ response: "Hello! How can I help you today?" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    case "what is your name?":
      return new Response(
        JSON.stringify({ response: "I'm a chatbot built by MAS." }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    case "error":
      return new Response(
        JSON.stringify({ error: "Something went wrong" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    default:
      return new Response(
        JSON.stringify({ response: "Sorry, I didn't understand that." }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
  }
}