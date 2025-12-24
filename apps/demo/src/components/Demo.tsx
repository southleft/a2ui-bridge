import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Surface, useA2uiProcessor } from '@a2ui-bridge/react';
import type { ServerToClientMessage, UserAction } from '@a2ui-bridge/core';
import { generateUI, isConfigured } from '../services/ai';

import {
  AppShell,
  Title,
  Text,
  Button,
  Stack,
  Group,
  Badge,
  Code,
  ScrollArea,
  ActionIcon,
  Tooltip,
  useMantineColorScheme,
  Box,
  Textarea,
  Loader,
  Alert,
  CopyButton,
  Drawer,
  Transition,
  Paper,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconCode,
  IconMoon,
  IconSun,
  IconBrandGithub,
  IconSend,
  IconAlertCircle,
  IconArrowLeft,
  IconCopy,
  IconCheck,
  IconDownload,
  IconSparkles,
  IconStethoscope,
  IconChecklist,
  IconChefHat,
  IconPlane,
  IconCash,
  IconTarget,
  IconX,
} from '@tabler/icons-react';

import { mantineComponents } from '../adapters/mantine';

// Intent-based scenarios (user-centric, not developer-centric)
const SCENARIOS = [
  {
    icon: IconStethoscope,
    label: 'Doctor Visit',
    prompt: "I need to schedule a follow-up appointment with my doctor about my prescription refill",
    color: 'blue',
  },
  {
    icon: IconChecklist,
    label: 'Get Organized',
    prompt: "I've got a million things to do today and need to get my thoughts organized into a manageable task list",
    color: 'green',
  },
  {
    icon: IconChefHat,
    label: 'Find Recipe',
    prompt: "I want to bake chocolate chip cookies this weekend and need to find a good recipe",
    color: 'orange',
  },
  {
    icon: IconPlane,
    label: 'Plan Trip',
    prompt: "I'm planning a weekend getaway and need to find and book a hotel room",
    color: 'violet',
  },
  {
    icon: IconCash,
    label: 'Send Money',
    prompt: "I need to send $50 to my roommate for my share of the utilities bill",
    color: 'teal',
  },
  {
    icon: IconTarget,
    label: 'Track Goals',
    prompt: "Help me track my fitness goals for this week - I want to run 3 times and drink more water",
    color: 'red',
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
  const processor = useA2uiProcessor();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [protocolStream, setProtocolStream] = useState<string>('');
  const [parsedMessages, setParsedMessages] = useState<ServerToClientMessage[]>([]);
  const [actionLog, setActionLog] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);

  const streamRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const hasApiKey = isConfigured();

  // Handle action callbacks from A2UI components
  const handleAction = useCallback((action: UserAction) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${action.actionName}${action.context ? ` | ${JSON.stringify(action.context)}` : ''}`;
    setActionLog((prev) => [...prev.slice(-9), logEntry]);
  }, []);

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

  // Generate UI from prompt
  const handleGenerate = useCallback(async (inputPrompt?: string) => {
    const textToSend = inputPrompt || prompt;
    if (!textToSend.trim() || isGenerating) return;
    if (!hasApiKey) {
      setError('API key not configured. Set VITE_ANTHROPIC_API_KEY in .env file.');
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

    processor.processMessages([
      { deleteSurface: { surfaceId: '@default' } },
    ]);

    // Scroll chat to bottom
    setTimeout(() => {
      if (chatScrollRef.current) {
        chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
      }
    }, 50);

    await generateUI(textToSend, {
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
        // Trigger preview animation
        setShowPreview(true);
      },
      onComplete: () => {
        setIsGenerating(false);
        // Add assistant message to chat
        setChatHistory((prev) => [...prev, {
          role: 'assistant',
          content: 'Here\'s an interface to help you with that.',
          timestamp: new Date(),
        }]);
      },
      onError: (err) => {
        setError(err.message);
        setIsGenerating(false);
      },
    });
  }, [prompt, hasApiKey, isGenerating, processor]);

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

  // Use scenario
  const useScenario = useCallback((scenarioPrompt: string) => {
    handleGenerate(scenarioPrompt);
  }, [handleGenerate]);

  const cleanJson = parsedMessages.length > 0
    ? JSON.stringify(parsedMessages, null, 2)
    : '';

  return (
    <AppShell
      header={{ height: 56 }}
      navbar={{ width: 340, breakpoint: 'sm' }}
      padding={0}
      transitionDuration={300}
      transitionTimingFunction="ease"
      styles={{
        main: {
          backgroundColor: isDark ? 'var(--mantine-color-dark-8)' : 'var(--mantine-color-gray-0)',
        },
      }}
    >
      {/* Header */}
      <AppShell.Header
        style={{
          borderBottom: isDark ? '1px solid var(--mantine-color-dark-5)' : '1px solid var(--mantine-color-gray-2)',
          backgroundColor: isDark ? 'var(--mantine-color-dark-7)' : 'white',
        }}
      >
        <Group h="100%" px="md" justify="space-between">
          <Group gap="sm">
            <Tooltip label="Back to Home">
              <ActionIcon variant="subtle" onClick={() => navigate('/')} size="md" color="gray">
                <IconArrowLeft size={18} />
              </ActionIcon>
            </Tooltip>
            <Group gap={8}>
              <ThemeIcon size="md" radius="md" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                <IconSparkles size={16} />
              </ThemeIcon>
              <Title order={4} fw={600} c={isDark ? 'gray.2' : 'dark'}>A2UI</Title>
            </Group>
            <Badge variant="light" size="sm" color="blue">
              Predictive UI
            </Badge>
          </Group>
          <Group gap={8}>
            {parsedMessages.length > 0 && (
              <Tooltip label="View Protocol">
                <ActionIcon variant="light" onClick={openDrawer} size="md" color="gray">
                  <IconCode size={18} />
                </ActionIcon>
              </Tooltip>
            )}
            <Tooltip label={isDark ? 'Light mode' : 'Dark mode'}>
              <ActionIcon variant="subtle" onClick={() => toggleColorScheme()} size="md" color="gray">
                {isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
              </ActionIcon>
            </Tooltip>
            <Tooltip label="GitHub">
              <ActionIcon
                component="a"
                href="https://github.com/southleft/a2ui-bridge"
                target="_blank"
                variant="subtle"
                size="md"
                color="gray"
              >
                <IconBrandGithub size={18} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
      </AppShell.Header>

      {/* Left Sidebar - Chat */}
      <AppShell.Navbar
        p="md"
        style={{
          backgroundColor: isDark ? 'var(--mantine-color-dark-7)' : 'white',
          borderRight: isDark ? '1px solid var(--mantine-color-dark-5)' : '1px solid var(--mantine-color-gray-2)',
        }}
      >
        <Stack h="100%" gap={0}>
          {/* Scenarios */}
          <Box mb="md">
            <Text size="xs" fw={600} c="dimmed" tt="uppercase" mb="sm">
              Try a scenario
            </Text>
            <Stack gap={6}>
              {SCENARIOS.map((scenario) => (
                <UnstyledButton
                  key={scenario.label}
                  className="scenario-btn"
                  onClick={() => useScenario(scenario.prompt)}
                  disabled={isGenerating}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--mantine-radius-md)',
                    backgroundColor: isDark ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-gray-0)',
                    border: isDark ? '1px solid var(--mantine-color-dark-5)' : '1px solid var(--mantine-color-gray-2)',
                    opacity: isGenerating ? 0.5 : 1,
                    cursor: isGenerating ? 'not-allowed' : 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    if (!isGenerating) {
                      e.currentTarget.style.backgroundColor = isDark
                        ? 'var(--mantine-color-dark-5)'
                        : 'var(--mantine-color-gray-1)';
                      e.currentTarget.style.borderColor = `var(--mantine-color-${scenario.color}-5)`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = isDark
                      ? 'var(--mantine-color-dark-6)'
                      : 'var(--mantine-color-gray-0)';
                    e.currentTarget.style.borderColor = isDark
                      ? 'var(--mantine-color-dark-5)'
                      : 'var(--mantine-color-gray-2)';
                  }}
                >
                  <Group gap="sm" wrap="nowrap">
                    <ThemeIcon size="sm" variant="light" color={scenario.color} radius="sm">
                      <scenario.icon size={14} />
                    </ThemeIcon>
                    <Text size="sm" fw={500}>{scenario.label}</Text>
                  </Group>
                </UnstyledButton>
              ))}
            </Stack>
          </Box>

          {/* Chat History */}
          <Box style={{ flex: 1, minHeight: 0 }}>
            <Text size="xs" fw={600} c="dimmed" tt="uppercase" mb="sm">
              Conversation
            </Text>
            <ScrollArea
              h="calc(100% - 24px)"
              viewportRef={chatScrollRef}
              styles={{
                root: {
                  backgroundColor: isDark ? 'var(--mantine-color-dark-8)' : 'var(--mantine-color-gray-0)',
                  borderRadius: 'var(--mantine-radius-md)',
                },
              }}
            >
              <Stack gap="sm" p="sm">
                {chatHistory.length === 0 ? (
                  <Text size="sm" c="dimmed" ta="center" py="xl">
                    Tell me what you need help with...
                  </Text>
                ) : (
                  chatHistory.map((msg, i) => (
                    <Box
                      key={i}
                      className="chat-message"
                      style={{
                        alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                        maxWidth: '85%',
                      }}
                    >
                      <Paper
                        p="xs"
                        radius="md"
                        style={{
                          backgroundColor: msg.role === 'user'
                            ? 'var(--mantine-color-blue-6)'
                            : isDark ? 'var(--mantine-color-dark-5)' : 'white',
                          border: msg.role === 'assistant'
                            ? isDark ? '1px solid var(--mantine-color-dark-4)' : '1px solid var(--mantine-color-gray-2)'
                            : 'none',
                        }}
                      >
                        <Text size="sm" c={msg.role === 'user' ? 'white' : undefined}>
                          {msg.content}
                        </Text>
                      </Paper>
                    </Box>
                  ))
                )}
                {isGenerating && (
                  <Box className="chat-message thinking-indicator" style={{ alignSelf: 'flex-start' }}>
                    <Paper
                      p="xs"
                      radius="md"
                      style={{
                        backgroundColor: isDark ? 'var(--mantine-color-dark-5)' : 'white',
                        border: isDark ? '1px solid var(--mantine-color-dark-4)' : '1px solid var(--mantine-color-gray-2)',
                      }}
                    >
                      <Group gap="xs">
                        <Loader size="xs" />
                        <Text size="sm" c="dimmed">Creating your interface...</Text>
                      </Group>
                    </Paper>
                  </Box>
                )}
              </Stack>
            </ScrollArea>
          </Box>

          {/* Input */}
          <Box mt="md">
            {error && (
              <Alert
                icon={<IconAlertCircle size={14} />}
                color="red"
                mb="sm"
                p="xs"
                withCloseButton
                onClose={() => setError(null)}
              >
                <Text size="xs">{error}</Text>
              </Alert>
            )}
            {!hasApiKey && (
              <Alert color="orange" mb="sm" p="xs">
                <Text size="xs">Set VITE_ANTHROPIC_API_KEY in .env</Text>
              </Alert>
            )}
            <Group gap="xs" align="flex-end">
              <Textarea
                ref={textareaRef}
                placeholder="What do you need help with?"
                value={prompt}
                onChange={(e) => setPrompt(e.currentTarget.value)}
                onKeyDown={handleKeyDown}
                minRows={1}
                maxRows={3}
                autosize
                style={{ flex: 1 }}
                styles={{
                  input: {
                    backgroundColor: isDark ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-gray-0)',
                    border: isDark ? '1px solid var(--mantine-color-dark-4)' : '1px solid var(--mantine-color-gray-3)',
                  },
                }}
              />
              <ActionIcon
                size="lg"
                radius="md"
                variant="filled"
                color="blue"
                onClick={() => handleGenerate()}
                disabled={!prompt.trim() || !hasApiKey || isGenerating}
                loading={isGenerating}
              >
                <IconSend size={18} />
              </ActionIcon>
            </Group>
          </Box>
        </Stack>
      </AppShell.Navbar>

      {/* Main Content - Preview */}
      <AppShell.Main>
        <Box h="100%" p="xl" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Transition
            mounted={showPreview && parsedMessages.length > 0}
            transition="fade"
            duration={400}
            timingFunction="ease"
          >
            {(styles) => (
              <Box
                style={{
                  ...styles,
                  width: '100%',
                  maxWidth: 600,
                  animation: 'slideUp 0.4s ease-out',
                }}
                className="preview-container"
              >
                <Surface
                  processor={processor}
                  components={mantineComponents}
                  onAction={handleAction}
                />

                {/* Action Log */}
                {actionLog.length > 0 && (
                  <Box mt="md">
                    <Text size="xs" c="dimmed" fw={500} mb={4}>Recent actions:</Text>
                    <Stack gap={2}>
                      {actionLog.slice(-3).map((log, i) => (
                        <Code
                          key={i}
                          block
                          style={{
                            fontSize: 10,
                            padding: 6,
                            backgroundColor: isDark ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-gray-1)',
                            color: isDark ? 'var(--mantine-color-gray-4)' : undefined,
                          }}
                        >
                          {log}
                        </Code>
                      ))}
                    </Stack>
                  </Box>
                )}
              </Box>
            )}
          </Transition>

          {/* Empty State */}
          {!showPreview && !isGenerating && parsedMessages.length === 0 && (
            <Stack align="center" gap="lg">
              <ThemeIcon
                size={80}
                radius="xl"
                variant="light"
                color="gray"
                className="empty-state-icon"
              >
                <IconSparkles size={40} />
              </ThemeIcon>
              <Stack align="center" gap="xs">
                <Title order={2} c={isDark ? 'gray.3' : 'dark'}>
                  Predictive UI Demo
                </Title>
                <Text size="lg" c="dimmed" ta="center" maw={400}>
                  Describe what you need, and AI will create the perfect interface to help you.
                </Text>
              </Stack>
              <Badge size="lg" variant="light" color="blue">
                Powered by Claude + A2UI Protocol
              </Badge>
            </Stack>
          )}

          {/* Generating State */}
          {isGenerating && parsedMessages.length === 0 && (
            <Stack align="center" gap="md">
              <Loader size="lg" />
              <Text c="dimmed">Building your interface...</Text>
            </Stack>
          )}
        </Box>
      </AppShell.Main>

      {/* Protocol Drawer */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        title={
          <Group gap="xs">
            <IconCode size={18} />
            <Text fw={600}>A2UI Protocol</Text>
            {parsedMessages.length > 0 && (
              <Badge size="xs" variant="light" color="green">
                {parsedMessages.length} message{parsedMessages.length !== 1 ? 's' : ''}
              </Badge>
            )}
          </Group>
        }
        position="right"
        size="lg"
        overlayProps={{ backgroundOpacity: 0.3, blur: 2 }}
        styles={{
          body: {
            padding: 0,
            height: 'calc(100% - 60px)',
          },
          content: {
            backgroundColor: isDark ? 'var(--mantine-color-dark-7)' : 'white',
          },
        }}
      >
        <Stack h="100%" gap={0}>
          {/* Actions */}
          <Group gap="xs" p="md" style={{ borderBottom: isDark ? '1px solid var(--mantine-color-dark-5)' : '1px solid var(--mantine-color-gray-2)' }}>
            <CopyButton value={cleanJson}>
              {({ copied, copy }) => (
                <Button
                  variant="light"
                  size="xs"
                  leftSection={copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                  onClick={copy}
                  color={copied ? 'green' : 'gray'}
                >
                  {copied ? 'Copied!' : 'Copy JSON'}
                </Button>
              )}
            </CopyButton>
            <Button
              variant="light"
              size="xs"
              leftSection={<IconDownload size={14} />}
              onClick={handleDownload}
              color="gray"
            >
              Download
            </Button>
          </Group>

          {/* JSON Content */}
          <ScrollArea
            style={{ flex: 1 }}
            viewportRef={streamRef}
            p="md"
          >
            {protocolStream ? (
              <Code
                block
                style={{
                  fontSize: 11,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  backgroundColor: isDark ? 'var(--mantine-color-dark-8)' : 'var(--mantine-color-gray-0)',
                  color: isDark ? 'var(--mantine-color-gray-4)' : 'inherit',
                  padding: 16,
                  borderRadius: 'var(--mantine-radius-md)',
                }}
              >
                {protocolStream}
              </Code>
            ) : (
              <Text size="sm" c="dimmed" ta="center" py="xl">
                Protocol stream will appear here
              </Text>
            )}
          </ScrollArea>
        </Stack>
      </Drawer>
    </AppShell>
  );
}

export default Demo;
