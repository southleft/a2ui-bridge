/**
 * AI Service for A2UI Generation
 *
 * Handles communication with Claude API to generate A2UI protocol messages.
 * API key is configured via VITE_ANTHROPIC_API_KEY environment variable.
 */

import type { ServerToClientMessage } from '@a2ui-bridge/core';
import { A2UI_SYSTEM_PROMPT } from './system-prompt';

const PROXY_URL = '/api/generate';

export interface StreamCallbacks {
  onMessage: (messages: ServerToClientMessage[]) => void;
  onChunk?: (text: string) => void;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Check if API is configured via environment variable
 */
export function isConfigured(): boolean {
  return !!import.meta.env.VITE_ANTHROPIC_API_KEY;
}

/**
 * Parse A2UI messages from AI response text
 */
function parseA2UIMessages(text: string): ServerToClientMessage[] {
  // Try to find JSON array in the response
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    console.warn('No JSON array found in response');
    return [];
  }

  try {
    const parsed = JSON.parse(jsonMatch[0]);
    if (!Array.isArray(parsed)) {
      console.warn('Parsed result is not an array');
      return [];
    }
    return parsed as ServerToClientMessage[];
  } catch (e) {
    console.error('Failed to parse A2UI messages:', e);
    return [];
  }
}

/**
 * Generate A2UI messages from a user prompt
 * Streams the response and calls callbacks as data arrives
 */
export async function generateUI(
  prompt: string,
  callbacks: StreamCallbacks
): Promise<void> {
  if (!isConfigured()) {
    callbacks.onError?.(new Error('API key not configured. Set VITE_ANTHROPIC_API_KEY in .env file.'));
    return;
  }

  try {
    const response = await fetch(PROXY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5-20251101',
        maxTokens: 4096,
        system: A2UI_SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    // Check if streaming response
    const contentType = response.headers.get('content-type');
    const isStreaming = contentType?.includes('text/event-stream');

    if (isStreaming && response.body) {
      // Handle streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        callbacks.onChunk?.(chunk);

        // Try to parse intermediate messages
        const messages = parseA2UIMessages(fullText);
        if (messages.length > 0) {
          callbacks.onMessage(messages);
        }
      }

      // Final parse
      const finalMessages = parseA2UIMessages(fullText);
      if (finalMessages.length > 0) {
        callbacks.onMessage(finalMessages);
      }
    } else {
      // Handle non-streaming response
      const data = await response.json();
      const text = data.content?.[0]?.text || data.text || JSON.stringify(data);
      callbacks.onChunk?.(text);

      const messages = parseA2UIMessages(text);
      if (messages.length > 0) {
        callbacks.onMessage(messages);
      }
    }

    callbacks.onComplete?.();
  } catch (error) {
    callbacks.onError?.(error instanceof Error ? error : new Error(String(error)));
  }
}

export default {
  generateUI,
  isConfigured,
};
