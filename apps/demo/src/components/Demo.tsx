import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Surface, useA2uiProcessor } from '@a2ui-bridge/react';
import type { ServerToClientMessage, UserAction } from '@a2ui-bridge/core';
import { generateUI, isConfigured, getConfiguredProviders, PROVIDERS, type Provider } from '../services/ai';
import { generateUIWithSnippets, type GenerationStats, type ChatMessage as AIChatMessage } from '../services/snippets';
import { cn } from '@/lib/utils';

// ShadCN Components
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

// Lucide Icons (ShadCN's icon library)
import {
  Code,
  Moon,
  Sun,
  Github,
  Send,
  AlertCircle,
  ArrowLeft,
  Copy,
  Check,
  Download,
  MessageSquare,
  Stethoscope,
  ListChecks,
  ChefHat,
  Plane,
  Banknote,
  Target,
  Loader2,
  X,
  ChevronDown,
  Zap,
  Clock,
  Brain,
} from 'lucide-react';

import { mantineComponents } from '../adapters/mantine';
import { StreamingProgress, StreamingProgressCompact } from './StreamingProgress';
import { A2UIErrorBoundary } from './ErrorBoundary';
import { SEO } from '@/components/shared/SEO';

// Intent-based scenarios (user-centric, not developer-centric)
const SCENARIOS = [
  {
    icon: Stethoscope,
    label: 'Doctor Visit',
    prompt: "I need to schedule a follow-up appointment with my doctor about my prescription refill",
  },
  {
    icon: ListChecks,
    label: 'Get Organized',
    prompt: "I've got a million things to do today and need to get my thoughts organized into a manageable task list",
  },
  {
    icon: ChefHat,
    label: 'Find Recipe',
    prompt: "I want to bake chocolate chip cookies this weekend and need to find a good recipe",
  },
  {
    icon: Plane,
    label: 'Plan Trip',
    prompt: "I'm planning a weekend getaway and need to find and book a hotel room",
  },
  {
    icon: Banknote,
    label: 'Send Money',
    prompt: "I need to send $50 to my roommate for my share of the utilities bill",
  },
  {
    icon: Target,
    label: 'Track Goals',
    prompt: "Help me track my fitness goals for this week - I want to run 3 times and drink more water",
  },
];

