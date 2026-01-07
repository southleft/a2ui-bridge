import { Link } from 'react-router-dom';
import { PageLayout } from './shared/PageLayout';
import { SEO } from '@/components/shared/SEO';
import { MermaidDiagram } from './shared/MermaidDiagram';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ArrowRight,
  Layers,
  Server,
  Cpu,
  Component,
  Database,
  Shield,
  Zap,
  CheckCircle,
  ExternalLink,
  GitBranch,
  Package,
} from 'lucide-react';

// Mermaid diagram definitions - optimized for readability with light backgrounds and dark text
const DIAGRAMS = {
  level1: `flowchart LR
    U["User Prompt"] --> AI["AI Model"]
    AI --> |"System Prompt"| JSON["A2UI JSON"]
    JSON --> B["A2UI Bridge"]
    B --> DS["Design System"]
    DS --> UI["Rendered UI"]

    style U fill:#dbeafe,stroke:#2563eb,color:#1e3a8a
    style AI fill:#0284c7,stroke:#0369a1,color:#ffffff
    style JSON fill:#fef3c7,stroke:#d97706,color:#92400e
    style B fill:#0284c7,stroke:#0369a1,color:#ffffff
    style DS fill:#dcfce7,stroke:#22c55e,color:#166534
    style UI fill:#d1fae5,stroke:#10b981,color:#065f46`,

  level2: `flowchart TB
    U["User Prompt"] --> AI["AI Model"]
    AI <--> |"Tool Calls"| MCP["Catalog MCP"]
    AI --> JSON["A2UI JSON"]
    JSON --> B["A2UI Bridge"]
    B --> DS["Design System"]
    DS --> UI["Rendered UI"]

    subgraph tools["MCP Tools"]
      direction TB
      T1["list_components()"]
      T2["get_component_schema()"]
      T3["get_layout_patterns()"]
      T4["validate_a2ui()"]
    end

    MCP --- tools

    style U fill:#dbeafe,stroke:#2563eb,color:#1e3a8a
    style AI fill:#0284c7,stroke:#0369a1,color:#ffffff
    style MCP fill:#c4b5fd,stroke:#7c3aed,color:#4c1d95
    style JSON fill:#fef3c7,stroke:#d97706,color:#92400e
    style B fill:#0284c7,stroke:#0369a1,color:#ffffff
    style DS fill:#dcfce7,stroke:#22c55e,color:#166534
    style UI fill:#d1fae5,stroke:#10b981,color:#065f46
    style T1 fill:#ede9fe,stroke:#8b5cf6,color:#4c1d95
    style T2 fill:#ede9fe,stroke:#8b5cf6,color:#4c1d95
    style T3 fill:#ede9fe,stroke:#8b5cf6,color:#4c1d95
    style T4 fill:#ede9fe,stroke:#8b5cf6,color:#4c1d95`,

  level3: `flowchart TB
    subgraph user["User Layer"]
      U["User Intent"]
    end

    subgraph intelligence["Intelligence Layer"]
      AI["AI Model"]
      subgraph mcps["MCP Servers"]
        CAT["Catalog MCP"]
        DOM["Domain MCP"]
      end
    end

    subgraph rendering["Rendering Layer"]
      JSON["A2UI JSON"]
      B["A2UI Bridge"]
      DS["Design System"]
    end

    subgraph output["Output"]
      UI["Interactive UI"]
    end

    U --> AI
    AI <--> CAT
    AI <--> DOM
    AI --> JSON
    JSON --> B
    B --> DS
    DS --> UI
    UI --> |"User Actions"| AI

    style U fill:#dbeafe,stroke:#2563eb,color:#1e3a8a
    style AI fill:#0284c7,stroke:#0369a1,color:#ffffff
    style CAT fill:#c4b5fd,stroke:#7c3aed,color:#4c1d95
    style DOM fill:#fbcfe8,stroke:#db2777,color:#9d174d
    style JSON fill:#fef3c7,stroke:#d97706,color:#92400e
    style B fill:#0284c7,stroke:#0369a1,color:#ffffff
    style DS fill:#dcfce7,stroke:#22c55e,color:#166534
    style UI fill:#d1fae5,stroke:#10b981,color:#065f46`,

  sequence: `sequenceDiagram
    participant U as User
    participant AI as AI Model
    participant CAT as Catalog MCP
    participant DOM as Domain MCP
    participant B as A2UI Bridge
    participant UI as Design System

    U->>AI: "Show my appointments"
    AI->>CAT: list_components()
    CAT-->>AI: [Card, List, Button, ...]
    AI->>CAT: get_layout_patterns("list")
    CAT-->>AI: Card + List pattern
    AI->>DOM: get_appointments(user_id)
    DOM-->>AI: [appointment data]
    Note over AI: Generate A2UI JSON
    AI->>CAT: validate_a2ui(json)
    CAT-->>AI: valid: true
    AI->>B: A2UI JSON
    B->>UI: Render components
    UI-->>U: Interactive appointment list`,
};

