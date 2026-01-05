/**
 * AI Service for A2UI Generation
 *
 * Handles communication with LLM APIs to generate A2UI protocol messages.
 * Supports Anthropic (Claude), OpenAI (GPT), and Google (Gemini).
 */

import type { ServerToClientMessage } from '@a2ui-bridge/core';
import { A2UI_SYSTEM_PROMPT } from './system-prompt';
import { composeFromAIResponse } from './snippets/composer';
import { initializeSnippetLibrary } from './snippets/library';

const PROXY_URL = '/api/generate';
const PROVIDERS_URL = '/api/providers';

/**
 * Strip markdown code fences from AI responses
 * Handles ```json, ```typescript, ``` etc.
 */
function stripMarkdownCodeFences(text: string): string {
  // Remove opening code fences with optional language specifier
  let cleaned = text.replace(/```(?:json|typescript|javascript|ts|js)?\s*\n?/gi, '');
  // Remove closing code fences
  cleaned = cleaned.replace(/\n?```/g, '');
  return cleaned.trim();
}

export type Provider = 'anthropic' | 'openai' | 'google';

export interface ProviderInfo {
  id: Provider;
  name: string;
  model: string;
  configured: boolean;
}

export const PROVIDERS: Record<Provider, Omit<ProviderInfo, 'configured'>> = {
  anthropic: {
    id: 'anthropic',
    name: 'Claude',
    model: 'claude-sonnet-4-5-20250929',
  },
  openai: {
    id: 'openai',
    name: 'GPT',
    model: 'gpt-5.2',
  },
  google: {
    id: 'google',
    name: 'Gemini',
    model: 'gemini-3-flash',
  },
};

export interface StreamCallbacks {
  onMessage: (messages: ServerToClientMessage[]) => void;
  onChunk?: (text: string) => void;
  onComplete?: () => void;
  onError?: (error: Error) => void;
  signal?: AbortSignal; // For request cancellation
}

/**
 * Fetch which providers have API keys configured
 */
export async function getConfiguredProviders(): Promise<Record<Provider, boolean>> {
  try {
    const response = await fetch(PROVIDERS_URL);
    if (!response.ok) {
      return { anthropic: false, openai: false, google: false };
    }
    return response.json();
  } catch {
    return { anthropic: false, openai: false, google: false };
  }
}

/**
 * Check if any provider is configured
 */
export function isConfigured(): boolean {
  // This is a synchronous check for backward compatibility
  // Use getConfiguredProviders() for accurate async check
  return !!(
    import.meta.env.VITE_ANTHROPIC_API_KEY ||
    import.meta.env.VITE_OPENAI_API_KEY ||
    import.meta.env.VITE_GOOGLE_API_KEY
  );
}

// Ensure snippets are initialized for composition
let snippetsInitialized = false;
function ensureSnippetsInitialized(): void {
  if (!snippetsInitialized) {
    initializeSnippetLibrary();
    snippetsInitialized = true;
  }
}

/**
 * Try to parse as snippet composition format (object with "compose" array)
 * Returns A2UI messages if successful, null otherwise
 */
function tryParseSnippetComposition(text: string): ServerToClientMessage[] | null {
  try {
    // Strip markdown code fences before parsing
    const cleanedText = stripMarkdownCodeFences(text);

    // Try to find JSON object in the response
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    const parsed = JSON.parse(jsonMatch[0]);

    // Check if it's snippet composition format (has compose array)
    if (parsed && Array.isArray(parsed.compose)) {
      console.log('[A2UI] Detected snippet composition format, converting...');
      ensureSnippetsInitialized();

      const result = composeFromAIResponse(text);
      if (result.success && result.messages) {
        console.log('[A2UI] Snippet composition successful:', result.stats);
        return result.messages;
      } else {
        console.warn('[A2UI] Snippet composition failed:', result.error);
        return null;
      }
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Parse A2UI messages from AI response text
 * Supports both direct A2UI format and snippet composition format
 */
function parseA2UIMessages(text: string): ServerToClientMessage[] {
  // First, try to parse as snippet composition format
  const snippetMessages = tryParseSnippetComposition(text);
  if (snippetMessages && snippetMessages.length > 0) {
    return snippetMessages;
  }

  // Strip markdown code fences before parsing
  const cleanedText = stripMarkdownCodeFences(text);

  // Fall back to direct A2UI array format
  const jsonMatch = cleanedText.match(/\[[\s\S]*\]/);
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
  callbacks: StreamCallbacks,
  provider: Provider = 'anthropic',
  useMcpTools: boolean = false
): Promise<void> {
  try {
    const response = await fetch(PROXY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        provider,
        model: PROVIDERS[provider].model,
        maxTokens: 4096,
        system: A2UI_SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        useMcpTools, // Enable MCP tool use for component intelligence
      }),
      signal: callbacks.signal, // Support cancellation
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
      console.log('[A2UI] Raw response:', data);
      const text = data.content?.[0]?.text || data.text || JSON.stringify(data);
      console.log('[A2UI] Extracted text:', text.substring(0, 500));
      callbacks.onChunk?.(text);

      const messages = parseA2UIMessages(text);
      console.log('[A2UI] Parsed messages:', messages.length, 'messages');
      if (messages.length > 0) {
        callbacks.onMessage(messages);
      } else {
        console.warn('[A2UI] No messages parsed from response. AI may have returned invalid format.');
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
  getConfiguredProviders,
  PROVIDERS,
};
