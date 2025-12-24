/**
 * Vite API Plugin
 *
 * Provides a /api/generate endpoint that proxies requests to the Anthropic API.
 * This avoids CORS issues when calling the API from the browser.
 */

import type { Plugin, ViteDevServer } from 'vite';
import { loadEnv } from 'vite';

interface AnthropicRequest {
  apiKey?: string;
  model: string;
  maxTokens: number;
  system: string;
  messages: Array<{ role: string; content: string }>;
}

export function viteApiPlugin(): Plugin {
  let envApiKey: string | undefined;

  return {
    name: 'vite-api-plugin',
    config(_, { mode }) {
      // Load environment variables from .env file
      const env = loadEnv(mode, process.cwd(), '');
      envApiKey = env.VITE_ANTHROPIC_API_KEY;
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

        let requestData: AnthropicRequest;
        try {
          requestData = JSON.parse(body);
        } catch {
          res.statusCode = 400;
          res.end('Invalid JSON');
          return;
        }

        // Use API key from request, fall back to environment variable
        const apiKey = requestData.apiKey || envApiKey;

        if (!apiKey) {
          res.statusCode = 400;
          res.end('API key required. Set VITE_ANTHROPIC_API_KEY in .env or provide via UI.');
          return;
        }

        try {
          // Call Anthropic API
          const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': apiKey,
              'anthropic-version': '2023-06-01',
            },
            body: JSON.stringify({
              model: requestData.model || 'claude-opus-4-5-20251101',
              max_tokens: requestData.maxTokens || 4096,
              system: requestData.system,
              messages: requestData.messages,
            }),
          });

          if (!anthropicResponse.ok) {
            const errorText = await anthropicResponse.text();
            res.statusCode = anthropicResponse.status;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: errorText }));
            return;
          }

          const data = await anthropicResponse.json();
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify(data));
        } catch (error) {
          console.error('Anthropic API error:', error);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: String(error) }));
        }
      });
    },
  };
}

export default viteApiPlugin;
