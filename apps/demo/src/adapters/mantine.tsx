/**
 * Mantine Component Adapters for A2UI Bridge
 *
 * Comprehensive adapter set for Mantine UI components.
 * This demonstrates what a full production adapter looks like.
 */

import {
  createAdapter,
  createActionHandler,
  createComponentMapping,
  extractValue,
  mapVariant,
  type A2UIComponentProps,
} from '@a2ui-bridge/react';

import React, { type ComponentType } from 'react';

// Mantine Components - Full Import
import {
  // Layout
  Box,
  Center,
  Flex,
  Group,
  SimpleGrid,
  Stack,
  Space,
  Container,
  AspectRatio,

  // Surfaces
  Card,
  Paper,

  // Typography
  Text,
  Title,
  Blockquote,
  Code,
  Highlight,
  Mark,

  // Inputs
  Button,
  ActionIcon,
  TextInput,
  Textarea,
  NumberInput,
  PasswordInput,
  Checkbox,
  Switch,
  Radio,
  Select,
  MultiSelect,
  SegmentedControl,
  Slider,
  RangeSlider,
  Rating,
  Chip,
  ColorInput,
  FileInput,
  PinInput,

  // Data Display
  Badge,
  Avatar,
  Image,
  Indicator,
  ThemeIcon,
  Spoiler,
  Table,
  List as MantineList,
  Timeline,

  // Feedback
  Alert,
  Loader,
  Progress,
  RingProgress,
  Skeleton,
  Notification,

  // Overlays
  Tooltip,
  Popover,
  Menu,

  // Navigation
  Anchor,
  Breadcrumbs,
  NavLink,
  Pagination,
  Stepper,
  Tabs,

  // Disclosure
  Accordion,
  Divider,
  ScrollArea,
  Fieldset,
} from '@mantine/core';

// Tabler Icons - comprehensive set for LLM-generated UIs
import {
  IconAlertCircle,
  IconCheck,
  IconCircleCheck,
  IconInfoCircle,
  IconAlertTriangle,
  IconX,
  IconPlus,
  IconMinus,
  IconEdit,
  IconTrash,
  IconSearch,
  IconSettings,
  IconUser,
  IconUsers,
  IconHeart,
  IconStar,
  IconDownload,
  IconUpload,
  IconShare,
  IconCopy,
  IconExternalLink,
  IconChevronRight,
  IconChevronLeft,
  IconChevronDown,
  IconChevronUp,
  IconArrowRight,
  IconArrowLeft,
  IconArrowUp,
  IconArrowDown,
  IconMenu2,
  IconHome,
  IconMail,
  IconPhone,
  IconCalendar,
  IconClock,
  IconMapPin,
  IconPhoto,
  IconFile,
  IconFolder,
  IconLock,
  IconEye,
  IconEyeOff,
  IconRefresh,
  IconSend,
  IconFilter,
  IconArrowsSort,
  IconCreditCard,
  IconWallet,
  IconCurrencyDollar,
  IconRun,
  IconTarget,
  IconList,
  IconDots,
  IconDotsVertical,
  IconBell,
  IconMessage,
  IconMessageCircle,
  IconPlayerPlay,
  IconPlayerPause,
  IconPlayerStop,
  IconVolume,
  IconVolumeOff,
  IconZoomIn,
  IconZoomOut,
  IconMaximize,
  IconMinimize,
  IconBookmark,
  IconTag,
  IconTags,
  IconFlag,
  IconPin,
  IconClipboard,
  IconArchive,
  IconBox,
  IconPackage,
  IconShoppingCart,
  IconGift,
  IconTruck,
  IconBriefcase,
  IconBuilding,
  IconSchool,
  IconCertificate,
  IconAward,
  IconTrophy,
  IconFlame,
  IconBolt,
  IconCloud,
  IconSun,
  IconMoon,
  IconWorld,
  IconGlobe,
  IconLanguage,
  IconCode,
  IconTerminal,
  IconBug,
  IconRocket,
  IconSparkles,
  IconWand,
  IconPalette,
  IconBrush,
  IconCamera,
  IconMicrophone,
  IconHeadphones,
  IconDevices,
  IconDeviceMobile,
  IconDeviceDesktop,
  IconPrinter,
  IconWifi,
  IconBluetooth,
  IconQrcode,
  IconFingerprint,
  IconShield,
  IconShieldCheck,
  IconKey,
  IconLogin,
  IconLogout,
  IconUserPlus,
  IconUserMinus,
  IconUserCheck,
  IconHelp,
  IconQuestionMark,
  IconExclamationMark,
  IconCircle,
  IconSquare,
  IconTriangle,
  IconHexagon,
  IconOctagon,
  IconInfinity,
  IconActivity,
  IconChartBar,
  IconChartLine,
  IconChartPie,
  IconGraph,
  IconTrendingUp,
  IconTrendingDown,
  IconPercentage,
  IconCalculator,
  IconReceipt,
  IconReportAnalytics,
  IconTable,
  IconLayoutGrid,
  IconLayoutList,
  IconLayoutKanban,
  IconLayoutDashboard,
} from '@tabler/icons-react';

// Type helper for Mantine's polymorphic components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const asComponent = <T,>(component: T): ComponentType<any> => component as ComponentType<any>;

