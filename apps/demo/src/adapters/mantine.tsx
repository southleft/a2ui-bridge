/**
 * Mantine Component Adapters for A2UI Bridge
 *
 * This file demonstrates how to integrate Mantine (or any React component library)
 * with A2UI Bridge using the createAdapter pattern.
 *
 * The adapter pattern keeps your components DECOUPLED from A2UI - they don't need
 * to know anything about A2UI's data structures. The adapter handles all translation.
 */

import {
  createAdapter,
  createActionHandler,
  createComponentMapping,
  extractValue,
  mapVariant,
  type A2UIComponentProps,
} from '@a2ui-bridge/react';

import type { ComponentType } from 'react';

// Mantine Components
import {
  Button,
  Text,
  Card,
  TextInput,
  Textarea,
  Checkbox,
  Switch,
  Select,
  Slider,
  Progress,
  Badge,
  Avatar,
  Divider,
  Alert,
  Tooltip,
  Loader,
  Stack,
  Group,
  Image,
  Tabs,
  Accordion,
  Table,
  Pagination,
  Breadcrumbs,
  Anchor,
  Paper,
  ScrollArea,
  Radio,
} from '@mantine/core';

// Type helper for Mantine's polymorphic components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const asComponent = <T,>(component: T): ComponentType<any> => component as ComponentType<any>;

// Tabler Icons (Mantine's recommended icon library)
import {
  IconAlertCircle,
  IconCheck,
  IconInfoCircle,
  IconAlertTriangle,
} from '@tabler/icons-react';

// ============================================================================
// LAYOUT ADAPTERS
// ============================================================================

/** Row adapter - horizontal flex container */
export const RowAdapter = createAdapter(Group, {
  mapProps: (a2ui, ctx) => ({
    gap: extractValue(a2ui.gap) ?? 'md',
    align: extractValue(a2ui.align) ?? extractValue(a2ui.alignment) ?? 'center',
    justify: extractValue(a2ui.justify),
    wrap: extractValue(a2ui.wrap) ?? 'wrap',
    children: ctx.children,
  }),
  displayName: 'RowAdapter',
});

/** Column adapter - vertical flex container */
export const ColumnAdapter = createAdapter(Stack, {
  mapProps: (a2ui, ctx) => ({
    gap: extractValue(a2ui.gap) ?? 'md',
    align: extractValue(a2ui.align) ?? extractValue(a2ui.alignment),
    justify: extractValue(a2ui.justify),
    children: ctx.children,
  }),
  displayName: 'ColumnAdapter',
});

/** Card adapter */
export const CardAdapter = createAdapter(asComponent(Card), {
  mapProps: (a2ui, ctx) => ({
    shadow: a2ui.shadow ?? 'sm',
    padding: a2ui.padding ?? 'lg',
    radius: a2ui.radius ?? 'md',
    withBorder: a2ui.withBorder ?? true,
    children: ctx.children,
  }),
  displayName: 'CardAdapter',
});

/** Divider adapter */
export const DividerAdapter = createAdapter(Divider, {
  mapProps: (a2ui) => ({
    my: a2ui.margin ?? 'md',
    label: a2ui.label,
    labelPosition: a2ui.labelPosition ?? 'center',
    orientation: a2ui.orientation ?? 'horizontal',
  }),
  displayName: 'DividerAdapter',
});

/** ScrollArea adapter */
export const ScrollAreaAdapter = createAdapter(ScrollArea, {
  mapProps: (a2ui, ctx) => ({
    h: a2ui.height ?? 300,
    type: a2ui.type ?? 'auto',
    children: ctx.children,
  }),
  displayName: 'ScrollAreaAdapter',
});

// ============================================================================
// TYPOGRAPHY & DISPLAY ADAPTERS
// ============================================================================

/** Text adapter */
export const TextAdapter = createAdapter(asComponent(Text), {
  mapProps: (a2ui, ctx) => {
    // Handle text content from various sources - extract literal values
    const rawContent = a2ui.text ?? a2ui.content ?? a2ui.label ?? ctx.children;
    const content = extractValue(rawContent);

    return {
      size: extractValue(a2ui.size) ?? 'md',
      fw: extractValue(a2ui.weight) ?? extractValue(a2ui.fontWeight),
      c: extractValue(a2ui.color),
      ta: extractValue(a2ui.align),
      children: content,
    };
  },
  displayName: 'TextAdapter',
});

