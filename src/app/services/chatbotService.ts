export async function getBotResponse(userMessage: string): Promise<string> {
  try {
    const res = await fetch(`/api/chat?q=${encodeURIComponent(userMessage)}`);
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return data.response;
  } catch (error) {
    return "❌ Sorry, I couldn’t process your request.";
  }
}
