import { useState, type JSX } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

export function AccordionItem({ node, children }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const properties = node.properties as any;
  const title = properties.title?.literalString ?? properties.title?.literal ?? '';
  const defaultOpen = properties.defaultOpen ?? false;
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn('', classesToString((theme.components as any).AccordionItem?.all ?? {}))}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex w-full items-center justify-between py-4 px-4 font-medium transition-all hover:underline',
          '[&[data-state=open]>svg]:rotate-180'
        )}
        data-state={isOpen ? 'open' : 'closed'}
      >
        {title}
        <svg
          className="h-4 w-4 shrink-0 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="overflow-hidden px-4 pb-4 pt-0 text-sm">
          {children}
        </div>
      )}
    </div>
  );
}