/** Badge adapter */
export const BadgeAdapter = createAdapter(asComponent(Badge), {
  mapProps: (a2ui) => ({
    children: extractValue(a2ui.label) ?? extractValue(a2ui.text),
    color: mapVariant(extractValue(a2ui.variant), {
      primary: 'blue',
      secondary: 'gray',
      success: 'green',
      warning: 'yellow',
      danger: 'red',
      info: 'cyan',
    }, 'blue'),
    variant: extractValue(a2ui.filled) ? 'filled' : 'light',
    size: extractValue(a2ui.size) ?? 'md',
    radius: a2ui.radius ?? 'xl',
  }),
  displayName: 'BadgeAdapter',
});

/** Avatar adapter */
export const AvatarAdapter = createAdapter(asComponent(Avatar), {
  mapProps: (a2ui) => ({
    src: a2ui.src ?? a2ui.imageUrl,
    alt: a2ui.alt ?? a2ui.name,
    radius: a2ui.radius ?? 'xl',
    size: a2ui.size ?? 'md',
    color: a2ui.color ?? 'blue',
    children: a2ui.initials ?? a2ui.fallback,
  }),
  displayName: 'AvatarAdapter',
});

/** Image adapter */
export const ImageAdapter = createAdapter(asComponent(Image), {
  mapProps: (a2ui) => ({
    src: extractValue(a2ui.src) ?? extractValue(a2ui.url),
    alt: extractValue(a2ui.alt) ?? extractValue(a2ui.altText) ?? '',
    width: extractValue(a2ui.width),
    height: extractValue(a2ui.height),
    radius: extractValue(a2ui.radius) ?? 'md',
    fit: extractValue(a2ui.fit) ?? 'cover',
  }),
  displayName: 'ImageAdapter',
});

/** Skeleton/Loader adapter */
export const SkeletonAdapter = createAdapter(Loader, {
  mapProps: (a2ui) => ({
    size: a2ui.size ?? 'md',
    color: a2ui.color,
    type: 'dots',
  }),
  displayName: 'SkeletonAdapter',
});

// ============================================================================
// FORM INPUT ADAPTERS
// ============================================================================

/** Button adapter */
export const ButtonAdapter = createAdapter(asComponent(Button), {
  mapProps: (a2ui, ctx) => {
    // Get child content (button label)
    const label = a2ui.label ?? a2ui.text;

    return {
      children: label ?? ctx.children,
      onClick: createActionHandler(a2ui.action, ctx),
      variant: mapVariant(a2ui.variant, {
        primary: 'filled',
        secondary: 'outline',
        ghost: 'subtle',
        link: 'transparent',
        danger: 'filled',
        destructive: 'filled',
      }, 'filled'),
      color: a2ui.variant === 'danger' || a2ui.variant === 'destructive' ? 'red' : a2ui.color,
      disabled: a2ui.disabled ?? false,
      loading: a2ui.loading ?? false,
      size: a2ui.size ?? 'sm',
      radius: a2ui.radius ?? 'md',
      fullWidth: a2ui.fullWidth ?? false,
    };
  },
  displayName: 'ButtonAdapter',
});

/** TextField/Input adapter */
export const TextFieldAdapter = createAdapter(TextInput, {
  mapProps: (a2ui, ctx) => ({
    label: extractValue(a2ui.label),
    placeholder: extractValue(a2ui.placeholder) ?? extractValue(a2ui.hint),
    description: extractValue(a2ui.description) ?? extractValue(a2ui.helperText),
    error: extractValue(a2ui.error),
    required: extractValue(a2ui.required) ?? false,
    disabled: extractValue(a2ui.disabled) ?? false,
    defaultValue: extractValue(a2ui.defaultValue) ?? extractValue(a2ui.value),
    onChange: a2ui.onChange ? (e: React.ChangeEvent<HTMLInputElement>) => {
      ctx.onAction({
        actionName: a2ui.onChange.name,
        sourceComponentId: ctx.componentId,
        timestamp: new Date().toISOString(),
        context: { value: e.target.value },
      });
    } : undefined,
  }),
  displayName: 'TextFieldAdapter',
});

