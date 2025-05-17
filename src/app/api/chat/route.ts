import { NextRequest, NextResponse } from "next/server";

const GEMINI_MODEL_NAME = "gemini-2.0-flash";
const GEMINI_API_BASE_URL =
  "https://generativelanguage.googleapis.com/v1beta/models";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userMessage = searchParams.get("message");

  if (!userMessage) {
    return NextResponse.json(
      { error: "Message query parameter is required" },
      { status: 400 }
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("Gemini API key is not configured in environment variables.");
    return NextResponse.json(
      {
        error: "AI service not configured.",
        details: "Admin: API key missing.",
      },
      { status: 500 }
    );
  }

  try {
    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [{ text: userMessage }],
        },
      ],
      systemInstruction: {
        parts: [
          {
            text: "You are a friendly and helpful chatbot for Lost Girls Vintage, a retail store that sells vintage clothing. Assist users with their inquiries about products, orders, and support with a cheerful and vintage-loving personality.",
          },
        ],
      },
    };

    const fullApiUrl = `${GEMINI_API_BASE_URL}/${GEMINI_MODEL_NAME}:generateContent?key=${apiKey}`;

    const geminiResponse = await fetch(fullApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await geminiResponse.json();

    if (!geminiResponse.ok) {
      console.error("Gemini API Error Response:", responseData);
      const errorDetails =
        responseData.error?.message ||
        "Failed to get a valid response from AI service.";
      return NextResponse.json(
        { error: "AI service request failed.", details: errorDetails },
        { status: geminiResponse.status }
      );
    }

    const botResponseText =
      responseData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!botResponseText) {
      console.error(
        "Could not extract text from Gemini response:",
        responseData
      );
      return NextResponse.json(
        { error: "AI service returned an unexpected response format." },
        { status: 500 }
      );
    }

    return NextResponse.json({ response: botResponseText });
  } catch (error: unknown) {
    console.error("Error calling Gemini API:", error);

    if (error instanceof Error && error.cause) {
      console.error("Fetch error cause:", error.cause);
    }
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      {
        error: "An unexpected error occurred while contacting the AI service.",
        details: message,
      },
      { status: 500 }
    );
  }
}
