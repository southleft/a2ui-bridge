import { useNavigate } from 'react-router-dom';
import {
  Title,
  Text,
  Button,
  Stack,
  Group,
  Badge,
  Code,
  SimpleGrid,
  Box,
  Anchor,
  Container,
  Grid,
  Divider,
} from '@mantine/core';
import {
  IconCode,
  IconBrandGithub,
  IconArrowRight,
  IconBrandReact,
  IconFileCode,
  IconPackage,
  IconTerminal,
  IconChevronRight,
  IconExternalLink,
  IconRobot,
  IconPuzzle,
  IconLayersLinked,
  IconLayoutGrid,
} from '@tabler/icons-react';

// Supported A2UI Components
const COMPONENTS = [
  { name: 'Text', desc: 'Semantic text display' },
  { name: 'Button', desc: 'Interactive actions' },
  { name: 'TextField', desc: 'Text input with binding' },
  { name: 'CheckBox', desc: 'Boolean toggles' },
  { name: 'Badge', desc: 'Status indicators' },
  { name: 'Card', desc: 'Content containers' },
  { name: 'Row / Column', desc: 'Layout containers' },
  { name: 'List', desc: 'Repeating items' },
];

// Example prompts
const EXAMPLE_PROMPTS = [
  'Create a contact card with name, email, and call button',
  'Build a task list with status badges',
  'Make a login form with remember me checkbox',
  'Design a weather widget with refresh action',
  'Create a product card with price and buy button',
];

