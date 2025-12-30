/**
 * Vercel Edge Function: /api/providers
 * Returns which LLM providers have API keys configured
 */

export const config = {
  runtime: 'edge',
};

export default function handler() {
  return new Response(
    JSON.stringify({
      anthropic: !!process.env.VITE_ANTHROPIC_API_KEY,
      openai: !!process.env.VITE_OPENAI_API_KEY,
      google: !!process.env.VITE_GOOGLE_API_KEY,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}