// Icon mapping for dynamic icon rendering
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  // Status & Alerts
  alert: IconAlertCircle,
  alertcircle: IconAlertCircle,
  check: IconCheck,
  checkcircle: IconCircleCheck,
  circlecheck: IconCircleCheck,
  checkmark: IconCheck,
  success: IconCircleCheck,
  info: IconInfoCircle,
  information: IconInfoCircle,
  warning: IconAlertTriangle,
  danger: IconAlertTriangle,
  error: IconAlertCircle,
  close: IconX,
  x: IconX,
  cancel: IconX,

  // Add/Remove
  plus: IconPlus,
  add: IconPlus,
  new: IconPlus,
  create: IconPlus,
  minus: IconMinus,
  remove: IconMinus,
  subtract: IconMinus,

  // Edit/Delete
  edit: IconEdit,
  pencil: IconEdit,
  modify: IconEdit,
  trash: IconTrash,
  delete: IconTrash,
  bin: IconTrash,

  // Search & Navigation
  search: IconSearch,
  find: IconSearch,
  magnify: IconSearch,
  menu: IconMenu2,
  hamburger: IconMenu2,
  bars: IconMenu2,
  home: IconHome,
  house: IconHome,
  external: IconExternalLink,
  externallink: IconExternalLink,
  link: IconExternalLink,
  openinnew: IconExternalLink,

  // Arrows & Chevrons
  chevronright: IconChevronRight,
  chevronleft: IconChevronLeft,
  chevrondown: IconChevronDown,
  chevronup: IconChevronUp,
  arrowright: IconArrowRight,
  arrowleft: IconArrowLeft,
  arrowup: IconArrowUp,
  arrowdown: IconArrowDown,
  next: IconChevronRight,
  previous: IconChevronLeft,
  back: IconArrowLeft,
  forward: IconArrowRight,

  // User & People
  user: IconUser,
  person: IconUser,
  profile: IconUser,
  account: IconUser,
  users: IconUsers,
  people: IconUsers,
  team: IconUsers,
  group: IconUsers,
  userplus: IconUserPlus,
  adduser: IconUserPlus,
  userminus: IconUserMinus,
  removeuser: IconUserMinus,
  usercheck: IconUserCheck,

  // Communication
  mail: IconMail,
  email: IconMail,
  envelope: IconMail,
  message: IconMessage,
  chat: IconMessageCircle,
  comment: IconMessageCircle,
  phone: IconPhone,
  call: IconPhone,
  telephone: IconPhone,
  send: IconSend,
  bell: IconBell,
  notification: IconBell,
  notifications: IconBell,

  // Actions
  settings: IconSettings,
  gear: IconSettings,
  cog: IconSettings,
  preferences: IconSettings,
  download: IconDownload,
  upload: IconUpload,
  share: IconShare,
  copy: IconCopy,
  duplicate: IconCopy,
  clipboard: IconClipboard,
  paste: IconClipboard,
  filter: IconFilter,
  sort: IconArrowsSort,
  refresh: IconRefresh,
  reload: IconRefresh,
  sync: IconRefresh,

  // Favorites & Actions
  heart: IconHeart,
  favorite: IconHeart,
  like: IconHeart,
  love: IconHeart,
  star: IconStar,
  rate: IconStar,
  rating: IconStar,
  bookmark: IconBookmark,
  save: IconBookmark,
  flag: IconFlag,
  report: IconFlag,
  pin: IconPin,

  // Time & Calendar
  calendar: IconCalendar,
  date: IconCalendar,
  schedule: IconCalendar,
  event: IconCalendar,
  clock: IconClock,
  time: IconClock,
  timer: IconClock,
  history: IconClock,

  // Location
  location: IconMapPin,
  mappin: IconMapPin,
  geopin: IconMapPin,
  address: IconMapPin,
  place: IconMapPin,
  world: IconWorld,
  globe: IconGlobe,
  global: IconGlobe,
  language: IconLanguage,
  translate: IconLanguage,

  // Files & Documents
  file: IconFile,
  document: IconFile,
  doc: IconFile,
  folder: IconFolder,
  directory: IconFolder,
  photo: IconPhoto,
  image: IconPhoto,
  picture: IconPhoto,
  camera: IconCamera,
  archive: IconArchive,

  // Security
  lock: IconLock,
  locked: IconLock,
  secure: IconLock,
  password: IconLock,
  key: IconKey,
  unlock: IconKey,
  shield: IconShield,
  security: IconShield,
  shieldcheck: IconShieldCheck,
  verified: IconShieldCheck,
  fingerprint: IconFingerprint,
  biometric: IconFingerprint,

  // View & Visibility
  eye: IconEye,
  view: IconEye,
  show: IconEye,
  visible: IconEye,
  eyeoff: IconEyeOff,
  hide: IconEyeOff,
  hidden: IconEyeOff,
  invisible: IconEyeOff,
  zoomin: IconZoomIn,
  zoomout: IconZoomOut,
  maximize: IconMaximize,
  fullscreen: IconMaximize,
  minimize: IconMinimize,

  // Media
  play: IconPlayerPlay,
  pause: IconPlayerPause,
  stop: IconPlayerStop,
  volume: IconVolume,
  sound: IconVolume,
  audio: IconVolume,
  mute: IconVolumeOff,
  volumeoff: IconVolumeOff,
  microphone: IconMicrophone,
  mic: IconMicrophone,
  headphones: IconHeadphones,

  // Money & Commerce
  creditcard: IconCreditCard,
  card: IconCreditCard,
  payment: IconCreditCard,
  wallet: IconWallet,
  money: IconCurrencyDollar,
  dollar: IconCurrencyDollar,
  currency: IconCurrencyDollar,
  price: IconCurrencyDollar,
  cart: IconShoppingCart,
  shoppingcart: IconShoppingCart,
  basket: IconShoppingCart,
  gift: IconGift,
  present: IconGift,
  receipt: IconReceipt,
  invoice: IconReceipt,

  // Shipping & Logistics
  truck: IconTruck,
  delivery: IconTruck,
  shipping: IconTruck,
  box: IconBox,
  package: IconPackage,
  parcel: IconPackage,

  // Work & Business
  briefcase: IconBriefcase,
  work: IconBriefcase,
  job: IconBriefcase,
  business: IconBriefcase,
  building: IconBuilding,
  company: IconBuilding,
  office: IconBuilding,

  // Education & Achievement
  school: IconSchool,
  education: IconSchool,
  learning: IconSchool,
  certificate: IconCertificate,
  diploma: IconCertificate,
  award: IconAward,
  medal: IconAward,
  trophy: IconTrophy,
  winner: IconTrophy,
  achievement: IconTrophy,

  // Activity & Sports
  running: IconRun,
  run: IconRun,
  exercise: IconRun,
  fitness: IconRun,
  activity: IconActivity,
  target: IconTarget,
  goal: IconTarget,
  aim: IconTarget,
  bullseye: IconTarget,
  flame: IconFlame,
  fire: IconFlame,
  hot: IconFlame,
  trending: IconFlame,

  // Energy & Power
  bolt: IconBolt,
  lightning: IconBolt,
  power: IconBolt,
  electricity: IconBolt,
  energy: IconBolt,

  // Weather & Nature
  cloud: IconCloud,
  weather: IconCloud,
  sun: IconSun,
  light: IconSun,
  brightness: IconSun,
  moon: IconMoon,
  dark: IconMoon,
  night: IconMoon,

  // Tech & Development
  code: IconCode,
  developer: IconCode,
  programming: IconCode,
  terminal: IconTerminal,
  console: IconTerminal,
  command: IconTerminal,
  bug: IconBug,
  debug: IconBug,
  issue: IconBug,
  rocket: IconRocket,
  launch: IconRocket,
  startup: IconRocket,
  deploy: IconRocket,
  sparkles: IconSparkles,
  magic: IconSparkles,
  ai: IconSparkles,
  wand: IconWand,
  generate: IconWand,

  // Design & Creative
  palette: IconPalette,
  colors: IconPalette,
  theme: IconPalette,
  brush: IconBrush,
  paint: IconBrush,
  design: IconBrush,

  // Devices
  devices: IconDevices,
  mobile: IconDeviceMobile,
  smartphone: IconDeviceMobile,
  desktop: IconDeviceDesktop,
  computer: IconDeviceDesktop,
  laptop: IconDeviceDesktop,
  printer: IconPrinter,
  print: IconPrinter,
  wifi: IconWifi,
  wireless: IconWifi,
  internet: IconWifi,
  bluetooth: IconBluetooth,
  qrcode: IconQrcode,
  qr: IconQrcode,
  scan: IconQrcode,

  // Auth
  login: IconLogin,
  signin: IconLogin,
  logout: IconLogout,
  signout: IconLogout,

  // Help & Support
  help: IconHelp,
  support: IconHelp,
  questionmark: IconQuestionMark,
  question: IconQuestionMark,
  exclamationmark: IconExclamationMark,
  exclamation: IconExclamationMark,
  important: IconExclamationMark,

  // List & Organization
  list: IconList,
  listing: IconList,
  items: IconList,
  dots: IconDots,
  more: IconDots,
  ellipsis: IconDots,
  options: IconDotsVertical,
  dotsvertical: IconDotsVertical,
  tag: IconTag,
  label: IconTag,
  tags: IconTags,
  labels: IconTags,

  // Shapes
  circle: IconCircle,
  square: IconSquare,
  triangle: IconTriangle,
  hexagon: IconHexagon,
  octagon: IconOctagon,
  infinity: IconInfinity,
  infinite: IconInfinity,

  // Charts & Analytics
  chart: IconChartBar,
  chartbar: IconChartBar,
  barchart: IconChartBar,
  analytics: IconChartBar,
  chartline: IconChartLine,
  linechart: IconChartLine,
  chartpie: IconChartPie,
  piechart: IconChartPie,
  graph: IconGraph,
  trendingup: IconTrendingUp,
  increase: IconTrendingUp,
  growth: IconTrendingUp,
  trendingdown: IconTrendingDown,
  decrease: IconTrendingDown,
  decline: IconTrendingDown,
  percentage: IconPercentage,
  percent: IconPercentage,
  calculator: IconCalculator,
  calculate: IconCalculator,
  math: IconCalculator,
  reportanalytics: IconReportAnalytics,
  reports: IconReportAnalytics,
  table: IconTable,
  spreadsheet: IconTable,
  grid: IconTable,

  // Layout
  layoutgrid: IconLayoutGrid,
  gridview: IconLayoutGrid,
  layoutlist: IconLayoutList,
  listview: IconLayoutList,
  layoutkanban: IconLayoutKanban,
  kanban: IconLayoutKanban,
  board: IconLayoutKanban,
  layoutdashboard: IconLayoutDashboard,
  dashboard: IconLayoutDashboard,
};

// Helper to get icon component
const getIcon = (iconName?: string) => {
  if (!iconName) return null;
  const normalized = iconName.toLowerCase().replace(/[-_\s]/g, '');
  return ICON_MAP[normalized] || ICON_MAP[iconName] || null;
};

// ============================================================================
// LAYOUT ADAPTERS
// ============================================================================

/** Row adapter - horizontal flex container */
export const RowAdapter = createAdapter(Group, {
  mapProps: (a2ui, ctx) => ({
    gap: extractValue(a2ui.gap) ?? 'md',
    align: extractValue(a2ui.align) ?? extractValue(a2ui.alignment) ?? 'center',
    justify: extractValue(a2ui.justify) ?? extractValue(a2ui.justifyContent),
    wrap: extractValue(a2ui.wrap) ?? 'wrap',
    grow: extractValue(a2ui.grow) ?? false,
    children: ctx.children,
  }),
  displayName: 'RowAdapter',
});

/** Column adapter - vertical flex container */
export const ColumnAdapter = createAdapter(Stack, {
  mapProps: (a2ui, ctx) => ({
    gap: extractValue(a2ui.gap) ?? 'md',
    align: extractValue(a2ui.align) ?? extractValue(a2ui.alignment),
    justify: extractValue(a2ui.justify) ?? extractValue(a2ui.justifyContent),
    children: ctx.children,
  }),
  displayName: 'ColumnAdapter',
});

/** Flex adapter - flexible container */
export const FlexAdapter = createAdapter(asComponent(Flex), {
  mapProps: (a2ui, ctx) => ({
    gap: extractValue(a2ui.gap) ?? 'md',
    direction: extractValue(a2ui.direction) ?? 'row',
    align: extractValue(a2ui.align),
    justify: extractValue(a2ui.justify),
    wrap: extractValue(a2ui.wrap),
    children: ctx.children,
  }),
  displayName: 'FlexAdapter',
});

/** Grid adapter - grid layout */
export const GridAdapter = createAdapter(SimpleGrid, {
  mapProps: (a2ui, ctx) => ({
    cols: extractValue(a2ui.columns) ?? extractValue(a2ui.cols) ?? 2,
    spacing: extractValue(a2ui.gap) ?? extractValue(a2ui.spacing) ?? 'md',
    verticalSpacing: extractValue(a2ui.verticalSpacing),
    children: ctx.children,
  }),
  displayName: 'GridAdapter',
});

/** Center adapter - centering container */
export const CenterAdapter = createAdapter(asComponent(Center), {
  mapProps: (a2ui, ctx) => ({
    inline: extractValue(a2ui.inline) ?? false,
    children: ctx.children,
  }),
  displayName: 'CenterAdapter',
});

/** Box adapter - generic container */
export const BoxAdapter = createAdapter(asComponent(Box), {
  mapProps: (a2ui, ctx) => ({
    p: extractValue(a2ui.padding) ?? extractValue(a2ui.p),
    m: extractValue(a2ui.margin) ?? extractValue(a2ui.m),
    bg: extractValue(a2ui.background) ?? extractValue(a2ui.bg),
    children: ctx.children,
  }),
  displayName: 'BoxAdapter',
});

/** Space adapter - spacing utility */
export const SpaceAdapter = createAdapter(Space, {
  mapProps: (a2ui) => ({
    h: extractValue(a2ui.height) ?? extractValue(a2ui.h) ?? 'md',
    w: extractValue(a2ui.width) ?? extractValue(a2ui.w),
  }),
  displayName: 'SpaceAdapter',
});

/** Container adapter */
export const ContainerAdapter = createAdapter(asComponent(Container), {
  mapProps: (a2ui, ctx) => ({
    size: extractValue(a2ui.size) ?? 'md',
    children: ctx.children,
  }),
  displayName: 'ContainerAdapter',
});

/** AspectRatio adapter */
export const AspectRatioAdapter = createAdapter(AspectRatio, {
  mapProps: (a2ui, ctx) => ({
    ratio: extractValue(a2ui.ratio) ?? 16 / 9,
    children: ctx.children,
  }),
  displayName: 'AspectRatioAdapter',
});

// ============================================================================
// SURFACE ADAPTERS
// ============================================================================

/** Card adapter */
export const CardAdapter = createAdapter(asComponent(Card), {
  mapProps: (a2ui, ctx) => ({
    shadow: extractValue(a2ui.shadow) ?? 'sm',
    padding: extractValue(a2ui.padding) ?? 'lg',
    radius: extractValue(a2ui.radius) ?? 'md',
    withBorder: extractValue(a2ui.withBorder) ?? extractValue(a2ui.bordered) ?? true,
    children: ctx.children,
  }),
  displayName: 'CardAdapter',
});

/** Paper adapter - surface component */
export const PaperAdapter = createAdapter(asComponent(Paper), {
  mapProps: (a2ui, ctx) => ({
    shadow: extractValue(a2ui.shadow) ?? 'xs',
    p: extractValue(a2ui.padding) ?? 'md',
    radius: extractValue(a2ui.radius) ?? 'md',
    withBorder: extractValue(a2ui.withBorder) ?? false,
    children: ctx.children,
  }),
  displayName: 'PaperAdapter',
});

