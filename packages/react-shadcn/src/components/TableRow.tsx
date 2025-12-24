import type { JSX } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

export function TableRow({ node, children }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const properties = node.properties as any;
  const selected = properties.selected ?? false;

  return (
    <tr
      className={cn(
        'border-b transition-colors hover:bg-muted/50',
        selected && 'bg-muted',
        classesToString((theme.components as any).TableRow?.all ?? {})
      )}
    >
      {children}
    </tr>
  );
}
