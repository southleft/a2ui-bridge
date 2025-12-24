import type { JSX } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

const sizeClasses: Record<string, string> = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
  xl: 'h-16 w-16 text-xl',
};

export function Avatar({ node }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const properties = node.properties as any;
  const src = properties.src?.literalString ?? properties.src?.literal ?? '';
  const alt = properties.alt?.literalString ?? properties.alt?.literal ?? '';
  const fallback = properties.fallback?.literalString ?? properties.fallback?.literal ?? '';
  const size = properties.size ?? 'md';

  const initials = fallback || alt?.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() || '?';

  return (
    <div
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full',
        sizeClasses[size] ?? sizeClasses.md,
        classesToString((theme.components as any).Avatar?.all ?? {})
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground font-medium">
          {initials}
        </div>
      )}
    </div>
  );
}