/** Input adapter (alias for TextField) */
export const InputAdapter = TextFieldAdapter;

/** TextArea adapter */
export const TextAreaAdapter = createAdapter(Textarea, {
  mapProps: (a2ui, _ctx) => ({
    label: extractValue(a2ui.label),
    placeholder: extractValue(a2ui.placeholder) ?? extractValue(a2ui.hint),
    description: extractValue(a2ui.description) ?? extractValue(a2ui.helperText),
    error: extractValue(a2ui.error),
    required: extractValue(a2ui.required) ?? false,
    disabled: extractValue(a2ui.disabled) ?? false,
    minRows: extractValue(a2ui.minRows) ?? extractValue(a2ui.rows) ?? 3,
    maxRows: a2ui.maxRows,
    autosize: a2ui.autosize ?? true,
    defaultValue: extractValue(a2ui.defaultValue) ?? extractValue(a2ui.value),
  }),
  displayName: 'TextAreaAdapter',
});

/** Checkbox adapter */
export const CheckboxAdapter = createAdapter(Checkbox, {
  mapProps: (a2ui, ctx) => ({
    label: a2ui.label,
    description: a2ui.description,
    defaultChecked: a2ui.checked ?? a2ui.defaultChecked ?? false,
    disabled: a2ui.disabled ?? false,
    onChange: a2ui.onChange ? (e: React.ChangeEvent<HTMLInputElement>) => {
      ctx.onAction({
        actionName: a2ui.onChange.name,
        sourceComponentId: ctx.componentId,
        timestamp: new Date().toISOString(),
        context: { checked: e.target.checked },
      });
    } : undefined,
  }),
  displayName: 'CheckboxAdapter',
});

/** Switch adapter */
export const SwitchAdapter = createAdapter(Switch, {
  mapProps: (a2ui, ctx) => ({
    label: a2ui.label,
    description: a2ui.description,
    defaultChecked: a2ui.checked ?? a2ui.defaultChecked ?? false,
    disabled: a2ui.disabled ?? false,
    size: a2ui.size ?? 'md',
    onChange: a2ui.onChange ? (e: React.ChangeEvent<HTMLInputElement>) => {
      ctx.onAction({
        actionName: a2ui.onChange.name,
        sourceComponentId: ctx.componentId,
        timestamp: new Date().toISOString(),
        context: { checked: e.target.checked },
      });
    } : undefined,
  }),
  displayName: 'SwitchAdapter',
});

/** Select adapter */
export const SelectAdapter = createAdapter(Select, {
  mapProps: (a2ui, ctx) => {
    // Transform A2UI options to Mantine format
    const data = (a2ui.options ?? []).map((opt: any) => ({
      value: opt.value ?? opt.id ?? opt.label,
      label: opt.label ?? opt.text ?? opt.value,
      disabled: opt.disabled,
    }));

    return {
      label: a2ui.label,
      placeholder: a2ui.placeholder ?? 'Select an option',
      description: a2ui.description,
      data,
      defaultValue: extractValue(a2ui.defaultValue) ?? extractValue(a2ui.value),
      disabled: a2ui.disabled ?? false,
      clearable: a2ui.clearable ?? false,
      searchable: a2ui.searchable ?? false,
      onChange: a2ui.onChange ? (value: string | null) => {
        ctx.onAction({
          actionName: a2ui.onChange.name,
          sourceComponentId: ctx.componentId,
          timestamp: new Date().toISOString(),
          context: { value },
        });
      } : undefined,
    };
  },
  displayName: 'SelectAdapter',
});

/** RadioGroup adapter */
export const RadioGroupAdapter = createAdapter(Radio.Group, {
  mapProps: (a2ui, ctx) => {
    const options = (a2ui.options ?? []).map((opt: any) => ({
      value: opt.value ?? opt.id ?? opt.label,
      label: opt.label ?? opt.text ?? opt.value,
    }));

    return {
      label: a2ui.label,
      description: a2ui.description,
      defaultValue: extractValue(a2ui.defaultValue) ?? extractValue(a2ui.value),
      onChange: a2ui.onChange ? (value: string) => {
        ctx.onAction({
          actionName: a2ui.onChange.name,
          sourceComponentId: ctx.componentId,
          timestamp: new Date().toISOString(),
          context: { value },
        });
      } : undefined,
      children: options.map((opt: any) => (
        <Radio key={opt.value} value={opt.value} label={opt.label} />
      )),
    };
  },
  displayName: 'RadioGroupAdapter',
});

