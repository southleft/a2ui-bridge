/**
 * @a2ui-bridge/react - Component Adapter Utilities
 *
 * These utilities make it easy to connect ANY React component library
 * to the A2UI protocol. Instead of writing A2UI-aware components,
 * you write thin adapters that translate A2UI properties to your
 * component's props.
 *
 * MIT License - Copyright (c) 2024 southleft
 */

import { createElement, type ComponentType, type ReactNode } from 'react';
import type { UserAction, AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps, ComponentMapping } from './types.js';

/**
 * Context passed to adapter mapProps functions.
 * Provides access to action dispatching and child rendering.
 */
export interface AdapterContext {
  /** Dispatch a user action back to the AI */
  onAction: (action: UserAction) => void;
  /** The surface ID this component belongs to */
  surfaceId: string;
  /** The component ID from the A2UI node */
  componentId: string;
  /** Pre-rendered children (for container components) */
  children?: ReactNode;
  /** The full component mapping (for custom child rendering) */
  components: ComponentMapping;
}

/**
 * Options for creating an adapter.
 */
export interface AdapterOptions<TTargetProps> {
  /**
   * Transform A2UI properties to target component props.
   * This is where you map A2UI's property names to your component's prop names.
   *
   * @param a2uiProps - The properties from the A2UI node (node.properties)
   * @param context - Adapter context with onAction, children, etc.
   * @returns Props for your target component
   */
  mapProps: (a2uiProps: Record<string, any>, context: AdapterContext) => TTargetProps;

  /**
   * Optional: Customize how children are passed to the component.
   * By default, children are passed as the `children` prop.
   * Set to a different prop name if your component expects children elsewhere.
   * Set to null to disable automatic children passing.
   */
  childrenProp?: string | null;

  /**
   * Optional: Display name for debugging.
   */
  displayName?: string;
}

/**
 * Creates an A2UI-compatible component adapter from any React component.
 *
 * This is the primary way to integrate your component library with A2UI.
 * You provide your component and a function to map A2UI properties to your props.
 *
 * @example
 * ```typescript
 * import { Button } from '@mantine/core';
 * import { createAdapter } from '@a2ui-bridge/react';
 *
 * const ButtonAdapter = createAdapter(Button, {
 *   mapProps: (a2ui, ctx) => ({
 *     children: a2ui.label,
 *     onClick: a2ui.action ? () => ctx.onAction({
 *       actionName: a2ui.action.name,
 *       sourceComponentId: ctx.componentId,
 *       timestamp: new Date().toISOString(),
 *     }) : undefined,
 *     variant: a2ui.variant === 'primary' ? 'filled' : 'outline',
 *     disabled: a2ui.disabled,
 *   }),
 * });
 *
 * // Register in your component mapping
 * const components = { Button: ButtonAdapter };
 * ```
 */
export function createAdapter<TTargetProps extends Record<string, any>>(
  Component: ComponentType<TTargetProps>,
  options: AdapterOptions<TTargetProps>
): ComponentType<A2UIComponentProps<AnyComponentNode>> {
  const { mapProps, childrenProp = 'children', displayName } = options;

  function AdaptedComponent(props: A2UIComponentProps<AnyComponentNode>) {
    const { node, onAction, components, surfaceId, children } = props;

    // Build the adapter context
    const context: AdapterContext = {
      onAction,
      surfaceId,
      componentId: node.id,
      children,
      components,
    };

    // Map A2UI properties to target component props
    const a2uiProps = (node.properties as Record<string, any>) || {};
    const targetProps = mapProps(a2uiProps, context);

    // Handle children if not already in mapped props and childrenProp is set
    if (childrenProp && children && !(targetProps as any)[childrenProp]) {
      (targetProps as any)[childrenProp] = children;
    }

    // Use type assertion for createElement - props are validated by mapProps
    return createElement(Component as ComponentType<any>, targetProps);
  }

  // Set display name for React DevTools
  AdaptedComponent.displayName = displayName || `A2UIAdapter(${Component.displayName || Component.name || 'Component'})`;

  return AdaptedComponent;
}

