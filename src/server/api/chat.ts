import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query;

  if (typeof q !== 'string') {
    return res.status(400).json({ error: 'Invalid query parameter' });
  }

  switch (q.toLowerCase()) {
    case 'hello':
      return res.status(200).json({ response: 'Hello! How can I help you today?' });
    case 'what is your name?':
      return res.status(200).json({ response: "I'm a chatbot built by [Your Company]." });
    case 'error':
      return res.status(500).json({ error: 'Something went wrong' });
    default:
      return res.status(200).json({ response: "Sorry, I didn't understand that." });
  }
}