/**
 * MCP Tool Definitions for Anthropic API
 *
 * These are the tool schemas that get sent to the Anthropic API
 * to enable the AI to use the Catalog MCP tools.
 */

export interface AnthropicTool {
  name: string;
  description: string;
  input_schema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

export const CATALOG_MCP_TOOLS: AnthropicTool[] = [
  {
    name: 'list_components',
    description: `List all available A2UI components. Use this to discover what UI components you can use.
Returns component names, categories, and descriptions.
Categories: Layout, Typography, Form Inputs, Feedback, Navigation, Overlays, Data Display, Media`,
    input_schema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          description: 'Optional. Filter by category: Layout, Typography, Form Inputs, Feedback, Navigation, Overlays, Data Display, Media',
        },
      },
    },
  },
  {
    name: 'get_component_schema',
    description: `Get the detailed schema for a specific A2UI component.
Returns the component's props, their types, constraints, and usage examples.
Use this before using a component to ensure you're using it correctly.`,
    input_schema: {
      type: 'object',
      properties: {
        component: {
          type: 'string',
          description: 'The component name (e.g., "Button", "Card", "TextField")',
        },
      },
      required: ['component'],
    },
  },
  {
    name: 'get_layout_patterns',
    description: `Get pre-built layout patterns for common UI needs.
Patterns include: ContactCard, TaskList, LoginForm, ProductCard, SettingsForm, Dashboard, Wizard.
Use this to get recommended component compositions for specific use cases.`,
    input_schema: {
      type: 'object',
      properties: {
        intent: {
          type: 'string',
          description: 'Optional. The intent to match (e.g., "contact", "login", "dashboard", "task", "product", "settings", "wizard")',
        },
      },
    },
  },
  {
    name: 'validate_a2ui',
    description: `Validate A2UI JSON before generating output.
Checks that all components exist, props are valid, and structure is correct.
Use this to verify your A2UI JSON is valid before returning it.`,
    input_schema: {
      type: 'object',
      properties: {
        json: {
          type: 'string',
          description: 'The A2UI JSON string to validate',
        },
      },
      required: ['json'],
    },
  },
];

export default CATALOG_MCP_TOOLS;
