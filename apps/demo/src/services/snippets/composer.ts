/**
 * Snippet Composer
 *
 * Takes AI composition instructions and generates valid A2UI messages.
 * This is the bridge between AI's snippet selections and the A2UI protocol.
 */

import type { ServerToClientMessage } from '@a2ui-bridge/core';
import { snippetRegistry } from './registry';
import type {
  AICompositionOutput,
  CompositionResult,
  CompositionInstruction,
  GenerationInstruction,
  Snippet,
  SnippetComponent,
} from './types';

/**
 * Generate a unique ID for component instances
 */
function generateId(prefix: string, index: number): string {
  return `${prefix}-${index}-${Date.now().toString(36)}`;
}

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

/**
 * Replace slot placeholders in a string
 * Placeholders are in the format {{slotName}}
 * NOTE: Array/object slots are skipped here and handled separately in processComponent
 */
function replaceSlots(
  template: string,
  slots: Record<string, unknown>,
  instanceId: string
): string {
  let result = template;

  // Replace {{id}} with instance ID
  result = result.replace(/\{\{id\}\}/g, instanceId);

  // Replace other slots (skip arrays/objects - they're handled separately)
  for (const [key, value] of Object.entries(slots)) {
    if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
      continue; // Skip arrays and objects - handled in processComponent
    }
    const placeholder = `{{${key}}}`;
    result = result.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), String(value ?? ''));
  }

  // Remove any remaining unreplaced placeholders (use defaults or empty)
  result = result.replace(/\{\{[^}]+\}\}/g, '');

  return result;
}

/**
 * Process a snippet component, replacing all slot references
 */
function processComponent(
  component: SnippetComponent,
  slots: Record<string, unknown>,
  instanceId: string
): { id: string; component: Record<string, unknown> } {
  const processedId = replaceSlots(component.id, slots, instanceId);

  // Deep clone and process props (string slots are replaced, array/object slots left as placeholders)
  const processedProps = JSON.parse(
    replaceSlots(JSON.stringify(component.props), slots, instanceId)
  );

  // Process children array if present
  if (Array.isArray(processedProps.children)) {
    processedProps.children = processedProps.children.map((child: string) =>
      replaceSlots(child, slots, instanceId)
    );
  }

  // Process child reference if present
  if (typeof processedProps.child === 'string') {
    processedProps.child = replaceSlots(processedProps.child, slots, instanceId);
  }

  // Handle array/object slots that were skipped during string replacement
  // These will either be empty strings (from placeholder removal) or remaining placeholders
  for (const [key, value] of Object.entries(slots)) {
    if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
      // Check if this prop exists in the template (will be empty string or placeholder after processing)
      if (key in processedProps) {
        processedProps[key] = value;
      }
    }
  }

  // Also handle cases where array was converted to string during JSON round-trip (fallback)
  for (const [key, value] of Object.entries(processedProps)) {
    if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
      try {
        processedProps[key] = JSON.parse(value);
      } catch {
        // Not valid JSON array, keep as string
      }
    }
  }

  return {
    id: processedId,
    component: {
      [component.type]: processedProps,
    },
  };
}

/**
 * Compose a single snippet into A2UI components
 */
function composeSnippet(
  snippet: Snippet,
  instruction: CompositionInstruction,
  index: number
): Array<{ id: string; component: Record<string, unknown> }> {
  const instanceId = instruction.instanceId || generateId(snippet.id, index);

  // Merge default slot values with provided values
  const slots: Record<string, unknown> = {};
  for (const slotDef of snippet.slots) {
    slots[slotDef.name] = slotDef.default;
  }
  if (instruction.slots) {
    // Filter out empty/null/undefined slot values to preserve defaults
    const filteredSlots: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(instruction.slots)) {
      if (value !== '' && value !== null && value !== undefined) {
        filteredSlots[key] = value;
      }
    }
    Object.assign(slots, filteredSlots);
  }

  // Process each component in the template
  const components = snippet.template.components.map(comp =>
    processComponent(comp, slots, instanceId)
  );

  return components;
}

/**
 * Main composition function
 * Takes AI output and generates A2UI messages
 */
