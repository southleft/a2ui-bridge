/**
 * @a2ui-bridge/react - React-specific type definitions
 * MIT License - Copyright (c) 2024 southleft
 */

import type { ComponentType, ReactNode } from 'react';
import type {
  AnyComponentNode,
  UserAction,
} from '@a2ui-bridge/core';

/**
 * Props passed to every A2UI component.
 */
export interface A2UIComponentProps<T = AnyComponentNode> {
  /** The component node from the A2UI tree */
  node: T;
  /** Callback to dispatch user actions */
  onAction: (action: UserAction) => void;
  /** Component mapping for rendering children */
  components: ComponentMapping;
  /** The surface ID this component belongs to */
  surfaceId: string;
  /** Pre-rendered children (for container components) */
  children?: ReactNode;
}

/**
 * Mapping of A2UI component types to React components.
 * This allows design systems to provide their own implementations.
 *
 * The mapping uses string keys for flexibility - any component type
 * can be mapped, not just the ones defined in the A2UI spec.
 */
export interface ComponentMapping {
  [componentType: string]: ComponentType<A2UIComponentProps<any>> | undefined;

  /** Special fallback component for unknown types */
  __fallback__?: ComponentType<A2UIComponentProps<any>>;
}

/**
 * Event handler for A2UI user actions.
 */
export type ActionHandler = (action: UserAction) => void;
