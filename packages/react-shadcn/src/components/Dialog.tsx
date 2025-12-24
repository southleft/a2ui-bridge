import { useState, useEffect, type JSX } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

export function Dialog({ node, children, onAction }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const properties = node.properties as any;
  const title = properties.title?.literalString ?? properties.title?.literal ?? '';
  const description = properties.description?.literalString ?? properties.description?.literal ?? '';
  const open = properties.open ?? false;
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = () => {
    setIsOpen(false);
    if (properties.onClose?.name && onAction) {
      onAction({
        actionName: properties.onClose.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: {},
      });
    }
  };

  if (!isOpen) return <></>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 animate-in fade-in-0"
        onClick={handleClose}
      />
      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'fixed z-50 w-full max-w-lg p-6 bg-background rounded-lg shadow-lg',
          'border animate-in fade-in-0 zoom-in-95',
          classesToString((theme.components as any).Dialog?.all ?? {})
        )}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="sr-only">Close</span>
        </button>
        {/* Content */}
        {title && <h2 className="text-lg font-semibold leading-none tracking-tight">{title}</h2>}
        {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
