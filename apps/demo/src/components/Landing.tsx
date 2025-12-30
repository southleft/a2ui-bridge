import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PageHeader, PageFooter } from '@/components/shared/PageLayout';
import { SEO } from '@/components/shared/SEO';
import { CodeBlock } from '@/components/shared/CodeBlock';
import {
  ArrowRight,
  FileCode,
  Package,
  Terminal,
  Network,
  Component,
  Layers,
  LayoutGrid,
  Copy,
  Check,
  Play,
  Code,
  Palette,
  LineChart,
  Building,
  Users,
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
      <SEO />
      <PageHeader />

      {/* Hero - Two Column Layout */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Main Message */}
          <div className="flex flex-col gap-8">
            <h1 className="text-5xl leading-[1.08] text-hero">
              Let <span className="text-brand">AI agents</span> build<br />
              real user interfaces
            </h1>

            <p className="text-lg text-muted-foreground max-w-[560px] text-lead">
              A React implementation of Google's A2UI protocol. Describe what you want in natural language, and get working UI components rendered from your design system.
            </p>

            <div className="flex items-center gap-4">
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
            <p className="text-muted-foreground mb-8 text-label">How It Works</p>

            <div className="flex flex-col gap-7">
              <div className="flex gap-5 items-start">
                <Badge className="w-9 h-9 p-0 flex items-center justify-center rounded-full bg-[#006699] hover:bg-[#006699] text-white text-lg">1</Badge>
                <div>
                  <p className="text-lg mb-1 text-headline">Describe your UI</p>
                  <p className="text-base text-muted-foreground text-quote">"Create a contact card with name and email"</p>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <Badge className="w-9 h-9 p-0 flex items-center justify-center rounded-full bg-[#006699] hover:bg-[#006699] text-white text-lg">2</Badge>
                <div>
                  <p className="text-lg mb-1 text-headline">AI generates A2UI JSON</p>
                  <p className="text-base text-muted-foreground text-feature">A structured recipe, not framework-specific code</p>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <Badge className="w-9 h-9 p-0 flex items-center justify-center rounded-full bg-[#006699] hover:bg-[#006699] text-white text-lg">3</Badge>
                <div>
                  <p className="text-lg mb-1 text-headline">Bridge renders components</p>
                  <p className="text-base text-muted-foreground text-feature">Recipe becomes real components from your design system</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Video Walkthrough Placeholder */}
      <div className="max-w-7xl mx-auto px-8 py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <Play size={24} className="text-[#006699]" />
            <p className="text-base font-semibold text-muted-foreground uppercase tracking-wide">
              Video Walkthrough
            </p>
          </div>

          <h2 className="text-4xl mb-6 text-display">See A2UI Bridge in Action</h2>

          {/* Video Placeholder */}
          <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 rounded-sm overflow-hidden mb-6">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[#006699] flex items-center justify-center mb-4 shadow-lg">
                <Play size={36} className="text-white ml-1" />
              </div>
              <p className="text-xl font-semibold text-gray-700 mb-2">Coming Soon</p>
              <p className="text-base text-muted-foreground max-w-md">
                A step-by-step walkthrough of integrating A2UI Bridge into your workflow
              </p>
            </div>
          </div>

          <p className="text-lg text-muted-foreground">
            In the meantime, try the{' '}
            <Link to="/demo" className="text-[#006699] hover:underline font-medium">
              interactive demo
            </Link>{' '}
            to experience A2UI in action.
          </p>
        </div>
      </div>

      <Separator />

      {/* Who Is This For? */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <Users size={24} className="text-[#006699]" />
            <p className="text-muted-foreground text-label">
              Who Is This For?
            </p>
          </div>
          <h2 className="text-3xl mb-5 text-display">Built for Teams That Build Products</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-subtitle">
            Whether you're exploring AI-powered UI generation or planning enterprise deployment,
            A2UI Bridge fits into your existing workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white border border-gray-200 rounded-sm hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-sm bg-[#006699]/10 flex items-center justify-center mb-4">
              <Code size={24} strokeWidth={1.5} className="text-[#006699]" />
            </div>
            <h3 className="text-lg mb-2 text-headline">Engineering Teams</h3>
            <p className="text-sm text-muted-foreground mb-4 text-feature">
              Build adapters that map A2UI components to your design system with full TypeScript support.
            </p>
            <Link to="/teams" className="text-sm text-[#006699] hover:underline inline-flex items-center gap-1 text-cta">
              Learn more <ArrowRight size={14} />
            </Link>
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded-sm hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-sm bg-[#006699]/10 flex items-center justify-center mb-4">
              <Palette size={24} strokeWidth={1.5} className="text-[#006699]" />
            </div>
            <h3 className="text-lg mb-2 text-headline">Design System Teams</h3>
            <p className="text-sm text-muted-foreground mb-4 text-feature">
              Extend your component library with AI capabilities while maintaining visual consistency.
            </p>
            <Link to="/teams" className="text-sm text-[#006699] hover:underline inline-flex items-center gap-1 text-cta">
              Learn more <ArrowRight size={14} />
            </Link>
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded-sm hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-sm bg-[#006699]/10 flex items-center justify-center mb-4">
              <LineChart size={24} strokeWidth={1.5} className="text-[#006699]" />
            </div>
            <h3 className="text-lg mb-2 text-headline">Product Managers</h3>
            <p className="text-sm text-muted-foreground mb-4 text-feature">
              Reduce time from concept to working prototype. Enable rapid iteration without developer bottlenecks.
            </p>
            <Link to="/use-cases" className="text-sm text-[#006699] hover:underline inline-flex items-center gap-1 text-cta">
              Explore use cases <ArrowRight size={14} />
            </Link>
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded-sm hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-sm bg-[#006699]/10 flex items-center justify-center mb-4">
              <Building size={24} strokeWidth={1.5} className="text-[#006699]" />
            </div>
            <h3 className="text-lg mb-2 text-headline">Enterprise Architects</h3>
            <p className="text-sm text-muted-foreground mb-4 text-feature">
              Declarative protocol prevents code injection. Component catalog acts as a secure allowlist.
            </p>
            <Link to="/learn" className="text-sm text-[#006699] hover:underline inline-flex items-center gap-1 text-cta">
              Understand security <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <Separator />

      {/* Value Proposition Section */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl mb-5 text-display">Why A2UI Bridge?</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-subtitle">
            Enable your AI agents to create real, interactive user interfaces without writing UI code.
            Your development team can adopt AI-driven UI generation while maintaining full control over your design system.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Capabilities */}
          <div>
            <p className="text-muted-foreground mb-8 text-label">Capabilities</p>

            <div className="grid grid-cols-2 gap-5">
              <div className="p-6 bg-white border border-gray-200 rounded-sm hover:border-[#006699]/30 hover:shadow-md transition-all">
                <div className="w-14 h-14 rounded-sm bg-[#006699]/10 flex items-center justify-center mb-4">
                  <Network size={28} strokeWidth={1.5} className="text-[#006699]" />
                </div>
                <p className="text-lg mb-2 text-headline">Any LLM</p>
                <p className="text-base text-muted-foreground text-feature">Claude, GPT, Gemini, or local models</p>
              </div>

              <div className="p-6 bg-white border border-gray-200 rounded-sm hover:border-gray-300 hover:shadow-md transition-all">
                <div className="w-14 h-14 rounded-sm bg-gray-100 flex items-center justify-center mb-4">
                  <Component size={28} strokeWidth={1.5} className="text-gray-600" />
                </div>
                <p className="text-lg mb-2 text-headline">React</p>
                <p className="text-base text-muted-foreground text-feature">First-class React support with hooks</p>
              </div>

              <div className="p-6 bg-white border border-gray-200 rounded-sm hover:border-gray-300 hover:shadow-md transition-all">
                <div className="w-14 h-14 rounded-sm bg-gray-100 flex items-center justify-center mb-4">
                  <Layers size={28} strokeWidth={1.5} className="text-gray-600" />
                </div>
                <p className="text-lg mb-2 text-headline">Design Systems</p>
                <p className="text-base text-muted-foreground text-feature">Mantine, ShadCN, or your own</p>
              </div>

              <div className="p-6 bg-white border border-gray-200 rounded-sm hover:border-gray-300 hover:shadow-md transition-all">
                <div className="w-14 h-14 rounded-sm bg-gray-100 flex items-center justify-center mb-4">
                  <LayoutGrid size={28} strokeWidth={1.5} className="text-gray-600" />
                </div>
                <p className="text-lg mb-2 text-headline">Full Layouts</p>
                <p className="text-base text-muted-foreground text-feature">Cards, forms, lists, modals, tabs</p>
              </div>
            </div>
          </div>

          {/* Right Side - Example Prompts */}
          <div>
            <p className="text-muted-foreground mb-8 text-label">Try These Prompts</p>

            <div className="flex flex-col gap-4">
              {EXAMPLE_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  className="group relative p-5 bg-white border border-gray-200 rounded-sm text-left transition-all hover:border-[#006699] hover:shadow-lg"
                  onClick={() => handlePromptClick(prompt)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-lg text-gray-700 group-hover:text-gray-900 text-quote">
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

            <p className="text-base text-[#006699] mt-5 text-cta">
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
              <p className="text-muted-foreground text-label">70+ Supported Components</p>
            </div>

            <div className="flex flex-col gap-5">
              {COMPONENT_CATEGORIES.map((cat) => (
                <div key={cat.category}>
                  <p className="text-muted-foreground mb-2 text-label">{cat.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {cat.components.map((comp) => (
                      <code
                        key={comp.name}
                        className="text-sm bg-[#006699]/5 text-[#006699] px-2.5 py-1 rounded-sm font-mono border border-[#006699]/10 hover:bg-[#006699]/10 transition-colors cursor-default text-technical"
                        title={comp.desc}
                      >
                        {comp.name}
                      </code>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mt-5 text-caption">
              Case-insensitive matching + common aliases (e.g., Toggle → Switch)
            </p>
          </div>

          {/* Example JSON - Modern Code Block */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <FileCode size={24} strokeWidth={1.5} />
                <p className="text-muted-foreground text-label">Example A2UI JSON</p>
              </div>
              <button
                className="px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-sm transition-colors flex items-center gap-2"
                onClick={() => handleCopy(exampleJson)}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <CodeBlock
              language="json"
              label="JSON"
              code={exampleJson}
              showWindowControls
              className="shadow-xl"
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Quick Start - Stacked Vertical Layout */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <Terminal size={28} strokeWidth={1.5} />
            <p className="text-muted-foreground text-label">Quick Start</p>
          </div>
          <h2 className="text-4xl mb-4 text-display">Get started in minutes</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-lead">
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
                <div className="w-12 h-12 rounded-full bg-[#006699] text-white text-xl flex items-center justify-center">1</div>
                <div>
                  <p className="text-2xl text-headline">Install packages</p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-6 text-feature">
                Add the A2UI Bridge packages to your project. The <strong className="text-strong">core</strong> package handles protocol parsing,
                while <strong className="text-strong">react</strong> provides hooks and components for rendering.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="text-base px-3 py-1">@a2ui-bridge/core</Badge>
                <Badge variant="secondary" className="text-base px-3 py-1">@a2ui-bridge/react</Badge>
              </div>
            </div>
            <CodeBlock
              language="bash"
              label="Terminal"
              code="npm install @a2ui-bridge/core @a2ui-bridge/react"
            />
          </div>

          {/* Step 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-8 bg-white border border-gray-200 rounded-sm">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#006699] text-white text-xl flex items-center justify-center">2</div>
                <div>
                  <p className="text-2xl text-headline">Create adapters</p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-6 text-feature">
                Map A2UI component types to your design system. This is where you tell the bridge
                how to render a "Button" or "Card" using Mantine, ShadCN, or your custom components.
              </p>
              <p className="text-lg text-muted-foreground text-feature">
                Each adapter transforms A2UI props into the props your components expect.
                You have full control over styling and behavior.
              </p>
            </div>
            <CodeBlock
              language="typescript"
              label="TypeScript"
              code={`const adapters = {
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
};`}
            />
          </div>

          {/* Step 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-8 bg-white border border-gray-200 rounded-sm">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#006699] text-white text-xl flex items-center justify-center">3</div>
                <div>
                  <p className="text-2xl text-headline">Render surface</p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-6 text-feature">
                Use the <code className="px-2 py-0.5 bg-gray-100 rounded text-base text-technical">useA2uiProcessor</code> hook
                to process A2UI messages from your LLM. The <code className="px-2 py-0.5 bg-gray-100 rounded text-base text-technical">Surface</code> component
                automatically renders the UI.
              </p>
              <p className="text-lg text-muted-foreground text-feature">
                Stream A2UI JSON from any LLM, and watch real components appear in real-time.
              </p>
            </div>
            <CodeBlock
              language="tsx"
              label="React"
              code={`function App() {
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
}`}
            />
          </div>
        </div>
      </div>

      <PageFooter />
    </div>
  );
}

export default Landing;
