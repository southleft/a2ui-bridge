import { Link } from 'react-router-dom';
import { PageLayout } from './shared/PageLayout';
import { SEO } from '@/components/shared/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ArrowRight,
  Code,
  Palette,
  LineChart,
  Shield,
  Users,
  Clock,
  CheckCircle,
  Play,
  ExternalLink,
  Layers,
  Zap,
  FileCode,
  Settings,
} from 'lucide-react';

const ROLES = [
  {
    icon: Code,
    title: 'Engineering Teams',
    subtitle: 'Build the bridge, own the experience',
    points: [
      'Author adapters that map A2UI components to your design system',
      'Full TypeScript support with type-safe component mappings',
      'Test strategies for validating generated UIs',
      'CI/CD integration patterns for adapter validation',
    ],
    cta: 'View adapter examples',
    ctaLink: 'https://github.com/southleft/a2ui-bridge/tree/main/apps/demo/src/adapters',
  },
  {
    icon: Palette,
    title: 'Design System Teams',
    subtitle: 'Extend your system with AI capabilities',
    points: [
      'Define component catalogs that agents can use',
      'Map design tokens to A2UI properties',
      'Maintain visual consistency across generated UIs',
      'Establish patterns for AI-generated layouts',
    ],
    cta: 'Learn about catalogs',
    ctaLink: 'https://a2ui.org/docs/concepts/catalogs',
  },
  {
    icon: LineChart,
    title: 'Product Managers',
    subtitle: 'Faster prototyping, measurable impact',
    points: [
      'Reduce time from concept to working prototype',
      'Enable non-technical stakeholders to explore UI variations',
      'Track adoption and usage metrics for AI-generated features',
      'Prioritize high-value use cases for implementation',
    ],
    cta: 'Explore use cases',
    ctaLink: '/use-cases',
  },
  {
    icon: Shield,
    title: 'Architects & Security',
    subtitle: 'Secure by design, auditable by default',
    points: [
      'Declarative protocol prevents code injection',
      'Component catalog acts as allowlist',
      'Schema validation ensures structural correctness',
      'Audit logging for all generated interfaces',
    ],
    cta: 'Read security docs',
    ctaLink: 'https://a2ui.org/docs/concepts/security',
  },
];

const TIMELINE = [
  {
    phase: 'Phase 1',
    title: 'Proof of Concept',
    duration: '1-2 weeks',
    tasks: [
      'Install A2UI Bridge packages',
      'Create basic adapters for 5-10 components',
      'Connect to your LLM of choice',
      'Run internal demos and gather feedback',
    ],
  },
  {
    phase: 'Phase 2',
    title: 'Design System Integration',
    duration: '2-4 weeks',
    tasks: [
      'Map full component catalog to design system',
      'Implement action handlers for user interactions',
      'Establish styling patterns and token mappings',
      'Create adapter testing framework',
    ],
  },
  {
    phase: 'Phase 3',
    title: 'Production Deployment',
    duration: 'Variable',
    tasks: [
      'Security review and penetration testing',
      'Performance optimization and caching',
      'Monitoring and analytics integration',
      'User documentation and training',
    ],
  },
  {
    phase: 'Phase 4',
    title: 'Expansion & Optimization',
    duration: 'Ongoing',
    tasks: [
      'Add new use cases based on user feedback',
      'Optimize LLM prompts for better UI quality',
      'Expand component catalog as needed',
      'Share learnings across teams',
    ],
  },
];

const SECURITY_POINTS = [
  {
    icon: FileCode,
    title: 'Declarative, Not Executable',
    description:
      'A2UI is pure data. Agents describe UI structure as JSON - no code can be injected or executed.',
  },
  {
    icon: Layers,
    title: 'Catalog Whitelisting',
    description:
      'Only component types in your catalog can be rendered. Unknown types are safely ignored.',
  },
  {
    icon: Settings,
    title: 'Schema Validation',
    description:
      'All incoming messages are validated against the A2UI schema before processing.',
  },
  {
    icon: Zap,
    title: 'Progressive Rendering',
    description:
      'Streaming architecture means malformed partial data is discarded without affecting the UI.',
  },
];

