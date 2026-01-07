import { Link } from 'react-router-dom';
import { PageLayout } from './shared/PageLayout';
import { SEO } from '@/components/shared/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ArrowRight,
  ClipboardList,
  Workflow,
  Terminal,
  MessageSquare,
  Building,
  Sparkles,
  FileSearch,
  LayoutDashboard,
  ShoppingCart,
  Settings,
  Users,
} from 'lucide-react';

const USE_CASES = [
  {
    icon: ClipboardList,
    title: 'Dynamic Data Collection',
    subtitle: 'Context-aware forms generated on demand',
    description:
      'When users need to provide structured information, agents generate bespoke forms based on conversational context. No pre-built forms required - the UI adapts to the specific situation.',
    example: {
      prompt: '"I need to book a specialized reservation for 8 people with dietary restrictions"',
      result: 'Agent generates a custom form with party size, date picker, dietary preference checkboxes, and special requests text area.',
    },
    benefits: ['No hardcoded form templates', 'Context-aware field generation', 'Progressive disclosure of complexity'],
    color: 'blue',
  },
  {
    icon: Workflow,
    title: 'Adaptive Workflows',
    subtitle: 'Approval dashboards and visualizations on the fly',
    description:
      'Enterprise agents generate approval interfaces, data visualizations, and workflow UIs dynamically based on user queries. Complex processes become conversational.',
    example: {
      prompt: '"Show me pending budget approvals for Q4"',
      result: 'Agent generates a dashboard with approval cards, status badges, action buttons, and summary statistics.',
    },
    benefits: ['No screen-per-workflow limitation', 'Real-time data visualization', 'Role-based interface adaptation'],
    color: 'purple',
  },
  {
    icon: Terminal,
    title: 'Internal Tools & Admin',
    subtitle: 'Rapid prototyping for operational interfaces',
    description:
      'Skip the backlog and get internal tools instantly. Agents can generate admin interfaces, data explorers, and operational dashboards from natural language requests.',
    example: {
      prompt: '"Show me all failed orders from last week with retry options"',
      result: 'Agent generates a data table with order details, error messages, status badges, and action buttons for retry/cancel.',
    },
    benefits: ['Instant tool creation', 'No developer time required', 'Iterate through conversation'],
    color: 'green',
  },
  {
    icon: MessageSquare,
    title: 'Conversational Commerce',
    subtitle: 'Rich UI in chat-based experiences',
    description:
      'Enhance customer conversations with interactive elements. Product configurators, comparison tables, and checkout flows can appear naturally within chat interfaces.',
    example: {
      prompt: '"Help me choose a laptop for video editing under $2000"',
      result: 'Agent generates product cards with specs, comparison tables, rating displays, and "Add to Cart" actions.',
    },
    benefits: ['Seamless chat integration', 'Interactive product exploration', 'In-context purchasing'],
    color: 'orange',
  },
  {
    icon: Building,
    title: 'Enterprise Agent UIs',
    subtitle: 'Industry-specific tailored interfaces',
    description:
      'Gemini Enterprise and custom agents render rich, interactive UIs within business applications. Guide employees through complex workflows with AI-generated step-by-step interfaces.',
    example: {
      prompt: '"Process the new vendor onboarding for Acme Corp"',
      result: 'Agent generates a stepper interface with vendor details form, compliance checklist, document upload, and approval workflow.',
    },
    benefits: ['Industry compliance built-in', 'Workflow guidance', 'Audit-ready interfaces'],
    color: 'indigo',
  },
  {
    icon: FileSearch,
    title: 'Search & Discovery',
    subtitle: 'Rich result presentations',
    description:
      'Transform search results into structured, actionable interfaces. Agents can generate cards, lists, filters, and detail views based on what users are looking for.',
    example: {
      prompt: '"Find all contracts expiring in the next 30 days"',
      result: 'Agent generates a list with contract cards, expiration badges, renewal status, and quick action buttons.',
    },
    benefits: ['Contextual result formatting', 'Actionable search results', 'Dynamic filtering'],
    color: 'teal',
  },
];

