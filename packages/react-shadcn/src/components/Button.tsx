/**
 * @a2ui-bridge/react-shadcn - Button component
 * MIT License - Copyright (c) 2025 Southleft
 */

import type { ButtonNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { renderChild } from '@a2ui-bridge/react';
import { cn } from '../utils.js';

// Extended properties that may be passed by snippets
interface ExtendedButtonProps {
  variant?: { literalString?: string };
  fullWidth?: { literalBoolean?: boolean };
  compact?: { literalBoolean?: boolean };
}

const variantStyles = {
  // Primary filled button - dark background, white text (force on all descendants with !important)
  filled: 'bg-zinc-900 text-white [&_*]:!text-white dark:bg-zinc-50 dark:text-zinc-900 dark:[&_*]:!text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200',
  // Outline button - bordered, transparent background
  outline: 'border border-zinc-300 dark:border-zinc-600 bg-transparent text-zinc-900 [&_*]:!text-zinc-900 dark:text-zinc-100 dark:[&_*]:!text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800',
  // Subtle/ghost button - no border, light background on hover
  subtle: 'bg-zinc-100 text-zinc-700 [&_*]:!text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:[&_*]:!text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700',
  // Default fallback - same as filled
  default: 'bg-zinc-900 text-white [&_*]:!text-white dark:bg-zinc-50 dark:text-zinc-900 dark:[&_*]:!text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200',
};

export function Button({
  node,
  onAction,
  components,
  surfaceId,
}: A2UIComponentProps<ButtonNode>): JSX.Element {
  const { properties } = node;
  // Extract extended properties that may be passed by snippets
  const extendedProps = properties as typeof properties & ExtendedButtonProps;
  const variant = extendedProps.variant?.literalString ?? 'default';
  const fullWidth = extendedProps.fullWidth?.literalBoolean ?? false;
  const compact = extendedProps.compact?.literalBoolean ?? false;

  const baseStyles = cn(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    compact ? 'h-8 px-3 py-1' : 'h-10 px-4 py-2',
    fullWidth && 'w-full',
    variantStyles[variant as keyof typeof variantStyles] ?? variantStyles.default
  );

  const handleClick = () => {
    if (properties.action) {
      onAction({
        actionName: properties.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: properties.action.context?.reduce(
          (acc, item) => {
            acc[item.key] =
              item.value.literalString ??
              item.value.literalNumber ??
              item.value.literalBoolean;
            return acc;
          },
          {} as Record<string, unknown>
        ),
      });
    }
  };

  return (
    <button className={baseStyles} onClick={handleClick}>
      {renderChild(properties.child, components, onAction, surfaceId)}
    </button>
  );
}
