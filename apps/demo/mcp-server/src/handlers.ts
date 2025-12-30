/**
 * MCP Tool Handlers
 *
 * Pure TypeScript functions that implement the Catalog MCP tools.
 * These can be called directly without running a separate MCP server process.
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Types
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

interface Catalog {
  version: string;
  components: ComponentDef[];
  patterns: LayoutPattern[];
}

// Load catalog - handle both ESM and CommonJS contexts
let catalog: Catalog;

function loadCatalog(): Catalog {
  if (catalog) return catalog;

  try {
    // Try ESM path resolution first
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const catalogPath = join(__dirname, '..', 'data', 'components.json');
    catalog = JSON.parse(readFileSync(catalogPath, 'utf-8'));
  } catch {
    // Fallback for different execution contexts
    const catalogPath = join(process.cwd(), 'apps', 'demo', 'mcp-server', 'data', 'components.json');
    catalog = JSON.parse(readFileSync(catalogPath, 'utf-8'));
  }

  return catalog;
}

// Tool Input Types
export interface ListComponentsInput {
  category?: string;
}

export interface GetComponentSchemaInput {
  component: string;
}

export interface GetLayoutPatternsInput {
  intent?: string;
}

export interface ValidateA2uiInput {
  json: string;
}

/**
 * list_components - Lists all available A2UI components
 */
export function handleListComponents(input: ListComponentsInput): string {
  const cat = loadCatalog();
  let components = cat.components;

  if (input.category) {
    components = components.filter(
      (c) => c.category.toLowerCase() === input.category!.toLowerCase()
    );
  }

  // Return a summary of each component
  const summary = components.map((c) => ({
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

  return JSON.stringify({
    version: cat.version,
    totalComponents: summary.length,
    categories: Object.keys(grouped),
    components: input.category ? summary : grouped,
  }, null, 2);
}

/**
 * get_component_schema - Gets detailed schema for a specific component
 */
export function handleGetComponentSchema(input: GetComponentSchemaInput): string {
  const cat = loadCatalog();
  const comp = cat.components.find(
    (c) => c.name.toLowerCase() === input.component.toLowerCase()
  );

  if (!comp) {
    const available = cat.components.map((c) => c.name).join(', ');
    return JSON.stringify({
      error: `Component "${input.component}" not found`,
      availableComponents: available,
    }, null, 2);
  }

  return JSON.stringify({
    name: comp.name,
    category: comp.category,
    description: comp.description,
    props: comp.props,
    examples: comp.examples || [],
    usage: `Use the "${comp.name}" component by specifying it in the A2UI JSON: { "component": { "${comp.name}": { ...props } } }`,
  }, null, 2);
}

/**
 * get_layout_patterns - Gets pre-built layout patterns
 */
export function handleGetLayoutPatterns(input: GetLayoutPatternsInput): string {
  const cat = loadCatalog();
  let patterns = cat.patterns;

  if (input.intent) {
    const intentLower = input.intent.toLowerCase();
    patterns = patterns.filter((p) =>
      p.intent.some(i =>
        i.toLowerCase().includes(intentLower) ||
        intentLower.includes(i.toLowerCase())
      )
    );
  }

  if (patterns.length === 0) {
    return JSON.stringify({
      message: `No patterns found matching intent "${input.intent}"`,
      availablePatterns: cat.patterns.map((p) => ({
        name: p.name,
        intent: p.intent,
      })),
      suggestion: 'Try a different intent or omit the intent parameter to see all patterns.',
    }, null, 2);
  }

  return JSON.stringify({
    matchedPatterns: patterns.length,
    patterns: patterns.map((p) => ({
      name: p.name,
      description: p.description,
      matchingIntent: p.intent,
      structure: p.template.structure,
      requiredComponents: [p.template.root, ...p.template.children],
    })),
  }, null, 2);
}

/**
 * validate_a2ui - Validates A2UI JSON against the schema
 */
export function handleValidateA2ui(input: ValidateA2uiInput): string {
  const cat = loadCatalog();

  let parsed: unknown;
  try {
    parsed = JSON.parse(input.json);
  } catch {
    return JSON.stringify({
      valid: false,
      errors: ['Invalid JSON: Could not parse the input'],
    }, null, 2);
  }

  const errors: string[] = [];
  const warnings: string[] = [];
  const validComponents = new Set(cat.components.map((c) => c.name));

  function validateNode(node: unknown, path: string = 'root'): void {
    if (!node || typeof node !== 'object') {
      errors.push(`${path}: Expected object, got ${typeof node}`);
      return;
    }

    const obj = node as Record<string, unknown>;

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
        const compDef = cat.components.find((c) => c.name === componentName);
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

    if (!obj.id && obj.component) {
      warnings.push(`${path}: Component is missing "id" field`);
    }

    if (Array.isArray(obj.children)) {
      obj.children.forEach((child, i) => {
        if (typeof child === 'object') {
          validateNode(child, `${path}.children[${i}]`);
        }
      });
    }
  }

  if (Array.isArray(parsed)) {
    parsed.forEach((item, i) => validateNode(item, `[${i}]`));
  } else {
    validateNode(parsed);
  }

  return JSON.stringify({
    valid: errors.length === 0,
    errors,
    warnings,
    summary: errors.length === 0
      ? `Validation passed${warnings.length > 0 ? ` with ${warnings.length} warning(s)` : ''}`
      : `Validation failed with ${errors.length} error(s)`,
  }, null, 2);
}

/**
 * Execute a tool by name
 */
export function executeToolHandler(
  toolName: string,
  input: Record<string, unknown>
): string {
  switch (toolName) {
    case 'list_components':
      return handleListComponents(input as ListComponentsInput);
    case 'get_component_schema':
      return handleGetComponentSchema(input as GetComponentSchemaInput);
    case 'get_layout_patterns':
      return handleGetLayoutPatterns(input as GetLayoutPatternsInput);
    case 'validate_a2ui':
      return handleValidateA2ui(input as ValidateA2uiInput);
    default:
      return JSON.stringify({ error: `Unknown tool: ${toolName}` });
  }
}
