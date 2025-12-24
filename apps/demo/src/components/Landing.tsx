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
  Check,
  Play,
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

// Example prompts - clicking these will trigger generation in demo
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

  // Navigate to demo with prompt to auto-trigger generation
  const handlePromptClick = (prompt: string) => {
    navigate('/demo', { state: { prompt } });
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
      <div className="py-5 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-semibold">A2UI Bridge</h4>
            <a
              href="https://github.com/southleft/a2ui-bridge"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-base text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github size={20} />
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Hero - Two Column Layout */}
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left Column - Main Message */}
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl font-semibold leading-tight tracking-tight">
              Let <span className="text-blue-500">AI agents</span> build<br />
              real user interfaces
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-[500px]">
              A React implementation of Google's A2UI protocol. Describe what you want in natural language, and get working UI components rendered from your design system.
            </p>

            <div className="flex items-center gap-4 mt-3">
              <Button
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-base h-12 px-6"
                onClick={() => navigate('/demo')}
              >
                Try the Demo
                <ArrowRight size={20} className="ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base h-12 px-6"
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
          <div className="p-6 bg-white border border-gray-200 rounded-xl">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-6">How It Works</p>

            <div className="flex flex-col gap-5">
              <div className="flex gap-4 items-start">
                <Badge className="w-7 h-7 p-0 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-500 text-sm font-medium">1</Badge>
                <div>
                  <p className="font-semibold text-base">Describe your UI</p>
                  <p className="text-base text-muted-foreground">"Create a contact card with name and email"</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Badge className="w-7 h-7 p-0 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-500 text-sm font-medium">2</Badge>
                <div>
                  <p className="font-semibold text-base">AI generates A2UI JSON</p>
                  <p className="text-base text-muted-foreground">A structured recipe, not framework-specific code</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Badge className="w-7 h-7 p-0 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-500 text-sm font-medium">3</Badge>
                <div>
                  <p className="font-semibold text-base">Bridge renders components</p>
                  <p className="text-base text-muted-foreground">Recipe becomes real components from your design system</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Value Proposition Section */}
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Why A2UI Bridge?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enable your AI agents to create real, interactive user interfaces without writing UI code.
            Your development team can adopt AI-driven UI generation while maintaining full control over your design system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side - Capabilities */}
          <div>
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-6">Capabilities</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-white border border-gray-200 rounded-xl hover:border-blue-200 hover:shadow-sm transition-all">
                <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center mb-3">
                  <Network size={22} strokeWidth={1.5} className="text-blue-600" />
                </div>
                <p className="font-semibold text-base mb-1">Any LLM</p>
                <p className="text-sm text-muted-foreground">Claude, GPT, Gemini, or local models</p>
              </div>

              <div className="p-5 bg-white border border-gray-200 rounded-xl hover:border-green-200 hover:shadow-sm transition-all">
                <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center mb-3">
                  <Component size={22} strokeWidth={1.5} className="text-green-600" />
                </div>
                <p className="font-semibold text-base mb-1">React</p>
                <p className="text-sm text-muted-foreground">First-class React support with hooks</p>
              </div>

              <div className="p-5 bg-white border border-gray-200 rounded-xl hover:border-purple-200 hover:shadow-sm transition-all">
                <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center mb-3">
                  <Layers size={22} strokeWidth={1.5} className="text-purple-600" />
                </div>
                <p className="font-semibold text-base mb-1">Design Systems</p>
                <p className="text-sm text-muted-foreground">Mantine, ShadCN, or your own</p>
              </div>

              <div className="p-5 bg-white border border-gray-200 rounded-xl hover:border-orange-200 hover:shadow-sm transition-all">
                <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-orange-500/10 to-amber-500/10 flex items-center justify-center mb-3">
                  <LayoutGrid size={22} strokeWidth={1.5} className="text-orange-600" />
                </div>
                <p className="font-semibold text-base mb-1">Full Layouts</p>
                <p className="text-sm text-muted-foreground">Cards, forms, lists, modals, tabs</p>
              </div>
            </div>
          </div>

          {/* Right Side - Example Prompts */}
          <div>
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-6">Try These Prompts</p>

            <div className="flex flex-col gap-3">
              {EXAMPLE_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  className="group relative p-4 bg-white border border-gray-200 rounded-xl text-left transition-all hover:border-blue-400 hover:shadow-md"
                  onClick={() => handlePromptClick(prompt)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-base text-gray-700 group-hover:text-gray-900">
                      {prompt}
                    </span>
                    <div className="flex items-center gap-2 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0">
                      <Play size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <p className="text-sm text-blue-600 mt-4 font-medium">
              Click any prompt to see it generated instantly
            </p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Components + Code Section */}
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Components List */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <Package size={20} strokeWidth={1.5} />
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Supported Components</p>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {COMPONENTS.map((comp) => (
                <div key={comp.name} className="flex items-start gap-3 py-2">
                  <code className="text-sm bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-700 px-2 py-1 rounded-lg font-mono min-w-[90px] border border-blue-100">
                    {comp.name}
                  </code>
                  <span className="text-sm text-muted-foreground leading-relaxed">{comp.desc}</span>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mt-5">
              Plus Image, Tabs, Modal, Slider, DatePicker, and more.
            </p>
          </div>

          {/* Example JSON - Modern Code Block */}
          <div className="md:col-span-7">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <FileCode size={20} strokeWidth={1.5} />
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Example A2UI JSON</p>
              </div>
              <button
                className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1.5"
                onClick={() => handleCopy(exampleJson)}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <div className="rounded-xl border border-gray-200 bg-[#1a1b1e] overflow-hidden shadow-lg">
              <div className="px-4 py-2 bg-[#161b22] border-b border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">JSON</span>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                </div>
              </div>

              <pre className="text-sm text-[#e6edf3] p-5 overflow-x-auto font-mono leading-relaxed">
                {exampleJson}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Quick Start - Enhanced Section */}
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <Terminal size={24} strokeWidth={1.5} />
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Quick Start</p>
          </div>
          <h2 className="text-3xl font-semibold mb-3">Get started in minutes</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Integrate A2UI Bridge into your React application with just a few lines of code.
            Connect your LLM, map your components, and start generating UIs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white text-base flex items-center justify-center font-semibold">1</div>
              <div>
                <p className="text-lg font-semibold">Install packages</p>
                <p className="text-sm text-muted-foreground">Add the core library and React bindings</p>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-[#1a1b1e] overflow-hidden shadow-md">
              <div className="px-4 py-2 bg-[#161b22] border-b border-white/10">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Terminal</span>
              </div>
              <pre className="text-sm text-[#e6edf3] p-4 font-mono overflow-x-auto">npm install @a2ui-bridge/core \
  @a2ui-bridge/react</pre>
            </div>
          </div>

          {/* Step 2 */}
          <div className="group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white text-base flex items-center justify-center font-semibold">2</div>
              <div>
                <p className="text-lg font-semibold">Create adapters</p>
                <p className="text-sm text-muted-foreground">Map A2UI components to your design system</p>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-[#1a1b1e] overflow-hidden shadow-md">
              <div className="px-4 py-2 bg-[#161b22] border-b border-white/10">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">TypeScript</span>
              </div>
              <pre className="text-sm text-[#e6edf3] p-4 font-mono overflow-x-auto leading-relaxed">{`const adapters = {
  Button: createAdapter(
    MantineButton,
    { mapProps: (p) => ({
      children: p.child
    })}
  ),
  // ... more adapters
};`}</pre>
            </div>
          </div>

          {/* Step 3 */}
          <div className="group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white text-base flex items-center justify-center font-semibold">3</div>
              <div>
                <p className="text-lg font-semibold">Render surface</p>
                <p className="text-sm text-muted-foreground">Connect your LLM and render the UI</p>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-[#1a1b1e] overflow-hidden shadow-md">
              <div className="px-4 py-2 bg-[#161b22] border-b border-white/10">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">React</span>
              </div>
              <pre className="text-sm text-[#e6edf3] p-4 font-mono overflow-x-auto leading-relaxed">{`function App() {
  const processor =
    useA2uiProcessor();

  return (
    <Surface
      processor={processor}
      components={adapters}
    />
  );
}`}</pre>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/southleft/a2ui-bridge"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-base text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github size={16} />
                Repository
              </a>
              <a
                href="https://github.com/google/A2UI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-base text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink size={16} />
                A2UI Protocol
              </a>
            </div>
            <p className="text-base text-muted-foreground">
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
