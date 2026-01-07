import { Link, useLocation } from 'react-router-dom';
import { Github, ExternalLink, Menu, X } from 'lucide-react';
import { useState } from 'react';

const NAV_LINKS = [
  { path: '/learn', label: 'Learn' },
  { path: '/architecture', label: 'Architecture' },
  { path: '/use-cases', label: 'Use Cases' },
  { path: '/teams', label: 'For Teams' },
  { path: '/demo', label: 'Demo' },
];

export function PageHeader() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="py-5 border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link to="/" className="text-2xl hover:text-[#006699] transition-colors text-title">
              A2UI Bridge
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-lg transition-colors text-nav ${
                    location.pathname === link.path
                      ? 'text-[#006699] font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/southleft/a2ui-bridge"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github size={18} />
              <span className="hidden lg:inline">GitHub</span>
            </a>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-lg py-2 transition-colors ${
                    location.pathname === link.path
                      ? 'text-[#006699] font-medium'
                      : 'text-gray-600'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://github.com/southleft/a2ui-bridge"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-semibold text-gray-600 py-2"
              >
                <Github size={18} />
                GitHub
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export function PageFooter() {
  return (
    <footer className="py-12 border-t border-gray-200 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="text-xl text-title">
              A2UI Bridge
            </Link>
            <p className="text-base text-muted-foreground mt-3 text-feature">
              A React implementation of Google's A2UI protocol for AI-generated user interfaces.
            </p>
          </div>

          {/* Learn */}
          <div>
            <p className="text-sm text-muted-foreground mb-4 text-label">Learn</p>
            <div className="flex flex-col gap-3">
              <Link to="/learn" className="text-base text-gray-600 hover:text-gray-900 transition-colors text-nav">
                What is A2UI?
              </Link>
              <Link to="/architecture" className="text-base text-gray-600 hover:text-gray-900 transition-colors text-nav">
                Architecture
              </Link>
              <Link to="/use-cases" className="text-base text-gray-600 hover:text-gray-900 transition-colors text-nav">
                Use Cases
              </Link>
              <Link to="/demo" className="text-base text-gray-600 hover:text-gray-900 transition-colors text-nav">
                Interactive Demo
              </Link>
            </div>
          </div>

          {/* Adopt */}
          <div>
            <p className="text-sm text-muted-foreground mb-4 text-label">Adopt</p>
            <div className="flex flex-col gap-3">
              <Link to="/teams" className="text-base text-gray-600 hover:text-gray-900 transition-colors text-nav">
                For Teams
              </Link>
              <a
                href="https://github.com/southleft/a2ui-bridge#quick-start"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-gray-600 hover:text-gray-900 transition-colors text-nav"
              >
                Quick Start Guide
              </a>
              <a
                href="https://github.com/southleft/a2ui-bridge"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-gray-600 hover:text-gray-900 transition-colors text-nav"
              >
                Documentation
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <p className="text-sm text-muted-foreground mb-4 text-label">Resources</p>
            <div className="flex flex-col gap-3">
              <a
                href="https://a2ui.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-base text-gray-600 hover:text-gray-900 transition-colors text-nav"
              >
                A2UI Protocol
                <ExternalLink size={14} />
              </a>
              <a
                href="https://github.com/google/A2UI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-base text-gray-600 hover:text-gray-900 transition-colors text-nav"
              >
                Google A2UI
                <ExternalLink size={14} />
              </a>
              <a
                href="https://github.com/southleft/a2ui-bridge"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-base text-gray-600 hover:text-gray-900 transition-colors text-nav"
              >
                GitHub Repository
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
          <p className="text-base text-muted-foreground text-caption">
            Built by{' '}
            <a
              href="https://southleft.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Southleft
            </a>
          </p>
          <p className="text-base text-muted-foreground text-caption">
            A2UI Protocol by Google • Apache 2.0 License
          </p>
        </div>
      </div>
    </footer>
  );
}

interface PageLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

export function PageLayout({ children, showHeader = true, showFooter = true }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      {showHeader && <PageHeader />}
      <main className="flex-1">{children}</main>
      {showFooter && <PageFooter />}
    </div>
  );
}
