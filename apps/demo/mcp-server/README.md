# A2UI Catalog MCP Server

An MCP (Model Context Protocol) server that provides component intelligence for AI agents building user interfaces with A2UI.

## What is This?

This is a **Catalog MCP** - a reusable server that teaches AI agents about available UI components. It implements the "Truth Contract" pattern, telling agents what components exist and how to use them correctly.

## Tools

The server exposes 4 tools:

### `list_components`
Lists all available A2UI components, optionally filtered by category.

```json
{
  "category": "Form Inputs"  // Optional: Layout, Typography, Form Inputs, Feedback, Navigation, Overlays, Data Display, Media
}
```

### `get_component_schema`
Gets detailed schema, props, and examples for a specific component.

```json
{
  "component": "Button"  // Required: component name
}
```

### `get_layout_patterns`
Gets pre-built layout patterns for common UI needs.

```json
{
  "intent": "login"  // Optional: contact, login, dashboard, task, product, settings, wizard
}
```

### `validate_a2ui`
Validates A2UI JSON against the component schema.

```json
{
  "json": "{\"id\": \"btn1\", \"component\": {\"Button\": {\"child\": \"label\"}}}"
}
```

## Resources

The server also exposes the full component catalog as a resource:

- `a2ui://catalog/components` - Complete component catalog with all definitions

## Installation

```bash
# Install dependencies
npm install

# Build
npm run build

# Run
npm start
```

## Usage with Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "a2ui-catalog": {
      "command": "node",
      "args": ["/path/to/a2ui-bridge/apps/demo/mcp-server/dist/index.js"]
    }
  }
}
```

## Usage with MCP Clients

```typescript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';

// Connect to the server
const client = new Client({
  name: 'my-app',
  version: '1.0.0',
});

// List all components
const components = await client.callTool('list_components', {});

// Get Button schema
const buttonSchema = await client.callTool('get_component_schema', {
  component: 'Button'
});

// Find login patterns
const loginPatterns = await client.callTool('get_layout_patterns', {
  intent: 'login'
});
```

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     AI Agent                            │
│  (Claude, GPT, etc.)                                   │
└────────────────────┬────────────────────────────────────┘
                     │ MCP Protocol
                     ▼
┌─────────────────────────────────────────────────────────┐
│              A2UI Catalog MCP Server                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │list_        │  │get_component│  │get_layout_  │    │
│  │components   │  │_schema      │  │patterns     │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
│  ┌─────────────┐                                       │
│  │validate_    │                                       │
│  │a2ui         │                                       │
│  └─────────────┘                                       │
│                                                         │
│  📁 components.json (35+ components, 7 patterns)       │
└────────────────────┬────────────────────────────────────┘
                     │ A2UI JSON
                     ▼
┌─────────────────────────────────────────────────────────┐
│              A2UI Bridge Renderer                      │
│  (React, Vue, Web Components)                          │
└─────────────────────────────────────────────────────────┘
```

## Component Categories

- **Layout**: Card, Column, Row, Grid, Stack, Divider
- **Typography**: Text, Title, Badge, Avatar
- **Form Inputs**: Button, TextField, Checkbox, Switch, Select, MultiSelect, DatePicker, Rating, Slider
- **Feedback**: Alert, Progress, Skeleton, Tooltip
- **Navigation**: Tabs, Stepper, Breadcrumb
- **Overlays**: Modal, Drawer
- **Data Display**: Table, Accordion, Timeline
- **Media**: Image, Icon

## License

MIT
