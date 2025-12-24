import type { JSX } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

export function Link({ node, children }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const properties = node.properties as any;
  const href = properties.href?.literalString ?? properties.href?.literal ?? '#';
  const text = properties.text?.literalString ?? properties.text?.literal ?? '';
  const target = properties.external ? '_blank' : undefined;
  const rel = properties.external ? 'noopener noreferrer' : undefined;

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn(
        'font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors',
        classesToString((theme.components as any).Link?.all ?? {})
      )}
    >
      {children || text}
    </a>
  );
}
