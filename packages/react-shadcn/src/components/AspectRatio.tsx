import type { JSX, ReactNode } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

export function AspectRatio({ node, children }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const properties = node.properties as any;
  const ratio = properties.ratio ?? 16 / 9;

  return (
    <div
      className={cn('relative w-full', classesToString((theme.components as any).AspectRatio?.all ?? {}))}
      style={{ paddingBottom: `${100 / ratio}%` }}
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
