import type { JSX } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

export function TableCell({ node, children }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const properties = node.properties as any;
  const isHeader = properties.isHeader ?? false;
  const align = properties.align ?? 'left';
  const text = properties.text?.literalString ?? properties.text?.literal ?? '';

  const alignClasses: Record<string, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  if (isHeader) {
    return (
      <th
        className={cn(
          'h-12 px-4 font-medium text-muted-foreground',
          alignClasses[align] ?? alignClasses.left,
          classesToString((theme.components as any).TableCell?.all ?? {})
        )}
      >
        {children || text}
      </th>
    );
  }

  return (
    <td
      className={cn(
        'p-4',
        alignClasses[align] ?? alignClasses.left,
        classesToString((theme.components as any).TableCell?.all ?? {})
      )}
    >
      {children || text}
    </td>
  );
}
