# A2UI Bridge

**Let AI agents create real user interfaces using any component library.**

A2UI Bridge implements Google's [A2UI Protocol](https://a2ui.org) for React, enabling AI-generated UIs that render with your existing design system.

## What is A2UI?

A2UI (Agent-to-UI) is a protocol that lets AI agents build user interfaces without writing code. Here's how it works:

1. **You describe what you want** - "Create a contact card with name, email, and a call button"
2. **The AI generates JSON** - It describes the UI structure, not actual code
3. **A2UI Bridge renders it** - The JSON gets turned into real components from your design system

The same A2UI JSON can render with **any** component library - Mantine, ShadCN, Material UI, or your own custom components. The AI doesn't need to know React or your specific library.

## Why Use A2UI?

- **Framework-agnostic**: Same AI response works across different component libraries
- **Secure**: Declarative JSON, not executable code
- **Real-time**: UI builds progressively as the AI generates it
- **Native integration**: Uses your existing components with your styling

## Installation

```bash
npm install @a2ui-bridge/core @a2ui-bridge/react
```

## Quick Start

### 1. Create adapters for your components

Map A2UI component types to your actual components:

```tsx
import { createAdapter, extractValue } from '@a2ui-bridge/react';
import { Button, Text, Card } from '@mantine/core'; // or any library

const ButtonAdapter = createAdapter(Button, {
  mapProps: (a2ui, ctx) => ({
    children: ctx.renderChild(a2ui.child),
    onClick: () => a2ui.action && ctx.onAction({ name: a2ui.action.name }),
  }),
});

const TextAdapter = createAdapter(Text, {
  mapProps: (a2ui) => ({
    children: extractValue(a2ui.text),
    size: extractValue(a2ui.usageHint) === 'h1' ? 'xl' : 'md',
  }),
});

// Register all adapters
const components = {
  Button: ButtonAdapter,
  Text: TextAdapter,
  Card: CardAdapter,
  // ... more adapters
};
```

### 2. Render A2UI surfaces

```tsx
import { Surface, useA2uiProcessor } from '@a2ui-bridge/react';

function App() {
  const processor = useA2uiProcessor();

  // Process A2UI messages from your AI
  const handleAIResponse = (messages) => {
    processor.processMessages(messages);
  };

  return (
    <Surface
      processor={processor}
      components={components}
      onAction={(action) => console.log('User action:', action)}
    />
  );
}
```

### 3. Send A2UI messages from your AI

```json
[
  {
    "beginRendering": {
      "surfaceId": "@default",
      "root": "greeting-card"
    }
  },
  {
    "surfaceUpdate": {
      "surfaceId": "@default",
      "components": [
        {
          "id": "greeting-card",
          "component": {
            "Card": {
              "children": ["greeting-text"]
            }
          }
        },
        {
          "id": "greeting-text",
          "component": {
            "Text": {
              "text": { "literalString": "Hello from A2UI!" },
              "usageHint": { "literalString": "h2" }
            }
          }
        }
      ]
    }
  }
]
```

## A2UI Protocol Messages

### beginRendering
Starts a new surface and sets the root component:

```json
{
  "beginRendering": {
    "surfaceId": "@default",
    "root": "my-component-id"
  }
}
```

### surfaceUpdate
Updates components on the surface:

```json
{
  "surfaceUpdate": {
    "surfaceId": "@default",
    "components": [
      {
        "id": "my-button",
        "component": {
          "Button": {
            "child": "button-text",
            "action": { "name": "submit" }
          }
        }
      }
    ]
  }
}
```

### dataModelUpdate
Updates data for data-bound components:

```json
{
  "dataModelUpdate": {
    "surfaceId": "@default",
    "path": "/",
    "contents": [
      { "key": "user.name", "value": { "valueString": "John" } }
    ]
  }
}
```

### deleteSurface
Removes a surface:

```json
{
  "deleteSurface": {
    "surfaceId": "@default"
  }
}
```

## Supported Components

| Component | Description |
|-----------|-------------|
| `Text` | Text display with semantic hints (h1, h2, body, caption) |
| `Button` | Interactive button with action callbacks |
| `TextField` | Text input with data binding |
| `CheckBox` | Boolean toggle |
| `Card` | Container with border/shadow |
| `Row` | Horizontal layout |
| `Column` | Vertical layout |
| `List` | Item container |
| `Badge` | Status indicator |
| `Divider` | Visual separator |
| `Image` | Image display |

## Data Binding

Components can bind to data model values:

```json
{
  "TextField": {
    "text": { "path": "form.email" },
    "label": { "literalString": "Email" }
  }
}
```

Actions can include context from the data model:

```json
{
  "action": {
    "name": "submit-form",
    "context": [
      { "key": "email", "value": { "path": "form.email" } }
    ]
  }
}
```

## Packages

| Package | Description |
|---------|-------------|
| `@a2ui-bridge/core` | Protocol processing, state management, data binding |
| `@a2ui-bridge/react` | React adapter with hooks and Surface component |

## Architecture

```
AI Agent (Claude, GPT, etc.)
         |
         v
    A2UI JSON Messages
         |
         v
+------------------+
| @a2ui-bridge/core |  <-- Parses protocol, manages state
+------------------+
         |
         v
+------------------+
| @a2ui-bridge/react|  <-- React bindings, Surface component
+------------------+
         |
         v
+------------------+
|  Your Adapters   |  <-- Maps to your component library
+------------------+
         |
         v
   Rendered UI (Mantine, ShadCN, Material UI, etc.)
```

## Demo

Try the interactive demo that lets you describe UIs to Claude and see them render in real-time:

```bash
cd apps/demo
cp .env.example .env  # Add your Anthropic API key
pnpm install
pnpm run dev
```

Visit http://localhost:5173 to start generating UIs. You can also enter your API key directly in the demo UI.

### Demo Features

- **Multi-Provider Support**: Switch between Anthropic Claude, OpenAI GPT, and Google Gemini
- **Streaming Progress**: Real-time feedback with stage indicators, elapsed time, and cancel capability
- **Error Recovery**: Graceful error boundaries prevent crashes and enable retry
- **Configuration System**: Centralized, validated configuration with environment variable support
- **Protocol Viewer**: See the A2UI JSON being generated in real-time

See [apps/demo/README.md](apps/demo/README.md) for detailed documentation.

## Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm run build

# Run demo
cd apps/demo && pnpm run dev
```

## Resources

- [A2UI Protocol Specification](https://a2ui.org)
- [A2UI GitHub](https://github.com/nicholaspetrov/a2ui)
- [Mantine Components](https://mantine.dev) (used in demo)

## License

MIT
