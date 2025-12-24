import type { JSX, ReactNode } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

export function Label({ node, children }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const properties = node.properties as any;
  const text = properties.text ?? '';
  const htmlFor = properties.htmlFor ?? '';
  const required = properties.required ?? false;

  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        classesToString((theme.components as any).Label?.all ?? {})
      )}
    >
      {children || text}
      {required && <span className="text-destructive ml-1">*</span>}
    </label>
  );
}
