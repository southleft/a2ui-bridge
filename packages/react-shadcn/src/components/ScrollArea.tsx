import type { JSX, ReactNode } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

export function ScrollArea({ node, children }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const properties = node.properties as any;
  const height = properties.height ?? 'auto';
  const width = properties.width ?? '100%';

  return (
    <div
      className={cn(
        'relative overflow-auto',
        classesToString((theme.components as any).ScrollArea?.all ?? {})
      )}
      style={{ height, width }}
    >
      <div className="h-full w-full rounded-[inherit]">
        {children}
      </div>
    </div>
  );
}
