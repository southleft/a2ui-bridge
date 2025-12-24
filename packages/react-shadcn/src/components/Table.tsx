import type { JSX } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

export function Table({ node, children }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const properties = node.properties as any;
  const caption = properties.caption?.literalString ?? properties.caption?.literal ?? '';

  return (
    <div className="relative w-full overflow-auto">
      <table
        className={cn(
          'w-full caption-bottom text-sm',
          classesToString((theme.components as any).Table?.all ?? {})
        )}
      >
        {caption && <caption className="mt-4 text-sm text-muted-foreground">{caption}</caption>}
        {children}
      </table>
    </div>
  );
}
