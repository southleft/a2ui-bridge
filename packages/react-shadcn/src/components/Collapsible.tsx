import type { JSX, ReactNode } from 'react';
import { useState } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

export function Collapsible({ node, children, onAction }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const properties = node.properties as any;
  const [isOpen, setIsOpen] = useState(properties.open ?? false);
  const title = properties.title ?? 'Toggle';

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
    <div className={cn('w-full', classesToString((theme.components as any).Collapsible?.all ?? {}))}>
      <button
        onClick={handleToggle}
        className="flex w-full items-center justify-between py-2 text-sm font-medium transition-all hover:underline"
      >
        {title}
        <span className={cn('transition-transform', isOpen && 'rotate-180')}>▼</span>
      </button>
      {isOpen && <div className="pt-2">{children}</div>}
    </div>
  );
}
