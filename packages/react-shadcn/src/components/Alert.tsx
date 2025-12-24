import type { JSX } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

const variantClasses: Record<string, string> = {
  default: 'bg-background text-foreground border',
  info: 'bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-800',
  success: 'bg-green-50 text-green-900 border-green-200 dark:bg-green-950 dark:text-green-100 dark:border-green-800',
  warning: 'bg-yellow-50 text-yellow-900 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-100 dark:border-yellow-800',
  error: 'bg-red-50 text-red-900 border-red-200 dark:bg-red-950 dark:text-red-100 dark:border-red-800',
  destructive: 'bg-destructive/15 text-destructive border-destructive/50',
};

export function Alert({ node, children }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const properties = node.properties as any;
  const title = properties.title?.literalString ?? properties.title?.literal ?? '';
  const description = properties.description?.literalString ?? properties.description?.literal ?? '';
  const variant = properties.variant ?? 'default';

  return (
    <div
      role="alert"
      className={cn(
        'relative w-full rounded-lg border p-4',
        variantClasses[variant] ?? variantClasses.default,
        classesToString((theme.components as any).Alert?.all ?? {})
      )}
    >
      {title && <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>}
      {description && <div className="text-sm opacity-90">{description}</div>}
      {children}
    </div>
  );
}
