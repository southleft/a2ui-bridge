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
  Zap,
  Shield,
  Puzzle,
} from 'lucide-react';
import { useState } from 'react';

// Supported A2UI Components - organized by category (showing highlights, 70+ total)
const COMPONENT_CATEGORIES = [
  {
    category: 'Layout',
    components: [
      { name: 'Row', desc: 'Horizontal flex container' },
      { name: 'Column', desc: 'Vertical flex container' },
      { name: 'Card', desc: 'Content container with border' },
      { name: 'Grid', desc: 'Responsive grid layout' },
      { name: 'Stack', desc: 'Flexible spacing' },
      { name: 'Paper', desc: 'Surface container' },
    ],
  },
  {
    category: 'Typography',
    components: [
      { name: 'Text', desc: 'Semantic text display' },
      { name: 'Title', desc: 'Heading elements' },
      { name: 'Badge', desc: 'Status indicators' },
      { name: 'Avatar', desc: 'User profile images' },
      { name: 'Code', desc: 'Inline code display' },
      { name: 'Highlight', desc: 'Text highlighting' },
    ],
  },
  {
    category: 'Form Inputs',
    components: [
      { name: 'Button', desc: 'Interactive actions' },
      { name: 'TextField', desc: 'Text input with binding' },
      { name: 'Checkbox', desc: 'Boolean toggles' },
      { name: 'Switch', desc: 'Toggle switches' },
      { name: 'Select', desc: 'Dropdown selection' },
      { name: 'MultiSelect', desc: 'Multi-option selection' },
      { name: 'DatePicker', desc: 'Date selection' },
      { name: 'Rating', desc: 'Star ratings' },
    ],
  },
  {
    category: 'Feedback',
    components: [
      { name: 'Alert', desc: 'Contextual messages' },
      { name: 'Progress', desc: 'Progress indicators' },
      { name: 'Notification', desc: 'Toast messages' },
      { name: 'Skeleton', desc: 'Loading placeholders' },
      { name: 'Tooltip', desc: 'Contextual hints' },
    ],
  },
  {
    category: 'Navigation',
    components: [
      { name: 'Tabs', desc: 'Tabbed navigation' },
      { name: 'NavLink', desc: 'Navigation links' },
      { name: 'Stepper', desc: 'Step-by-step flows' },
      { name: 'Breadcrumb', desc: 'Path navigation' },
    ],
  },
  {
    category: 'Overlays & Data',
    components: [
      { name: 'Modal', desc: 'Dialog overlays' },
      { name: 'Drawer', desc: 'Side panels' },
      { name: 'Table', desc: 'Tabular data' },
      { name: 'Accordion', desc: 'Collapsible sections' },
      { name: 'Timeline', desc: 'Chronological events' },
    ],
  },
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
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-semibold">A2UI Bridge</h4>
            <a
              href="https://github.com/southleft/a2ui-bridge"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-lg text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github size={22} />
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Hero - Two Column Layout */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Main Message */}
          <div className="flex flex-col gap-8">
            <h1 className="text-6xl font-semibold leading-[1.1] tracking-tight">
              Let <span className="text-[#006699]">AI agents</span> build<br />
              real user interfaces
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-[580px]">
              A React implementation of Google's A2UI protocol. Describe what you want in natural language, and get working UI components rendered from your design system.
            </p>

            {/* Key Benefits - Inline */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full">
                <Zap size={18} className="text-[#006699]" />
                <span className="text-base font-medium">Instant UI generation</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full">
                <Shield size={18} className="text-[#006699]" />
                <span className="text-base font-medium">Your design system</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full">
                <Puzzle size={18} className="text-[#006699]" />
                <span className="text-base font-medium">Any LLM provider</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-2">
              <Button
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-lg h-14 px-8"
                onClick={() => navigate('/demo')}
              >
                Try the Demo
                <ArrowRight size={22} className="ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg h-14 px-8"
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
          <div className="p-8 bg-white border border-gray-200 rounded-sm shadow-sm">
            <p className="text-base font-semibold text-muted-foreground uppercase tracking-wide mb-8">How It Works</p>

            <div className="flex flex-col gap-7">
              <div className="flex gap-5 items-start">
                <Badge className="w-9 h-9 p-0 flex items-center justify-center rounded-full bg-[#006699] hover:bg-[#006699] text-lg font-semibold">1</Badge>
                <div>
                  <p className="font-semibold text-xl mb-1">Describe your UI</p>
                  <p className="text-lg text-muted-foreground">"Create a contact card with name and email"</p>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <Badge className="w-9 h-9 p-0 flex items-center justify-center rounded-full bg-[#006699] hover:bg-[#006699] text-lg font-semibold">2</Badge>
                <div>
                  <p className="font-semibold text-xl mb-1">AI generates A2UI JSON</p>
                  <p className="text-lg text-muted-foreground">A structured recipe, not framework-specific code</p>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <Badge className="w-9 h-9 p-0 flex items-center justify-center rounded-full bg-[#006699] hover:bg-[#006699] text-lg font-semibold">3</Badge>
                <div>
                  <p className="font-semibold text-xl mb-1">Bridge renders components</p>
                  <p className="text-lg text-muted-foreground">Recipe becomes real components from your design system</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Value Proposition Section */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-semibold mb-5">Why A2UI Bridge?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Enable your AI agents to create real, interactive user interfaces without writing UI code.
            Your development team can adopt AI-driven UI generation while maintaining full control over your design system.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Capabilities */}
          <div>
            <p className="text-base font-semibold text-muted-foreground uppercase tracking-wide mb-8">Capabilities</p>

            <div className="grid grid-cols-2 gap-5">
              <div className="p-6 bg-white border border-gray-200 rounded-sm hover:border-[#006699]/30 hover:shadow-md transition-all">
                <div className="w-14 h-14 rounded-sm bg-[#006699]/10 flex items-center justify-center mb-4">
                  <Network size={28} strokeWidth={1.5} className="text-[#006699]" />
                </div>
                <p className="font-semibold text-lg mb-2">Any LLM</p>
                <p className="text-base text-muted-foreground">Claude, GPT, Gemini, or local models</p>
              </div>

              <div className="p-6 bg-white border border-gray-200 rounded-sm hover:border-gray-300 hover:shadow-md transition-all">
                <div className="w-14 h-14 rounded-sm bg-gray-100 flex items-center justify-center mb-4">
                  <Component size={28} strokeWidth={1.5} className="text-gray-600" />
                </div>
                <p className="font-semibold text-lg mb-2">React</p>
                <p className="text-base text-muted-foreground">First-class React support with hooks</p>
              </div>

              <div className="p-6 bg-white border border-gray-200 rounded-sm hover:border-gray-300 hover:shadow-md transition-all">
                <div className="w-14 h-14 rounded-sm bg-gray-100 flex items-center justify-center mb-4">
                  <Layers size={28} strokeWidth={1.5} className="text-gray-600" />
                </div>
                <p className="font-semibold text-lg mb-2">Design Systems</p>
                <p className="text-base text-muted-foreground">Mantine, ShadCN, or your own</p>
              </div>

              <div className="p-6 bg-white border border-gray-200 rounded-sm hover:border-gray-300 hover:shadow-md transition-all">
                <div className="w-14 h-14 rounded-sm bg-gray-100 flex items-center justify-center mb-4">
                  <LayoutGrid size={28} strokeWidth={1.5} className="text-gray-600" />
                </div>
                <p className="font-semibold text-lg mb-2">Full Layouts</p>
                <p className="text-base text-muted-foreground">Cards, forms, lists, modals, tabs</p>
              </div>
            </div>
          </div>

          {/* Right Side - Example Prompts */}
          <div>
            <p className="text-base font-semibold text-muted-foreground uppercase tracking-wide mb-8">Try These Prompts</p>

            <div className="flex flex-col gap-4">
              {EXAMPLE_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  className="group relative p-5 bg-white border border-gray-200 rounded-sm text-left transition-all hover:border-[#006699] hover:shadow-lg"
                  onClick={() => handlePromptClick(prompt)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-lg text-gray-700 group-hover:text-gray-900">
                      {prompt}
                    </span>
                    <div className="flex items-center gap-2 text-gray-400 group-hover:text-[#006699] transition-colors flex-shrink-0">
                      <Play size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      <ArrowRight
                        size={20}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <p className="text-base text-[#006699] mt-5 font-medium">
              Click any prompt to see it generated instantly
            </p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Components + Code Section */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Components List - Showing highlights from 70+ components */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <Package size={24} strokeWidth={1.5} />
              <p className="text-base font-semibold text-muted-foreground uppercase tracking-wide">70+ Supported Components</p>
            </div>

            <div className="flex flex-col gap-5">
              {COMPONENT_CATEGORIES.map((cat) => (
                <div key={cat.category}>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">{cat.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {cat.components.map((comp) => (
                      <code
                        key={comp.name}
                        className="text-sm bg-[#006699]/5 text-[#006699] px-2.5 py-1 rounded-sm font-mono border border-[#006699]/10 hover:bg-[#006699]/10 transition-colors cursor-default"
                        title={comp.desc}
                      >
                        {comp.name}
                      </code>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mt-5">
              Case-insensitive matching + common aliases (e.g., Toggle → Switch)
            </p>
          </div>

          {/* Example JSON - Modern Code Block */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <FileCode size={24} strokeWidth={1.5} />
                <p className="text-base font-semibold text-muted-foreground uppercase tracking-wide">Example A2UI JSON</p>
              </div>
              <button
                className="px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-sm transition-colors flex items-center gap-2"
                onClick={() => handleCopy(exampleJson)}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <div className="rounded-sm border border-gray-200 bg-[#1a1b1e] overflow-hidden shadow-xl">
              <div className="px-5 py-3 bg-[#161b22] border-b border-white/10 flex items-center justify-between">
                <span className="text-sm font-mono text-gray-400 uppercase tracking-wider">JSON</span>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
              </div>

              <pre className="text-base text-[#e6edf3] p-6 overflow-x-auto font-mono leading-relaxed">
                {exampleJson}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Quick Start - Stacked Vertical Layout */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <Terminal size={28} strokeWidth={1.5} />
            <p className="text-base font-semibold text-muted-foreground uppercase tracking-wide">Quick Start</p>
          </div>
          <h2 className="text-4xl font-semibold mb-4">Get started in minutes</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Integrate A2UI Bridge into your React application with just a few lines of code.
            Connect your LLM, map your components, and start generating UIs.
          </p>
        </div>

        {/* Stacked Steps */}
        <div className="flex flex-col gap-10">
          {/* Step 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-8 bg-white border border-gray-200 rounded-sm">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#006699] text-white text-xl flex items-center justify-center font-semibold">1</div>
                <div>
                  <p className="text-2xl font-semibold">Install packages</p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Add the A2UI Bridge packages to your project. The <strong>core</strong> package handles protocol parsing,
                while <strong>react</strong> provides hooks and components for rendering.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="text-base px-3 py-1">@a2ui-bridge/core</Badge>
                <Badge variant="secondary" className="text-base px-3 py-1">@a2ui-bridge/react</Badge>
              </div>
            </div>
            <div className="rounded-sm border border-gray-200 bg-[#1a1b1e] overflow-hidden shadow-lg">
              <div className="px-5 py-3 bg-[#161b22] border-b border-white/10">
                <span className="text-sm font-mono text-gray-400 uppercase tracking-wider">Terminal</span>
              </div>
              <pre className="text-base text-[#e6edf3] p-5 font-mono overflow-x-auto">npm install @a2ui-bridge/core @a2ui-bridge/react</pre>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-8 bg-white border border-gray-200 rounded-sm">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#006699] text-white text-xl flex items-center justify-center font-semibold">2</div>
                <div>
                  <p className="text-2xl font-semibold">Create adapters</p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Map A2UI component types to your design system. This is where you tell the bridge
                how to render a "Button" or "Card" using Mantine, ShadCN, or your custom components.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Each adapter transforms A2UI props into the props your components expect.
                You have full control over styling and behavior.
              </p>
            </div>
            <div className="rounded-sm border border-gray-200 bg-[#1a1b1e] overflow-hidden shadow-lg">
              <div className="px-5 py-3 bg-[#161b22] border-b border-white/10">
                <span className="text-sm font-mono text-gray-400 uppercase tracking-wider">TypeScript</span>
              </div>
              <pre className="text-base text-[#e6edf3] p-5 font-mono overflow-x-auto leading-relaxed">{`const adapters = {
  Button: createAdapter(
    MantineButton,
    { mapProps: (p) => ({
        children: p.child,
        onClick: p.onAction
      })
    }
  ),
  Card: createAdapter(MantineCard),
  Text: createAdapter(MantineText),
  // ... more adapters
};`}</pre>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-8 bg-white border border-gray-200 rounded-sm">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#006699] text-white text-xl flex items-center justify-center font-semibold">3</div>
                <div>
                  <p className="text-2xl font-semibold">Render surface</p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Use the <code className="px-2 py-0.5 bg-gray-100 rounded text-base">useA2uiProcessor</code> hook
                to process A2UI messages from your LLM. The <code className="px-2 py-0.5 bg-gray-100 rounded text-base">Surface</code> component
                automatically renders the UI.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Stream A2UI JSON from any LLM, and watch real components appear in real-time.
              </p>
            </div>
            <div className="rounded-sm border border-gray-200 bg-[#1a1b1e] overflow-hidden shadow-lg">
              <div className="px-5 py-3 bg-[#161b22] border-b border-white/10">
                <span className="text-sm font-mono text-gray-400 uppercase tracking-wider">React</span>
              </div>
              <pre className="text-base text-[#e6edf3] p-5 font-mono overflow-x-auto leading-relaxed">{`function App() {
  const processor = useA2uiProcessor();

  // Feed A2UI JSON from your LLM
  useEffect(() => {
    streamFromLLM(userPrompt, (json) => {
      processor.processMessages(json);
    });
  }, [userPrompt]);

  return (
    <Surface
      processor={processor}
      components={adapters}
      onAction={handleUserAction}
    />
  );
}`}</pre>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-8">
              <a
                href="https://github.com/southleft/a2ui-bridge"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-lg text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github size={18} />
                Repository
              </a>
              <a
                href="https://github.com/google/A2UI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-lg text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink size={18} />
                A2UI Protocol
              </a>
            </div>
            <p className="text-lg text-muted-foreground">
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
