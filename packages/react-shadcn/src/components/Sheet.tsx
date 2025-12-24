import type { JSX, ReactNode } from 'react';
import { useState, useEffect } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

export function Sheet({ node, children, onAction }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const properties = node.properties as any;
  const open = properties.open ?? false;
  const side = properties.side ?? 'right';
  const title = properties.title ?? '';
  const description = properties.description ?? '';

  const sideClasses: Record<string, string> = {
    top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
    bottom: 'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
    left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
    right: 'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
  };

  const handleClose = () => {
    if (properties.onClose?.name && onAction) {
      onAction({
        actionName: properties.onClose.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: {},
      });
    }
  };

  if (!open) return <></>;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/80"
        onClick={handleClose}
      />
      {/* Sheet content */}
      <div
        className={cn(
          'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out',
          sideClasses[side] ?? sideClasses.right,
          classesToString((theme.components as any).Sheet?.all ?? {})
        )}
      >
        <div className="flex flex-col space-y-2">
          {title && <h2 className="text-lg font-semibold text-foreground">{title}</h2>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        <button
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onClick={handleClose}
        >
          <span className="text-xl">&times;</span>
          <span className="sr-only">Close</span>
        </button>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