/** Slider adapter */
export const SliderAdapter = createAdapter(Slider, {
  mapProps: (a2ui, ctx) => ({
    label: a2ui.label,
    min: a2ui.min ?? 0,
    max: a2ui.max ?? 100,
    step: a2ui.step ?? 1,
    defaultValue: extractValue(a2ui.defaultValue) ?? extractValue(a2ui.value) ?? 50,
    disabled: a2ui.disabled ?? false,
    marks: a2ui.marks,
    onChangeEnd: a2ui.onChange ? (value: number) => {
      ctx.onAction({
        actionName: a2ui.onChange.name,
        sourceComponentId: ctx.componentId,
        timestamp: new Date().toISOString(),
        context: { value },
      });
    } : undefined,
  }),
  displayName: 'SliderAdapter',
});

// ============================================================================
// FEEDBACK & STATUS ADAPTERS
// ============================================================================

/** Alert adapter */
export const AlertAdapter = createAdapter(Alert, {
  mapProps: (a2ui, ctx) => {
    const iconMap: Record<string, React.ReactNode> = {
      info: <IconInfoCircle size={16} />,
      success: <IconCheck size={16} />,
      warning: <IconAlertTriangle size={16} />,
      error: <IconAlertCircle size={16} />,
      danger: <IconAlertCircle size={16} />,
    };

    const colorMap: Record<string, string> = {
      info: 'blue',
      success: 'green',
      warning: 'yellow',
      error: 'red',
      danger: 'red',
    };

    const variant = a2ui.variant ?? a2ui.type ?? 'info';

    return {
      title: a2ui.title,
      color: colorMap[variant] ?? 'blue',
      icon: iconMap[variant],
      radius: 'md',
      children: a2ui.message ?? a2ui.description ?? ctx.children,
    };
  },
  displayName: 'AlertAdapter',
});

/** Progress adapter */
export const ProgressAdapter = createAdapter(Progress, {
  mapProps: (a2ui) => ({
    value: a2ui.value ?? a2ui.progress ?? 0,
    color: a2ui.color ?? 'blue',
    size: a2ui.size ?? 'md',
    radius: a2ui.radius ?? 'xl',
    striped: a2ui.striped ?? false,
    animated: a2ui.animated ?? a2ui.indeterminate ?? false,
  }),
  displayName: 'ProgressAdapter',
});

/** Spinner/Loader adapter */
export const SpinnerAdapter = createAdapter(Loader, {
  mapProps: (a2ui) => ({
    size: a2ui.size ?? 'md',
    color: a2ui.color ?? 'blue',
    type: a2ui.type ?? 'oval',
  }),
  displayName: 'SpinnerAdapter',
});

/** Tooltip adapter */
export const TooltipAdapter = createAdapter(Tooltip, {
  mapProps: (a2ui, ctx) => ({
    label: a2ui.content ?? a2ui.label ?? a2ui.text,
    position: a2ui.position ?? 'top',
    withArrow: a2ui.withArrow ?? true,
    children: ctx.children,
  }),
  displayName: 'TooltipAdapter',
});

// ============================================================================
// NAVIGATION ADAPTERS
// ============================================================================

/** Tabs adapter */
export const TabsAdapter = createAdapter(Tabs, {
  mapProps: (a2ui, ctx) => ({
    defaultValue: a2ui.defaultValue ?? a2ui.defaultTab,
    orientation: a2ui.orientation ?? 'horizontal',
    variant: a2ui.variant ?? 'default',
    children: ctx.children,
  }),
  displayName: 'TabsAdapter',
});

/** TabPanel adapter - for individual tab content */
export const TabPanelAdapter = createAdapter(Tabs.Panel, {
  mapProps: (a2ui, ctx) => ({
    value: a2ui.value ?? a2ui.id,
    children: ctx.children,
  }),
  displayName: 'TabPanelAdapter',
});

