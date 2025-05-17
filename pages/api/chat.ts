import type { NextApiRequest, NextApiResponse } from 'next'

import handler from '@/server/api/chat'

// just forwarding to my existing handler in server/api/chat.ts
export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return handler(req, res)
}