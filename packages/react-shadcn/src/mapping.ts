/**
 * @a2ui-bridge/react-shadcn - Component mapping
 * MIT License - Copyright (c) 2024 southleft
 */

import type { ComponentMapping } from '@a2ui-bridge/react';

// Layout components
import { Row } from './components/Row.js';
import { Column } from './components/Column.js';
import { Card } from './components/Card.js';
import { Divider } from './components/Divider.js';
import { Separator } from './components/Separator.js';
import { ScrollArea } from './components/ScrollArea.js';
import { AspectRatio } from './components/AspectRatio.js';
import { Flex } from './components/Flex.js';
import { Grid } from './components/Grid.js';
import { Center } from './components/Center.js';
import { Box } from './components/Box.js';
import { Container } from './components/Container.js';

// Typography & Display
import { Text } from './components/Text.js';
import { Badge } from './components/Badge.js';
import { Label } from './components/Label.js';
import { Link } from './components/Link.js';
import { Image } from './components/Image.js';
import { Avatar } from './components/Avatar.js';
import { Skeleton } from './components/Skeleton.js';
import { Title } from './components/Title.js';
import { Code } from './components/Code.js';
import { Blockquote } from './components/Blockquote.js';

// Form inputs
import { Button } from './components/Button.js';
import { Input } from './components/Input.js';
import { TextField } from './components/TextField.js';
import { TextArea } from './components/TextArea.js';
import { Checkbox } from './components/Checkbox.js';
import { Switch } from './components/Switch.js';
import { Select } from './components/Select.js';
import { RadioGroup } from './components/RadioGroup.js';
import { Slider } from './components/Slider.js';
import { ActionIcon } from './components/ActionIcon.js';
import { MultiSelect } from './components/MultiSelect.js';
import { NumberInput } from './components/NumberInput.js';

// Feedback & Status
import { Alert } from './components/Alert.js';
import { Progress } from './components/Progress.js';
import { Spinner } from './components/Spinner.js';
import { Toast } from './components/Toast.js';
import { Tooltip } from './components/Tooltip.js';

// Navigation
import { Tabs } from './components/Tabs.js';
import { TabPanel } from './components/TabPanel.js';
import { Breadcrumb } from './components/Breadcrumb.js';
import { Pagination } from './components/Pagination.js';

// Data display
import { List } from './components/List.js';
import { Table } from './components/Table.js';
import { TableHeader } from './components/TableHeader.js';
import { TableBody } from './components/TableBody.js';
import { TableRow } from './components/TableRow.js';
import { TableCell } from './components/TableCell.js';

// Disclosure & Overlay
import { Accordion } from './components/Accordion.js';
import { AccordionItem } from './components/AccordionItem.js';
import { Collapsible } from './components/Collapsible.js';
import { Dialog } from './components/Dialog.js';
import { Sheet } from './components/Sheet.js';
import { Popover } from './components/Popover.js';
import { DropdownMenu } from './components/DropdownMenu.js';
import { HoverCard } from './components/HoverCard.js';

// Utility
import { Fallback } from './components/Fallback.js';

/**
 * ShadCN/Tailwind component mapping for A2UI.
 * Use this with the Root or Surface components.
 *
 * @example
 * ```tsx
 * import { Surface } from '@a2ui-bridge/react';
 * import { shadcnComponents } from '@a2ui-bridge/react-shadcn';
 *
 * <Surface
 *   processor={processor}
 *   components={shadcnComponents}
 *   onAction={handleAction}
 * />
 * ```
 */
export const shadcnComponents: ComponentMapping = {
  // Layout (12 + aliases)
  Row,
  Column,
  Card,
  Divider,
  Separator,
  ScrollArea,
  AspectRatio,
  Flex,
  Grid,
  Center,
  Box,
  Container,
  // Layout aliases
  HStack: Row,
  VStack: Column,
  Stack: Column,

  // Typography & Display (10)
  Text,
  Badge,
  Label,
  Link,
  Image,
  Avatar,
  Skeleton,
  Title,
  Code,
  Blockquote,
  // Typography aliases
  Heading: Title,
  H1: Title,
  H2: Title,
  H3: Title,
  H4: Title,
  H5: Title,
  H6: Title,

  // Form inputs (12)
  Button,
  Input,
  TextField,
  TextArea,
  Checkbox,
  Switch,
  Select,
  RadioGroup,
  Slider,
  ActionIcon,
  MultiSelect,
  NumberInput,
  // Form aliases
  IconButton: ActionIcon,
  TextInput: TextField,
  Textarea: TextArea,
  CheckBox: Checkbox,
  Toggle: Switch,

  // Feedback & Status (5)
  Alert,
  Progress,
  Spinner,
  Toast,
  Tooltip,
  // Feedback aliases
  Loader: Spinner,
  Loading: Spinner,

  // Navigation (4)
  Tabs,
  TabPanel,
  Breadcrumb,
  Pagination,
  // Navigation aliases
  Breadcrumbs: Breadcrumb,

  // Data display (6)
  List,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,

  // Disclosure & Overlay (8)
  Accordion,
  AccordionItem,
  Collapsible,
  Dialog,
  Sheet,
  Popover,
  DropdownMenu,
  HoverCard,
  // Overlay aliases
  Modal: Dialog,
  Drawer: Sheet,
  Menu: DropdownMenu,

  // Fallback for unknown components (1)
  // This is used by createComponentsWithFallback
  __fallback__: Fallback,
};

/**
 * Creates a component mapping that includes fallback handling for unknown component types.
 * Use this instead of shadcnComponents if you want graceful degradation for unknown components.
 *
 * @example
 * ```tsx
 * import { Surface } from '@a2ui-bridge/react';
 * import { createComponentsWithFallback } from '@a2ui-bridge/react-shadcn';
 *
 * const components = createComponentsWithFallback();
 *
 * <Surface
 *   processor={processor}
 *   components={components}
 *   onAction={handleAction}
 * />
 * ```
 */
export function createComponentsWithFallback(
  customComponents?: Partial<ComponentMapping>
): ComponentMapping {
  return {
    ...shadcnComponents,
    ...customComponents,
  };
}

/**
 * Re-export the Fallback component for direct use
 */
export { Fallback };
