import type { JSX, ReactNode } from 'react';
import { useState } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

export function HoverCard({ node, children }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const properties = node.properties as any;
  const [isOpen, setIsOpen] = useState(false);
  const triggerLabel = properties.triggerLabel ?? 'Hover me';
  const content = properties.content ?? '';

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span className="underline decoration-dotted cursor-help">{triggerLabel}</span>
      {isOpen && (
        <div
          className={cn(
            'absolute z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
            'left-1/2 -translate-x-1/2 top-full mt-2',
            classesToString((theme.components as any).HoverCard?.all ?? {})
          )}
        >
          {children || content}
        </div>
      )}
    </div>
  );
}
