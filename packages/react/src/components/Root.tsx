/**
 * @a2ui-bridge/react - Root component for rendering A2UI trees
 * MIT License - Copyright (c) 2024 southleft
 */

import type { AnyComponentNode, UserAction } from '@a2ui-bridge/core';
import type { ComponentMapping, A2UIComponentProps } from '../types.js';

export interface RootProps {
  /** The component tree to render */
  tree: AnyComponentNode | null;
  /** Mapping of component types to React components */
  components: ComponentMapping;
  /** Handler for user actions */
  onAction: (action: UserAction) => void;
  /** The surface ID */
  surfaceId?: string;
}

/**
 * Root component that recursively renders an A2UI component tree.
 * This is design-system-agnostic - it uses the provided component mapping.
 */
export function Root({
  tree,
  components,
  onAction,
  surfaceId = '@default',
}: RootProps): JSX.Element | null {
  if (!tree) {
    return null;
  }

  return (
    <RenderNode
      node={tree}
      components={components}
      onAction={onAction}
      surfaceId={surfaceId}
    />
  );
}

interface RenderNodeProps {
  node: AnyComponentNode;
  components: ComponentMapping;
  onAction: (action: UserAction) => void;
  surfaceId: string;
}

/**
 * Internal component that renders a single node.
 */
function RenderNode({
  node,
  components,
  onAction,
  surfaceId,
}: RenderNodeProps): JSX.Element | null {
  // Look up the component by type
  const Component = components[node.type];

  // Render children for container components
  const renderedChildren = renderChildrenFromNode(node, components, onAction, surfaceId);

  const props: A2UIComponentProps = {
    node,
    onAction,
    components,
    surfaceId,
    children: renderedChildren.length > 0 ? renderedChildren : undefined,
  };

  if (Component) {
    return <Component {...props} />;
  }

  // Try fallback component for unknown types
  const FallbackComponent = components.__fallback__;
  if (FallbackComponent) {
    return <FallbackComponent {...props} />;
  }

  // No component found, log warning and render nothing
  console.warn(`[A2UI] No component found for type: "${node.type}". Consider adding a __fallback__ component.`);
  return null;
}

/**
 * Extract and render children from a node's properties.
 */
function renderChildrenFromNode(
  node: AnyComponentNode,
  components: ComponentMapping,
  onAction: (action: UserAction) => void,
  surfaceId: string
): JSX.Element[] {
  const properties = node.properties as Record<string, unknown>;
  const results: JSX.Element[] = [];

  // Handle 'children' array property
  if (properties?.children && Array.isArray(properties.children)) {
    for (const child of properties.children) {
      if (isComponentNode(child)) {
        results.push(
          <RenderNode
            key={child.id}
            node={child}
            components={components}
            onAction={onAction}
            surfaceId={surfaceId}
          />
        );
      }
    }
  }

  // Handle 'child' single property
  if (properties?.child && isComponentNode(properties.child)) {
    results.push(
      <RenderNode
        key={properties.child.id}
        node={properties.child}
        components={components}
        onAction={onAction}
        surfaceId={surfaceId}
      />
    );
  }

  // Handle 'tabItems' for Tabs component
  if (properties?.tabItems && Array.isArray(properties.tabItems)) {
    for (const tabItem of properties.tabItems) {
      if (tabItem?.child && isComponentNode(tabItem.child)) {
        results.push(
          <RenderNode
            key={tabItem.child.id}
            node={tabItem.child}
            components={components}
            onAction={onAction}
            surfaceId={surfaceId}
          />
        );
      }
    }
  }

  return results;
}

/**
 * Type guard to check if a value is a component node.
 */
function isComponentNode(value: unknown): value is AnyComponentNode {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'type' in value
  );
}

/**
 * Helper function to render children nodes.
 * Use this in your component implementations.
 */
export function renderChildren(
  children: (AnyComponentNode | null)[],
  components: ComponentMapping,
  onAction: (action: UserAction) => void,
  surfaceId: string
): JSX.Element[] {
  return children
    .filter((child): child is AnyComponentNode => child !== null)
    .map((child) => (
      <RenderNode
        key={child.id}
        node={child}
        components={components}
        onAction={onAction}
        surfaceId={surfaceId}
      />
    ));
}

/**
 * Helper function to render a single child node.
 * Use this in your component implementations.
 */
export function renderChild(
  child: AnyComponentNode | null | undefined,
  components: ComponentMapping,
  onAction: (action: UserAction) => void,
  surfaceId: string
): JSX.Element | null {
  if (!child) {
    return null;
  }

  return (
    <RenderNode
      node={child}
      components={components}
      onAction={onAction}
      surfaceId={surfaceId}
    />
  );
}
