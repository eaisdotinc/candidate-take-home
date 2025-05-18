export async function getBotResponse(userMessage: string): Promise<string> {
  try {
    const lower = userMessage.trim().toLowerCase();

    if (["hi", "hello", "hey"].includes(lower)) {
      return "👋 Hello! Welcome to Lost Girls Vintage!";
    }

    if (lower.includes("how are you")) {
      return "I'm just a bot, but I'm here to help! 😊";
    }

    if (lower.includes("help")) {
      return "Sure! You can ask about vintage items, store hours, or shipping.";
    }

    if (lower.includes("denim")) {
      return "Yes! We have vintage Levi’s, Wrangler, and more in our denim collection.";
    }

    // Fallback if no match
    return `🤔 I'm not sure how to respond to that. Try asking about our vintage items!`;
  } catch (error) {
    return "❌ Sorry, I couldn’t process your request.";
  }
}