export function Landing() {
  const navigate = useNavigate();

  return (
    <Box
      style={{
        minHeight: '100vh',
        backgroundColor: '#fafafa',
      }}
    >
      {/* Header */}
      <Box py="md" style={{ borderBottom: '1px solid #e9ecef' }}>
        <Container size="xl">
          <Group justify="space-between">
            <Title order={4} fw={600}>A2UI Bridge</Title>
            <Group gap="lg">
              <Anchor href="https://github.com/southleft/a2ui-bridge" target="_blank" c="dark" size="sm" style={{ textDecoration: 'none' }}>
                <Group gap={6}>
                  <IconBrandGithub size={18} />
                  GitHub
                </Group>
              </Anchor>
            </Group>
          </Group>
        </Container>
      </Box>

      {/* Hero - Two Column Layout */}
      <Container size="xl" py={60}>
        <Grid gutter={60}>
          {/* Left Column - Main Message */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="lg">
              <Title
                order={1}
                fw={600}
                style={{ fontSize: '3rem', lineHeight: 1.1, letterSpacing: '-0.02em' }}
              >
                Let <span style={{ color: '#228be6' }}>AI agents</span> build<br />
                real user interfaces
              </Title>

              <Text size="lg" c="dimmed" lh={1.7} maw={480}>
                A protocol that lets any LLM create UIs without knowing React, Vue,
                or your component library. Describe what you want, get working components.
              </Text>

              <Group gap="sm" mt="md">
                <Button
                  size="lg"
                  color="dark"
                  rightSection={<IconArrowRight size={18} />}
                  onClick={() => navigate('/demo')}
                >
                  Try the Demo
                </Button>
                <Button
                  size="lg"
                  variant="default"
                  component="a"
                  href="https://github.com/nicholaspetrov/a2ui"
                  target="_blank"
                >
                  View Protocol
                </Button>
              </Group>
            </Stack>
          </Grid.Col>

          {/* Right Column - How it Works */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box
              p="xl"
              style={{
                backgroundColor: 'white',
                border: '1px solid #e9ecef',
              }}
            >
              <Text size="xs" fw={600} c="dimmed" tt="uppercase" mb="lg">How It Works</Text>

              <Stack gap="md">
                <Group wrap="nowrap" gap="md" align="flex-start">
                  <Badge color="blue" variant="filled" size="lg" w={28} h={28} p={0} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</Badge>
                  <Box>
                    <Text fw={500}>Describe your UI</Text>
                    <Text size="sm" c="dimmed">"Create a contact card with name and email"</Text>
                  </Box>
                </Group>
                <Group wrap="nowrap" gap="md" align="flex-start">
                  <Badge color="blue" variant="filled" size="lg" w={28} h={28} p={0} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</Badge>
                  <Box>
                    <Text fw={500}>AI generates A2UI JSON</Text>
                    <Text size="sm" c="dimmed">A structured recipe, not framework-specific code</Text>
                  </Box>
                </Group>
                <Group wrap="nowrap" gap="md" align="flex-start">
                  <Badge color="blue" variant="filled" size="lg" w={28} h={28} p={0} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</Badge>
                  <Box>
                    <Text fw={500}>Bridge renders components</Text>
                    <Text size="sm" c="dimmed">Recipe becomes real components from your design system</Text>
                  </Box>
                </Group>
              </Stack>
            </Box>
          </Grid.Col>
        </Grid>
      </Container>

      <Divider />

      {/* Bento Grid Section */}
      <Container size="xl" py={60}>
        <Grid gutter="lg">
          {/* Left Side - Capabilities */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Text size="xs" fw={600} c="dimmed" tt="uppercase" mb="lg">Capabilities</Text>

            <SimpleGrid cols={2} spacing="md">
              <Box p="lg" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
                <IconRobot size={24} stroke={1.5} color="#868e96" />
                <Text fw={500} mt="sm" mb={4}>Any LLM</Text>
                <Text size="sm" c="dimmed">Claude, GPT, Gemini, or local models</Text>
              </Box>

              <Box p="lg" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
                <IconPuzzle size={24} stroke={1.5} color="#868e96" />
                <Text fw={500} mt="sm" mb={4}>Any Framework</Text>
                <Text size="sm" c="dimmed">React, Vue, Angular, Svelte, Lit</Text>
              </Box>

              <Box p="lg" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
                <IconLayersLinked size={24} stroke={1.5} color="#868e96" />
                <Text fw={500} mt="sm" mb={4}>Any Components</Text>
                <Text size="sm" c="dimmed">Mantine, Shadcn, MUI, custom</Text>
              </Box>

              <Box p="lg" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
                <IconLayoutGrid size={24} stroke={1.5} color="#868e96" />
                <Text fw={500} mt="sm" mb={4}>Full Layouts</Text>
                <Text size="sm" c="dimmed">Cards, forms, lists, modals, tabs</Text>
              </Box>
            </SimpleGrid>
          </Grid.Col>

          {/* Right Side - Example Prompts */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Text size="xs" fw={600} c="dimmed" tt="uppercase" mb="lg">Example Prompts</Text>

            <Stack gap={0}>
              {EXAMPLE_PROMPTS.map((prompt, i) => (
                <Box
                  key={i}
                  p="md"
                  style={{
                    backgroundColor: 'white',
                    borderTop: i === 0 ? '1px solid #e9ecef' : 'none',
                    borderLeft: '1px solid #e9ecef',
                    borderRight: '1px solid #e9ecef',
                    borderBottom: '1px solid #e9ecef',
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate('/demo')}
                >
                  <Group gap="sm" wrap="nowrap">
                    <IconChevronRight size={16} color="#fa5252" />
                    <Text size="sm">{prompt}</Text>
                  </Group>
                </Box>
              ))}
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>

      <Divider />

      {/* Components + Code Section */}
      <Container size="xl" py={60}>
        <Grid gutter={60}>
          {/* Components List */}
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Group gap="xs" mb="lg">
              <IconPackage size={20} stroke={1.5} />
              <Text size="xs" fw={600} c="dimmed" tt="uppercase">Supported Components</Text>
            </Group>

            <SimpleGrid cols={2} spacing="xs">
              {COMPONENTS.map((comp) => (
                <Group key={comp.name} gap="sm" wrap="nowrap" py={6}>
                  <Code style={{ minWidth: 90 }}>{comp.name}</Code>
                  <Text size="xs" c="dimmed">{comp.desc}</Text>
                </Group>
              ))}
            </SimpleGrid>

            <Text size="xs" c="dimmed" mt="md">
              Plus Image, Tabs, Modal, Slider, DatePicker, and more.
            </Text>
          </Grid.Col>

          {/* Example JSON */}
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Group gap="xs" mb="lg">
              <IconFileCode size={20} stroke={1.5} />
              <Text size="xs" fw={600} c="dimmed" tt="uppercase">Example A2UI JSON</Text>
            </Group>

            <Code
              block
              style={{
                fontSize: 12,
                backgroundColor: '#1a1b1e',
                color: '#c1c2c5',
                padding: 20,
              }}
            >
{`{
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
}`}
            </Code>
          </Grid.Col>
        </Grid>
      </Container>

      <Divider />

      {/* Quick Start */}
      <Container size="xl" py={60}>
        <Group gap="xs" mb="lg">
          <IconTerminal size={20} stroke={1.5} />
          <Text size="xs" fw={600} c="dimmed" tt="uppercase">Quick Start</Text>
        </Group>

        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Text size="sm" fw={500} mb="xs">1. Install packages</Text>
            <Code block p="sm" style={{ backgroundColor: '#1a1b1e', color: '#c1c2c5', fontSize: 11 }}>
              npm install @a2ui-bridge/core @a2ui-bridge/react
            </Code>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Text size="sm" fw={500} mb="xs">2. Create adapters</Text>
            <Code block p="sm" style={{ backgroundColor: '#1a1b1e', color: '#c1c2c5', fontSize: 11 }}>
{`const ButtonAdapter = createAdapter(
  Button, { mapProps: ... }
);`}
            </Code>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Text size="sm" fw={500} mb="xs">3. Render surface</Text>
            <Code block p="sm" style={{ backgroundColor: '#1a1b1e', color: '#c1c2c5', fontSize: 11 }}>
{`<Surface
  processor={processor}
  components={components}
/>`}
            </Code>
          </Grid.Col>
        </Grid>
      </Container>

      {/* Footer */}
      <Box py="lg" style={{ borderTop: '1px solid #e9ecef' }}>
        <Container size="xl">
          <Group justify="space-between" wrap="wrap" gap="md">
            <Group gap="lg">
              <Anchor href="https://github.com/southleft/a2ui-bridge" target="_blank" c="dimmed" size="sm">
                <Group gap={4}>
                  <IconBrandGithub size={14} />
                  Repository
                </Group>
              </Anchor>
              <Anchor href="https://github.com/nicholaspetrov/a2ui" target="_blank" c="dimmed" size="sm">
                <Group gap={4}>
                  <IconExternalLink size={14} />
                  A2UI Protocol
                </Group>
              </Anchor>
            </Group>
            <Text size="sm" c="dimmed">
              Built by{' '}
              <Anchor href="https://southleft.com" target="_blank" c="dimmed">Southleft</Anchor>
            </Text>
          </Group>
        </Container>
      </Box>
    </Box>
  );
}

export default Landing;