/** Breadcrumb adapter */
export const BreadcrumbAdapter = createAdapter(Breadcrumbs, {
  mapProps: (a2ui, ctx) => {
    const items = (a2ui.items ?? []).map((item: any, idx: number) => (
      <Anchor href={item.href ?? '#'} key={idx} size="sm">
        {item.label ?? item.text}
      </Anchor>
    ));

    return {
      separator: a2ui.separator ?? '/',
      children: items.length > 0 ? items : ctx.children,
    };
  },
  displayName: 'BreadcrumbAdapter',
});

/** Pagination adapter */
export const PaginationAdapter = createAdapter(Pagination, {
  mapProps: (a2ui, ctx) => ({
    total: a2ui.total ?? a2ui.pageCount ?? 10,
    value: a2ui.page ?? a2ui.currentPage ?? 1,
    onChange: a2ui.onChange ? (page: number) => {
      ctx.onAction({
        actionName: a2ui.onChange.name,
        sourceComponentId: ctx.componentId,
        timestamp: new Date().toISOString(),
        context: { page },
      });
    } : undefined,
    siblings: a2ui.siblings ?? 1,
    boundaries: a2ui.boundaries ?? 1,
  }),
  displayName: 'PaginationAdapter',
});

// ============================================================================
// DATA DISPLAY ADAPTERS
// ============================================================================

/** List adapter - renders items in a stack */
export const ListAdapter = createAdapter(Stack, {
  mapProps: (a2ui, ctx) => ({
    gap: extractValue(a2ui.gap) ?? 'sm',
    children: ctx.children,
  }),
  displayName: 'ListAdapter',
});

/** Table adapter */
export const TableAdapter = createAdapter(Table, {
  mapProps: (a2ui, ctx) => ({
    striped: a2ui.striped ?? false,
    highlightOnHover: a2ui.highlightOnHover ?? true,
    withTableBorder: a2ui.bordered ?? false,
    withColumnBorders: a2ui.columnBorders ?? false,
    children: ctx.children,
  }),
  displayName: 'TableAdapter',
});

/** TableHeader adapter */
export const TableHeaderAdapter = createAdapter(Table.Thead, {
  mapProps: (_, ctx) => ({
    children: ctx.children,
  }),
  displayName: 'TableHeaderAdapter',
});

/** TableBody adapter */
export const TableBodyAdapter = createAdapter(Table.Tbody, {
  mapProps: (_, ctx) => ({
    children: ctx.children,
  }),
  displayName: 'TableBodyAdapter',
});

/** TableRow adapter */
export const TableRowAdapter = createAdapter(Table.Tr, {
  mapProps: (_, ctx) => ({
    children: ctx.children,
  }),
  displayName: 'TableRowAdapter',
});

/** TableCell adapter */
export const TableCellAdapter = createAdapter(Table.Td, {
  mapProps: (a2ui, ctx) => ({
    children: a2ui.content ?? a2ui.text ?? ctx.children,
  }),
  displayName: 'TableCellAdapter',
});

// ============================================================================
// DISCLOSURE & OVERLAY ADAPTERS
// ============================================================================

/** Accordion adapter */
export const AccordionAdapter = createAdapter(Accordion, {
  mapProps: (a2ui, ctx) => ({
    defaultValue: a2ui.defaultValue,
    multiple: a2ui.multiple ?? false,
    variant: a2ui.variant ?? 'default',
    radius: a2ui.radius ?? 'md',
    children: ctx.children,
  }),
  displayName: 'AccordionAdapter',
});

/** AccordionItem adapter */
export const AccordionItemAdapter = createAdapter(Accordion.Item, {
  mapProps: (a2ui, ctx) => ({
    value: a2ui.value ?? a2ui.id ?? 'item',
    children: (
      <>
        <Accordion.Control>{a2ui.title ?? a2ui.label}</Accordion.Control>
        <Accordion.Panel>{ctx.children}</Accordion.Panel>
      </>
    ),
  }),
  childrenProp: null, // We handle children manually
  displayName: 'AccordionItemAdapter',
});

/** Dialog/Modal adapter - simplified for demo */
export const DialogAdapter = createAdapter(asComponent(Paper), {
  mapProps: (_a2ui, ctx) => ({
    shadow: 'md',
    radius: 'md',
    p: 'lg',
    withBorder: true,
    children: ctx.children,
  }),
  displayName: 'DialogAdapter',
});

// ============================================================================
// FALLBACK ADAPTER
// ============================================================================