export function Teams() {
  return (
    <PageLayout>
      <SEO
        title="For Teams"
        description="How engineering teams, design system teams, product managers, and architects can leverage A2UI Bridge for AI-powered UI generation."
        path="/teams"
      />
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-6">
            <Users size={20} className="text-[#006699]" />
            <span className="text-base font-medium text-[#006699]">For Teams</span>
          </div>

          <h1 className="text-5xl leading-[1.1] tracking-tight mb-6 text-hero">
            Adopt <span className="text-brand">A2UI</span> in Your Organization
          </h1>

          <p className="text-xl text-muted-foreground mb-8 text-lead">
            A practical guide to integrating AI-generated UIs into your product. Whether you're
            exploring a proof of concept or planning enterprise deployment, here's how to get started.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Button
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 text-lg h-14 px-8"
              asChild
            >
              <a
                href="https://github.com/southleft/a2ui-bridge#quick-start"
                target="_blank"
                rel="noopener noreferrer"
              >
                Quick Start Guide
                <ExternalLink size={18} className="ml-2" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg h-14 px-8" asChild>
              <Link to="/demo">
                Try Demo First
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      {/* Video Placeholder */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <Play size={24} className="text-[#006699]" />
            <p className="text-muted-foreground text-label">
              Video Walkthrough
            </p>
          </div>

          <h2 className="text-4xl mb-6 text-display">See A2UI in Action</h2>

          {/* Video Placeholder Card */}
          <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 rounded-sm overflow-hidden mb-6">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[#006699] flex items-center justify-center mb-4 shadow-lg">
                <Play size={36} className="text-white ml-1" />
              </div>
              <p className="text-xl font-semibold text-gray-700 mb-2">Coming Soon</p>
              <p className="text-base text-muted-foreground max-w-md">
                A step-by-step walkthrough of integrating A2UI Bridge into your enterprise workflow
              </p>
            </div>
          </div>

          <p className="text-lg text-muted-foreground">
            We're preparing a comprehensive video guide. In the meantime, explore the{' '}
            <Link to="/demo" className="text-[#006699] hover:underline">
              interactive demo
            </Link>{' '}
            to see A2UI in action.
          </p>
        </div>
      </div>

      <Separator />

      {/* Role-Based Value */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl mb-5 text-display">Value by Role</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-subtitle">
            Different stakeholders get different benefits from A2UI adoption.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ROLES.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.title}
                className="p-8 bg-white border border-gray-200 rounded-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-sm bg-[#006699]/10 flex items-center justify-center">
                    <Icon size={28} strokeWidth={1.5} className="text-[#006699]" />
                  </div>
                  <div>
                    <h3 className="text-xl text-headline">{role.title}</h3>
                    <p className="text-base text-muted-foreground text-subtitle">{role.subtitle}</p>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {role.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <CheckCircle
                        size={20}
                        className="text-green-500 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-base text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>

                {role.ctaLink.startsWith('/') ? (
                  <Link
                    to={role.ctaLink}
                    className="text-base font-medium text-[#006699] hover:underline inline-flex items-center gap-2"
                  >
                    {role.cta}
                    <ArrowRight size={16} />
                  </Link>
                ) : (
                  <a
                    href={role.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-medium text-[#006699] hover:underline inline-flex items-center gap-2"
                  >
                    {role.cta}
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Adoption Timeline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20 bg-white">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <Clock size={24} strokeWidth={1.5} />
            <p className="text-muted-foreground text-label">
              Adoption Timeline
            </p>
          </div>
          <h2 className="text-4xl mb-5 text-display">Path to Production</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-subtitle">
            A phased approach to adopting A2UI in your organization.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />

            <div className="space-y-8">
              {TIMELINE.map((phase, index) => (
                <div key={phase.phase} className="relative flex gap-4 sm:gap-8">
                  {/* Timeline dot */}
                  <div className="hidden md:flex w-12 h-12 min-w-[3rem] rounded-full bg-[#006699] text-white items-center justify-center font-semibold text-lg flex-shrink-0 z-10">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 bg-gray-50 border border-gray-200 rounded-sm">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <Badge className="md:hidden bg-[#006699] hover:bg-[#006699] text-white">
                        {phase.phase}
                      </Badge>
                      <h4 className="text-xl text-headline">{phase.title}</h4>
                      <Badge variant="outline" className="text-sm">
                        {phase.duration}
                      </Badge>
                    </div>

                    <ul className="space-y-2">
                      {phase.tasks.map((task) => (
                        <li key={task} className="flex items-start gap-3">
                          <CheckCircle
                            size={18}
                            className="text-gray-400 mt-0.5 flex-shrink-0"
                          />
                          <span className="text-base text-muted-foreground">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Security Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <Shield size={24} strokeWidth={1.5} className="text-green-600" />
            <p className="text-muted-foreground text-label">
              Security & Compliance
            </p>
          </div>
          <h2 className="text-4xl mb-5 text-display">Secure by Design</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-subtitle">
            A2UI's declarative architecture provides security guarantees that code-based
            approaches cannot match.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SECURITY_POINTS.map((point) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
                className="p-6 bg-white border border-gray-200 rounded-sm"
              >
                <div className="w-12 h-12 rounded-sm bg-green-100 flex items-center justify-center mb-4">
                  <Icon size={24} strokeWidth={1.5} className="text-green-600" />
                </div>
                <h4 className="text-lg mb-2 text-headline">{point.title}</h4>
                <p className="text-base text-muted-foreground text-feature">{point.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-8 bg-green-50 border border-green-200 rounded-sm max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <Shield size={24} className="text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-lg text-green-800 mb-2 text-headline">
                Enterprise Security Checklist
              </h4>
              <p className="text-base text-green-700 mb-4">
                Before deploying A2UI in production, ensure you've addressed these areas:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-base text-green-700">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} />
                  Component catalog review
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} />
                  Action handler security
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} />
                  LLM prompt injection protection
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} />
                  Rate limiting configuration
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} />
                  Audit logging setup
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} />
                  User authentication integration
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        <div className="text-center">
          <h2 className="text-4xl mb-6 text-display">Ready to get started?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-subtitle">
            Try the interactive demo to see A2UI in action, then check out the quick start guide
            to begin your integration.
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
              <a
                href="https://github.com/southleft/a2ui-bridge"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
                <ExternalLink size={18} className="ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default Teams;
