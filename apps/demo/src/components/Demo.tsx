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
} from '@mantine/core';
import {
  IconCode,
  IconMoon,
  IconSun,
  IconBrandGithub,
  IconSend,
  IconAlertCircle,
  IconPlayerPlay,
  IconArrowLeft,
  IconCopy,
  IconCheck,
  IconDownload,
  IconWand,
  IconEye,
} from '@tabler/icons-react';

import { mantineComponents } from '../adapters/mantine';

// Example prompts for quick start
const EXAMPLE_PROMPTS = [
  {
    label: 'Contact Card',
    prompt: 'Create a contact card for John Doe, email john@example.com, with Call and Email buttons',
  },
  {
    label: 'Task List',
    prompt: 'Create a task list with 3 items: "Review PR" (done), "Write docs" (in progress), "Deploy" (pending). Include status badges.',
  },
  {
    label: 'Login Form',
    prompt: 'Create a login form with email and password fields, a "Remember me" checkbox, and Login/Sign Up buttons',
  },
  {
    label: 'Weather Card',
    prompt: 'Create a weather card showing San Francisco, 72F, partly cloudy, with a Refresh button',
  },
];

export function Demo() {
  const navigate = useNavigate();
  const processor = useA2uiProcessor();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [protocolStream, setProtocolStream] = useState<string>('');
  const [parsedMessages, setParsedMessages] = useState<ServerToClientMessage[]>([]);
  const [actionLog, setActionLog] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const streamRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || isGenerating) return;
    if (!hasApiKey) {
      setError('API key not configured. Set VITE_ANTHROPIC_API_KEY in .env file.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setProtocolStream('');
    setParsedMessages([]);
    setActionLog([]);

    processor.processMessages([
      { deleteSurface: { surfaceId: '@default' } },
    ]);

    await generateUI(prompt, {
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
      },
      onComplete: () => {
        setIsGenerating(false);
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
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleGenerate();
      }
    },
    [handleGenerate]
  );

  // Use example prompt
  const useExample = useCallback((examplePrompt: string) => {
    setPrompt(examplePrompt);
    textareaRef.current?.focus();
  }, []);

  const cleanJson = parsedMessages.length > 0
    ? JSON.stringify(parsedMessages, null, 2)
    : '';

  return (
    <AppShell
      header={{ height: 48 }}
      padding={0}
      styles={{
        main: {
          backgroundColor: isDark ? 'var(--mantine-color-dark-9)' : 'var(--mantine-color-gray-1)',
        },
      }}
    >
      {/* Minimal Header */}
      <AppShell.Header
        style={{
          borderBottom: isDark ? '1px solid var(--mantine-color-dark-6)' : '1px solid var(--mantine-color-gray-3)',
          backgroundColor: isDark ? 'var(--mantine-color-dark-8)' : 'white',
        }}
      >
        <Group h="100%" px="md" justify="space-between">
          <Group gap="sm">
            <Tooltip label="Back to Home">
              <ActionIcon variant="subtle" onClick={() => navigate('/')} size="sm" color="gray">
                <IconArrowLeft size={16} />
              </ActionIcon>
            </Tooltip>
            <Title order={5} fw={600} c={isDark ? 'gray.3' : 'dark'}>A2UI Bridge</Title>
            <Badge variant="outline" size="xs" color="gray">
              Mantine
            </Badge>
          </Group>
          <Group gap={4}>
            <Tooltip label={isDark ? 'Light mode' : 'Dark mode'}>
              <ActionIcon variant="subtle" onClick={() => toggleColorScheme()} size="sm" color="gray">
                {isDark ? <IconSun size={16} /> : <IconMoon size={16} />}
              </ActionIcon>
            </Tooltip>
            <Tooltip label="GitHub">
              <ActionIcon
                component="a"
                href="https://github.com/southleft/a2ui-bridge"
                target="_blank"
                variant="subtle"
                size="sm"
                color="gray"
              >
                <IconBrandGithub size={16} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Box p="md" style={{ height: 'calc(100vh - 48px)' }}>
          {/* Error Alert */}
          {error && (
            <Alert
              icon={<IconAlertCircle size={16} />}
              title="Error"
              color="red"
              mb="md"
              withCloseButton
              onClose={() => setError(null)}
              styles={{ root: { borderRadius: 'var(--mantine-radius-sm)' } }}
            >
              {error}
            </Alert>
          )}

          {/* Main Layout */}
          <Group align="flex-start" gap="md" wrap="nowrap" style={{ height: error ? 'calc(100% - 70px)' : '100%' }}>
            {/* Left Panel - Input + JSON */}
            <Stack style={{ flex: 1, minWidth: 400 }} h="100%" gap="md">
              {/* Input Section */}
              <Box
                p="md"
                style={{
                  backgroundColor: isDark ? 'var(--mantine-color-dark-7)' : 'white',
                  border: isDark ? '1px solid var(--mantine-color-dark-5)' : '1px solid var(--mantine-color-gray-3)',
                  borderRadius: 'var(--mantine-radius-sm)',
                }}
              >
                <Stack gap="sm">
                  <Group gap="xs">
                    <IconWand size={14} color="var(--mantine-color-gray-6)" />
                    <Text fw={500} size="sm" c="dimmed">Describe your UI</Text>
                    {isGenerating && <Loader size="xs" ml="auto" />}
                  </Group>

                  <Textarea
                    ref={textareaRef}
                    placeholder="Create a contact card with name, email, and action buttons..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.currentTarget.value)}
                    onKeyDown={handleKeyDown}
                    minRows={2}
                    maxRows={3}
                    autosize
                    styles={{
                      input: {
                        fontFamily: 'system-ui, sans-serif',
                        backgroundColor: isDark ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-gray-0)',
                        border: 'none',
                      },
                    }}
                  />

                  <Group gap="xs">
                    <Button
                      onClick={handleGenerate}
                      loading={isGenerating}
                      disabled={!prompt.trim() || !hasApiKey}
                      leftSection={isGenerating ? undefined : <IconSend size={14} />}
                      size="sm"
                      color="dark"
                    >
                      {isGenerating ? 'Generating...' : 'Generate'}
                    </Button>
                    {EXAMPLE_PROMPTS.map((example) => (
                      <Tooltip key={example.label} label={example.prompt} multiline w={220}>
                        <Button
                          variant="default"
                          size="xs"
                          leftSection={<IconPlayerPlay size={10} />}
                          onClick={() => useExample(example.prompt)}
                        >
                          {example.label}
                        </Button>
                      </Tooltip>
                    ))}
                  </Group>

                  {!hasApiKey && (
                    <Text size="xs" c="orange" ta="center">
                      Set VITE_ANTHROPIC_API_KEY in .env file
                    </Text>
                  )}
                </Stack>
              </Box>

              {/* JSON Panel */}
              <Box
                p="md"
                style={{
                  flex: 1,
                  backgroundColor: isDark ? 'var(--mantine-color-dark-7)' : 'white',
                  border: isDark ? '1px solid var(--mantine-color-dark-5)' : '1px solid var(--mantine-color-gray-3)',
                  borderRadius: 'var(--mantine-radius-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Stack gap="sm" style={{ flex: 1, minHeight: 0 }}>
                  <Group gap="xs" justify="space-between">
                    <Group gap="xs">
                      <IconCode size={14} color="var(--mantine-color-gray-6)" />
                      <Text fw={500} size="sm" c="dimmed">A2UI JSON</Text>
                      {parsedMessages.length > 0 && (
                        <Badge size="xs" variant="light" color="green">
                          {parsedMessages.length} message{parsedMessages.length !== 1 ? 's' : ''}
                        </Badge>
                      )}
                    </Group>
                    {parsedMessages.length > 0 && (
                      <Group gap={4}>
                        <CopyButton value={cleanJson}>
                          {({ copied, copy }) => (
                            <Tooltip label={copied ? 'Copied!' : 'Copy JSON'}>
                              <ActionIcon
                                variant="subtle"
                                color={copied ? 'green' : 'gray'}
                                onClick={copy}
                                size="xs"
                              >
                                {copied ? <IconCheck size={12} /> : <IconCopy size={12} />}
                              </ActionIcon>
                            </Tooltip>
                          )}
                        </CopyButton>
                        <Tooltip label="Download JSON">
                          <ActionIcon variant="subtle" color="gray" onClick={handleDownload} size="xs">
                            <IconDownload size={12} />
                          </ActionIcon>
                        </Tooltip>
                      </Group>
                    )}
                  </Group>

                  <ScrollArea
                    style={{ flex: 1 }}
                    viewportRef={streamRef}
                    styles={{
                      root: {
                        backgroundColor: isDark ? 'var(--mantine-color-dark-8)' : 'var(--mantine-color-gray-0)',
                        borderRadius: 'var(--mantine-radius-xs)',
                      },
                    }}
                  >
                    {protocolStream ? (
                      <Code
                        block
                        p="sm"
                        style={{
                          fontSize: 11,
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                          background: 'transparent',
                        }}
                      >
                        {protocolStream}
                      </Code>
                    ) : (
                      <Text size="sm" c="dimmed" ta="center" py="xl">
                        {isGenerating
                          ? 'Generating A2UI JSON...'
                          : 'A2UI JSON will appear here'}
                      </Text>
                    )}
                  </ScrollArea>
                </Stack>
              </Box>
            </Stack>

            {/* Right Panel - Preview */}
            <Stack w={480} h="100%" style={{ flexShrink: 0 }} gap={0}>
              <Box
                p="md"
                h="100%"
                style={{
                  backgroundColor: isDark ? 'var(--mantine-color-dark-7)' : 'white',
                  border: isDark ? '1px solid var(--mantine-color-dark-5)' : '1px solid var(--mantine-color-gray-3)',
                  borderRadius: 'var(--mantine-radius-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Stack gap="sm" style={{ flex: 1, minHeight: 0 }}>
                  <Group gap="xs" justify="space-between">
                    <Group gap="xs">
                      <IconEye size={14} color="var(--mantine-color-gray-6)" />
                      <Text fw={500} size="sm" c="dimmed">Preview</Text>
                    </Group>
                    <Badge size="xs" variant="outline" color="gray">
                      Mantine UI
                    </Badge>
                  </Group>

                  <Box
                    style={{
                      flex: 1,
                      borderRadius: 'var(--mantine-radius-xs)',
                      border: isDark ? '1px solid var(--mantine-color-dark-5)' : '1px solid var(--mantine-color-gray-2)',
                      background: isDark ? 'var(--mantine-color-dark-8)' : 'var(--mantine-color-gray-0)',
                      overflow: 'auto',
                    }}
                    p="md"
                  >
                    {parsedMessages.length > 0 ? (
                      <Surface
                        processor={processor}
                        components={mantineComponents}
                        onAction={handleAction}
                      />
                    ) : (
                      <Stack align="center" justify="center" h="100%" gap="md">
                        <IconEye
                          size={32}
                          style={{ color: 'var(--mantine-color-gray-4)' }}
                        />
                        <Text size="sm" c="dimmed" ta="center">
                          {isGenerating
                            ? 'Building interface...'
                            : 'Your UI preview will appear here'}
                        </Text>
                      </Stack>
                    )}
                  </Box>

                  {/* Action Log */}
                  {actionLog.length > 0 && (
                    <Box>
                      <Text size="xs" c="dimmed" fw={500} mb={4}>Actions:</Text>
                      <ScrollArea h={60}>
                        <Stack gap={2}>
                          {actionLog.map((log, i) => (
                            <Code key={i} block style={{ fontSize: 9, padding: 4 }}>
                              {log}
                            </Code>
                          ))}
                        </Stack>
                      </ScrollArea>
                    </Box>
                  )}
                </Stack>
              </Box>
            </Stack>
          </Group>
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}

export default Demo;