/** Fieldset adapter - form grouping */
export const FieldsetAdapter = createAdapter(Fieldset, {
  mapProps: (a2ui, ctx) => ({
    legend: extractValue(a2ui.legend) ?? extractValue(a2ui.title) ?? extractValue(a2ui.label),
    variant: extractValue(a2ui.variant) ?? 'default',
    children: ctx.children,
  }),
  displayName: 'FieldsetAdapter',
});

/** Divider adapter */
export const DividerAdapter = createAdapter(Divider, {
  mapProps: (a2ui) => ({
    my: extractValue(a2ui.margin) ?? 'md',
    label: extractValue(a2ui.label),
    labelPosition: extractValue(a2ui.labelPosition) ?? 'center',
    orientation: extractValue(a2ui.orientation) ?? 'horizontal',
    size: extractValue(a2ui.size) ?? 'xs',
  }),
  displayName: 'DividerAdapter',
});

/** ScrollArea adapter */
export const ScrollAreaAdapter = createAdapter(ScrollArea, {
  mapProps: (a2ui, ctx) => ({
    h: extractValue(a2ui.height) ?? 300,
    type: extractValue(a2ui.type) ?? 'auto',
    offsetScrollbars: extractValue(a2ui.offsetScrollbars) ?? true,
    children: ctx.children,
  }),
  displayName: 'ScrollAreaAdapter',
});

// ============================================================================
// TYPOGRAPHY ADAPTERS
// ============================================================================

/** Text adapter - handles usageHint for semantic text styling */
export const TextAdapter = createAdapter(asComponent(Text), {
  mapProps: (a2ui, ctx) => {
    const rawContent = a2ui.text ?? a2ui.content ?? a2ui.label ?? ctx.children;
    const content = extractValue(rawContent);
    const usageHint = extractValue(a2ui.usageHint);

    // Map usageHint to size and weight for proper visual hierarchy
    const usageHintStyles: Record<string, { size?: string; fw?: number; c?: string }> = {
      h1: { size: '2rem', fw: 700 },
      h2: { size: '1.5rem', fw: 600 },
      h3: { size: '1.25rem', fw: 600 },
      h4: { size: '1.125rem', fw: 600 },
      h5: { size: '1rem', fw: 600 },
      h6: { size: '0.875rem', fw: 600 },
      body: { size: 'md' },
      caption: { size: 'sm', c: 'dimmed' },
      label: { size: 'sm', fw: 500 },
    };

    const hintStyle = usageHint ? usageHintStyles[usageHint] : {};

    return {
      size: extractValue(a2ui.size) ?? hintStyle.size ?? 'md',
      fw: extractValue(a2ui.weight) ?? extractValue(a2ui.fontWeight) ?? hintStyle.fw,
      c: extractValue(a2ui.color) ?? hintStyle.c,
      ta: extractValue(a2ui.align) ?? extractValue(a2ui.textAlign),
      fs: extractValue(a2ui.italic) ? 'italic' : undefined,
      td: extractValue(a2ui.underline) ? 'underline' : extractValue(a2ui.strikethrough) ? 'line-through' : undefined,
      tt: extractValue(a2ui.transform) ?? extractValue(a2ui.textTransform),
      lineClamp: extractValue(a2ui.lineClamp) ?? extractValue(a2ui.maxLines),
      truncate: extractValue(a2ui.truncate),
      children: content,
    };
  },
  displayName: 'TextAdapter',
});

/** Title adapter - headings */
export const TitleAdapter = createAdapter(asComponent(Title), {
  mapProps: (a2ui, ctx) => {
    const rawContent = a2ui.text ?? a2ui.content ?? a2ui.label ?? a2ui.title ?? ctx.children;
    const content = extractValue(rawContent);
    const level = extractValue(a2ui.level) ?? extractValue(a2ui.order) ?? 2;

    return {
      order: Math.min(Math.max(level, 1), 6) as 1 | 2 | 3 | 4 | 5 | 6,
      ta: extractValue(a2ui.align),
      c: extractValue(a2ui.color),
      children: content,
    };
  },
  displayName: 'TitleAdapter',
});

/** Code adapter - inline code or code blocks */
export const CodeAdapter = createAdapter(asComponent(Code), {
  mapProps: (a2ui, ctx) => {
    const content = extractValue(a2ui.code) ?? extractValue(a2ui.text) ?? extractValue(a2ui.content) ?? ctx.children;
    return {
      block: extractValue(a2ui.block) ?? false,
      color: extractValue(a2ui.color),
      children: content,
    };
  },
  displayName: 'CodeAdapter',
});

/** Blockquote adapter */
export const BlockquoteAdapter = createAdapter(asComponent(Blockquote), {
  mapProps: (a2ui, ctx) => {
    const content = extractValue(a2ui.quote) ?? extractValue(a2ui.text) ?? extractValue(a2ui.content) ?? ctx.children;
    return {
      cite: extractValue(a2ui.cite) ?? extractValue(a2ui.author) ?? extractValue(a2ui.source),
      color: extractValue(a2ui.color) ?? 'blue',
      children: content,
    };
  },
  displayName: 'BlockquoteAdapter',
});

/** Highlight adapter - highlighted text */
export const HighlightAdapter = createAdapter(asComponent(Highlight), {
  mapProps: (a2ui, ctx) => {
    const content = extractValue(a2ui.text) ?? extractValue(a2ui.content) ?? ctx.children ?? '';
    const highlight = extractValue(a2ui.highlight) ?? extractValue(a2ui.query) ?? '';
    return {
      highlight: highlight,
      highlightStyles: { backgroundColor: 'var(--mantine-color-yellow-3)' },
      children: String(content),
    };
  },
  displayName: 'HighlightAdapter',
});

/** Mark adapter - marked/highlighted text */
export const MarkAdapter = createAdapter(asComponent(Mark), {
  mapProps: (a2ui, ctx) => {
    const content = extractValue(a2ui.text) ?? extractValue(a2ui.content) ?? ctx.children;
    return {
      color: extractValue(a2ui.color) ?? 'yellow',
      children: content,
    };
  },
  displayName: 'MarkAdapter',
});

/** Spoiler adapter - show more/less */
export const SpoilerAdapter = createAdapter(Spoiler, {
  mapProps: (a2ui, ctx) => ({
    maxHeight: extractValue(a2ui.maxHeight) ?? 100,
    showLabel: extractValue(a2ui.showLabel) ?? 'Show more',
    hideLabel: extractValue(a2ui.hideLabel) ?? 'Hide',
    children: ctx.children,
  }),
  displayName: 'SpoilerAdapter',
});

// ============================================================================
// BADGE & INDICATOR ADAPTERS
// ============================================================================

/** Badge adapter */
export const BadgeAdapter = createAdapter(asComponent(Badge), {
  mapProps: (a2ui) => ({
    children: extractValue(a2ui.label) ?? extractValue(a2ui.text) ?? extractValue(a2ui.content),
    color: mapVariant(extractValue(a2ui.variant) ?? extractValue(a2ui.color), {
      primary: 'blue',
      secondary: 'gray',
      success: 'green',
      warning: 'yellow',
      danger: 'red',
      error: 'red',
      info: 'cyan',
    }, extractValue(a2ui.color) ?? 'blue'),
    variant: extractValue(a2ui.filled) ? 'filled' : extractValue(a2ui.outline) ? 'outline' : 'light',
    size: extractValue(a2ui.size) ?? 'md',
    radius: extractValue(a2ui.radius) ?? 'xl',
  }),
  displayName: 'BadgeAdapter',
});

/** Indicator adapter - notification dot */
export const IndicatorAdapter = createAdapter(Indicator, {
  mapProps: (a2ui, ctx) => ({
    color: extractValue(a2ui.color) ?? 'red',
    size: extractValue(a2ui.size) ?? 10,
    offset: extractValue(a2ui.offset) ?? 5,
    position: extractValue(a2ui.position) ?? 'top-end',
    processing: extractValue(a2ui.processing) ?? extractValue(a2ui.pulse) ?? false,
    disabled: extractValue(a2ui.hidden) ?? extractValue(a2ui.disabled) ?? false,
    label: extractValue(a2ui.label) ?? extractValue(a2ui.count),
    children: ctx.children,
  }),
  displayName: 'IndicatorAdapter',
});

/** Safe ThemeIcon wrapper - returns null when no icon to render */
const SafeThemeIcon: React.FC<{
  iconName?: string;
  color?: string;
  variant?: string;
  size?: string;
  radius?: string;
  children?: React.ReactNode;
}> = ({ iconName, color, variant, size = 'md', radius, children }) => {
  const IconComponent = getIcon(iconName);
  const iconSize = size === 'xs' ? 12 : size === 'sm' ? 14 : size === 'lg' ? 20 : size === 'xl' ? 24 : 16;

  // Don't render anything if there's no icon and no children
  const hasIcon = !!IconComponent;
  const hasChildren = React.Children.count(children) > 0;

  if (!hasIcon && !hasChildren) {
    return null;
  }

  return (
    <ThemeIcon color={color ?? 'blue'} variant={variant ?? 'filled'} size={size} radius={radius ?? 'md'}>
      {hasIcon ? <IconComponent size={iconSize} /> : children}
    </ThemeIcon>
  );
};

/** ThemeIcon adapter - icon in shape, returns null when no icon found */
export const ThemeIconAdapter = createAdapter(asComponent(SafeThemeIcon), {
  mapProps: (a2ui, ctx) => ({
    iconName: extractValue(a2ui.icon) ?? extractValue(a2ui.name),
    color: extractValue(a2ui.color),
    variant: extractValue(a2ui.variant),
    size: extractValue(a2ui.size),
    radius: extractValue(a2ui.radius),
    children: ctx.children,
  }),
  displayName: 'ThemeIconAdapter',
});

// ============================================================================
// IMAGE & AVATAR ADAPTERS
// ============================================================================

/** Avatar adapter */
export const AvatarAdapter = createAdapter(asComponent(Avatar), {
  mapProps: (a2ui) => ({
    src: extractValue(a2ui.src) ?? extractValue(a2ui.imageUrl) ?? extractValue(a2ui.image),
    alt: extractValue(a2ui.alt) ?? extractValue(a2ui.name),
    radius: extractValue(a2ui.radius) ?? 'xl',
    size: extractValue(a2ui.size) ?? 'md',
    color: extractValue(a2ui.color) ?? 'blue',
    children: extractValue(a2ui.initials) ?? extractValue(a2ui.fallback) ?? extractValue(a2ui.name)?.charAt(0),
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
    fallbackSrc: extractValue(a2ui.fallback) ?? extractValue(a2ui.placeholder),
  }),
  displayName: 'ImageAdapter',
});

