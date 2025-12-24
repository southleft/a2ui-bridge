import type { JSX } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

export function Accordion({ node, children }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const properties = node.properties as any;
  const type = properties.type ?? 'single'; // 'single' or 'multiple'

  return (
    <div
      className={cn(
        'w-full divide-y divide-border rounded-md border',
        classesToString((theme.components as any).Accordion?.all ?? {})
      )}
      data-type={type}
    >
      {children}
    </div>
  );
}
