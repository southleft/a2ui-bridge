#!/usr/bin/env node
/**
 * A2UI Catalog MCP Server
 *
 * Provides component intelligence for AI agents building user interfaces.
 * This is a "Catalog MCP" - reusable across any A2UI implementation.
 *
 * Tools:
 * - list_components: Get all available A2UI components
 * - get_component_schema: Get detailed schema for a specific component
 * - get_layout_patterns: Get pre-built layout patterns for common UI needs
 * - validate_a2ui: Validate A2UI JSON against the schema
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory of this file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load component catalog
const catalogPath = join(__dirname, '..', 'data', 'components.json');
const catalog = JSON.parse(readFileSync(catalogPath, 'utf-8'));

interface ComponentDef {
  name: string;
  category: string;
  description: string;
  props: Record<string, unknown>;
  examples?: Array<{ description: string; json: unknown }>;
}

interface LayoutPattern {
  name: string;
  description: string;
  intent: string[];
  template: {
    root: string;
    children: string[];
    structure: string;
  };
}

// Create the MCP server
const server = new McpServer({
  name: 'a2ui-catalog',
  version: '0.1.0',
});

/**
 * Tool: list_components
 * Lists all available A2UI components, optionally filtered by category
 */
server.tool(
  'list_components',
  'List all available A2UI components. Optionally filter by category.',
  {
    category: z.string().optional().describe(
      'Filter by category: Layout, Typography, Form Inputs, Feedback, Navigation, Overlays, Data Display, Media'
    ),
  },
  async ({ category }) => {
    let components: ComponentDef[] = catalog.components;

    if (category) {
      components = components.filter(
        (c: ComponentDef) => c.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Return a summary of each component
    const summary = components.map((c: ComponentDef) => ({
      name: c.name,
      category: c.category,
      description: c.description,
    }));

    // Group by category for better readability
    const grouped: Record<string, typeof summary> = {};
    for (const comp of summary) {
      if (!grouped[comp.category]) {
        grouped[comp.category] = [];
      }
      grouped[comp.category].push(comp);
    }

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            version: catalog.version,
            totalComponents: summary.length,
            categories: Object.keys(grouped),
            components: category ? summary : grouped,
          }, null, 2),
        },
      ],
    };
  }
);

/**
 * Tool: get_component_schema
 * Get detailed schema and examples for a specific component
 */
server.tool(
  'get_component_schema',
  'Get the full schema, props, and examples for a specific A2UI component.',
  {
    component: z.string().describe('Component name (e.g., "Button", "Card", "TextField")'),
  },
  async ({ component }) => {
    const comp = catalog.components.find(
      (c: ComponentDef) => c.name.toLowerCase() === component.toLowerCase()
    );

    if (!comp) {
      const available = catalog.components.map((c: ComponentDef) => c.name).join(', ');
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              error: `Component "${component}" not found`,
              availableComponents: available,
            }, null, 2),
          },
        ],
        isError: true,
      };
    }

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            name: comp.name,
            category: comp.category,
            description: comp.description,
            props: comp.props,
            examples: comp.examples || [],
            usage: `Use the "${comp.name}" component by specifying it in the A2UI JSON: { "component": { "${comp.name}": { ...props } } }`,
          }, null, 2),
        },
      ],
    };
  }
);

/**
 * Tool: get_layout_patterns
 * Get pre-built layout patterns for common UI needs
 */