const INTEGRATION_LEVELS = [
  {
    level: 1,
    title: 'Basic A2UI',
    subtitle: 'Prompt-Only Generation',
    description: 'AI generates A2UI JSON based on knowledge embedded in system prompts. Great for demos and prototypes.',
    pros: ['Quick to set up', 'No additional infrastructure', 'Works with any LLM'],
    cons: ['AI may hallucinate invalid components', 'Inconsistent layouts', 'No validation'],
    useCase: 'Prototyping, demos, simple use cases',
    diagram: 'level1',
  },
  {
    level: 2,
    title: 'A2UI + Catalog MCP',
    subtitle: 'Component Intelligence',
    description: 'AI queries a Catalog MCP for component definitions, layout patterns, and validation. More consistent, accurate output.',
    pros: ['Validated components', 'Consistent layouts', 'Queryable catalog', 'Fewer errors'],
    cons: ['Requires MCP server', 'Slightly more latency', 'Need to maintain catalog'],
    useCase: 'Production applications, design system teams',
    diagram: 'level2',
  },
  {
    level: 3,
    title: 'Full Stack',
    subtitle: 'Catalog + Domain MCPs',
    description: 'Combine Catalog MCP with Domain MCP for real data access and actions. Complete agentic UI generation.',
    pros: ['Full data integration', 'Real actions', 'Enterprise-ready', 'Highly governable'],
    cons: ['More complex setup', 'Requires domain modeling', 'Multiple MCPs to manage'],
    useCase: 'Enterprise apps, regulated industries, complex workflows',
    diagram: 'level3',
  },
];

const MCP_TOOLS = [
  {
    name: 'list_components',
    description: 'Returns all available A2UI components with descriptions and categories',
    input: '{ category?: string }',
    output: '{ components: [{ name, description, category }] }',
  },
  {
    name: 'get_component_schema',
    description: 'Returns detailed schema for a specific component including props, constraints, and examples',
    input: '{ componentName: string }',
    output: '{ name, props, constraints, examples }',
  },
  {
    name: 'get_layout_patterns',
    description: 'Returns recommended composition patterns for common UI intents',
    input: '{ intent?: string }',
    output: '{ patterns: [{ name, template, components }] }',
  },
  {
    name: 'validate_a2ui',
    description: 'Validates A2UI JSON before rendering, with helpful error messages',
    input: '{ json: object }',
    output: '{ valid: boolean, errors?, suggestions? }',
  },
];

