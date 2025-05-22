// This function will be used for sending user messages to the bot and receiving responses.

export async function sendUserMessageToBot(userMessage: string): Promise<string> {
  
  if (!userMessage) {
    throw new Error('User message cannot be empty');
  }

  const res = await fetch(`/api/chat?q=${encodeURIComponent(userMessage)}`);

  if (!res.ok) {
    throw new Error('Failed to fetch bot response');
  }

  const data = await res.json();
  return data.response;
}