// ============================================================================
// BUTTON ADAPTERS
// ============================================================================

/** Button adapter */
export const ButtonAdapter = createAdapter(asComponent(Button), {
  mapProps: (a2ui, ctx) => {
    const label = extractValue(a2ui.label) ?? extractValue(a2ui.text);
    const iconName = extractValue(a2ui.icon) ?? extractValue(a2ui.leftIcon);
    const IconComponent = getIcon(iconName);
    const variant = extractValue(a2ui.variant);

    return {
      children: label ?? ctx.children,
      onClick: createActionHandler(a2ui.action, ctx),
      variant: mapVariant(variant, {
        primary: 'filled',
        secondary: 'outline',
        tertiary: 'subtle',
        ghost: 'subtle',
        link: 'transparent',
        danger: 'filled',
        destructive: 'filled',
        success: 'filled',
      }, 'filled'),
      color: variant === 'danger' || variant === 'destructive' ? 'red'
           : variant === 'success' ? 'green'
           : extractValue(a2ui.color),
      disabled: extractValue(a2ui.disabled) ?? false,
      loading: extractValue(a2ui.loading) ?? false,
      size: extractValue(a2ui.size) ?? 'sm',
      radius: extractValue(a2ui.radius) ?? 'md',
      fullWidth: extractValue(a2ui.fullWidth) ?? extractValue(a2ui.block) ?? false,
      leftSection: IconComponent ? <IconComponent size={16} /> : undefined,
    };
  },
  displayName: 'ButtonAdapter',
});

/** ActionIcon adapter - icon button */
export const ActionIconAdapter = createAdapter(asComponent(ActionIcon), {
  mapProps: (a2ui, ctx) => {
    const iconName = extractValue(a2ui.icon) ?? extractValue(a2ui.name);
    const IconComponent = getIcon(iconName);
    const size = extractValue(a2ui.size) ?? 'md';
    const iconSize = size === 'xs' ? 14 : size === 'sm' ? 16 : size === 'lg' ? 22 : size === 'xl' ? 26 : 18;

    return {
      onClick: createActionHandler(a2ui.action, ctx),
      variant: extractValue(a2ui.variant) ?? 'subtle',
      color: extractValue(a2ui.color),
      size: size,
      radius: extractValue(a2ui.radius) ?? 'md',
      disabled: extractValue(a2ui.disabled) ?? false,
      loading: extractValue(a2ui.loading) ?? false,
      'aria-label': extractValue(a2ui.label) ?? extractValue(a2ui.ariaLabel) ?? iconName,
      children: IconComponent ? <IconComponent size={iconSize} /> : ctx.children,
    };
  },
  displayName: 'ActionIconAdapter',
});

// ============================================================================
// TEXT INPUT ADAPTERS
// ============================================================================

/** TextField/Input adapter */
export const TextFieldAdapter = createAdapter(TextInput, {
  mapProps: (a2ui, ctx) => {
    const iconName = extractValue(a2ui.icon) ?? extractValue(a2ui.leftIcon);
    const IconComponent = getIcon(iconName);

    return {
      label: extractValue(a2ui.label),
      placeholder: extractValue(a2ui.placeholder) ?? extractValue(a2ui.hint),
      description: extractValue(a2ui.description) ?? extractValue(a2ui.helperText),
      error: extractValue(a2ui.error),
      required: extractValue(a2ui.required) ?? false,
      disabled: extractValue(a2ui.disabled) ?? false,
      readOnly: extractValue(a2ui.readOnly) ?? false,
      defaultValue: extractValue(a2ui.defaultValue) ?? extractValue(a2ui.value),
      leftSection: IconComponent ? <IconComponent size={16} /> : undefined,
      onChange: a2ui.onChange ? (e: React.ChangeEvent<HTMLInputElement>) => {
        ctx.onAction({
          actionName: a2ui.onChange.name,
          sourceComponentId: ctx.componentId,
          timestamp: new Date().toISOString(),
          context: { value: e.target.value },
        });
      } : undefined,
    };
  },
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
    readOnly: extractValue(a2ui.readOnly) ?? false,
    minRows: extractValue(a2ui.minRows) ?? extractValue(a2ui.rows) ?? 3,
    maxRows: extractValue(a2ui.maxRows),
    autosize: extractValue(a2ui.autosize) ?? true,
    defaultValue: extractValue(a2ui.defaultValue) ?? extractValue(a2ui.value),
  }),
  displayName: 'TextAreaAdapter',
});

/** DateTimeInput adapter - Uses native date/datetime-local input with Mantine styling */
function DateTimeInputComponent({
  label,
  enableDate = true,
  enableTime = false,
  value,
  description,
  error,
  required,
  disabled,
  onChange,
}: {
  label?: string;
  enableDate?: boolean;
  enableTime?: boolean;
  value?: string;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
}) {
  const inputType = enableTime ? 'datetime-local' : 'date';

  return (
    <Box>
      {label && (
        <Text size="sm" fw={500} mb={4}>
          {label}
          {required && <Text span c="red" ml={2}>*</Text>}
        </Text>
      )}
      <TextInput
        type={inputType}
        defaultValue={value}
        description={description}
        error={error}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        styles={{
          input: {
            cursor: 'pointer',
          },
        }}
      />
    </Box>
  );
}

export const DateTimeInputAdapter = createAdapter(DateTimeInputComponent as ComponentType, {
  mapProps: (a2ui, ctx) => ({
    label: extractValue(a2ui.label),
    enableDate: extractValue(a2ui.enableDate) ?? true,
    enableTime: extractValue(a2ui.enableTime) ?? false,
    value: extractValue(a2ui.value) ?? extractValue(a2ui.defaultValue),
    description: extractValue(a2ui.description),
    error: extractValue(a2ui.error),
    required: extractValue(a2ui.required) ?? false,
    disabled: extractValue(a2ui.disabled) ?? false,
    onChange: a2ui.onChange ? (value: string) => {
      ctx.onAction({
        actionName: a2ui.onChange.name,
        sourceComponentId: ctx.componentId,
        timestamp: new Date().toISOString(),
        context: { value },
      });
    } : undefined,
  }),
  displayName: 'DateTimeInputAdapter',
});

/** NumberInput adapter */
export const NumberInputAdapter = createAdapter(NumberInput, {
  mapProps: (a2ui, ctx) => ({
    label: extractValue(a2ui.label),
    placeholder: extractValue(a2ui.placeholder),
    description: extractValue(a2ui.description) ?? extractValue(a2ui.helperText),
    error: extractValue(a2ui.error),
    required: extractValue(a2ui.required) ?? false,
    disabled: extractValue(a2ui.disabled) ?? false,
    min: extractValue(a2ui.min),
    max: extractValue(a2ui.max),
    step: extractValue(a2ui.step) ?? 1,
    defaultValue: extractValue(a2ui.defaultValue) ?? extractValue(a2ui.value),
    prefix: extractValue(a2ui.prefix),
    suffix: extractValue(a2ui.suffix) ?? extractValue(a2ui.unit),
    allowDecimal: extractValue(a2ui.allowDecimal) ?? true,
    allowNegative: extractValue(a2ui.allowNegative) ?? true,
    onChange: a2ui.onChange ? (value: number | string) => {
      ctx.onAction({
        actionName: a2ui.onChange.name,
        sourceComponentId: ctx.componentId,
        timestamp: new Date().toISOString(),
        context: { value },
      });
    } : undefined,
  }),
  displayName: 'NumberInputAdapter',
});

