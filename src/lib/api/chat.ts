import z from 'zod';

const ChatSchema = z.object({ response: z.string().optional(), error: z.string().optional() });

export async function askBot(q: string, ms = 10_000) {
  const ctrl = new AbortController();
  const id   = setTimeout(() => ctrl.abort(), ms);

  try {
    const res = await fetch(`/api/chat?q=${encodeURIComponent(q)}`, { signal: ctrl.signal });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API ${res.status}: ${text}`);
    }

    const data = await res.json();
    const parsed = ChatSchema.parse(data);

    if (parsed.error) throw new Error(parsed.error);
    if (!parsed.response) throw new Error('Empty response');

    return parsed.response;
  } finally {
    clearTimeout(id);
  }
}
