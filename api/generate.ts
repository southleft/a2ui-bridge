/**
 * Vercel Edge Function: /api/generate
 * Proxies requests to LLM APIs (Anthropic, OpenAI, Google)
 */

export const config = {
  runtime: 'edge',
};

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

export default async function handler(request: Request) {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const requestData: GenerateRequest = await request.json();
  const provider = requestData.provider || 'anthropic';
  const apiKey = requestData.apiKey || process.env[ENV_KEYS[provider]];

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: `API key required for ${provider}. Set ${ENV_KEYS[provider]} in environment.`,
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
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
      return new Response(JSON.stringify({ error: `Unknown provider: ${provider}` }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error(`${provider} API error:`, error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
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
