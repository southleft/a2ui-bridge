import { Link } from 'react-router-dom';
import { PageLayout } from './shared/PageLayout';
import { SEO } from '@/components/shared/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Code,
  FileJson,
  Layers,
  CheckCircle,
  XCircle,
  ExternalLink,
  Workflow,
  Server,
  Sparkles,
} from 'lucide-react';

export function Learn() {
  return (
    <PageLayout>
      <SEO
        title="What is A2UI?"
        description="Learn about A2UI (Agent-to-User Interface), Google's open protocol that enables AI agents to generate rich, interactive user interfaces safely and declaratively."
        path="/learn"
      />
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <Badge className="bg-[#006699]/10 text-[#006699] hover:bg-[#006699]/10 text-base px-3 py-1">
              v0.8 Public Preview
            </Badge>
            <Badge variant="outline" className="text-base px-3 py-1">
              Apache 2.0 License
            </Badge>
          </div>

          <h1 className="text-5xl leading-[1.1] tracking-tight mb-6 text-hero">
            What is <span className="text-brand">A2UI</span>?
          </h1>

          <p className="text-xl text-muted-foreground mb-8 text-lead">
            A2UI (Agent-to-User Interface) is an open protocol from Google that enables AI agents
            to generate rich, interactive user interfaces safely and declaratively. Instead of
            generating code, agents describe UIs as structured data that clients render natively.
          </p>

          <div className="flex items-center gap-4">
            <Button
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 text-lg h-14 px-8"
              asChild
            >
              <Link to="/demo">
                Try the Demo
                <ArrowRight size={22} className="ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg h-14 px-8" asChild>
              <a href="https://a2ui.org" target="_blank" rel="noopener noreferrer">
                Official Protocol
                <ExternalLink size={18} className="ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      {/* The Core Concept */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl mb-5 text-display">The Core Concept</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-subtitle">
            A2UI solves a fundamental challenge: how to safely transmit sophisticated UIs
            across trust boundaries without executing arbitrary code.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="p-8 bg-white border border-gray-200 rounded-sm">
            <div className="w-16 h-16 rounded-sm bg-[#006699]/10 flex items-center justify-center mb-6">
              <FileJson size={32} strokeWidth={1.5} className="text-[#006699]" />
            </div>
            <h3 className="text-2xl mb-3 text-headline">Agents Describe</h3>
            <p className="text-lg text-muted-foreground text-feature">
              AI agents generate declarative JSON that describes UI structure and data.
              No code, no framework specifics, just a universal recipe.
            </p>
          </div>

          <div className="p-8 bg-white border border-gray-200 rounded-sm">
            <div className="w-16 h-16 rounded-sm bg-[#006699]/10 flex items-center justify-center mb-6">
              <Layers size={32} strokeWidth={1.5} className="text-[#006699]" />
            </div>
            <h3 className="text-2xl mb-3 text-headline">Catalogs Define</h3>
            <p className="text-lg text-muted-foreground text-feature">
              Pre-approved component catalogs determine what UI elements are available.
              Clients control the vocabulary, agents work within those bounds.
            </p>
          </div>

          <div className="p-8 bg-white border border-gray-200 rounded-sm">
            <div className="w-16 h-16 rounded-sm bg-[#006699]/10 flex items-center justify-center mb-6">
              <Code size={32} strokeWidth={1.5} className="text-[#006699]" />
            </div>
            <h3 className="text-2xl mb-3 text-headline">Clients Render</h3>
            <p className="text-lg text-muted-foreground text-feature">
              Your app maps abstract components to your design system. "Button" becomes
              your button, styled your way, with your behavior.
            </p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Architecture Diagram */}
      <div className="max-w-7xl mx-auto px-8 py-20 bg-white">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <Workflow size={28} strokeWidth={1.5} />
            <p className="text-muted-foreground text-label">
              Architecture
            </p>
          </div>
          <h2 className="text-4xl mb-5 text-display">How It Works</h2>
        </div>

        {/* Flow Diagram */}
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-0">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center max-w-[180px]">
              <div className="w-20 h-20 rounded-full bg-[#006699] text-white flex items-center justify-center mb-4">
                <span className="text-2xl text-strong">LLM</span>
              </div>
              <p className="text-lg text-headline">AI Agent</p>
              <p className="text-sm text-muted-foreground mt-1 text-caption">Generates A2UI JSON</p>
            </div>

            <div className="hidden lg:block">
              <ArrowRight size={32} className="text-gray-300" />
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center max-w-[180px]">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <FileJson size={32} strokeWidth={1.5} className="text-gray-600" />
              </div>
              <p className="text-lg text-headline">A2UI JSON</p>
              <p className="text-sm text-muted-foreground mt-1 text-caption">Declarative UI recipe</p>
            </div>

            <div className="hidden lg:block">
              <ArrowRight size={32} className="text-gray-300" />
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center max-w-[180px]">
              <div className="w-20 h-20 rounded-full bg-[#006699]/10 flex items-center justify-center mb-4">
                <span className="text-lg text-[#006699] text-strong">Bridge</span>
              </div>
              <p className="text-lg text-headline">A2UI Bridge</p>
              <p className="text-sm text-muted-foreground mt-1 text-caption">Maps to your components</p>
            </div>

            <div className="hidden lg:block">
              <ArrowRight size={32} className="text-gray-300" />
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center max-w-[180px]">
              <div className="w-20 h-20 rounded-full bg-gray-900 text-white flex items-center justify-center mb-4">
                <span className="text-lg text-strong">UI</span>
              </div>
              <p className="text-lg text-headline">Native Components</p>
              <p className="text-sm text-muted-foreground mt-1 text-caption">Your design system</p>
            </div>
          </div>

          <div className="mt-12 p-6 bg-gray-50 border border-gray-200 rounded-sm">
            <p className="text-lg text-center text-muted-foreground">
              <strong className="text-foreground">Key insight:</strong> The agent never sees or
              executes your code. It only knows the component vocabulary you expose through your
              catalog. This separation is what makes A2UI secure by design.
            </p>
          </div>
        </div>
      </div>

      <Separator />

      {/* MCP Integration Preview */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <Server size={28} strokeWidth={1.5} className="text-[#8b5cf6]" />
            <p className="text-muted-foreground text-label">
              Enterprise Enhancement
            </p>
          </div>
          <h2 className="text-4xl mb-5 text-display">
            Supercharge with <span className="text-[#8b5cf6]">MCP</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-subtitle">
            A2UI works beautifully on its own. Add the Model Context Protocol (MCP) for
            component intelligence, validation, and enterprise-grade reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="p-8 bg-gradient-to-br from-[#8b5cf6]/5 to-[#8b5cf6]/10 border border-[#8b5cf6]/20 rounded-sm">
            <div className="w-16 h-16 rounded-sm bg-[#8b5cf6] flex items-center justify-center mb-6">
              <Layers size={32} strokeWidth={1.5} className="text-white" />
            </div>
            <h3 className="text-2xl mb-3 text-headline">Catalog MCP</h3>
            <p className="text-lg text-muted-foreground mb-4 text-feature">
              Expose your component catalog to AI via queryable tools. Get validated
              components, consistent layouts, and fewer errors.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-base text-muted-foreground">
                <CheckCircle size={16} className="text-[#8b5cf6]" />
                <code className="text-sm bg-[#8b5cf6]/10 px-2 py-0.5 rounded">list_components()</code>
              </li>
              <li className="flex items-center gap-2 text-base text-muted-foreground">
                <CheckCircle size={16} className="text-[#8b5cf6]" />
                <code className="text-sm bg-[#8b5cf6]/10 px-2 py-0.5 rounded">get_component_schema()</code>
              </li>
              <li className="flex items-center gap-2 text-base text-muted-foreground">
                <CheckCircle size={16} className="text-[#8b5cf6]" />
                <code className="text-sm bg-[#8b5cf6]/10 px-2 py-0.5 rounded">validate_a2ui()</code>
              </li>
            </ul>
          </div>

          <div className="p-8 bg-white border border-gray-200 rounded-sm">
            <div className="w-16 h-16 rounded-sm bg-gray-900 flex items-center justify-center mb-6">
              <Sparkles size={32} strokeWidth={1.5} className="text-white" />
            </div>
            <h3 className="text-2xl mb-3 text-headline">The Benefits</h3>
            <p className="text-lg text-muted-foreground mb-4 text-feature">
              MCP makes AI smarter about your design system, so the A2UI it
              produces is less guessy and more correct.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-base text-muted-foreground">
                <CheckCircle size={16} className="text-green-600" />
                No hallucinated components
              </li>
              <li className="flex items-center gap-2 text-base text-muted-foreground">
                <CheckCircle size={16} className="text-green-600" />
                Consistent layout patterns
              </li>
              <li className="flex items-center gap-2 text-base text-muted-foreground">
                <CheckCircle size={16} className="text-green-600" />
                Pre-render validation
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="text-lg h-14 px-8" asChild>
            <Link to="/architecture">
              Deep Dive: A2UI + MCP Architecture
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>

      <Separator />

      {/* Why Declarative Matters */}
      <div className="max-w-7xl mx-auto px-8 py-20 bg-white">
        <div className="text-center mb-14">
          <h2 className="text-4xl mb-5 text-display">Why Declarative Matters</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-subtitle">
            The choice to use declarative JSON over executable code is intentional and
            brings significant benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-white border border-gray-200 rounded-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-sm bg-green-100 flex items-center justify-center">
                <Shield size={28} strokeWidth={1.5} className="text-green-600" />
              </div>
              <h3 className="text-2xl text-headline">Security</h3>
            </div>
            <p className="text-lg text-muted-foreground text-feature">
              No code injection is possible. Agents can only reference pre-approved component
              types from your catalog. Malformed JSON is simply ignored, never executed.
            </p>
          </div>

          <div className="p-8 bg-white border border-gray-200 rounded-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-sm bg-blue-100 flex items-center justify-center">
                <Zap size={28} strokeWidth={1.5} className="text-blue-600" />
              </div>
              <h3 className="text-2xl text-headline">Streaming</h3>
            </div>
            <p className="text-lg text-muted-foreground text-feature">
              Flat, streaming JSON is designed for LLM generation. UIs appear progressively as
              tokens arrive. No need to wait for complete output before rendering.
            </p>
          </div>

          <div className="p-8 bg-white border border-gray-200 rounded-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-sm bg-purple-100 flex items-center justify-center">
                <Globe size={28} strokeWidth={1.5} className="text-purple-600" />
              </div>
              <h3 className="text-2xl text-headline">Portability</h3>
            </div>
            <p className="text-lg text-muted-foreground text-feature">
              The same A2UI JSON works across web, mobile, and desktop. Official implementations
              exist for React (this bridge), Angular, Flutter, and Lit.
            </p>
          </div>

          <div className="p-8 bg-white border border-gray-200 rounded-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-sm bg-orange-100 flex items-center justify-center">
                <CheckCircle size={28} strokeWidth={1.5} className="text-orange-600" />
              </div>
              <h3 className="text-2xl text-headline">Predictability</h3>
            </div>
            <p className="text-lg text-muted-foreground text-feature">
              Schema validation ensures structural correctness before rendering. Your app always
              knows exactly what it's going to display, with no runtime surprises.
            </p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Comparison */}
      <div className="max-w-7xl mx-auto px-8 py-20 bg-white">
        <div className="text-center mb-14">
          <h2 className="text-4xl mb-5 text-display">Compared to Alternatives</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-subtitle">
            There are other approaches to AI-generated UIs. Here's how A2UI compares.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="border border-gray-200 rounded-sm overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200">
              <div className="p-4 text-lg text-headline">Approach</div>
              <div className="p-4 text-lg text-center text-headline">Security</div>
              <div className="p-4 text-lg text-center text-headline">Design System</div>
              <div className="p-4 text-lg text-center text-headline">Performance</div>
            </div>

            {/* A2UI Row */}
            <div className="grid grid-cols-4 border-b border-gray-200 bg-[#006699]/5">
              <div className="p-4">
                <p className="text-[#006699] text-strong">A2UI Protocol</p>
                <p className="text-sm text-muted-foreground text-caption">Declarative JSON</p>
              </div>
              <div className="p-4 flex justify-center">
                <CheckCircle size={24} className="text-green-500" />
              </div>
              <div className="p-4 flex justify-center">
                <CheckCircle size={24} className="text-green-500" />
              </div>
              <div className="p-4 flex justify-center">
                <CheckCircle size={24} className="text-green-500" />
              </div>
            </div>

            {/* Code Generation Row */}
            <div className="grid grid-cols-4 border-b border-gray-200">
              <div className="p-4">
                <p className="text-strong">Code Generation</p>
                <p className="text-sm text-muted-foreground text-caption">LLM writes React/Vue/etc.</p>
              </div>
              <div className="p-4 flex justify-center">
                <XCircle size={24} className="text-red-400" />
              </div>
              <div className="p-4 flex justify-center">
                <span className="text-yellow-500 font-medium">Partial</span>
              </div>
              <div className="p-4 flex justify-center">
                <CheckCircle size={24} className="text-green-500" />
              </div>
            </div>

            {/* Iframe Embedding Row */}
            <div className="grid grid-cols-4">
              <div className="p-4">
                <p className="text-strong">Iframe Embedding</p>
                <p className="text-sm text-muted-foreground text-caption">Remote rendered UIs</p>
              </div>
              <div className="p-4 flex justify-center">
                <span className="text-yellow-500 font-medium">Partial</span>
              </div>
              <div className="p-4 flex justify-center">
                <XCircle size={24} className="text-red-400" />
              </div>
              <div className="p-4 flex justify-center">
                <XCircle size={24} className="text-red-400" />
              </div>
            </div>
          </div>

          <p className="text-base text-muted-foreground mt-6 text-center">
            A2UI combines the expressiveness of code generation with the security of sandboxed
            approaches, while maintaining native performance and design system integration.
          </p>
        </div>
      </div>

      <Separator />

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center">
          <h2 className="text-4xl mb-6 text-display">Ready to see it in action?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-subtitle">
            Try the interactive demo to see how natural language becomes native UI components
            rendered from a real design system.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-[#006699] hover:bg-[#005580] text-lg h-14 px-8"
              asChild
            >
              <Link to="/demo">
                Launch Demo
                <ArrowRight size={22} className="ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg h-14 px-8" asChild>
              <Link to="/use-cases">
                Explore Use Cases
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default Learn;