// Chat message type
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function Demo() {
  const navigate = useNavigate();
  const location = useLocation();
  const processor = useA2uiProcessor();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [protocolStream, setProtocolStream] = useState<string>('');
  const [parsedMessages, setParsedMessages] = useState<ServerToClientMessage[]>([]);
  const [actionLog, setActionLog] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [provider, setProvider] = useState<Provider>('anthropic');
  const [availableProviders, setAvailableProviders] = useState<Record<Provider, boolean>>({
    anthropic: false,
    openai: false,
    google: false,
  });
  const [providerDropdownOpen, setProviderDropdownOpen] = useState(false);
  const [useSnippets, setUseSnippets] = useState(true); // Enable snippet mode by default
  const [useMcpTools, setUseMcpTools] = useState(false); // MCP tool use for component intelligence
  const [generationStats, setGenerationStats] = useState<GenerationStats | null>(null);

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const streamRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const hasProcessedNavPrompt = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const hasApiKey = isConfigured();

  // Fetch available providers on mount
  useEffect(() => {
    getConfiguredProviders().then((providers) => {
      setAvailableProviders(providers);
      // Auto-select first available provider
      if (providers.anthropic) setProvider('anthropic');
      else if (providers.openai) setProvider('openai');
      else if (providers.google) setProvider('google');
    });
  }, []);

  // Toggle dark mode
  const toggleDarkMode = useCallback(() => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark', newIsDark);
  }, [isDark]);

  // Handle action callbacks from A2UI components
  const handleAction = useCallback((action: UserAction) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${action.actionName}${action.context ? ` | ${JSON.stringify(action.context)}` : ''}`;
    setActionLog((prev) => [...prev.slice(-9), logEntry]);
  }, []);

  // Copy JSON
  const handleCopy = useCallback(() => {
    if (!parsedMessages.length) return;
    navigator.clipboard.writeText(JSON.stringify(parsedMessages, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [parsedMessages]);

  // Download JSON
  const handleDownload = useCallback(() => {
    if (!parsedMessages.length) return;
    const blob = new Blob([JSON.stringify(parsedMessages, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'a2ui-widget.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [parsedMessages]);

  // Cancel generation
  const handleCancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsGenerating(false);
      setChatHistory((prev) => [...prev, {
        role: 'assistant',
        content: 'Generation cancelled.',
        timestamp: new Date(),
      }]);
    }
  }, []);

  // Generate UI from prompt
  const handleGenerate = useCallback(async (inputPrompt?: string) => {
    const textToSend = inputPrompt || prompt;
    if (!textToSend.trim() || isGenerating) return;
    if (!availableProviders[provider]) {
      const envVar = {
        anthropic: 'VITE_ANTHROPIC_API_KEY',
        openai: 'VITE_OPENAI_API_KEY',
        google: 'VITE_GOOGLE_API_KEY',
      }[provider];
      setError(`API key not configured. Set ${envVar} in .env file.`);
      return;
    }

    // Add user message to chat
    setChatHistory((prev) => [...prev, {
      role: 'user',
      content: textToSend,
      timestamp: new Date(),
    }]);

    setIsGenerating(true);
    setError(null);
    setProtocolStream('');
    setParsedMessages([]);
    setActionLog([]);
    setPrompt('');
    setShowPreview(false);
    setGenerationStats(null);

    // Create abort controller for cancellation
    abortControllerRef.current = new AbortController();

    processor.processMessages([
      { deleteSurface: { surfaceId: '@default' } },
    ]);

    // Scroll chat to bottom
    setTimeout(() => {
      if (chatScrollRef.current) {
        chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
      }
    }, 50);

    // Convert chat history to format needed by AI (exclude timestamps)
    const conversationHistory: AIChatMessage[] = chatHistory.map(msg => ({
      role: msg.role,
      content: msg.content,
    }));

    // Use snippet-aware generation if enabled, otherwise fallback to traditional
    if (useSnippets) {
      await generateUIWithSnippets(textToSend, {
        signal: abortControllerRef.current.signal,
        onChunk: (chunk) => {
          setProtocolStream((prev) => {
            const newStream = prev + chunk;
            setTimeout(() => {
              if (streamRef.current) {
                streamRef.current.scrollTop = streamRef.current.scrollHeight;
              }
            }, 10);
            return newStream;
          });
        },
        onMessage: (messages) => {
          setParsedMessages(messages);
          processor.processMessages(messages);
          setShowPreview(true);
        },
        onComplete: (stats) => {
          abortControllerRef.current = null;
          setIsGenerating(false);
          setGenerationStats(stats);
          const timeStr = (stats.timeMs / 1000).toFixed(1);
          // Include generated JSON in assistant message for context in follow-up requests
          setProtocolStream((currentStream) => {
            setChatHistory((prev) => [...prev, {
              role: 'assistant',
              content: currentStream || `Generated UI (${timeStr}s, ${stats.snippetsUsed} snippets)`,
              timestamp: new Date(),
            }]);
            return currentStream;
          });
        },
        onError: (err) => {
          abortControllerRef.current = null;
          if (err.name !== 'AbortError') {
            setError(err.message);
          }
          setIsGenerating(false);
        },
      }, provider, conversationHistory);
    } else {
      await generateUI(textToSend, {
        signal: abortControllerRef.current.signal,
        onChunk: (chunk) => {
          setProtocolStream((prev) => {
            const newStream = prev + chunk;
            setTimeout(() => {
              if (streamRef.current) {
                streamRef.current.scrollTop = streamRef.current.scrollHeight;
              }
            }, 10);
            return newStream;
          });
        },
        onMessage: (messages) => {
          setParsedMessages(messages);
          processor.processMessages(messages);
          setShowPreview(true);
        },
        onComplete: () => {
          abortControllerRef.current = null;
          setIsGenerating(false);
          setChatHistory((prev) => [...prev, {
            role: 'assistant',
            content: useMcpTools
              ? 'Here\'s an interface built with component intelligence.'
              : 'Here\'s an interface to help you with that.',
            timestamp: new Date(),
          }]);
        },
        onError: (err) => {
          abortControllerRef.current = null;
          if (err.name !== 'AbortError') {
            setError(err.message);
          }
          setIsGenerating(false);
        },
      }, provider, useMcpTools);
    }
  }, [prompt, availableProviders, provider, isGenerating, processor, useSnippets, useMcpTools]);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleGenerate();
      }
    },
    [handleGenerate]
  );

  // Use scenario - reset conversation and start fresh
  const useScenario = useCallback((scenarioPrompt: string) => {
    // Clear previous conversation when starting a new scenario
    setChatHistory([]);
    processor.processMessages([{ deleteSurface: { surfaceId: '@default' } }]);
    setProtocolStream('');
    setParsedMessages([]);
    setActionLog([]);
    setShowPreview(false);
    // Small delay to ensure state is cleared before generating
    setTimeout(() => {
      handleGenerate(scenarioPrompt);
    }, 50);
  }, [handleGenerate, processor]);

  // Auto-trigger generation if navigated with a prompt from Landing page
  useEffect(() => {
    const navigationPrompt = (location.state as { prompt?: string })?.prompt;
    if (navigationPrompt && hasApiKey && !isGenerating && !hasProcessedNavPrompt.current) {
      // Mark as processed to prevent double-firing (React StrictMode)
      hasProcessedNavPrompt.current = true;
      // Clear the state to prevent re-triggering on subsequent renders
      window.history.replaceState({}, document.title);
      // Small delay to ensure component is fully mounted
      setTimeout(() => {
        handleGenerate(navigationPrompt);
      }, 100);
    }
  }, [location.state, hasApiKey]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <TooltipProvider>
      <SEO
        title="Interactive Demo"
        description="Try A2UI Bridge live. Describe your UI in natural language and watch as AI generates real, interactive React components using your design system."
        path="/demo"
      />
      <div className={cn("h-screen flex flex-col overflow-hidden", isDark ? "dark bg-zinc-900" : "bg-zinc-50")}>
        {/* Header */}
        <header className={cn(
          "h-14 flex items-center justify-between px-4 border-b shrink-0",
          isDark ? "bg-zinc-800 border-zinc-700" : "bg-white border-zinc-200"
        )}>
          <div className="flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Back to Home</TooltipContent>
            </Tooltip>
            <span className={cn("font-semibold", isDark ? "text-zinc-200" : "text-zinc-900")}>A2UI Bridge</span>
            <Badge variant="secondary" className="bg-[hsl(var(--brand-light))] text-[hsl(var(--brand))] border-0">
              Predictive UI
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            {/* Snippet Mode Toggle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={useSnippets ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUseSnippets(!useSnippets)}
                  className={cn(
                    "gap-1.5 text-xs h-8",
                    useSnippets
                      ? "bg-amber-500 hover:bg-amber-600 text-white"
                      : isDark ? "border-zinc-600" : ""
                  )}
                >
                  <Zap className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{useSnippets ? 'Fast Mode' : 'Standard'}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {useSnippets
                  ? 'Snippet composition enabled (faster generation)'
                  : 'Traditional full generation (slower, more flexible)'}
              </TooltipContent>
            </Tooltip>

            {/* MCP Tools Toggle - Only visible when not using snippets */}
            {!useSnippets && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={useMcpTools ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUseMcpTools(!useMcpTools)}
                    className={cn(
                      "gap-1.5 text-xs h-8",
                      useMcpTools
                        ? "bg-violet-500 hover:bg-violet-600 text-white"
                        : isDark ? "border-zinc-600" : ""
                    )}
                  >
                    <Brain className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{useMcpTools ? 'MCP Enhanced' : 'Basic'}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {useMcpTools
                    ? 'AI uses MCP tools to discover components and validate output'
                    : 'Traditional generation without component intelligence'}
                </TooltipContent>
              </Tooltip>
            )}

            {/* Provider Selector */}
            <div className="relative">
              <button
                onClick={() => setProviderDropdownOpen(!providerDropdownOpen)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-sm text-sm font-medium transition-colors",
                  isDark
                    ? "bg-zinc-700 border border-zinc-600 hover:bg-zinc-600 text-zinc-200"
                    : "bg-zinc-100 border border-zinc-200 hover:bg-zinc-200 text-zinc-700"
                )}
              >
                <span>{PROVIDERS[provider].name}</span>
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", providerDropdownOpen && "rotate-180")} />
              </button>
              {providerDropdownOpen && (
                <div
                  className={cn(
                    "absolute right-0 top-full mt-1 py-1 rounded-sm shadow-lg border z-50 min-w-[180px]",
                    isDark ? "bg-zinc-800 border-zinc-700" : "bg-white border-zinc-200"
                  )}
                >
                  {(Object.keys(PROVIDERS) as Provider[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        setProvider(p);
                        setProviderDropdownOpen(false);
                      }}
                      disabled={!availableProviders[p]}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 text-sm text-left transition-colors",
                        provider === p
                          ? isDark ? "bg-zinc-700 text-zinc-200" : "bg-zinc-100 text-zinc-900"
                          : isDark ? "text-zinc-300 hover:bg-zinc-700" : "text-zinc-700 hover:bg-zinc-50",
                        !availableProviders[p] && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <span>{PROVIDERS[p].name}</span>
                      {!availableProviders[p] && (
                        <span className="text-xs text-zinc-400">No API key</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1">
              {parsedMessages.length > 0 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => setSheetOpen(true)}>
                      <Code className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>View Protocol</TooltipContent>
                </Tooltip>
              )}
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isDark ? 'Light mode' : 'Dark mode'}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://github.com/southleft/a2ui-bridge" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>GitHub</TooltipContent>
            </Tooltip>
          </div>
        </header>

        <div className="flex flex-1 min-h-0">
          {/* Left Sidebar - Chat */}
          <aside className={cn(
            "w-[340px] flex flex-col border-r shrink-0 min-h-0",
            isDark ? "bg-zinc-800 border-zinc-700" : "bg-white border-zinc-200"
          )}>
            <div className="p-4 flex flex-col flex-1 min-h-0">
              {/* Scenarios */}
              <div className="mb-4">
                <p className={cn("text-xs font-semibold uppercase tracking-wide mb-3", isDark ? "text-zinc-400" : "text-zinc-500")}>
                  Try a scenario
                </p>
                <div className="flex flex-col gap-1.5">
                  {SCENARIOS.map((scenario) => (
                    <button
                      key={scenario.label}
                      onClick={() => useScenario(scenario.prompt)}
                      disabled={isGenerating}
                      className={cn(
                        "scenario-btn flex items-center gap-2.5 px-3 py-2.5 rounded-sm text-left transition-all",
                        isDark
                          ? "bg-zinc-700/50 border border-zinc-600 hover:bg-zinc-700 hover:border-zinc-500"
                          : "bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 hover:border-zinc-300",
                        isGenerating && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <div className="w-7 h-7 rounded flex items-center justify-center bg-[hsl(var(--brand-light))]">
                        <scenario.icon className="h-3.5 w-3.5 text-[hsl(var(--brand))]" />
                      </div>
                      <span className={cn("text-sm font-medium", isDark ? "text-zinc-200" : "text-zinc-800")}>
                        {scenario.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat History */}
              <div className="flex-1 min-h-0 flex flex-col">
                <p className={cn("text-xs font-semibold uppercase tracking-wide mb-3", isDark ? "text-zinc-400" : "text-zinc-500")}>
                  Conversation
                </p>
                <ScrollArea className={cn(
                  "flex-1 rounded-sm",
                  isDark ? "bg-zinc-900" : "bg-zinc-50"
                )}>
                  <div ref={chatScrollRef} className="p-3 flex flex-col gap-2">
                    {chatHistory.length === 0 ? (
                      <p className={cn("text-sm text-center py-8", isDark ? "text-zinc-500" : "text-zinc-400")}>
                        Tell me what you need help with...
                      </p>
                    ) : (
                      chatHistory.map((msg, i) => (
                        <div
                          key={i}
                          className={cn(
                            "chat-message max-w-[85%]",
                            msg.role === 'user' ? "self-end" : "self-start"
                          )}
                        >
                          <div className={cn(
                            "px-3 py-2 text-sm",
                            msg.role === 'user'
                              ? "bg-[hsl(var(--brand))] text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-sm"
                              : isDark
                                ? "bg-zinc-700 border border-zinc-600 text-zinc-200 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-sm"
                                : "bg-white border border-zinc-200 text-zinc-800 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-sm"
                          )}>
                            {msg.content}
                          </div>
                        </div>
                      ))
                    )}
                    {isGenerating && (
                      <div className="chat-message thinking-indicator self-start max-w-[85%]">
                        <StreamingProgressCompact
                          isGenerating={isGenerating}
                          componentCount={parsedMessages.length}
                          isDark={isDark}
                        />
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>

              {/* Input */}
              <div className="mt-4">
                {error && (
                  <div className={cn(
                    "flex items-start gap-2 p-3 rounded-sm mb-3 text-sm",
                    "bg-red-500/10 text-red-600 border border-red-500/20"
                  )}>
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span className="flex-1">{error}</span>
                    <button onClick={() => setError(null)}>
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                {!Object.values(availableProviders).some(Boolean) && (
                  <div className={cn(
                    "p-3 rounded-sm mb-3 text-sm",
                    "bg-orange-500/10 text-orange-600 border border-orange-500/20"
                  )}>
                    Set API key in .env (VITE_ANTHROPIC_API_KEY, VITE_OPENAI_API_KEY, or VITE_GOOGLE_API_KEY)
                  </div>
                )}
                <div className="flex gap-2 items-end">
                  <Textarea
                    ref={textareaRef}
                    placeholder="What do you need help with?"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    className={cn(
                      "flex-1 resize-none min-h-[42px] max-h-[120px]",
                      isDark ? "bg-zinc-700 border-zinc-600" : "bg-zinc-50 border-zinc-300"
                    )}
                  />
                  <Button
                    onClick={() => handleGenerate()}
                    disabled={!prompt.trim() || !availableProviders[provider] || isGenerating}
                    className="h-[42px] w-[42px] p-0 bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand-dark))]"
                  >
                    {isGenerating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content - Preview */}
          <main className={cn(
            "flex-1 min-h-0 overflow-y-auto p-8",
            isDark ? "bg-zinc-900" : "bg-zinc-50"
          )}>
            <div className="flex flex-col items-center">
            {/* Preview with animation */}
            {showPreview && parsedMessages.length > 0 && (
              <div className="preview-container w-full max-w-[600px]">
                <A2UIErrorBoundary
                  isDark={isDark}
                  onReset={() => {
                    // Reset the surface state
                    processor.processMessages([
                      { deleteSurface: { surfaceId: '@default' } },
                    ]);
                    setShowPreview(false);
                    setParsedMessages([]);
                  }}
                >
                  <Surface
                    processor={processor}
                    components={mantineComponents}
                    onAction={handleAction}
                  />
                </A2UIErrorBoundary>

                {/* Generation Stats */}
                {generationStats && (
                  <div className={cn(
                    "mt-4 p-3 rounded-sm border",
                    isDark ? "border-zinc-700 bg-zinc-800/50" : "border-zinc-200 bg-zinc-50"
                  )}>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className={cn("h-3.5 w-3.5", isDark ? "text-zinc-400" : "text-zinc-500")} />
                      <p className={cn("text-xs font-medium", isDark ? "text-zinc-400" : "text-zinc-500")}>
                        Generation Stats
                      </p>
                    </div>
                    <div className="grid grid-cols-4 gap-3 text-center">
                      <div>
                        <p className={cn("text-lg font-semibold", isDark ? "text-zinc-200" : "text-zinc-800")}>
                          {(generationStats.timeMs / 1000).toFixed(1)}s
                        </p>
                        <p className={cn("text-[10px]", isDark ? "text-zinc-500" : "text-zinc-400")}>Time</p>
                      </div>
                      <div>
                        <p className={cn("text-lg font-semibold", isDark ? "text-zinc-200" : "text-zinc-800")}>
                          {generationStats.snippetsUsed}
                        </p>
                        <p className={cn("text-[10px]", isDark ? "text-zinc-500" : "text-zinc-400")}>Snippets</p>
                      </div>
                      <div>
                        <p className={cn("text-lg font-semibold", isDark ? "text-zinc-200" : "text-zinc-800")}>
                          {generationStats.totalComponents}
                        </p>
                        <p className={cn("text-[10px]", isDark ? "text-zinc-500" : "text-zinc-400")}>Components</p>
                      </div>
                      <div>
                        <p className={cn("text-lg font-semibold", isDark ? "text-zinc-200" : "text-zinc-800")}>
                          ~{generationStats.responseTokensEstimate}
                        </p>
                        <p className={cn("text-[10px]", isDark ? "text-zinc-500" : "text-zinc-400")}>Tokens</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-1">
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-[10px] px-1.5 py-0",
                          generationStats.mode === 'snippets'
                            ? "bg-green-500/10 text-green-600"
                            : generationStats.mode === 'hybrid'
                            ? "bg-amber-500/10 text-amber-600"
                            : "bg-zinc-500/10 text-zinc-600"
                        )}
                      >
                        {generationStats.mode === 'snippets' ? 'Pure Snippets' :
                         generationStats.mode === 'hybrid' ? 'Hybrid' : 'Fallback'}
                      </Badge>
                    </div>
                  </div>
                )}

                {/* Action Log - Expandable */}
                {actionLog.length > 0 && (
                  <div className="mt-4">
                    <p className={cn("text-xs font-medium mb-2", isDark ? "text-zinc-500" : "text-zinc-400")}>
                      User Actions ({actionLog.length})
                    </p>
                    <div className={cn(
                      "flex flex-col gap-1 max-h-[200px] overflow-y-auto rounded border p-2",
                      isDark ? "border-zinc-700 bg-zinc-800/50" : "border-zinc-200 bg-zinc-50"
                    )}>
                      {actionLog.map((log, i) => (
                        <pre
                          key={i}
                          className={cn(
                            "text-[10px] p-1.5 rounded font-mono",
                            isDark ? "bg-zinc-800 text-zinc-400" : "bg-zinc-100 text-zinc-600"
                          )}
                        >
                          {log}
                        </pre>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Empty State */}
            {!showPreview && !isGenerating && parsedMessages.length === 0 && (
              <div className="flex flex-col items-center gap-6">
                <div className={cn(
                  "empty-state-icon w-20 h-20 rounded-full flex items-center justify-center",
                  isDark ? "bg-zinc-800" : "bg-zinc-100"
                )}>
                  <MessageSquare className={cn("h-10 w-10", isDark ? "text-zinc-600" : "text-zinc-400")} />
                </div>
                <div className="text-center">
                  <h2 className={cn("text-2xl font-semibold mb-2", isDark ? "text-zinc-200" : "text-zinc-800")}>
                    Predictive UI Demo
                  </h2>
                  <p className={cn("text-lg max-w-[400px]", isDark ? "text-zinc-400" : "text-zinc-500")}>
                    Describe what you need, and AI will create the perfect interface to help you.
                  </p>
                </div>
                <Badge variant="secondary" className="bg-[hsl(var(--brand-light))] text-[hsl(var(--brand))] border-0 text-sm px-3 py-1">
                  Powered by {PROVIDERS[provider].name.split(' ')[0]} + A2UI Protocol
                </Badge>
              </div>
            )}

            {/* Generating State - Enhanced Streaming Progress */}
            {isGenerating && (
              <StreamingProgress
                isGenerating={isGenerating}
                componentCount={parsedMessages.length}
                streamLength={protocolStream.length}
                isDark={isDark}
                className="py-8"
                onCancel={handleCancel}
              />
            )}
            </div>
          </main>
        </div>

        {/* Protocol Sheet */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent className={cn("w-[400px] sm:w-[540px] flex flex-col", isDark ? "bg-zinc-800 border-zinc-700" : "")}>
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                <span>A2UI Protocol</span>
                {parsedMessages.length > 0 && (
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-0 text-xs">
                    {parsedMessages.length} message{parsedMessages.length !== 1 ? 's' : ''}
                  </Badge>
                )}
              </SheetTitle>
            </SheetHeader>

            {/* Actions */}
            <div className="flex gap-2 py-3 border-b border-zinc-200 dark:border-zinc-700">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                {copied ? 'Copied!' : 'Copy JSON'}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
            </div>

            {/* JSON Content */}
            <ScrollArea className="flex-1 mt-3">
              <div ref={streamRef}>
                {protocolStream ? (
                  <pre className={cn(
                    "text-xs p-4 rounded-sm whitespace-pre-wrap break-words font-mono",
                    isDark ? "bg-zinc-900 text-zinc-300" : "bg-zinc-50 text-zinc-700"
                  )}>
                    {protocolStream}
                  </pre>
                ) : (
                  <p className={cn("text-sm text-center py-8", isDark ? "text-zinc-500" : "text-zinc-400")}>
                    Protocol stream will appear here
                  </p>
                )}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </TooltipProvider>
  );
}

export default Demo;