/** Fallback for unknown component types */
function FallbackComponent({ node }: A2UIComponentProps) {
  return (
    <Alert color="yellow" title={`Unknown Component: ${node.type}`} radius="md">
      <Text size="sm" c="dimmed">
        No adapter registered for component type "{node.type}".
        Register an adapter in your component mapping.
      </Text>
      <details style={{ marginTop: 8 }}>
        <summary style={{ cursor: 'pointer', fontSize: 12 }}>View node data</summary>
        <pre style={{ fontSize: 10, marginTop: 8, overflow: 'auto' }}>
          {JSON.stringify(node, null, 2)}
        </pre>
      </details>
    </Alert>
  );
}

// ============================================================================
// COMPLETE COMPONENT MAPPING
// ============================================================================

/**
 * Complete Mantine component mapping for A2UI.
 *
 * This maps A2UI component types to Mantine adapters.
 * You can extend or override this mapping as needed.
 */
export const mantineComponents = createComponentMapping(
  {
    // Layout
    Row: RowAdapter,
    Column: ColumnAdapter,
    Card: CardAdapter,
    Divider: DividerAdapter,
    Separator: DividerAdapter, // Alias
    ScrollArea: ScrollAreaAdapter,

    // Typography & Display
    Text: TextAdapter,
    Badge: BadgeAdapter,
    Label: TextAdapter, // Use Text for labels
    Link: TextAdapter, // Simplified
    Image: ImageAdapter,
    Avatar: AvatarAdapter,
    Skeleton: SkeletonAdapter,

    // Form Inputs
    Button: ButtonAdapter,
    Input: InputAdapter,
    TextField: TextFieldAdapter,
    TextArea: TextAreaAdapter,
    Checkbox: CheckboxAdapter,
    Switch: SwitchAdapter,
    Select: SelectAdapter,
    RadioGroup: RadioGroupAdapter,
    Slider: SliderAdapter,

    // Feedback & Status
    Alert: AlertAdapter,
    Progress: ProgressAdapter,
    Spinner: SpinnerAdapter,
    Tooltip: TooltipAdapter,

    // Navigation
    Tabs: TabsAdapter,
    TabPanel: TabPanelAdapter,
    Breadcrumb: BreadcrumbAdapter,
    Pagination: PaginationAdapter,

    // Data Display
    List: ListAdapter,
    Table: TableAdapter,
    TableHeader: TableHeaderAdapter,
    TableBody: TableBodyAdapter,
    TableRow: TableRowAdapter,
    TableCell: TableCellAdapter,

    // Disclosure & Overlay
    Accordion: AccordionAdapter,
    AccordionItem: AccordionItemAdapter,
    Dialog: DialogAdapter,
    Modal: DialogAdapter, // Alias
  },
  FallbackComponent
);

// Export individual adapters for custom mappings
export const adapters = {
  Row: RowAdapter,
  Column: ColumnAdapter,
  Card: CardAdapter,
  Divider: DividerAdapter,
  ScrollArea: ScrollAreaAdapter,
  Text: TextAdapter,
  Badge: BadgeAdapter,
  Image: ImageAdapter,
  Avatar: AvatarAdapter,
  Skeleton: SkeletonAdapter,
  Button: ButtonAdapter,
  Input: InputAdapter,
  TextField: TextFieldAdapter,
  TextArea: TextAreaAdapter,
  Checkbox: CheckboxAdapter,
  Switch: SwitchAdapter,
  Select: SelectAdapter,
  RadioGroup: RadioGroupAdapter,
  Slider: SliderAdapter,
  Alert: AlertAdapter,
  Progress: ProgressAdapter,
  Spinner: SpinnerAdapter,
  Tooltip: TooltipAdapter,
  Tabs: TabsAdapter,
  TabPanel: TabPanelAdapter,
  Breadcrumb: BreadcrumbAdapter,
  Pagination: PaginationAdapter,
  List: ListAdapter,
  Table: TableAdapter,
  TableHeader: TableHeaderAdapter,
  TableBody: TableBodyAdapter,
  TableRow: TableRowAdapter,
  TableCell: TableCellAdapter,
  Accordion: AccordionAdapter,
  AccordionItem: AccordionItemAdapter,
  Dialog: DialogAdapter,
  Fallback: FallbackComponent,
};
