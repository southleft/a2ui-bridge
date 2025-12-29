/**
 * Vite API Plugin
 *
 * Provides a /api/generate endpoint that proxies requests to various LLM APIs.
 * Supports Anthropic (Claude), OpenAI (GPT), and Google (Gemini).
 * This avoids CORS issues when calling the APIs from the browser.
 */

import type { Plugin, ViteDevServer } from 'vite';
import { loadEnv } from 'vite';

type Provider = 'anthropic' | 'openai' | 'google';

interface GenerateRequest {
  provider: Provider;
  apiKey?: string;
  model?: string;
  maxTokens?: number;
  system: string;
  messages: Array<{ role: string; content: string }>;
}

interface EnvKeys {
  anthropic?: string;
  openai?: string;
  google?: string;
}

// Default models for each provider
const DEFAULT_MODELS: Record<Provider, string> = {
  anthropic: 'claude-sonnet-4-5-20250929',
  openai: 'gpt-5.2',
  google: 'gemini-3-flash',
};

export function viteApiPlugin(): Plugin {
  const envKeys: EnvKeys = {};

  return {
    name: 'vite-api-plugin',
    config(_, { mode }) {
      // Load environment variables from .env file
      const env = loadEnv(mode, process.cwd(), '');
      envKeys.anthropic = env.VITE_ANTHROPIC_API_KEY;
      envKeys.openai = env.VITE_OPENAI_API_KEY;
      envKeys.google = env.VITE_GOOGLE_API_KEY;
    },
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/api/generate', async (req, res) => {
        // Handle CORS preflight
        if (req.method === 'OPTIONS') {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method not allowed');
          return;
        }

        // Parse request body
        let body = '';
        for await (const chunk of req) {
          body += chunk;
        }

        let requestData: GenerateRequest;
        try {
          requestData = JSON.parse(body);
        } catch {
          res.statusCode = 400;
          res.end('Invalid JSON');
          return;
        }

        const provider = requestData.provider || 'anthropic';
        const apiKey = requestData.apiKey || envKeys[provider];

        if (!apiKey) {
          res.statusCode = 400;
          const envVar = {
            anthropic: 'VITE_ANTHROPIC_API_KEY',
            openai: 'VITE_OPENAI_API_KEY',
            google: 'VITE_GOOGLE_API_KEY',
          }[provider];
          res.end(`API key required for ${provider}. Set ${envVar} in .env file.`);
          return;
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
            res.statusCode = 400;
            res.end(`Unknown provider: ${provider}`);
            return;
          }

          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify(data));
        } catch (error) {
          console.error(`${provider} API error:`, error);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: String(error) }));
        }
      });

      // Endpoint to check which providers are configured
      server.middlewares.use('/api/providers', async (req, res) => {
        if (req.method === 'OPTIONS') {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          res.statusCode = 204;
          res.end();
          return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify({
          anthropic: !!envKeys.anthropic,
          openai: !!envKeys.openai,
          google: !!envKeys.google,
        }));
      });
    },
  };
}

/**
 * Call Anthropic Claude API
 */
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

/**
 * Call OpenAI GPT API
 */
async function callOpenAI(
  apiKey: string,
  model: string,
  maxTokens: number,
  system: string,
  messages: Array<{ role: string; content: string }>
) {
  // OpenAI expects system message in the messages array
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

  // Normalize response to match Anthropic format
  return {
    content: [{ text: data.choices?.[0]?.message?.content || '' }],
  };
}

/**
 * Call Google Gemini API
 */
async function callGoogle(
  apiKey: string,
  model: string,
  maxTokens: number,
  system: string,
  messages: Array<{ role: string; content: string }>
) {
  // Gemini uses a different message format
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

  // Normalize response to match Anthropic format
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return {
    content: [{ text }],
  };
}

export default viteApiPlugin;
