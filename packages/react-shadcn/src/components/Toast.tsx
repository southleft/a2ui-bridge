import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

export function Toast({ node, onAction }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const properties = node.properties as any;
  const [visible, setVisible] = useState(true);
  const title = properties.title ?? '';
  const description = properties.description ?? '';
  const variant = properties.variant ?? 'default';
  const duration = properties.duration ?? 5000;

  const variantClasses: Record<string, string> = {
    default: 'border bg-background text-foreground',
    success: 'border-green-500 bg-green-50 text-green-900 dark:bg-green-900 dark:text-green-50',
    error: 'border-red-500 bg-red-50 text-red-900 dark:bg-red-900 dark:text-red-50',
    warning: 'border-yellow-500 bg-yellow-50 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-50',
    destructive: 'destructive group border-destructive bg-destructive text-destructive-foreground',
  };

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (properties.onClose?.name && onAction) {
          onAction({
            actionName: properties.onClose.name,
            sourceComponentId: node.id,
            timestamp: new Date().toISOString(),
            context: {},
          });
        }
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, properties.onClose, onAction]);

  const handleClose = () => {
    setVisible(false);
    if (properties.onClose?.name && onAction) {
      onAction({
        actionName: properties.onClose.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: {},
      });
    }
  };

  if (!visible) return <></>;

  return (
    <div
      className={cn(
        'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all',
        variantClasses[variant] ?? variantClasses.default,
        classesToString((theme.components as any).Toast?.all ?? {})
      )}
    >
      <div className="grid gap-1">
        {title && <div className="text-sm font-semibold">{title}</div>}
        {description && <div className="text-sm opacity-90">{description}</div>}
      </div>
      <button
        onClick={handleClose}
        className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
      >
        <span className="text-lg">&times;</span>
      </button>
    </div>
  );
}
