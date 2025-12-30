/**
 * Snippets Module
 *
 * Composable A2UI snippets for faster UI generation.
 */

export * from './types';
export { SnippetRegistry, snippetRegistry } from './registry';
export {
  allSnippets,
  initializeSnippetLibrary,
  getSnippetCatalog,
  getCompactSnippetCatalog,
} from './library';
export {
  SnippetComposer,
  composeFromInstructions,
  composeFromAIResponse,
} from './composer';
export {
  getSnippetPrompt,
  buildSnippetPrompt,
  clearPromptCache,
} from './prompt';
export {
  generateUIWithSnippets,
  composeQuick,
  type ChatMessage,
  type SnippetStreamCallbacks,
  type GenerationStats,
} from './ai-integration';