const INTEGRATION_PATTERNS = [
  {
    icon: LayoutDashboard,
    title: 'Dashboard Extensions',
    description: 'Embed AI-generated widgets and panels within existing dashboards.',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Flows',
    description: 'Product recommendations, configurators, and checkout assistance.',
  },
  {
    icon: Settings,
    title: 'Admin Panels',
    description: 'CRUD interfaces, settings forms, and configuration wizards.',
  },
  {
    icon: Users,
    title: 'Customer Portals',
    description: 'Self-service interfaces, account management, and support flows.',
  },
];

export function UseCases() {
  return (
    <PageLayout>
      <SEO
        title="Use Cases"
        description="Explore real-world applications of A2UI Bridge: dynamic forms, adaptive workflows, internal tools, conversational commerce, and enterprise agent UIs."
        path="/use-cases"
      />
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-6">
            <Sparkles size={20} className="text-[#006699]" />
            <span className="text-base text-[#006699] text-cta">Real-World Applications</span>
          </div>

          <h1 className="text-5xl leading-[1.1] tracking-tight mb-6 text-hero">
            Use Cases for <span className="text-brand">A2UI</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 text-lead">
            From dynamic forms to enterprise workflows, A2UI enables a new class of AI-powered
            user experiences. Here's how teams are using it to deliver value.
          </p>

          <Button
            size="lg"
            className="bg-gray-900 hover:bg-gray-800 text-lg h-14 px-8"
            asChild
          >
            <Link to="/demo">
              Try It Yourself
              <ArrowRight size={22} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>

      <Separator />

      {/* Use Cases Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        <div className="flex flex-col gap-16">
          {USE_CASES.map((useCase, index) => {
            const Icon = useCase.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={useCase.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={isEven ? '' : 'lg:order-2'}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-sm bg-[#006699]/10 flex items-center justify-center">
                      <Icon size={28} strokeWidth={1.5} className="text-[#006699]" />
                    </div>
                    <div>
                      <h3 className="text-2xl text-headline">{useCase.title}</h3>
                      <p className="text-base text-muted-foreground text-subtitle">{useCase.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-lg text-muted-foreground mb-6 text-feature">
                    {useCase.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {useCase.benefits.map((benefit) => (
                      <Badge
                        key={benefit}
                        variant="secondary"
                        className="text-sm px-3 py-1"
                      >
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Example Card */}
                <div className={`p-6 bg-white border border-gray-200 rounded-sm ${isEven ? '' : 'lg:order-1'}`}>
                  <p className="text-muted-foreground mb-4 text-label">
                    Example Interaction
                  </p>

                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-2 text-caption">User says:</p>
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-sm">
                      <p className="text-base text-quote">{useCase.example.prompt}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2 text-caption">Agent generates:</p>
                    <div className="p-4 bg-[#006699]/5 border border-[#006699]/20 rounded-sm">
                      <p className="text-base text-[#006699] text-feature">{useCase.example.result}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Integration Patterns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20 bg-white">
        <div className="text-center mb-14">
          <h2 className="text-4xl mb-5 text-display">Integration Patterns</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-subtitle">
            A2UI fits into various product architectures. Here are common integration points.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INTEGRATION_PATTERNS.map((pattern) => {
            const Icon = pattern.icon;
            return (
              <div
                key={pattern.title}
                className="p-6 border border-gray-200 rounded-sm hover:border-[#006699]/30 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-sm bg-gray-100 flex items-center justify-center mb-4">
                  <Icon size={24} strokeWidth={1.5} className="text-gray-600" />
                </div>
                <h4 className="text-lg mb-2 text-headline">{pattern.title}</h4>
                <p className="text-base text-muted-foreground text-feature">{pattern.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        <div className="text-center">
          <h2 className="text-4xl mb-6 text-display">
            See how these use cases come to life
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-subtitle">
            The interactive demo showcases how natural language becomes working UI components.
            Try different prompts and see A2UI in action.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
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
              <Link to="/teams">
                Adoption Guide
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default UseCases;
