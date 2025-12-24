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
  ExternalLink,
  Network,
  Component,
  Layers,
  LayoutGrid,
  Copy,
} from 'lucide-react';
import { useState } from 'react';

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
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exampleJson = `{
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
}`;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <div className="py-4 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">A2UI Bridge</h4>
            <a
              href="https://github.com/southleft/a2ui-bridge"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github size={18} />
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Hero - Two Column Layout */}
      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Main Message */}
          <div className="flex flex-col gap-5">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight">
              Let <span className="text-blue-500">AI agents</span> build<br />
              real user interfaces
            </h1>

            <p className="text-base text-muted-foreground leading-relaxed max-w-[440px]">
              A React implementation of Google's A2UI protocol. Describe what you want in natural language, get working components rendered from your design system.
            </p>

            <div className="flex items-center gap-3 mt-2">
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
                  href="https://a2ui.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  A2UI Protocol
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column - How it Works */}
          <div className="p-5 bg-white border border-gray-200 rounded-lg">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-5">How It Works</p>

            <div className="flex flex-col gap-4">
              <div className="flex gap-3 items-start">
                <Badge className="w-6 h-6 p-0 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-500 text-xs">1</Badge>
                <div>
                  <p className="font-medium text-sm">Describe your UI</p>
                  <p className="text-sm text-muted-foreground">"Create a contact card with name and email"</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Badge className="w-6 h-6 p-0 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-500 text-xs">2</Badge>
                <div>
                  <p className="font-medium text-sm">AI generates A2UI JSON</p>
                  <p className="text-sm text-muted-foreground">A structured recipe, not framework-specific code</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Badge className="w-6 h-6 p-0 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-500 text-xs">3</Badge>
                <div>
                  <p className="font-medium text-sm">Bridge renders components</p>
                  <p className="text-sm text-muted-foreground">Recipe becomes real components from your design system</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bento Grid Section */}
      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Side - Capabilities */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-5">Capabilities</p>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-200 hover:shadow-sm transition-all">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center mb-2.5">
                  <Network size={18} strokeWidth={1.5} className="text-blue-600" />
                </div>
                <p className="font-medium text-sm mb-0.5">Any LLM</p>
                <p className="text-xs text-muted-foreground">Claude, GPT, Gemini, or local models</p>
              </div>

              <div className="p-4 bg-white border border-gray-200 rounded-lg hover:border-green-200 hover:shadow-sm transition-all">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center mb-2.5">
                  <Component size={18} strokeWidth={1.5} className="text-green-600" />
                </div>
                <p className="font-medium text-sm mb-0.5">React</p>
                <p className="text-xs text-muted-foreground">First-class React support with hooks</p>
              </div>

              <div className="p-4 bg-white border border-gray-200 rounded-lg hover:border-purple-200 hover:shadow-sm transition-all">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center mb-2.5">
                  <Layers size={18} strokeWidth={1.5} className="text-purple-600" />
                </div>
                <p className="font-medium text-sm mb-0.5">Design Systems</p>
                <p className="text-xs text-muted-foreground">Mantine, ShadCN, or your own</p>
              </div>

              <div className="p-4 bg-white border border-gray-200 rounded-lg hover:border-orange-200 hover:shadow-sm transition-all">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500/10 to-amber-500/10 flex items-center justify-center mb-2.5">
                  <LayoutGrid size={18} strokeWidth={1.5} className="text-orange-600" />
                </div>
                <p className="font-medium text-sm mb-0.5">Full Layouts</p>
                <p className="text-xs text-muted-foreground">Cards, forms, lists, modals, tabs</p>
              </div>
            </div>
          </div>

          {/* Right Side - Example Prompts */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-5">Try These Prompts</p>

            <div className="flex flex-col gap-2">
              {EXAMPLE_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  className="group relative p-3 bg-white border border-gray-200 rounded-lg text-left transition-all hover:border-blue-400 hover:shadow-sm"
                  onClick={() => navigate('/demo')}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                      {prompt}
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all flex-shrink-0"
                    />
                  </div>
                </button>
              ))}
            </div>

            <p className="text-xs text-muted-foreground mt-3">
              Click any prompt to try it in the demo
            </p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Components + Code Section */}
      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Components List */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-5">
              <Package size={18} strokeWidth={1.5} />
              <p className="text-xs font-semibold text-muted-foreground uppercase">Supported Components</p>
            </div>

            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
              {COMPONENTS.map((comp) => (
                <div key={comp.name} className="flex items-start gap-2 py-1">
                  <code className="text-xs bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-700 px-1.5 py-0.5 rounded font-mono min-w-[80px] border border-blue-100">
                    {comp.name}
                  </code>
                  <span className="text-xs text-muted-foreground leading-relaxed">{comp.desc}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              Plus Image, Tabs, Modal, Slider, DatePicker, and more.
            </p>
          </div>

          {/* Example JSON - Modern Code Block */}
          <div className="md:col-span-7">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileCode size={18} strokeWidth={1.5} />
                <p className="text-xs font-semibold text-muted-foreground uppercase">Example A2UI JSON</p>
              </div>
              <button
                className="px-2.5 py-1 text-xs font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors flex items-center gap-1"
                onClick={() => handleCopy(exampleJson)}
              >
                <Copy size={12} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <div className="rounded-lg border border-gray-200 bg-[#1a1b1e] overflow-hidden">
              <div className="px-3 py-1.5 bg-[#161b22] border-b border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">JSON</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#27c93f]"></div>
                </div>
              </div>

              <pre className="text-[11px] text-[#e6edf3] p-4 overflow-x-auto font-mono leading-relaxed">
                {exampleJson}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Quick Start - Modern Code Blocks */}
      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="flex items-center gap-2 mb-6">
          <Terminal size={18} strokeWidth={1.5} />
          <p className="text-xs font-semibold text-muted-foreground uppercase">Quick Start</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Step 1 */}
          <div className="group">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-medium">1</div>
              <p className="text-sm font-medium">Install packages</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-[#1a1b1e] overflow-hidden">
              <div className="px-2.5 py-1 bg-[#161b22] border-b border-white/10">
                <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">npm</span>
              </div>
              <pre className="text-[11px] text-[#e6edf3] p-3 font-mono overflow-x-auto">npm install @a2ui-bridge/core @a2ui-bridge/react</pre>
            </div>
          </div>

          {/* Step 2 */}
          <div className="group">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-medium">2</div>
              <p className="text-sm font-medium">Create adapters</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-[#1a1b1e] overflow-hidden">
              <div className="px-2.5 py-1 bg-[#161b22] border-b border-white/10">
                <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">TypeScript</span>
              </div>
              <pre className="text-[11px] text-[#e6edf3] p-3 font-mono overflow-x-auto leading-relaxed">{`const ButtonAdapter =
  createAdapter(
    Button,
    { mapProps: ... }
  );`}</pre>
            </div>
          </div>

          {/* Step 3 */}
          <div className="group">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-medium">3</div>
              <p className="text-sm font-medium">Render surface</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-[#1a1b1e] overflow-hidden">
              <div className="px-2.5 py-1 bg-[#161b22] border-b border-white/10">
                <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">React</span>
              </div>
              <pre className="text-[11px] text-[#e6edf3] p-3 font-mono overflow-x-auto leading-relaxed">{`<Surface
  processor={processor}
  components={components}
/>`}</pre>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-5 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-5">
              <a
                href="https://github.com/southleft/a2ui-bridge"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github size={14} />
                Repository
              </a>
              <a
                href="https://github.com/google/A2UI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink size={14} />
                A2UI Protocol
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Built by{' '}
              <a href="https://southleft.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
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
