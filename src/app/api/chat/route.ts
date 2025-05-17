import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q")

  if (!q) {
    return NextResponse.json({ error: "Invalid query parameter" }, { status: 400 })
  }

  // Simulate a delay to show the typing indicator
  await new Promise((resolve) => setTimeout(resolve, 1000))

  switch (q.toLowerCase()) {
    case "hello":
      return NextResponse.json({ response: "Hello! How can I help you today?" })
    case "hi":
      return NextResponse.json({ response: "Hi there! How can I assist you with our vintage collection today?" })
    case "what is your name?":
      return NextResponse.json({ response: "I'm a chatbot built by MAS." })
    case "error":
      return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    default:
      return NextResponse.json({
        response:
          "Sorry, I didn't understand that. Can I help you with anything about our vintage clothing collection?",
      })
  }
}