/** PasswordInput adapter */
export const PasswordInputAdapter = createAdapter(PasswordInput, {
  mapProps: (a2ui, ctx) => ({
    label: extractValue(a2ui.label) ?? 'Password',
    placeholder: extractValue(a2ui.placeholder) ?? 'Enter password',
    description: extractValue(a2ui.description),
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
  displayName: 'PasswordInputAdapter',
});

/** ColorInput adapter */
export const ColorInputAdapter = createAdapter(ColorInput, {
  mapProps: (a2ui, ctx) => ({
    label: extractValue(a2ui.label),
    placeholder: extractValue(a2ui.placeholder) ?? 'Pick a color',
    description: extractValue(a2ui.description),
    error: extractValue(a2ui.error),
    required: extractValue(a2ui.required) ?? false,
    disabled: extractValue(a2ui.disabled) ?? false,
    format: extractValue(a2ui.format) ?? 'hex',
    defaultValue: extractValue(a2ui.defaultValue) ?? extractValue(a2ui.value),
    swatches: extractValue(a2ui.swatches),
    onChange: a2ui.onChange ? (value: string) => {
      ctx.onAction({
        actionName: a2ui.onChange.name,
        sourceComponentId: ctx.componentId,
        timestamp: new Date().toISOString(),
        context: { value },
      });
    } : undefined,
  }),
  displayName: 'ColorInputAdapter',
});

/** FileInput adapter */
export const FileInputAdapter = createAdapter(FileInput, {
  mapProps: (a2ui, ctx) => ({
    label: extractValue(a2ui.label),
    placeholder: extractValue(a2ui.placeholder) ?? 'Choose file',
    description: extractValue(a2ui.description),
    error: extractValue(a2ui.error),
    required: extractValue(a2ui.required) ?? false,
    disabled: extractValue(a2ui.disabled) ?? false,
    accept: extractValue(a2ui.accept),
    multiple: extractValue(a2ui.multiple) ?? false,
    clearable: extractValue(a2ui.clearable) ?? true,
    onChange: a2ui.onChange ? (file: File | File[] | null) => {
      ctx.onAction({
        actionName: a2ui.onChange.name,
        sourceComponentId: ctx.componentId,
        timestamp: new Date().toISOString(),
        context: { file: file ? (Array.isArray(file) ? file.map(f => f.name) : file.name) : null },
      });
    } : undefined,
  }),
  displayName: 'FileInputAdapter',
});

/** PinInput adapter - for OTP/PIN entry */
export const PinInputAdapter = createAdapter(PinInput, {
  mapProps: (a2ui, ctx) => ({
    length: extractValue(a2ui.length) ?? 4,
    type: extractValue(a2ui.type) ?? 'number',
    mask: extractValue(a2ui.mask) ?? false,
    placeholder: extractValue(a2ui.placeholder) ?? '',
    disabled: extractValue(a2ui.disabled) ?? false,
    error: !!extractValue(a2ui.error),
    oneTimeCode: extractValue(a2ui.oneTimeCode) ?? true,
    onComplete: a2ui.onComplete ? (value: string) => {
      ctx.onAction({
        actionName: a2ui.onComplete.name,
        sourceComponentId: ctx.componentId,
        timestamp: new Date().toISOString(),
        context: { value },
      });
    } : undefined,
  }),
  displayName: 'PinInputAdapter',
});

// ============================================================================
// SELECTION INPUT ADAPTERS
// ============================================================================

/** Checkbox adapter */
export const CheckboxAdapter = createAdapter(Checkbox, {
  mapProps: (a2ui, ctx) => ({
    label: extractValue(a2ui.label),
    description: extractValue(a2ui.description),
    defaultChecked: extractValue(a2ui.checked) ?? extractValue(a2ui.defaultChecked) ?? false,
    disabled: extractValue(a2ui.disabled) ?? false,
    indeterminate: extractValue(a2ui.indeterminate) ?? false,
    size: extractValue(a2ui.size) ?? 'sm',
    color: extractValue(a2ui.color),
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
    label: extractValue(a2ui.label),
    description: extractValue(a2ui.description),
    defaultChecked: extractValue(a2ui.checked) ?? extractValue(a2ui.defaultChecked) ?? false,
    disabled: extractValue(a2ui.disabled) ?? false,
    size: extractValue(a2ui.size) ?? 'sm',
    color: extractValue(a2ui.color),
    onLabel: extractValue(a2ui.onLabel),
    offLabel: extractValue(a2ui.offLabel),
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

/** RadioGroup adapter */
export const RadioGroupAdapter = createAdapter(Radio.Group, {
  mapProps: (a2ui, ctx) => {
    const options = (extractValue(a2ui.options) ?? []).map((opt: any) => ({
      value: String(opt.value ?? opt.id ?? opt.label),
      label: opt.label ?? opt.text ?? opt.value,
      description: opt.description,
    }));

    return {
      label: extractValue(a2ui.label),
      description: extractValue(a2ui.description),
      defaultValue: extractValue(a2ui.defaultValue) ?? extractValue(a2ui.value),
      onChange: a2ui.onChange ? (value: string) => {
        ctx.onAction({
          actionName: a2ui.onChange.name,
          sourceComponentId: ctx.componentId,
          timestamp: new Date().toISOString(),
          context: { value },
        });
      } : undefined,
      children: (
        <Stack gap="xs" mt="xs">
          {options.map((opt: any) => (
            <Radio key={opt.value} value={opt.value} label={opt.label} description={opt.description} />
          ))}
        </Stack>
      ),
    };
  },
  displayName: 'RadioGroupAdapter',
});

/** Select adapter */
export const SelectAdapter = createAdapter(Select, {
  mapProps: (a2ui, ctx) => {
    const rawOptions = extractValue(a2ui.options) ?? [];
    const data = rawOptions
      .filter((opt: any) => opt != null)
      .map((opt: any) => {
        // Handle string options
        if (typeof opt === 'string') {
          return { value: opt, label: opt };
        }
        // Handle object options
        const value = String(opt.value ?? opt.id ?? opt.label ?? '');
        const label = String(opt.label ?? opt.text ?? opt.value ?? value);
        return {
          value,
          label,
          disabled: opt.disabled,
        };
      })
      .filter((opt: any) => opt.value && opt.label);

    return {
      label: extractValue(a2ui.label),
      placeholder: extractValue(a2ui.placeholder) ?? 'Select an option',
      description: extractValue(a2ui.description),
      error: extractValue(a2ui.error),
      data,
      defaultValue: extractValue(a2ui.defaultValue) ?? extractValue(a2ui.value),
      disabled: extractValue(a2ui.disabled) ?? false,
      clearable: extractValue(a2ui.clearable) ?? false,
      searchable: extractValue(a2ui.searchable) ?? false,
      required: extractValue(a2ui.required) ?? false,
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

/** MultiSelect adapter */
export const MultiSelectAdapter = createAdapter(MultiSelect, {
  mapProps: (a2ui, ctx) => {
    const rawOptions = extractValue(a2ui.options) ?? [];
    const data = rawOptions
      .filter((opt: any) => opt != null)
      .map((opt: any) => {
        if (typeof opt === 'string') {
          return { value: opt, label: opt };
        }
        const value = String(opt.value ?? opt.id ?? opt.label ?? '');
        const label = String(opt.label ?? opt.text ?? opt.value ?? value);
        return {
          value,
          label,
          disabled: opt.disabled,
        };
      })
      .filter((opt: any) => opt.value && opt.label);

    return {
      label: extractValue(a2ui.label),
      placeholder: extractValue(a2ui.placeholder) ?? 'Select options',
      description: extractValue(a2ui.description),
      error: extractValue(a2ui.error),
      data,
      defaultValue: extractValue(a2ui.defaultValue) ?? extractValue(a2ui.value),
      disabled: extractValue(a2ui.disabled) ?? false,
      clearable: extractValue(a2ui.clearable) ?? true,
      searchable: extractValue(a2ui.searchable) ?? true,
      maxValues: extractValue(a2ui.maxValues) ?? extractValue(a2ui.max),
      onChange: a2ui.onChange ? (value: string[]) => {
        ctx.onAction({
          actionName: a2ui.onChange.name,
          sourceComponentId: ctx.componentId,
          timestamp: new Date().toISOString(),
          context: { value },
        });
      } : undefined,
    };
  },
  displayName: 'MultiSelectAdapter',
});

/** SegmentedControl adapter */
export const SegmentedControlAdapter = createAdapter(SegmentedControl, {
  mapProps: (a2ui, ctx) => {
    const data = (extractValue(a2ui.options) ?? extractValue(a2ui.data) ?? []).map((opt: any) =>
      typeof opt === 'string' ? { value: opt, label: opt } : {
        value: String(opt.value ?? opt.id ?? opt.label),
        label: opt.label ?? opt.text ?? opt.value,
        disabled: opt.disabled,
      }
    );

    return {
      data,
      defaultValue: extractValue(a2ui.defaultValue) ?? extractValue(a2ui.value),
      disabled: extractValue(a2ui.disabled) ?? false,
      fullWidth: extractValue(a2ui.fullWidth) ?? false,
      size: extractValue(a2ui.size) ?? 'sm',
      color: extractValue(a2ui.color),
      onChange: a2ui.onChange ? (value: string) => {
        ctx.onAction({
          actionName: a2ui.onChange.name,
          sourceComponentId: ctx.componentId,
          timestamp: new Date().toISOString(),
          context: { value },
        });
      } : undefined,
    };
  },
  displayName: 'SegmentedControlAdapter',
});

/** Chip adapter - selectable chip */
export const ChipAdapter = createAdapter(asComponent(Chip), {
  mapProps: (a2ui, ctx) => ({
    children: extractValue(a2ui.label) ?? extractValue(a2ui.text) ?? ctx.children,
    defaultChecked: extractValue(a2ui.checked) ?? extractValue(a2ui.selected) ?? false,
    variant: extractValue(a2ui.variant) ?? 'outline',
    size: extractValue(a2ui.size) ?? 'sm',
    color: extractValue(a2ui.color),
    disabled: extractValue(a2ui.disabled) ?? false,
    onChange: a2ui.onChange ? (checked: boolean) => {
      ctx.onAction({
        actionName: a2ui.onChange.name,
        sourceComponentId: ctx.componentId,
        timestamp: new Date().toISOString(),
        context: { checked },
      });
    } : undefined,
  }),
  displayName: 'ChipAdapter',
});

// ============================================================================
// SLIDER & RATING ADAPTERS
// ============================================================================

/** Slider adapter */
export const SliderAdapter = createAdapter(Slider, {
  mapProps: (a2ui, ctx) => ({
    label: extractValue(a2ui.label),
    min: extractValue(a2ui.min) ?? 0,
    max: extractValue(a2ui.max) ?? 100,
    step: extractValue(a2ui.step) ?? 1,
    defaultValue: extractValue(a2ui.defaultValue) ?? extractValue(a2ui.value) ?? 50,
    disabled: extractValue(a2ui.disabled) ?? false,
    marks: extractValue(a2ui.marks),
    color: extractValue(a2ui.color),
    size: extractValue(a2ui.size) ?? 'sm',
    showLabelOnHover: extractValue(a2ui.showLabel) ?? true,
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

/** RangeSlider adapter */
export const RangeSliderAdapter = createAdapter(RangeSlider, {
  mapProps: (a2ui, ctx) => ({
    label: extractValue(a2ui.label),
    min: extractValue(a2ui.min) ?? 0,
    max: extractValue(a2ui.max) ?? 100,
    step: extractValue(a2ui.step) ?? 1,
    defaultValue: extractValue(a2ui.defaultValue) ?? extractValue(a2ui.value) ?? [25, 75],
    disabled: extractValue(a2ui.disabled) ?? false,
    marks: extractValue(a2ui.marks),
    color: extractValue(a2ui.color),
    size: extractValue(a2ui.size) ?? 'sm',
    minRange: extractValue(a2ui.minRange),
    onChangeEnd: a2ui.onChange ? (value: [number, number]) => {
      ctx.onAction({
        actionName: a2ui.onChange.name,
        sourceComponentId: ctx.componentId,
        timestamp: new Date().toISOString(),
        context: { value, min: value[0], max: value[1] },
      });
    } : undefined,
  }),
  displayName: 'RangeSliderAdapter',
});

/** Rating adapter */
export const RatingAdapter = createAdapter(Rating, {
  mapProps: (a2ui, ctx) => ({
    defaultValue: extractValue(a2ui.defaultValue) ?? extractValue(a2ui.value) ?? 0,
    count: extractValue(a2ui.count) ?? extractValue(a2ui.max) ?? 5,
    fractions: extractValue(a2ui.fractions) ?? (extractValue(a2ui.half) ? 2 : 1),
    size: extractValue(a2ui.size) ?? 'md',
    color: extractValue(a2ui.color) ?? 'yellow',
    readOnly: extractValue(a2ui.readOnly) ?? false,
    highlightSelectedOnly: extractValue(a2ui.highlightSelectedOnly) ?? false,
    onChange: a2ui.onChange ? (value: number) => {
      ctx.onAction({
        actionName: a2ui.onChange.name,
        sourceComponentId: ctx.componentId,
        timestamp: new Date().toISOString(),
        context: { value },
      });
    } : undefined,
  }),
  displayName: 'RatingAdapter',
});

// ============================================================================
// FEEDBACK ADAPTERS
// ============================================================================

/** Alert adapter */
export const AlertAdapter = createAdapter(Alert, {
  mapProps: (a2ui, ctx) => {
    const iconMap: Record<string, React.ReactNode> = {
      info: <IconInfoCircle size={18} />,
      success: <IconCheck size={18} />,
      warning: <IconAlertTriangle size={18} />,
      error: <IconAlertCircle size={18} />,
      danger: <IconAlertCircle size={18} />,
    };

    const colorMap: Record<string, string> = {
      info: 'blue',
      success: 'green',
      warning: 'yellow',
      error: 'red',
      danger: 'red',
    };

    const variant = extractValue(a2ui.variant) ?? extractValue(a2ui.type) ?? 'info';

    return {
      title: extractValue(a2ui.title),
      color: colorMap[variant] ?? extractValue(a2ui.color) ?? 'blue',
      icon: iconMap[variant],
      radius: 'md',
      variant: extractValue(a2ui.filled) ? 'filled' : 'light',
      withCloseButton: extractValue(a2ui.closable) ?? extractValue(a2ui.withCloseButton) ?? false,
      children: extractValue(a2ui.message) ?? extractValue(a2ui.description) ?? extractValue(a2ui.content) ?? ctx.children,
    };
  },
  displayName: 'AlertAdapter',
});

/** Notification adapter */
export const NotificationAdapter = createAdapter(Notification, {
  mapProps: (a2ui, ctx) => {
    const iconMap: Record<string, React.ReactNode> = {
      info: <IconInfoCircle size={18} />,
      success: <IconCheck size={18} />,
      warning: <IconAlertTriangle size={18} />,
      error: <IconAlertCircle size={18} />,
    };

    const colorMap: Record<string, string> = {
      info: 'blue',
      success: 'green',
      warning: 'yellow',
      error: 'red',
    };

    const variant = extractValue(a2ui.variant) ?? extractValue(a2ui.type) ?? 'info';

    return {
      title: extractValue(a2ui.title),
      color: colorMap[variant] ?? extractValue(a2ui.color) ?? 'blue',
      icon: iconMap[variant],
      radius: 'md',
      loading: extractValue(a2ui.loading) ?? false,
      withCloseButton: extractValue(a2ui.closable) ?? true,
      withBorder: extractValue(a2ui.withBorder) ?? true,
      children: extractValue(a2ui.message) ?? extractValue(a2ui.description) ?? ctx.children,
    };
  },
  displayName: 'NotificationAdapter',
});

/** Progress adapter */
export const ProgressAdapter = createAdapter(Progress, {
  mapProps: (a2ui) => ({
    value: extractValue(a2ui.value) ?? extractValue(a2ui.progress) ?? 0,
    color: extractValue(a2ui.color) ?? 'blue',
    size: extractValue(a2ui.size) ?? 'md',
    radius: extractValue(a2ui.radius) ?? 'xl',
    striped: extractValue(a2ui.striped) ?? false,
    animated: extractValue(a2ui.animated) ?? extractValue(a2ui.indeterminate) ?? false,
  }),
  displayName: 'ProgressAdapter',
});

/** RingProgress adapter - circular progress */
export const RingProgressAdapter = createAdapter(RingProgress, {
  mapProps: (a2ui) => {
    const value = extractValue(a2ui.value) ?? extractValue(a2ui.progress) ?? 0;
    const color = extractValue(a2ui.color) ?? 'blue';

    return {
      sections: [{ value, color }],
      size: extractValue(a2ui.size) ?? 120,
      thickness: extractValue(a2ui.thickness) ?? 12,
      roundCaps: extractValue(a2ui.roundCaps) ?? true,
      label: extractValue(a2ui.showLabel) !== false ? (
        <Text size="lg" ta="center" fw={700}>{value}%</Text>
      ) : undefined,
    };
  },
  displayName: 'RingProgressAdapter',
});

/** Spinner/Loader adapter */
export const SpinnerAdapter = createAdapter(Loader, {
  mapProps: (a2ui) => ({
    size: extractValue(a2ui.size) ?? 'md',
    color: extractValue(a2ui.color) ?? 'blue',
    type: extractValue(a2ui.type) ?? 'oval',
  }),
  displayName: 'SpinnerAdapter',
});

/** Skeleton adapter */
export const SkeletonAdapter = createAdapter(Skeleton, {
  mapProps: (a2ui) => ({
    height: extractValue(a2ui.height) ?? 20,
    width: extractValue(a2ui.width),
    radius: extractValue(a2ui.radius) ?? 'sm',
    circle: extractValue(a2ui.circle) ?? false,
    animate: extractValue(a2ui.animate) ?? true,
  }),
  displayName: 'SkeletonAdapter',
});

// ============================================================================
// OVERLAY ADAPTERS
// ============================================================================

/** Tooltip adapter */
export const TooltipAdapter = createAdapter(Tooltip, {
  mapProps: (a2ui, ctx) => ({
    label: extractValue(a2ui.content) ?? extractValue(a2ui.label) ?? extractValue(a2ui.text),
    position: extractValue(a2ui.position) ?? 'top',
    withArrow: extractValue(a2ui.withArrow) ?? true,
    color: extractValue(a2ui.color),
    children: ctx.children,
  }),
  displayName: 'TooltipAdapter',
});

/** Popover adapter */
export const PopoverAdapter = createAdapter(Popover, {
  mapProps: (a2ui, ctx) => ({
    position: extractValue(a2ui.position) ?? 'bottom',
    withArrow: extractValue(a2ui.withArrow) ?? true,
    shadow: extractValue(a2ui.shadow) ?? 'md',
    children: ctx.children,
  }),
  displayName: 'PopoverAdapter',
});

/** Menu adapter */
export const MenuAdapter = createAdapter(Menu, {
  mapProps: (a2ui, ctx) => ({
    shadow: extractValue(a2ui.shadow) ?? 'md',
    position: extractValue(a2ui.position) ?? 'bottom-start',
    withArrow: extractValue(a2ui.withArrow) ?? false,
    children: ctx.children,
  }),
  displayName: 'MenuAdapter',
});

/** Modal/Dialog adapter */
export const ModalAdapter = createAdapter(asComponent(Paper), {
  mapProps: (a2ui, ctx) => ({
    shadow: 'lg',
    radius: 'md',
    p: 'xl',
    withBorder: true,
    children: (
      <>
        {extractValue(a2ui.title) && (
          <Title order={3} mb="md">{extractValue(a2ui.title)}</Title>
        )}
        {ctx.children}
      </>
    ),
  }),
  displayName: 'ModalAdapter',
});

/** Drawer adapter - simplified as Paper */
export const DrawerAdapter = createAdapter(asComponent(Paper), {
  mapProps: (a2ui, ctx) => ({
    shadow: 'lg',
    radius: 0,
    p: 'lg',
    children: (
      <>
        {extractValue(a2ui.title) && (
          <Title order={4} mb="md">{extractValue(a2ui.title)}</Title>
        )}
        {ctx.children}
      </>
    ),
  }),
  displayName: 'DrawerAdapter',
});

// ============================================================================
// NAVIGATION ADAPTERS
// ============================================================================

/** Tabs adapter */
export const TabsAdapter = createAdapter(Tabs, {
  mapProps: (a2ui, ctx) => ({
    defaultValue: extractValue(a2ui.defaultValue) ?? extractValue(a2ui.defaultTab),
    orientation: extractValue(a2ui.orientation) ?? 'horizontal',
    variant: extractValue(a2ui.variant) ?? 'default',
    color: extractValue(a2ui.color),
    children: ctx.children,
  }),
  displayName: 'TabsAdapter',
});

/** TabPanel adapter */
export const TabPanelAdapter = createAdapter(Tabs.Panel, {
  mapProps: (a2ui, ctx) => ({
    value: extractValue(a2ui.value) ?? extractValue(a2ui.id),
    children: ctx.children,
  }),
  displayName: 'TabPanelAdapter',
});

/** Breadcrumb adapter */
export const BreadcrumbAdapter = createAdapter(Breadcrumbs, {
  mapProps: (a2ui, ctx) => {
    const items = (extractValue(a2ui.items) ?? []).map((item: any, idx: number) => (
      <Anchor href={item.href ?? '#'} key={idx} size="sm">
        {item.label ?? item.text}
      </Anchor>
    ));

    return {
      separator: extractValue(a2ui.separator) ?? '/',
      children: items.length > 0 ? items : ctx.children,
    };
  },
  displayName: 'BreadcrumbAdapter',
});

/** NavLink adapter */
export const NavLinkAdapter = createAdapter(asComponent(NavLink), {
  mapProps: (a2ui, ctx) => {
    const iconName = extractValue(a2ui.icon);
    const IconComponent = getIcon(iconName);

    return {
      label: extractValue(a2ui.label) ?? extractValue(a2ui.text),
      description: extractValue(a2ui.description),
      leftSection: IconComponent ? <IconComponent size={16} /> : undefined,
      active: extractValue(a2ui.active) ?? false,
      disabled: extractValue(a2ui.disabled) ?? false,
      variant: extractValue(a2ui.variant) ?? 'subtle',
      onClick: createActionHandler(a2ui.action, ctx),
      children: ctx.children,
    };
  },
  displayName: 'NavLinkAdapter',
});

/** Pagination adapter */
export const PaginationAdapter = createAdapter(Pagination, {
  mapProps: (a2ui, ctx) => ({
    total: extractValue(a2ui.total) ?? extractValue(a2ui.pageCount) ?? 10,
    value: extractValue(a2ui.page) ?? extractValue(a2ui.currentPage) ?? 1,
    onChange: a2ui.onChange ? (page: number) => {
      ctx.onAction({
        actionName: a2ui.onChange.name,
        sourceComponentId: ctx.componentId,
        timestamp: new Date().toISOString(),
        context: { page },
      });
    } : undefined,
    siblings: extractValue(a2ui.siblings) ?? 1,
    boundaries: extractValue(a2ui.boundaries) ?? 1,
    size: extractValue(a2ui.size) ?? 'sm',
    color: extractValue(a2ui.color),
    radius: extractValue(a2ui.radius) ?? 'sm',
    withEdges: extractValue(a2ui.withEdges) ?? false,
  }),
  displayName: 'PaginationAdapter',
});

/** Stepper adapter */
export const StepperAdapter = createAdapter(Stepper, {
  mapProps: (a2ui, ctx) => ({
    active: extractValue(a2ui.active) ?? extractValue(a2ui.currentStep) ?? 0,
    orientation: extractValue(a2ui.orientation) ?? 'horizontal',
    size: extractValue(a2ui.size) ?? 'sm',
    color: extractValue(a2ui.color),
    allowNextStepsSelect: extractValue(a2ui.allowNextStepsSelect) ?? false,
    children: ctx.children,
  }),
  displayName: 'StepperAdapter',
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

/** MantineList adapter - actual Mantine list component */
export const MantineListAdapter = createAdapter(MantineList, {
  mapProps: (a2ui, ctx) => ({
    type: (extractValue(a2ui.ordered) ? 'ordered' : 'unordered') as 'ordered' | 'unordered',
    size: extractValue(a2ui.size) ?? 'md',
    spacing: extractValue(a2ui.spacing) ?? 'xs',
    withPadding: extractValue(a2ui.withPadding) ?? false,
    children: ctx.children,
  }),
  displayName: 'MantineListAdapter',
});

/** Timeline adapter */
export const TimelineAdapter = createAdapter(Timeline, {
  mapProps: (a2ui, ctx) => ({
    active: extractValue(a2ui.active) ?? -1,
    bulletSize: extractValue(a2ui.bulletSize) ?? 24,
    lineWidth: extractValue(a2ui.lineWidth) ?? 2,
    color: extractValue(a2ui.color),
    children: ctx.children,
  }),
  displayName: 'TimelineAdapter',
});

/** TimelineItem adapter */
export const TimelineItemAdapter = createAdapter(Timeline.Item, {
  mapProps: (a2ui, ctx) => {
    const iconName = extractValue(a2ui.icon);
    const IconComponent = getIcon(iconName);

    return {
      title: extractValue(a2ui.title),
      bullet: IconComponent ? <IconComponent size={12} /> : undefined,
      lineVariant: extractValue(a2ui.lineVariant) ?? 'solid',
      children: ctx.children,
    };
  },
  displayName: 'TimelineItemAdapter',
});

/** Table adapter */
export const TableAdapter = createAdapter(Table, {
  mapProps: (a2ui, ctx) => ({
    striped: extractValue(a2ui.striped) ?? false,
    highlightOnHover: extractValue(a2ui.highlightOnHover) ?? true,
    withTableBorder: extractValue(a2ui.bordered) ?? extractValue(a2ui.withBorder) ?? false,
    withColumnBorders: extractValue(a2ui.columnBorders) ?? false,
    withRowBorders: extractValue(a2ui.rowBorders) ?? true,
    stickyHeader: extractValue(a2ui.stickyHeader) ?? false,
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
    children: extractValue(a2ui.content) ?? extractValue(a2ui.text) ?? ctx.children,
  }),
  displayName: 'TableCellAdapter',
});

/** TableHeaderCell adapter */
export const TableHeaderCellAdapter = createAdapter(Table.Th, {
  mapProps: (a2ui, ctx) => ({
    children: extractValue(a2ui.content) ?? extractValue(a2ui.text) ?? ctx.children,
  }),
  displayName: 'TableHeaderCellAdapter',
});

// ============================================================================
// DISCLOSURE ADAPTERS
// ============================================================================

/** Accordion adapter */
export const AccordionAdapter = createAdapter(Accordion, {
  mapProps: (a2ui, ctx) => ({
    defaultValue: extractValue(a2ui.defaultValue),
    multiple: extractValue(a2ui.multiple) ?? false,
    variant: extractValue(a2ui.variant) ?? 'default',
    radius: extractValue(a2ui.radius) ?? 'md',
    chevronPosition: extractValue(a2ui.chevronPosition) ?? 'right',
    children: ctx.children,
  }),
  displayName: 'AccordionAdapter',
});

/** AccordionItem adapter */
export const AccordionItemAdapter = createAdapter(Accordion.Item, {
  mapProps: (a2ui, ctx) => ({
    value: extractValue(a2ui.value) ?? extractValue(a2ui.id) ?? 'item',
    children: (
      <>
        <Accordion.Control>{extractValue(a2ui.title) ?? extractValue(a2ui.label)}</Accordion.Control>
        <Accordion.Panel>{ctx.children}</Accordion.Panel>
      </>
    ),
  }),
  childrenProp: null,
  displayName: 'AccordionItemAdapter',
});

// ============================================================================
// LINK ADAPTER
// ============================================================================

/** Anchor/Link adapter */
export const AnchorAdapter = createAdapter(asComponent(Anchor), {
  mapProps: (a2ui, ctx) => ({
    href: extractValue(a2ui.href) ?? extractValue(a2ui.url) ?? '#',
    target: extractValue(a2ui.target) ?? (extractValue(a2ui.external) ? '_blank' : undefined),
    underline: extractValue(a2ui.underline) ?? 'hover',
    size: extractValue(a2ui.size) ?? 'sm',
    c: extractValue(a2ui.color),
    children: extractValue(a2ui.label) ?? extractValue(a2ui.text) ?? ctx.children,
  }),
  displayName: 'AnchorAdapter',
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
      </Text>
    </Alert>
  );
}

// ============================================================================
// COMPLETE COMPONENT MAPPING
// ============================================================================

/**
 * Complete Mantine component mapping for A2UI.
 * Includes comprehensive case variants and semantic aliases.
 */
export const mantineComponents = createComponentMapping(
  {
    // Layout - Primary
    Row: RowAdapter,
    Column: ColumnAdapter,
    Flex: FlexAdapter,
    Grid: GridAdapter,
    SimpleGrid: GridAdapter,
    Center: CenterAdapter,
    Box: BoxAdapter,
    Space: SpaceAdapter,
    Container: ContainerAdapter,
    AspectRatio: AspectRatioAdapter,

    // Layout - Case variants
    row: RowAdapter,
    column: ColumnAdapter,
    flex: FlexAdapter,
    grid: GridAdapter,
    simpleGrid: GridAdapter,
    center: CenterAdapter,
    box: BoxAdapter,
    space: SpaceAdapter,
    container: ContainerAdapter,

    // Layout - Aliases
    Stack: ColumnAdapter,
    stack: ColumnAdapter,
    HStack: RowAdapter,
    hstack: RowAdapter,
    VStack: ColumnAdapter,
    vstack: ColumnAdapter,
    Group: RowAdapter,
    group: RowAdapter,

    // Surfaces - Primary
    Card: CardAdapter,
    Paper: PaperAdapter,
    Fieldset: FieldsetAdapter,
    Divider: DividerAdapter,
    ScrollArea: ScrollAreaAdapter,

    // Surfaces - Case variants & Aliases
    card: CardAdapter,
    paper: PaperAdapter,
    fieldset: FieldsetAdapter,
    divider: DividerAdapter,
    scrollArea: ScrollAreaAdapter,
    Separator: DividerAdapter,
    separator: DividerAdapter,
    Section: PaperAdapter,
    section: PaperAdapter,
    Panel: PaperAdapter,
    panel: PaperAdapter,

    // Typography - Primary
    Text: TextAdapter,
    Title: TitleAdapter,
    Heading: TitleAdapter,
    Code: CodeAdapter,
    Blockquote: BlockquoteAdapter,
    Highlight: HighlightAdapter,
    Mark: MarkAdapter,
    Spoiler: SpoilerAdapter,

    // Typography - Case variants & Aliases
    text: TextAdapter,
    title: TitleAdapter,
    heading: TitleAdapter,
    code: CodeAdapter,
    blockquote: BlockquoteAdapter,
    highlight: HighlightAdapter,
    mark: MarkAdapter,
    spoiler: SpoilerAdapter,
    H1: TitleAdapter,
    H2: TitleAdapter,
    H3: TitleAdapter,
    H4: TitleAdapter,
    H5: TitleAdapter,
    H6: TitleAdapter,
    h1: TitleAdapter,
    h2: TitleAdapter,
    h3: TitleAdapter,
    h4: TitleAdapter,
    h5: TitleAdapter,
    h6: TitleAdapter,
    Paragraph: TextAdapter,
    paragraph: TextAdapter,
    Label: TextAdapter,
    label: TextAdapter,

    // Badges & Indicators - Primary
    Badge: BadgeAdapter,
    Indicator: IndicatorAdapter,
    ThemeIcon: ThemeIconAdapter,
    Icon: ThemeIconAdapter,

    // Badges - Case variants & Aliases
    badge: BadgeAdapter,
    indicator: IndicatorAdapter,
    themeIcon: ThemeIconAdapter,
    icon: ThemeIconAdapter,
    Tag: BadgeAdapter,
    tag: BadgeAdapter,
    Chip: ChipAdapter,
    chip: ChipAdapter,
    Status: BadgeAdapter,
    status: BadgeAdapter,

    // Images - Primary
    Avatar: AvatarAdapter,
    Image: ImageAdapter,

    // Images - Case variants & Aliases
    avatar: AvatarAdapter,
    image: ImageAdapter,
    Img: ImageAdapter,
    img: ImageAdapter,
    ProfileImage: AvatarAdapter,
    profileImage: AvatarAdapter,

    // Buttons - Primary
    Button: ButtonAdapter,
    ActionIcon: ActionIconAdapter,
    IconButton: ActionIconAdapter,

    // Buttons - Case variants & Aliases
    button: ButtonAdapter,
    actionIcon: ActionIconAdapter,
    iconButton: ActionIconAdapter,
    Btn: ButtonAdapter,
    btn: ButtonAdapter,

    // Text Inputs - Primary
    Input: InputAdapter,
    TextField: TextFieldAdapter,
    TextInput: TextFieldAdapter,
    TextArea: TextAreaAdapter,
    Textarea: TextAreaAdapter,
    DateTimeInput: DateTimeInputAdapter,
    NumberInput: NumberInputAdapter,
    PasswordInput: PasswordInputAdapter,
    ColorInput: ColorInputAdapter,
    FileInput: FileInputAdapter,
    PinInput: PinInputAdapter,

    // Text Inputs - Case variants & Aliases
    input: InputAdapter,
    textField: TextFieldAdapter,
    textInput: TextFieldAdapter,
    textArea: TextAreaAdapter,
    textarea: TextAreaAdapter,
    dateTimeInput: DateTimeInputAdapter,
    dateInput: DateTimeInputAdapter,
    datePicker: DateTimeInputAdapter,
    numberInput: NumberInputAdapter,
    passwordInput: PasswordInputAdapter,
    colorInput: ColorInputAdapter,
    fileInput: FileInputAdapter,
    pinInput: PinInputAdapter,
    Password: PasswordInputAdapter,
    password: PasswordInputAdapter,
    Number: NumberInputAdapter,
    number: NumberInputAdapter,
    File: FileInputAdapter,
    file: FileInputAdapter,
    Color: ColorInputAdapter,
    color: ColorInputAdapter,
    OTP: PinInputAdapter,
    otp: PinInputAdapter,
    PIN: PinInputAdapter,
    pin: PinInputAdapter,

    // Selection Inputs - Primary
    Checkbox: CheckboxAdapter,
    CheckBox: CheckboxAdapter,
    Switch: SwitchAdapter,
    RadioGroup: RadioGroupAdapter,
    Radio: RadioGroupAdapter,
    Select: SelectAdapter,
    MultiSelect: MultiSelectAdapter,
    SegmentedControl: SegmentedControlAdapter,

    // Selection Inputs - Case variants & Aliases
    checkbox: CheckboxAdapter,
    switch: SwitchAdapter,
    radioGroup: RadioGroupAdapter,
    radio: RadioGroupAdapter,
    select: SelectAdapter,
    multiSelect: MultiSelectAdapter,
    segmentedControl: SegmentedControlAdapter,
    Toggle: SwitchAdapter,
    toggle: SwitchAdapter,
    Dropdown: SelectAdapter,
    dropdown: SelectAdapter,
    Combobox: SelectAdapter,
    combobox: SelectAdapter,
    MultiDropdown: MultiSelectAdapter,
    multiDropdown: MultiSelectAdapter,
    Tabs: SegmentedControlAdapter,
    ButtonGroup: SegmentedControlAdapter,
    buttonGroup: SegmentedControlAdapter,

    // Sliders & Rating - Primary
    Slider: SliderAdapter,
    RangeSlider: RangeSliderAdapter,
    Rating: RatingAdapter,

    // Sliders - Case variants & Aliases
    slider: SliderAdapter,
    rangeSlider: RangeSliderAdapter,
    rating: RatingAdapter,
    Range: SliderAdapter,
    range: SliderAdapter,
    Stars: RatingAdapter,
    stars: RatingAdapter,

    // Feedback - Primary
    Alert: AlertAdapter,
    Notification: NotificationAdapter,
    Progress: ProgressAdapter,
    RingProgress: RingProgressAdapter,
    Spinner: SpinnerAdapter,
    Loader: SpinnerAdapter,
    Skeleton: SkeletonAdapter,

    // Feedback - Case variants & Aliases
    alert: AlertAdapter,
    notification: NotificationAdapter,
    progress: ProgressAdapter,
    ringProgress: RingProgressAdapter,
    spinner: SpinnerAdapter,
    loader: SpinnerAdapter,
    skeleton: SkeletonAdapter,
    Toast: NotificationAdapter,
    toast: NotificationAdapter,
    Message: AlertAdapter,
    message: AlertAdapter,
    Banner: AlertAdapter,
    banner: AlertAdapter,
    ProgressBar: ProgressAdapter,
    progressBar: ProgressAdapter,
    CircularProgress: RingProgressAdapter,
    circularProgress: RingProgressAdapter,
    Loading: SpinnerAdapter,
    loading: SpinnerAdapter,

    // Overlays - Primary
    Tooltip: TooltipAdapter,
    Popover: PopoverAdapter,
    Menu: MenuAdapter,
    Modal: ModalAdapter,
    Dialog: ModalAdapter,
    Drawer: DrawerAdapter,

    // Overlays - Case variants & Aliases
    tooltip: TooltipAdapter,
    popover: PopoverAdapter,
    menu: MenuAdapter,
    modal: ModalAdapter,
    dialog: ModalAdapter,
    drawer: DrawerAdapter,
    Popup: PopoverAdapter,
    popup: PopoverAdapter,
    Sidebar: DrawerAdapter,
    sidebar: DrawerAdapter,

    // Navigation - Primary
    TabsNav: TabsAdapter,
    TabPanel: TabPanelAdapter,
    Breadcrumb: BreadcrumbAdapter,
    Breadcrumbs: BreadcrumbAdapter,
    NavLink: NavLinkAdapter,
    Pagination: PaginationAdapter,
    Stepper: StepperAdapter,

    // Navigation - Case variants & Aliases
    tabs: TabsAdapter,
    tabPanel: TabPanelAdapter,
    breadcrumb: BreadcrumbAdapter,
    breadcrumbs: BreadcrumbAdapter,
    navLink: NavLinkAdapter,
    pagination: PaginationAdapter,
    stepper: StepperAdapter,
    NavigationLink: NavLinkAdapter,
    navigationLink: NavLinkAdapter,
    Pager: PaginationAdapter,
    pager: PaginationAdapter,
    Steps: StepperAdapter,
    steps: StepperAdapter,
    Wizard: StepperAdapter,
    wizard: StepperAdapter,

    // Data Display - Primary
    List: ListAdapter,
    MantineList: MantineListAdapter,
    Timeline: TimelineAdapter,
    TimelineItem: TimelineItemAdapter,
    Table: TableAdapter,
    TableHeader: TableHeaderAdapter,
    TableBody: TableBodyAdapter,
    TableRow: TableRowAdapter,
    TableCell: TableCellAdapter,
    TableHeaderCell: TableHeaderCellAdapter,

    // Data Display - Case variants & Aliases
    list: ListAdapter,
    timeline: TimelineAdapter,
    timelineItem: TimelineItemAdapter,
    table: TableAdapter,
    tableHeader: TableHeaderAdapter,
    tableBody: TableBodyAdapter,
    tableRow: TableRowAdapter,
    tableCell: TableCellAdapter,
    tableHeaderCell: TableHeaderCellAdapter,
    DataTable: TableAdapter,
    dataTable: TableAdapter,
    THead: TableHeaderAdapter,
    thead: TableHeaderAdapter,
    TBody: TableBodyAdapter,
    tbody: TableBodyAdapter,
    TR: TableRowAdapter,
    tr: TableRowAdapter,
    TD: TableCellAdapter,
    td: TableCellAdapter,
    TH: TableHeaderCellAdapter,
    th: TableHeaderCellAdapter,

    // Disclosure - Primary
    Accordion: AccordionAdapter,
    AccordionItem: AccordionItemAdapter,

    // Disclosure - Case variants & Aliases
    accordion: AccordionAdapter,
    accordionItem: AccordionItemAdapter,
    Collapsible: AccordionAdapter,
    collapsible: AccordionAdapter,
    Expandable: AccordionAdapter,
    expandable: AccordionAdapter,

    // Links - Primary
    Anchor: AnchorAdapter,
    Link: AnchorAdapter,

    // Links - Case variants
    anchor: AnchorAdapter,
    link: AnchorAdapter,
    A: AnchorAdapter,
    a: AnchorAdapter,
  },
  FallbackComponent
);

// Export individual adapters for custom mappings
export const adapters = {
  // Layout
  Row: RowAdapter,
  Column: ColumnAdapter,
  Flex: FlexAdapter,
  Grid: GridAdapter,
  Center: CenterAdapter,
  Box: BoxAdapter,
  Space: SpaceAdapter,
  Container: ContainerAdapter,
  AspectRatio: AspectRatioAdapter,

  // Surfaces
  Card: CardAdapter,
  Paper: PaperAdapter,
  Fieldset: FieldsetAdapter,
  Divider: DividerAdapter,
  ScrollArea: ScrollAreaAdapter,

  // Typography
  Text: TextAdapter,
  Title: TitleAdapter,
  Code: CodeAdapter,
  Blockquote: BlockquoteAdapter,
  Highlight: HighlightAdapter,
  Mark: MarkAdapter,
  Spoiler: SpoilerAdapter,

  // Badges
  Badge: BadgeAdapter,
  Indicator: IndicatorAdapter,
  ThemeIcon: ThemeIconAdapter,

  // Images
  Avatar: AvatarAdapter,
  Image: ImageAdapter,

  // Buttons
  Button: ButtonAdapter,
  ActionIcon: ActionIconAdapter,

  // Text Inputs
  Input: InputAdapter,
  TextField: TextFieldAdapter,
  TextArea: TextAreaAdapter,
  DateTimeInput: DateTimeInputAdapter,
  NumberInput: NumberInputAdapter,
  PasswordInput: PasswordInputAdapter,
  ColorInput: ColorInputAdapter,
  FileInput: FileInputAdapter,
  PinInput: PinInputAdapter,

  // Selection Inputs
  Checkbox: CheckboxAdapter,
  Switch: SwitchAdapter,
  RadioGroup: RadioGroupAdapter,
  Select: SelectAdapter,
  MultiSelect: MultiSelectAdapter,
  SegmentedControl: SegmentedControlAdapter,
  Chip: ChipAdapter,

  // Sliders
  Slider: SliderAdapter,
  RangeSlider: RangeSliderAdapter,
  Rating: RatingAdapter,

  // Feedback
  Alert: AlertAdapter,
  Notification: NotificationAdapter,
  Progress: ProgressAdapter,
  RingProgress: RingProgressAdapter,
  Spinner: SpinnerAdapter,
  Skeleton: SkeletonAdapter,

  // Overlays
  Tooltip: TooltipAdapter,
  Popover: PopoverAdapter,
  Menu: MenuAdapter,
  Modal: ModalAdapter,
  Drawer: DrawerAdapter,

  // Navigation
  Tabs: TabsAdapter,
  TabPanel: TabPanelAdapter,
  Breadcrumb: BreadcrumbAdapter,
  NavLink: NavLinkAdapter,
  Pagination: PaginationAdapter,
  Stepper: StepperAdapter,

  // Data Display
  List: ListAdapter,
  Timeline: TimelineAdapter,
  TimelineItem: TimelineItemAdapter,
  Table: TableAdapter,
  TableHeader: TableHeaderAdapter,
  TableBody: TableBodyAdapter,
  TableRow: TableRowAdapter,
  TableCell: TableCellAdapter,
  TableHeaderCell: TableHeaderCellAdapter,

  // Disclosure
  Accordion: AccordionAdapter,
  AccordionItem: AccordionItemAdapter,

  // Links
  Anchor: AnchorAdapter,

  // Fallback
  Fallback: FallbackComponent,
};
