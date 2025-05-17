import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userMessage = searchParams.get("message");

  if (!userMessage) {
    return NextResponse.json(
      { error: "Message query parameter is required" },
      { status: 400 }
    );
  }

  // Simple canned responses based on keywords
  let botResponseText;
  const lowerCaseMessage = userMessage.toLowerCase();

  if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
    botResponseText =
      "Hello there! How can I help you with Lost Girls Vintage today?";
  } else if (lowerCaseMessage.includes("bye")) {
    botResponseText =
      "Goodbye! Feel free to reach out if you have more questions.";
  } else if (lowerCaseMessage.includes("hours")) {
    botResponseText = "Our store hours are 10 AM to 6 PM, Tuesday to Sunday.";
  } else if (lowerCaseMessage.includes("location")) {
    botResponseText = "We are located at 123 Vintage St, Fashion City.";
  } else if (lowerCaseMessage.includes("return policy")) {
    botResponseText =
      "Items can be returned within 14 days with a valid receipt, provided they are in their original condition.";
  } else {
    botResponseText = `Thanks for your message: \"${userMessage}\". A support agent will be with you shortly.`;
  }

  // Simulate API processing time
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 1000 + 500)
  );

  return NextResponse.json({ response: botResponseText });
}
