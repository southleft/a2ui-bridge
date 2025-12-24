import type { JSX, ReactNode } from 'react';
import { useState, useRef, useEffect } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

export function Popover({ node, children, onAction }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const properties = node.properties as any;
  const [isOpen, setIsOpen] = useState(properties.open ?? false);
  const triggerLabel = properties.triggerLabel ?? 'Open';
  const align = properties.align ?? 'center';
  const side = properties.side ?? 'bottom';

  const alignClasses: Record<string, string> = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  };

  const sideClasses: Record<string, string> = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
  };

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (properties.onOpenChange?.name && onAction) {
      onAction({
        actionName: properties.onOpenChange.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { open: newState },
      });
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleToggle}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium',
          'ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-ring focus-visible:ring-offset-2',
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2'
        )}
      >
        {triggerLabel}
      </button>
      {isOpen && (
        <div
          className={cn(
            'absolute z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
            alignClasses[align] ?? alignClasses.center,
            sideClasses[side] ?? sideClasses.bottom,
            classesToString((theme.components as any).Popover?.all ?? {})
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
