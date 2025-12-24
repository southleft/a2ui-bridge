import type { JSX } from 'react';
import { useState } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

export function DropdownMenu({ node, onAction }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const properties = node.properties as any;
  const [isOpen, setIsOpen] = useState(false);
  const triggerLabel = properties.triggerLabel ?? 'Menu';
  const items = properties.items ?? [];

  const handleItemClick = (item: { label: string; action?: { name: string }; disabled?: boolean }) => {
    if (item.disabled) return;
    setIsOpen(false);
    if (item.action?.name && onAction) {
      onAction({
        actionName: item.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { label: item.label },
      });
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium',
          'ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-ring focus-visible:ring-offset-2',
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2'
        )}
      >
        {triggerLabel}
        <span className="ml-2">▼</span>
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div
            className={cn(
              'absolute right-0 z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
              classesToString((theme.components as any).DropdownMenu?.all ?? {})
            )}
          >
            {items.map((item: any, index: number) => {
              if (item.type === 'separator') {
                return <div key={index} className="-mx-1 my-1 h-px bg-muted" />;
              }
              return (
                <button
                  key={index}
                  onClick={() => handleItemClick(item)}
                  disabled={item.disabled}
                  className={cn(
                    'relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
                    'transition-colors hover:bg-accent hover:text-accent-foreground',
                    'focus:bg-accent focus:text-accent-foreground',
                    item.disabled && 'pointer-events-none opacity-50'
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