export function composeFromInstructions(
  output: AICompositionOutput,
  surfaceId: string = '@default'
): CompositionResult {
  try {
    const allComponents: Array<{ id: string; component: Record<string, unknown> }> = [];
    const rootChildren: string[] = [];
    let snippetsUsed = 0;
    let customGenerated = 0;

    // Process each instruction
    for (let i = 0; i < output.compose.length; i++) {
      const instruction = output.compose[i];

      if ('snippet' in instruction) {
        // It's a CompositionInstruction - use snippet
        const snippet = snippetRegistry.get(instruction.snippet);

        if (!snippet) {
          console.warn(`[Composer] Unknown snippet: ${instruction.snippet}`);
          continue;
        }

        const components = composeSnippet(snippet, instruction, i);
        allComponents.push(...components);

        // First component of snippet is typically the root
        if (components.length > 0) {
          rootChildren.push(components[0].id);
        }

        snippetsUsed++;
      } else if ('generate' in instruction) {
        // It's a GenerationInstruction - placeholder for custom generation
        // In a full implementation, this would call the AI to generate custom A2UI
        const customId = instruction.instanceId || generateId('custom', i);

        // For now, create a placeholder text component
        allComponents.push({
          id: customId,
          component: {
            Text: {
              text: { literalString: `[Custom: ${(instruction as GenerationInstruction).generate}]` },
              usageHint: { literalString: 'caption' },
            },
          },
        });
        rootChildren.push(customId);
        customGenerated++;
      }
    }

    // Determine root component based on layout
    let rootId: string;
    if (output.layout === 'card' && rootChildren.length > 0) {
      // Wrap in a card
      rootId = 'composed-card';
      allComponents.unshift({
        id: 'composed-card',
        component: {
          Card: {
            children: ['composed-content'],
            padding: { literalString: 'md' },
          },
        },
      });
      allComponents.push({
        id: 'composed-content',
        component: {
          Column: {
            children: rootChildren,
            gap: { literalString: 'md' },
          },
        },
      });
    } else if (output.layout === 'row') {
      rootId = 'composed-row';
      allComponents.unshift({
        id: 'composed-row',
        component: {
          Row: {
            children: rootChildren,
            gap: { literalString: 'md' },
          },
        },
      });
    } else if (output.layout === 'column' || rootChildren.length > 1) {
      rootId = 'composed-column';
      allComponents.unshift({
        id: 'composed-column',
        component: {
          Column: {
            children: rootChildren,
            gap: { literalString: 'md' },
          },
        },
      });
    } else {
      rootId = rootChildren[0] || 'empty';
    }

    // Build A2UI messages
    // Use a distinct font for generated content to differentiate from the demo wrapper
    const messages: ServerToClientMessage[] = [
      {
        beginRendering: {
          surfaceId,
          root: rootId,
          styles: {
            // Inter is a clean, modern UI font that contrasts with Google Flex Pro
            font: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            primaryColor: '#3b82f6', // A blue accent color for generated UIs
          },
        },
      },
      {
        surfaceUpdate: {
          surfaceId,
          components: allComponents,
        },
      },
    ];

    return {
      success: true,
      messages,
      stats: {
        snippetsUsed,
        customGenerated,
        totalComponents: allComponents.length,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown composition error',
    };
  }
}

/**
 * Parse AI response and compose
 * The AI response should be JSON in AICompositionOutput format
 */
export function composeFromAIResponse(
  aiResponse: string,
  surfaceId: string = '@default'
): CompositionResult {
  try {
    // Strip markdown code fences before parsing
    const cleanedResponse = stripMarkdownCodeFences(aiResponse);

    // Try to extract JSON from the response
    const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return {
        success: false,
        error: 'No valid JSON found in AI response',
      };
    }

    const output: AICompositionOutput = JSON.parse(jsonMatch[0]);
    return composeFromInstructions(output, surfaceId);
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to parse AI response',
    };
  }
}

/**
 * Composer class for stateful composition
 */
export class SnippetComposer {
  private surfaceId: string;

  constructor(surfaceId: string = '@default') {
    this.surfaceId = surfaceId;
  }

  /**
   * Compose from structured instructions
   */
  compose(output: AICompositionOutput): CompositionResult {
    return composeFromInstructions(output, this.surfaceId);
  }

  /**
   * Compose from AI response string
   */
  composeFromResponse(aiResponse: string): CompositionResult {
    return composeFromAIResponse(aiResponse, this.surfaceId);
  }

  /**
   * Quick compose helper for simple UIs
   */
  quick(snippetIds: string[], slots?: Record<string, Record<string, unknown>>): CompositionResult {
    const instructions: CompositionInstruction[] = snippetIds.map(id => ({
      snippet: id,
      slots: slots?.[id] || {},
    }));

    return this.compose({
      compose: instructions,
      layout: 'column',
    });
  }
}
