import type { JSX } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

export function TableBody({ node, children }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();

  return (
    <tbody className={cn('[&_tr:last-child]:border-0', classesToString((theme.components as any).TableBody?.all ?? {}))}>
      {children}
    </tbody>
  );
}
