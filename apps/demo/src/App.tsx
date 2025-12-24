import { useState, useCallback, useEffect, useRef } from 'react';
import { Surface, useA2uiProcessor } from '@a2ui-bridge/react';
import { shadcnComponents } from '@a2ui-bridge/react-shadcn';
import type { ServerToClientMessage, UserAction } from '@a2ui-bridge/core';
import { allScenarios, type DemoScenario } from './scenarios';
import { Sparkles, Code, Moon, Sun, Github } from 'lucide-react';

function App() {
  const processor = useA2uiProcessor();
  const [selectedScenario, setSelectedScenario] = useState<DemoScenario | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [showJson, setShowJson] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [actionLog, setActionLog] = useState<string[]>([]);
  const streamingRef = useRef<number | null>(null);

  // Toggle dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  // Handle action callbacks from A2UI components
  const handleAction = useCallback((action: UserAction) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] Action: ${action.actionName} | Component: ${action.sourceComponentId}${action.context ? ` | Data: ${JSON.stringify(action.context)}` : ''}`;
    setActionLog((prev) => [...prev.slice(-9), logEntry]);
  }, []);

  // Stream messages with delay to simulate LLM streaming
  const streamMessages = useCallback(
    (messages: ServerToClientMessage[], startIndex: number = 0) => {
      if (startIndex >= messages.length) {
        setIsStreaming(false);
        return;
      }

      setIsStreaming(true);
      setMessageIndex(startIndex);
      processor.processMessages([messages[startIndex]]);

      streamingRef.current = window.setTimeout(() => {
        streamMessages(messages, startIndex + 1);
      }, 800);
    },
    [processor]
  );

  // Run selected scenario
  const runScenario = useCallback(
    (scenario: DemoScenario) => {
      // Clear previous
      if (streamingRef.current) {
        clearTimeout(streamingRef.current);
      }
      processor.processMessages([
        {
          deleteSurface: {
            surfaceId: '@default',
          },
        },
      ]);
      setActionLog([]);
      setSelectedScenario(scenario);
      setMessageIndex(0);

      // Start streaming
      setTimeout(() => {
        streamMessages(scenario.messages);
      }, 100);
    },
    [processor, streamMessages]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamingRef.current) {
        clearTimeout(streamingRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-semibold">A2UI Bridge Demo</h1>
              <span className="hidden sm:inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                React + ShadCN
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowJson(!showJson)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Toggle JSON View"
              >
                <Code className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Toggle Theme"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <a
                href="https://github.com/southleft/a2ui-bridge"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="GitHub Repository"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Scenario Selection */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border p-4">
              <h2 className="text-lg font-semibold mb-4">Demo Scenarios</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Select a scenario to see A2UI protocol messages rendered in real-time
              </p>
              <div className="space-y-2">
                {allScenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => runScenario(scenario)}
                    disabled={isStreaming}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedScenario?.id === scenario.id
                        ? 'border-primary bg-primary/5'
                        : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800'
                    } ${isStreaming ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="font-medium">{scenario.title}</div>
                    <div className="text-sm text-muted-foreground">{scenario.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Log */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border p-4">
              <h2 className="text-lg font-semibold mb-4">Action Log</h2>
              <div className="space-y-1 text-sm font-mono">
                {actionLog.length === 0 ? (
                  <p className="text-muted-foreground">Click buttons to see actions logged here</p>
                ) : (
                  actionLog.map((log, i) => (
                    <div key={i} className="text-xs p-2 bg-slate-50 dark:bg-slate-800 rounded">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Rendered Output */}
          <div className="lg:col-span-2 space-y-4">
            {/* Status Bar */}
            {selectedScenario && (
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  {isStreaming ? (
                    <>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      <span className="text-green-600 dark:text-green-400">Streaming...</span>
                    </>
                  ) : (
                    <>
                      <span className="h-2 w-2 rounded-full bg-slate-300"></span>
                      <span className="text-muted-foreground">Ready</span>
                    </>
                  )}
                </div>
                <div className="text-muted-foreground">
                  Message {messageIndex + 1} / {selectedScenario.messages.length}
                </div>
              </div>
            )}

            {/* A2UI Surface */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border p-6 min-h-[400px]">
              {selectedScenario ? (
                <Surface
                  processor={processor}
                  components={shadcnComponents}
                  onAction={handleAction}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-[400px] text-center">
                  <Sparkles className="w-12 h-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Select a Scenario</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Choose a demo scenario from the left panel to see the A2UI protocol in action.
                    Each scenario demonstrates different UI patterns and streaming behaviors.
                  </p>
                </div>
              )}
            </div>

            {/* JSON View */}
            {showJson && selectedScenario && (
              <div className="bg-slate-900 rounded-xl p-4 overflow-auto max-h-[400px]">
                <h3 className="text-sm font-semibold text-slate-400 mb-2">
                  Current Message JSON
                </h3>
                <pre className="text-xs text-slate-300 font-mono">
                  {JSON.stringify(
                    selectedScenario.messages[Math.min(messageIndex, selectedScenario.messages.length - 1)],
                    null,
                    2
                  )}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p className="mb-2">
            <strong>A2UI Bridge</strong> - Framework adapters for Google's Adaptive Agent UI Protocol
          </p>
          <p>
            This demo showcases{' '}
            <code className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">
              @a2ui-bridge/react
            </code>{' '}
            with{' '}
            <code className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">
              @a2ui-bridge/react-shadcn
            </code>{' '}
            components
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
