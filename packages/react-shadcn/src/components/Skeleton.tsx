import type { JSX } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

const variantClasses: Record<string, string> = {
  text: 'h-4 w-full rounded',
  circular: 'rounded-full',
  rectangular: 'rounded-md',
  avatar: 'h-10 w-10 rounded-full',
  button: 'h-10 w-24 rounded-md',
  card: 'h-48 w-full rounded-lg',
};

export function Skeleton({ node }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const properties = node.properties as any;
  const variant = properties.variant ?? 'text';
  const width = properties.width;
  const height = properties.height;

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={cn(
        'animate-pulse bg-muted',
        variantClasses[variant] ?? variantClasses.text,
        classesToString((theme.components as any).Skeleton?.all ?? {})
      )}
      style={style}
    />
  );
}