server.tool(
  'get_layout_patterns',
  'Get pre-built layout patterns for common UI needs like contact cards, task lists, login forms, etc.',
  {
    intent: z.string().optional().describe(
      'Optional intent to match patterns against (e.g., "contact", "login", "dashboard")'
    ),
  },
  async ({ intent }) => {
    let patterns: LayoutPattern[] = catalog.patterns;

    if (intent) {
      // Filter patterns by intent matching
      const intentLower = intent.toLowerCase();
      patterns = patterns.filter((p: LayoutPattern) =>
        p.intent.some(i => i.toLowerCase().includes(intentLower) || intentLower.includes(i.toLowerCase()))
      );
    }

    if (patterns.length === 0) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              message: `No patterns found matching intent "${intent}"`,
              availablePatterns: catalog.patterns.map((p: LayoutPattern) => ({
                name: p.name,
                intent: p.intent,
              })),
              suggestion: 'Try a different intent or omit the intent parameter to see all patterns.',
            }, null, 2),
          },
        ],
      };
    }

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            matchedPatterns: patterns.length,
            patterns: patterns.map((p: LayoutPattern) => ({
              name: p.name,
              description: p.description,
              matchingIntent: p.intent,
              structure: p.template.structure,
              requiredComponents: [p.template.root, ...p.template.children],
            })),
          }, null, 2),
        },
      ],
    };
  }
);

/**
 * Tool: validate_a2ui
 * Validate A2UI JSON against the component schema
 */
server.tool(
  'validate_a2ui',
  'Validate A2UI JSON against the component schema. Checks for valid components, props, and structure.',
  {
    json: z.string().describe('A2UI JSON string to validate'),
  },
  async ({ json }) => {
    let parsed: unknown;
    try {
      parsed = JSON.parse(json);
    } catch {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              valid: false,
              errors: ['Invalid JSON: Could not parse the input'],
            }, null, 2),
          },
        ],
      };
    }

    const errors: string[] = [];
    const warnings: string[] = [];
    const validComponents = new Set(catalog.components.map((c: ComponentDef) => c.name));

    // Validate the structure
    function validateNode(node: unknown, path: string = 'root'): void {
      if (!node || typeof node !== 'object') {
        errors.push(`${path}: Expected object, got ${typeof node}`);
        return;
      }

      const obj = node as Record<string, unknown>;

      // Check if this is a component node
      if (obj.component && typeof obj.component === 'object') {
        const compObj = obj.component as Record<string, unknown>;
        const componentName = Object.keys(compObj)[0];

        if (!componentName) {
          errors.push(`${path}: Component object is empty`);
          return;
        }

        if (!validComponents.has(componentName)) {
          errors.push(`${path}: Unknown component "${componentName}". Valid components: ${Array.from(validComponents).join(', ')}`);
        } else {
          // Validate props against schema
          const compDef = catalog.components.find((c: ComponentDef) => c.name === componentName);
          const props = compObj[componentName] as Record<string, unknown>;

          if (compDef && props && typeof props === 'object') {
            const validProps = Object.keys(compDef.props);
            for (const prop of Object.keys(props)) {
              if (!validProps.includes(prop)) {
                warnings.push(`${path}.${componentName}: Unknown prop "${prop}". Valid props: ${validProps.join(', ')}`);
              }
            }
          }
        }
      }

      // Check if this has an id (required for A2UI components)
      if (!obj.id && obj.component) {
        warnings.push(`${path}: Component is missing "id" field`);
      }

      // Recursively validate children
      if (Array.isArray(obj.children)) {
        obj.children.forEach((child, i) => {
          if (typeof child === 'object') {
            validateNode(child, `${path}.children[${i}]`);
          }
        });
      }
    }

    // Handle array of components (full UI definition)
    if (Array.isArray(parsed)) {
      parsed.forEach((item, i) => validateNode(item, `[${i}]`));
    } else {
      validateNode(parsed);
    }

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            valid: errors.length === 0,
            errors,
            warnings,
            summary: errors.length === 0
              ? `Validation passed${warnings.length > 0 ? ` with ${warnings.length} warning(s)` : ''}`
              : `Validation failed with ${errors.length} error(s)`,
          }, null, 2),
        },
      ],
    };
  }
);

// Also expose the catalog as a resource
server.resource(
  'catalog',
  'a2ui://catalog/components',
  async () => ({
    contents: [
      {
        uri: 'a2ui://catalog/components',
        mimeType: 'application/json',
        text: JSON.stringify(catalog, null, 2),
      },
    ],
  })
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('A2UI Catalog MCP Server running on stdio');
}

main().catch(console.error);
