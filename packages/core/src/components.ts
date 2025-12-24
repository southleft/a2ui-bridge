/**
 * @a2ui-bridge/core - Component type definitions for A2UI protocol
 * MIT License - Copyright (c) 2024 tpitre
 *
 * Based on Google's A2UI protocol specification
 */

import type { StringValue } from './primitives.js';

/**
 * Represents a user-initiated action sent from the client to the server.
 */
export interface Action {
  /**
   * A unique name identifying the action (e.g., 'submitForm').
   */
  name: string;
  /**
   * A key-value map of data bindings to be resolved when the action is triggered.
   */
  context?: {
    key: string;
    value: {
      path?: string;
      literalString?: string;
      literalNumber?: number;
      literalBoolean?: boolean;
    };
  }[];
}

export interface Text {
  text: StringValue;
  usageHint: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'caption' | 'body';
}

export interface Image {
  url: StringValue;
  usageHint:
    | 'icon'
    | 'avatar'
    | 'smallFeature'
    | 'mediumFeature'
    | 'largeFeature'
    | 'header';
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

export interface Icon {
  name: StringValue;
}

export interface Video {
  url: StringValue;
}

export interface AudioPlayer {
  url: StringValue;
  description?: StringValue;
}

export interface Tabs {
  tabItems: {
    title: {
      path?: string;
      literalString?: string;
    };
    child: string;
  }[];
}

export interface Divider {
  axis?: 'horizontal' | 'vertical';
  color?: string;
  thickness?: number;
}

export interface Modal {
  entryPointChild: string;
  contentChild: string;
}

export interface Button {
  child: string;
  action: Action;
}

export interface Checkbox {
  label: StringValue;
  value: {
    path?: string;
    literalBoolean?: boolean;
  };
}

export interface TextField {
  text?: StringValue;
  label: StringValue;
  type?: 'shortText' | 'number' | 'date' | 'longText';
  validationRegexp?: string;
}

export interface DateTimeInput {
  value: StringValue;
  enableDate?: boolean;
  enableTime?: boolean;
  outputFormat?: string;
}

export interface MultipleChoice {
  selections: {
    path?: string;
    literalArray?: string[];
  };
  options?: {
    label: {
      path?: string;
      literalString?: string;
    };
    value: string;
  }[];
  maxAllowedSelections?: number;
}

export interface Slider {
  value: {
    path?: string;
    literalNumber?: number;
  };
  minValue?: number;
  maxValue?: number;
}

export interface Badge {
  text: StringValue;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
}

export interface Select {
  label?: StringValue;
  options?: {
    label: {
      path?: string;
      literalString?: string;
    };
    value: string;
  }[];
  value?: {
    path?: string;
    literalString?: string;
  };
  placeholder?: StringValue;
}

export interface Grid {
  columns?: string;
  minColumnWidth?: string;
  gap?: number | string;
  justifyItems?: 'start' | 'center' | 'end' | 'stretch';
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
}

// Extended component types for ShadCN implementation

export interface Switch {
  checked?: boolean;
  disabled?: boolean;
  label?: StringValue;
  onChange?: Action;
}

export interface RadioGroup {
  value?: string;
  options?: { label: string; value: string; disabled?: boolean }[];
  onChange?: Action;
}

export interface Progress {
  value?: number;
  max?: number;
  showLabel?: boolean;
}

export interface Spinner {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export interface Alert {
  title?: StringValue;
  description?: StringValue;
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error' | 'destructive';
}

export interface Avatar {
  src?: StringValue;
  alt?: StringValue;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
}

export interface Tooltip {
  content?: StringValue;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export interface Skeleton {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string;
  height?: string;
}

export interface Separator {
  orientation?: 'horizontal' | 'vertical';
}

export interface Link {
  href?: StringValue;
  text?: StringValue;
  external?: boolean;
  action?: Action;
}

export interface Dialog {
  open?: boolean;
  title?: StringValue;
  description?: StringValue;
  onClose?: Action;
}

export interface TabPanel {
  value?: string;
  label?: string;
}

export interface Accordion {
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
}

export interface AccordionItem {
  value?: string;
  title?: StringValue;
  open?: boolean;
}

export interface Table {
  caption?: StringValue;
}

export interface TableHeader {
  // Container for header rows
}

export interface TableBody {
  // Container for body rows
}

export interface TableRow {
  selected?: boolean;
}

export interface TableCell {
  isHeader?: boolean;
  align?: 'left' | 'center' | 'right';
  text?: StringValue;
}

export interface Breadcrumb {
  items?: { label: string; href?: string; action?: Action }[];
  separator?: string;
}

export interface Pagination {
  currentPage?: number;
  totalPages?: number;
  showFirstLast?: boolean;
  onChange?: Action;
}

export interface TextArea {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
  maxLength?: number;
  onChange?: Action;
}

export interface ScrollArea {
  height?: string;
  width?: string;
}

export interface Sheet {
  open?: boolean;
  side?: 'top' | 'bottom' | 'left' | 'right';
  title?: string;
  description?: string;
  onClose?: Action;
}

export interface Popover {
  open?: boolean;
  triggerLabel?: string;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'bottom';
  onOpenChange?: Action;
}

export interface DropdownMenu {
  triggerLabel?: string;
  items?: { label?: string; type?: 'separator'; action?: Action; disabled?: boolean }[];
}

export interface Toast {
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'destructive';
  duration?: number;
  onClose?: Action;
}

export interface Label {
  text?: string;
  htmlFor?: string;
  required?: boolean;
}

export interface Input {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: Action;
}

export interface AspectRatio {
  ratio?: number;
}

export interface Collapsible {
  open?: boolean;
  title?: string;
  onOpenChange?: Action;
}

export interface HoverCard {
  triggerLabel?: string;
  content?: string;
}
