import type { JSX } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

export function TableHeader({ node, children }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();

  return (
    <thead className={cn('[&_tr]:border-b', classesToString((theme.components as any).TableHeader?.all ?? {}))}>
      {children}
    </thead>
  );
}
