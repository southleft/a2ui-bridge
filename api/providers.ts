/**
 * Vercel Serverless Function: /api/providers
 * Returns which LLM providers have API keys configured
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  return res.json({
    anthropic: !!process.env.VITE_ANTHROPIC_API_KEY,
    openai: !!process.env.VITE_OPENAI_API_KEY,
    google: !!process.env.VITE_GOOGLE_API_KEY,
  });
}