export function Architecture() {
  return (
    <PageLayout>
      <SEO
        title="Architecture"
        description="Deep dive into A2UI Bridge architecture. Learn how to integrate MCP (Model Context Protocol) for smarter, more reliable AI-generated user interfaces."
        path="/architecture"
      />

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <Badge className="bg-[#8b5cf6]/10 text-[#8b5cf6] hover:bg-[#8b5cf6]/10 text-base px-3 py-1">
              Deep Dive
            </Badge>
            <Badge variant="outline" className="text-base px-3 py-1">
              MCP Integration
            </Badge>
          </div>

          <h1 className="text-5xl leading-[1.1] tracking-tight mb-6 text-hero">
            A2UI + MCP <span className="text-brand">Architecture</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 text-lead">
            A2UI Bridge works beautifully on its own. Add an MCP and it becomes enterprise-grade.
            This guide explains how to progressively enhance your AI-generated UIs with the
            Model Context Protocol.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
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
              <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer">
                MCP Docs
                <ExternalLink size={18} className="ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      {/* The Key Insight */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20 bg-white">
        <div className="text-center mb-14">
          <h2 className="text-4xl mb-5 text-display">The Key Insight</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-subtitle">
            A2UI and MCP are complementary protocols solving different problems
            in the same architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="p-8 bg-gradient-to-br from-[#006699]/5 to-[#006699]/10 border border-[#006699]/20 rounded-sm">
            <div className="w-16 h-16 rounded-sm bg-[#006699] flex items-center justify-center mb-6">
              <Component size={32} className="text-white" />
            </div>
            <h3 className="text-2xl mb-3 text-headline">A2UI = Rendering Contract</h3>
            <p className="text-lg text-muted-foreground mb-4 text-feature">
              Defines <strong>what can be shown</strong> to users safely. A declarative protocol
              for describing UIs without executing code.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-base text-muted-foreground">
                <CheckCircle size={16} className="text-[#006699]" />
                Safe UI rendering
              </li>
              <li className="flex items-center gap-2 text-base text-muted-foreground">
                <CheckCircle size={16} className="text-[#006699]" />
                Design system integration
              </li>
              <li className="flex items-center gap-2 text-base text-muted-foreground">
                <CheckCircle size={16} className="text-[#006699]" />
                Component catalog
              </li>
            </ul>
          </div>

          <div className="p-8 bg-gradient-to-br from-[#8b5cf6]/5 to-[#8b5cf6]/10 border border-[#8b5cf6]/20 rounded-sm">
            <div className="w-16 h-16 rounded-sm bg-[#8b5cf6] flex items-center justify-center mb-6">
              <Server size={32} className="text-white" />
            </div>
            <h3 className="text-2xl mb-3 text-headline">MCP = Truth Contract</h3>
            <p className="text-lg text-muted-foreground mb-4 text-feature">
              Defines <strong>what the agent knows</strong> and can do. Provides tools,
              resources, and context for intelligent behavior.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-base text-muted-foreground">
                <CheckCircle size={16} className="text-[#8b5cf6]" />
                Queryable knowledge
              </li>
              <li className="flex items-center gap-2 text-base text-muted-foreground">
                <CheckCircle size={16} className="text-[#8b5cf6]" />
                Domain data access
              </li>
              <li className="flex items-center gap-2 text-base text-muted-foreground">
                <CheckCircle size={16} className="text-[#8b5cf6]" />
                Governance & policies
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 p-6 bg-gray-50 border border-gray-200 rounded-sm max-w-4xl mx-auto">
          <p className="text-lg text-center text-muted-foreground">
            <strong className="text-foreground">Together:</strong> MCP makes the agent smarter and more consistent,
            so the A2UI it produces is less guessy and more correct.
          </p>
        </div>
      </div>

      <Separator />

      {/* Integration Levels */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <Layers size={24} className="text-[#006699]" />
            <p className="text-muted-foreground text-label">Progressive Enhancement</p>
          </div>
          <h2 className="text-4xl mb-5 text-display">Integration Levels</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-subtitle">
            Start simple and add sophistication as your needs grow.
            Each level builds on the previous.
          </p>
        </div>

        <div className="flex flex-col gap-20">
          {INTEGRATION_LEVELS.map((level) => (
            <div key={level.level} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              {/* Header Section */}
              <div className="p-4 sm:p-8 border-b border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 min-w-[3.5rem] rounded-full bg-[#006699] text-white text-2xl font-medium flex items-center justify-center flex-shrink-0">
                    {level.level}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-headline">{level.title}</h3>
                    <p className="text-base text-muted-foreground">{level.subtitle}</p>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground mb-8 text-feature max-w-3xl">
                  {level.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <p className="text-sm font-semibold text-green-800 mb-3">Pros</p>
                    <ul className="space-y-2">
                      {level.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-green-700">
                          <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                    <p className="text-sm font-semibold text-amber-800 mb-3">Considerations</p>
                    <ul className="space-y-2">
                      {level.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-amber-700">
                          <span className="text-amber-500 mt-0.5 flex-shrink-0">•</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm font-semibold text-blue-800 mb-3">Best For</p>
                    <p className="text-sm text-blue-700">{level.useCase}</p>
                  </div>
                </div>
              </div>

              {/* Full-width Diagram Section */}
              <div className="p-8 bg-gray-50">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">Architecture Diagram</p>
                <div className="bg-white border border-gray-200 rounded-lg p-6 overflow-x-auto">
                  <MermaidDiagram
                    chart={DIAGRAMS[level.diagram as keyof typeof DIAGRAMS]}
                    className="min-h-[200px]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Sequence Diagram */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20 bg-white">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <GitBranch size={24} className="text-[#006699]" />
            <p className="text-muted-foreground text-label">Request Flow</p>
          </div>
          <h2 className="text-4xl mb-5 text-display">How It All Works Together</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-subtitle">
            A complete request flow showing how user intent becomes a rendered UI
            through the full MCP + A2UI stack.
          </p>
        </div>

        <div className="p-8 bg-gray-50 border border-gray-200 rounded-sm overflow-x-auto">
          <MermaidDiagram chart={DIAGRAMS.sequence} className="min-w-[800px]" />
        </div>
      </div>

      <Separator />

      {/* Catalog MCP API */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <Package size={24} className="text-[#8b5cf6]" />
            <p className="text-muted-foreground text-label">Catalog MCP</p>
          </div>
          <h2 className="text-4xl mb-5 text-display">Available Tools</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-subtitle">
            The Catalog MCP exposes these tools for AI models to query component
            information and validate their output.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MCP_TOOLS.map((tool) => (
            <div key={tool.name} className="p-6 bg-white border border-gray-200 rounded-sm">
              <div className="flex items-center gap-3 mb-4">
                <code className="text-lg font-mono text-[#8b5cf6] bg-[#8b5cf6]/10 px-3 py-1 rounded">
                  {tool.name}()
                </code>
              </div>
              <p className="text-base text-muted-foreground mb-4">{tool.description}</p>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-muted-foreground">Input:</span>{' '}
                  <code className="text-xs bg-gray-100 px-2 py-0.5 rounded font-mono">{tool.input}</code>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Output:</span>{' '}
                  <code className="text-xs bg-gray-100 px-2 py-0.5 rounded font-mono">{tool.output}</code>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Two Types of MCPs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20 bg-white">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <Database size={24} className="text-[#006699]" />
            <p className="text-muted-foreground text-label">MCP Types</p>
          </div>
          <h2 className="text-4xl mb-5 text-display">Two Types of MCPs</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-subtitle">
            In practice, A2UI applications typically use two complementary MCPs
            working together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-gradient-to-br from-[#8b5cf6]/5 to-[#8b5cf6]/10 border border-[#8b5cf6]/20 rounded-sm">
            <div className="w-16 h-16 rounded-sm bg-[#8b5cf6] flex items-center justify-center mb-6">
              <Package size={32} className="text-white" />
            </div>
            <h3 className="text-2xl mb-3 text-headline">Catalog MCP</h3>
            <p className="text-sm text-[#8b5cf6] font-medium mb-4">Semi-reusable, ships with A2UI Bridge</p>
            <p className="text-base text-muted-foreground mb-6">
              Provides component intelligence: what UI elements exist, how they work,
              and how to compose them correctly.
            </p>
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Typical tools:</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• list_components()</li>
                <li>• get_component_schema()</li>
                <li>• get_layout_patterns()</li>
                <li>• validate_a2ui()</li>
              </ul>
            </div>
          </div>

          <div className="p-8 bg-gradient-to-br from-[#ec4899]/5 to-[#ec4899]/10 border border-[#ec4899]/20 rounded-sm">
            <div className="w-16 h-16 rounded-sm bg-[#ec4899] flex items-center justify-center mb-6">
              <Database size={32} className="text-white" />
            </div>
            <h3 className="text-2xl mb-3 text-headline">Domain MCP</h3>
            <p className="text-sm text-[#ec4899] font-medium mb-4">Custom per application, high value</p>
            <p className="text-base text-muted-foreground mb-6">
              Provides domain knowledge: data access, business actions, permissions,
              and workflows specific to your application.
            </p>
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Example tools (medical app):</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• get_patient_records()</li>
                <li>• schedule_appointment()</li>
                <li>• get_lab_results()</li>
                <li>• check_permissions()</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Security */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <Shield size={24} className="text-[#006699]" />
            <p className="text-muted-foreground text-label">Security</p>
          </div>
          <h2 className="text-4xl mb-5 text-display">Security by Design</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-subtitle">
            The combination of A2UI and MCP creates multiple security layers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-gray-200 rounded-sm">
            <div className="w-12 h-12 rounded-sm bg-[#006699]/10 flex items-center justify-center mb-4">
              <Component size={24} className="text-[#006699]" />
            </div>
            <h3 className="text-lg mb-2 text-headline">Component Allowlist</h3>
            <p className="text-base text-muted-foreground">
              A2UI's catalog defines exactly which components can be rendered.
              AI cannot invent new UI elements.
            </p>
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded-sm">
            <div className="w-12 h-12 rounded-sm bg-[#8b5cf6]/10 flex items-center justify-center mb-4">
              <Cpu size={24} className="text-[#8b5cf6]" />
            </div>
            <h3 className="text-lg mb-2 text-headline">Tool Boundaries</h3>
            <p className="text-base text-muted-foreground">
              MCP tools define exactly what actions are possible.
              AI cannot access unauthorized data or operations.
            </p>
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded-sm">
            <div className="w-12 h-12 rounded-sm bg-green-100 flex items-center justify-center mb-4">
              <Shield size={24} className="text-green-600" />
            </div>
            <h3 className="text-lg mb-2 text-headline">Validation Layer</h3>
            <p className="text-base text-muted-foreground">
              All A2UI JSON is validated before rendering.
              Malformed or invalid output is rejected.
            </p>
          </div>
        </div>
      </div>

      <Separator />

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20 bg-white">
        <div className="text-center">
          <h2 className="text-4xl mb-5 text-display">Ready to Go Deeper?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Start with the basics and add MCP integration when you're ready.
            The demo shows both approaches side by side.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-lg h-14 px-8" asChild>
              <Link to="/demo">
                Try the Demo
                <Zap size={20} className="ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg h-14 px-8" asChild>
              <a
                href="https://github.com/southleft/a2ui-bridge"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Source
                <ExternalLink size={18} className="ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default Architecture;