/**
 * Helper to create action handler from A2UI action property.
 * Handles the common pattern of dispatching actions with proper format.
 *
 * @example
 * ```typescript
 * const ButtonAdapter = createAdapter(Button, {
 *   mapProps: (a2ui, ctx) => ({
 *     children: a2ui.label,
 *     onClick: createActionHandler(a2ui.action, ctx),
 *   }),
 * });
 * ```
 */
export function createActionHandler(
  action: { name: string; context?: Array<{ key: string; value: any }> } | undefined,
  context: AdapterContext,
  additionalContext?: Record<string, any>
): (() => void) | undefined {
  if (!action?.name) return undefined;

  return () => {
    // Build context from action.context array if present
    const actionContext: Record<string, any> = { ...additionalContext };

    if (action.context) {
      for (const item of action.context) {
        actionContext[item.key] = extractValue(item.value);
      }
    }

    context.onAction({
      actionName: action.name,
      sourceComponentId: context.componentId,
      timestamp: new Date().toISOString(),
      context: Object.keys(actionContext).length > 0 ? actionContext : undefined,
    });
  };
}

/**
 * Helper to extract literal value from A2UI DataValue.
 */
export function extractValue(value: any): any {
  if (value === null || value === undefined) return undefined;
  if (typeof value !== 'object') return value;

  // Handle A2UI DataValue types
  if ('literalString' in value) return value.literalString;
  if ('literalNumber' in value) return value.literalNumber;
  if ('literalBool' in value) return value.literalBool;
  if ('literalDate' in value) return value.literalDate;

  return value;
}

/**
 * Helper to map A2UI variant names to your component library's variants.
 *
 * @example
 * ```typescript
 * const variantMap = {
 *   primary: 'filled',
 *   secondary: 'outline',
 *   danger: 'filled',  // with color override
 * };
 *
 * const ButtonAdapter = createAdapter(Button, {
 *   mapProps: (a2ui, ctx) => ({
 *     variant: mapVariant(a2ui.variant, variantMap, 'default'),
 *   }),
 * });
 * ```
 */
export function mapVariant<T extends string>(
  a2uiVariant: string | undefined,
  variantMap: Record<string, T>,
  defaultVariant: T
): T {
  if (!a2uiVariant) return defaultVariant;
  return variantMap[a2uiVariant] ?? defaultVariant;
}

/**
 * Creates a simple passthrough adapter for components that already
 * accept similar props to A2UI. Useful for layout components.
 *
 * @example
 * ```typescript
 * const RowAdapter = createPassthroughAdapter(Flex, {
 *   direction: 'row',
 *   gap: 'md',
 * });
 * ```
 */
export function createPassthroughAdapter<TTargetProps extends { children?: ReactNode }>(
  Component: ComponentType<TTargetProps>,
  defaultProps?: Partial<TTargetProps>
): ComponentType<A2UIComponentProps<AnyComponentNode>> {
  return createAdapter(Component, {
    mapProps: (_, ctx) => ({
      ...defaultProps,
      children: ctx.children,
    } as TTargetProps),
    displayName: `Passthrough(${Component.displayName || Component.name || 'Component'})`,
  });
}

/**
 * Creates a component mapping from a record of adapters.
 * Adds type safety and allows for fallback configuration.
 *
 * @example
 * ```typescript
 * const components = createComponentMapping({
 *   Button: ButtonAdapter,
 *   Card: CardAdapter,
 *   Text: TextAdapter,
 * }, FallbackAdapter);
 * ```
 */
export function createComponentMapping(
  adapters: Record<string, ComponentType<A2UIComponentProps<any>>>,
  fallback?: ComponentType<A2UIComponentProps<any>>
): ComponentMapping {
  return {
    ...adapters,
    ...(fallback ? { __fallback__: fallback } : {}),
  };
}
