/**
 * Snippet AI Integration
 *
 * Integrates snippet composition with AI generation for faster UI creation.
 * Uses compact snippet prompts and composes responses into A2UI messages.
 */

import type { ServerToClientMessage } from '@a2ui-bridge/core';
import { getSnippetPrompt } from './prompt';
import { composeFromInstructions, composeFromAIResponse } from './composer';
import { initializeSnippetLibrary } from './library';
import type { AICompositionOutput } from './types';

const PROXY_URL = '/api/generate';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface SnippetStreamCallbacks {
  onMessage: (messages: ServerToClientMessage[]) => void;
  onChunk?: (text: string) => void;
  onComplete?: (stats: GenerationStats) => void;
  onError?: (error: Error) => void;
  signal?: AbortSignal;
}

export interface GenerationStats {
  mode: 'snippets' | 'fallback' | 'hybrid';
  snippetsUsed: number;
  customGenerated: number;
  totalComponents: number;
  responseTokensEstimate: number;
  timeMs: number;
}

// Ensure snippets are initialized
let initialized = false;
function ensureInitialized(): void {
  if (!initialized) {
    initializeSnippetLibrary();
    initialized = true;
  }
}

/**
 * Parse AI response as AICompositionOutput
 */
function parseCompositionOutput(text: string): AICompositionOutput | null {
  try {
    // Try to extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    const parsed = JSON.parse(jsonMatch[0]);

    // Validate it's a composition output (has compose array)
    if (parsed && Array.isArray(parsed.compose)) {
      return parsed as AICompositionOutput;
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Estimate tokens in a string (rough approximation)
 */
function estimateTokens(text: string): number {
  // Rough estimate: ~4 chars per token for JSON
  return Math.ceil(text.length / 4);
}

/**
 * Generate UI using snippet composition
 * Falls back to traditional A2UI if composition fails
 */
export async function generateUIWithSnippets(
  prompt: string,
  callbacks: SnippetStreamCallbacks,
  provider: 'anthropic' | 'openai' | 'google' = 'anthropic',
  conversationHistory: ChatMessage[] = []
): Promise<void> {
  ensureInitialized();

  const startTime = performance.now();
  let fullText = '';

  try {
    const snippetPrompt = getSnippetPrompt();

    // Build messages array with conversation history for context
    const messages: ChatMessage[] = [
      ...conversationHistory,
      { role: 'user', content: prompt },
    ];

    const response = await fetch(PROXY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        provider,
        model: provider === 'anthropic' ? 'claude-sonnet-4-5-20250929' : undefined,
        maxTokens: 2048, // Much smaller - snippets need fewer tokens
        system: snippetPrompt,
        messages,
      }),
      signal: callbacks.signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const contentType = response.headers.get('content-type');
    const isStreaming = contentType?.includes('text/event-stream');

    if (isStreaming && response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        callbacks.onChunk?.(chunk);

        // Try to compose early if we have complete JSON
        const compositionOutput = parseCompositionOutput(fullText);
        if (compositionOutput) {
          const result = composeFromInstructions(compositionOutput);
          if (result.success && result.messages) {
            callbacks.onMessage(result.messages);
          }
        }
      }
    } else {
      const data = await response.json();
      fullText = data.content?.[0]?.text || data.text || JSON.stringify(data);
      callbacks.onChunk?.(fullText);
    }

    // Final composition
    const compositionOutput = parseCompositionOutput(fullText);
    const endTime = performance.now();

    if (compositionOutput) {
      const result = composeFromInstructions(compositionOutput);

      if (result.success && result.messages) {
        callbacks.onMessage(result.messages);
        callbacks.onComplete?.({
          mode: result.stats?.customGenerated ? 'hybrid' : 'snippets',
          snippetsUsed: result.stats?.snippetsUsed || 0,
          customGenerated: result.stats?.customGenerated || 0,
          totalComponents: result.stats?.totalComponents || 0,
          responseTokensEstimate: estimateTokens(fullText),
          timeMs: endTime - startTime,
        });
        return;
      }
    }

    // Fallback: try to parse as direct A2UI
    const fallbackResult = composeFromAIResponse(fullText);
    if (fallbackResult.success && fallbackResult.messages) {
      callbacks.onMessage(fallbackResult.messages);
      callbacks.onComplete?.({
        mode: 'fallback',
        snippetsUsed: 0,
        customGenerated: 1,
        totalComponents: fallbackResult.stats?.totalComponents || 0,
        responseTokensEstimate: estimateTokens(fullText),
        timeMs: endTime - startTime,
      });
      return;
    }

    // If all else fails, try direct JSON parse as A2UI array
    try {
      const jsonMatch = fullText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const messages = JSON.parse(jsonMatch[0]) as ServerToClientMessage[];
        callbacks.onMessage(messages);
        callbacks.onComplete?.({
          mode: 'fallback',
          snippetsUsed: 0,
          customGenerated: 0,
          totalComponents: 0,
          responseTokensEstimate: estimateTokens(fullText),
          timeMs: endTime - startTime,
        });
        return;
      }
    } catch {
      // Ignore parse errors
    }

    throw new Error('Failed to parse AI response as snippets or A2UI');
  } catch (error) {
    callbacks.onError?.(error instanceof Error ? error : new Error(String(error)));
  }
}

/**
 * Quick generation from structured input (no AI call)
 * Useful for testing or when you already know what snippets to use
 */
export function composeQuick(
  composition: AICompositionOutput,
  surfaceId: string = '@default'
): { messages: ServerToClientMessage[]; stats: GenerationStats } | { error: string } {
  ensureInitialized();

  const startTime = performance.now();
  const result = composeFromInstructions(composition, surfaceId);
  const endTime = performance.now();

  if (result.success && result.messages) {
    return {
      messages: result.messages,
      stats: {
        mode: result.stats?.customGenerated ? 'hybrid' : 'snippets',
        snippetsUsed: result.stats?.snippetsUsed || 0,
        customGenerated: result.stats?.customGenerated || 0,
        totalComponents: result.stats?.totalComponents || 0,
        responseTokensEstimate: 0, // No AI call
        timeMs: endTime - startTime,
      },
    };
  }

  return { error: result.error || 'Composition failed' };
}

export default {
  generateUIWithSnippets,
  composeQuick,
};
