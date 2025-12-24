import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Github,
  ArrowRight,
  FileCode,
  Package,
  Terminal,
  ChevronRight,
  ExternalLink,
  Bot,
  Puzzle,
  Layers,
  LayoutGrid,
} from 'lucide-react';

// Supported A2UI Components
const COMPONENTS = [
  { name: 'Text', desc: 'Semantic text display' },
  { name: 'Button', desc: 'Interactive actions' },
  { name: 'TextField', desc: 'Text input with binding' },
  { name: 'CheckBox', desc: 'Boolean toggles' },
  { name: 'Badge', desc: 'Status indicators' },
  { name: 'Card', desc: 'Content containers' },
  { name: 'Row / Column', desc: 'Layout containers' },
  { name: 'List', desc: 'Repeating items' },
];

// Example prompts
const EXAMPLE_PROMPTS = [
  'Create a contact card with name, email, and call button',
  'Build a task list with status badges',
  'Make a login form with remember me checkbox',
  'Design a weather widget with refresh action',
  'Create a product card with price and buy button',
];

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <div className="py-4 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">A2UI Bridge</h4>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/southleft/a2ui-bridge"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-gray-900 hover:text-gray-600 no-underline"
              >
                <Github size={18} />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero - Two Column Layout */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left Column - Main Message */}
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl font-semibold leading-tight tracking-tight">
              Let <span className="text-blue-500">AI agents</span> build<br />
              real user interfaces
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-[480px]">
              A protocol that lets any LLM create UIs without knowing React, Vue,
              or your component library. Describe what you want, get working components.
            </p>

            <div className="flex items-center gap-3 mt-4">
              <Button
                size="lg"
                className="bg-gray-900 hover:bg-gray-800"
                onClick={() => navigate('/demo')}
              >
                Try the Demo
                <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
              >
                <a
                  href="https://github.com/nicholaspetrov/a2ui"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Protocol
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column - How it Works */}
          <div className="p-6 bg-white border border-gray-200">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-6">How It Works</p>

            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-start">
                <Badge className="w-7 h-7 p-0 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-500">1</Badge>
                <div>
                  <p className="font-medium">Describe your UI</p>
                  <p className="text-sm text-muted-foreground">"Create a contact card with name and email"</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Badge className="w-7 h-7 p-0 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-500">2</Badge>
                <div>
                  <p className="font-medium">AI generates A2UI JSON</p>
                  <p className="text-sm text-muted-foreground">A structured recipe, not framework-specific code</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Badge className="w-7 h-7 p-0 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-500">3</Badge>
                <div>
                  <p className="font-medium">Bridge renders components</p>
                  <p className="text-sm text-muted-foreground">Recipe becomes real components from your design system</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bento Grid Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side - Capabilities */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-6">Capabilities</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-white border border-gray-200">
                <Bot size={24} strokeWidth={1.5} className="text-gray-500" />
                <p className="font-medium mt-3 mb-1">Any LLM</p>
                <p className="text-sm text-muted-foreground">Claude, GPT, Gemini, or local models</p>
              </div>

              <div className="p-5 bg-white border border-gray-200">
                <Puzzle size={24} strokeWidth={1.5} className="text-gray-500" />
                <p className="font-medium mt-3 mb-1">Any Framework</p>
                <p className="text-sm text-muted-foreground">React, Vue, Angular, Svelte, Lit</p>
              </div>

              <div className="p-5 bg-white border border-gray-200">
                <Layers size={24} strokeWidth={1.5} className="text-gray-500" />
                <p className="font-medium mt-3 mb-1">Any Components</p>
                <p className="text-sm text-muted-foreground">Mantine, Shadcn, MUI, custom</p>
              </div>

              <div className="p-5 bg-white border border-gray-200">
                <LayoutGrid size={24} strokeWidth={1.5} className="text-gray-500" />
                <p className="font-medium mt-3 mb-1">Full Layouts</p>
                <p className="text-sm text-muted-foreground">Cards, forms, lists, modals, tabs</p>
              </div>
            </div>
          </div>

          {/* Right Side - Example Prompts */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-6">Example Prompts</p>

            <div className="flex flex-col">
              {EXAMPLE_PROMPTS.map((prompt, i) => (
                <div
                  key={i}
                  className="p-4 bg-white border-x border-b border-gray-200 cursor-pointer hover:bg-gray-50 first:border-t"
                  onClick={() => navigate('/demo')}
                >
                  <div className="flex items-center gap-3">
                    <ChevronRight size={16} className="text-red-500" />
                    <span className="text-sm">{prompt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Components + Code Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          {/* Components List */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <Package size={20} strokeWidth={1.5} />
              <p className="text-xs font-semibold text-muted-foreground uppercase">Supported Components</p>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {COMPONENTS.map((comp) => (
                <div key={comp.name} className="flex items-center gap-3 py-1.5">
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded min-w-[90px]">{comp.name}</code>
                  <span className="text-xs text-muted-foreground">{comp.desc}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              Plus Image, Tabs, Modal, Slider, DatePicker, and more.
            </p>
          </div>

          {/* Example JSON */}
          <div className="md:col-span-7">
            <div className="flex items-center gap-2 mb-6">
              <FileCode size={20} strokeWidth={1.5} />
              <p className="text-xs font-semibold text-muted-foreground uppercase">Example A2UI JSON</p>
            </div>

            <pre className="text-xs bg-[#1a1b1e] text-[#c1c2c5] p-5 overflow-x-auto">
{`{
  "beginRendering": { "surfaceId": "@default", "root": "card" }
}
{
  "surfaceUpdate": {
    "surfaceId": "@default",
    "components": [
      { "id": "card", "component": { "Card": { "children": ["title", "btn"] } } },
      { "id": "title", "component": { "Text": { "text": { "literalString": "Hello" } } } },
      { "id": "btn", "component": { "Button": { "child": "btn-text", "action": { "name": "greet" } } } },
      { "id": "btn-text", "component": { "Text": { "text": { "literalString": "Click me" } } } }
    ]
  }
}`}
            </pre>
          </div>
        </div>
      </div>

      <Separator />

      {/* Quick Start */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center gap-2 mb-6">
          <Terminal size={20} strokeWidth={1.5} />
          <p className="text-xs font-semibold text-muted-foreground uppercase">Quick Start</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-sm font-medium mb-2">1. Install packages</p>
            <pre className="text-[11px] bg-[#1a1b1e] text-[#c1c2c5] p-3 overflow-x-auto">
              npm install @a2ui-bridge/core @a2ui-bridge/react
            </pre>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">2. Create adapters</p>
            <pre className="text-[11px] bg-[#1a1b1e] text-[#c1c2c5] p-3 overflow-x-auto">
{`const ButtonAdapter = createAdapter(
  Button, { mapProps: ... }
);`}
            </pre>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">3. Render surface</p>
            <pre className="text-[11px] bg-[#1a1b1e] text-[#c1c2c5] p-3 overflow-x-auto">
{`<Surface
  processor={processor}
  components={components}
/>`}
            </pre>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/southleft/a2ui-bridge"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                <Github size={14} />
                Repository
              </a>
              <a
                href="https://github.com/nicholaspetrov/a2ui"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                <ExternalLink size={14} />
                A2UI Protocol
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Built by{' '}
              <a href="https://southleft.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                Southleft
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
