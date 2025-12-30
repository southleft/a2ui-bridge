/**
 * Vercel Serverless Function: /api/generate
 * Proxies requests to LLM APIs (Anthropic, OpenAI, Google)
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

type Provider = 'anthropic' | 'openai' | 'google';

interface GenerateRequest {
  provider: Provider;
  apiKey?: string;
  model?: string;
  maxTokens?: number;
  system: string;
  messages: Array<{ role: string; content: string }>;
}

const DEFAULT_MODELS: Record<Provider, string> = {
  anthropic: 'claude-sonnet-4-5-20250929',
  openai: 'gpt-4o',
  google: 'gemini-2.0-flash-exp',
};

const ENV_KEYS: Record<Provider, string> = {
  anthropic: 'VITE_ANTHROPIC_API_KEY',
  openai: 'VITE_OPENAI_API_KEY',
  google: 'VITE_GOOGLE_API_KEY',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const requestData: GenerateRequest = req.body;
  const provider = requestData.provider || 'anthropic';
  const apiKey = requestData.apiKey || process.env[ENV_KEYS[provider]];

  if (!apiKey) {
    return res.status(400).json({
      error: `API key required for ${provider}. Set ${ENV_KEYS[provider]} in environment.`,
    });
  }

  try {
    const model = requestData.model || DEFAULT_MODELS[provider];
    const maxTokens = requestData.maxTokens || 4096;
    let data: unknown;

    if (provider === 'anthropic') {
      data = await callAnthropic(apiKey, model, maxTokens, requestData.system, requestData.messages);
    } else if (provider === 'openai') {
      data = await callOpenAI(apiKey, model, maxTokens, requestData.system, requestData.messages);
    } else if (provider === 'google') {
      data = await callGoogle(apiKey, model, maxTokens, requestData.system, requestData.messages);
    } else {
      return res.status(400).json({ error: `Unknown provider: ${provider}` });
    }

    return res.json(data);
  } catch (error) {
    console.error(`${provider} API error:`, error);
    return res.status(500).json({ error: String(error) });
  }
}

async function callAnthropic(
  apiKey: string,
  model: string,
  maxTokens: number,
  system: string,
  messages: Array<{ role: string; content: string }>
) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      system,
      messages,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Anthropic API error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

async function callOpenAI(
  apiKey: string,
  model: string,
  maxTokens: number,
  system: string,
  messages: Array<{ role: string; content: string }>
) {
  const openaiMessages = [
    { role: 'system', content: system },
    ...messages,
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      messages: openaiMessages,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return {
    content: [{ text: data.choices?.[0]?.message?.content || '' }],
  };
}

async function callGoogle(
  apiKey: string,
  model: string,
  maxTokens: number,
  system: string,
  messages: Array<{ role: string; content: string }>
) {
  const geminiContents = messages.map((msg) => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }));

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: geminiContents,
        generationConfig: {
          maxOutputTokens: maxTokens,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return {
    content: [{ text }],
  };
}
