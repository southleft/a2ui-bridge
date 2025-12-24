import type { JSX } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

export function Breadcrumb({ node, onAction }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const properties = node.properties as any;
  const items = properties.items ?? [];
  const separator = properties.separator ?? '/';

  return (
    <nav aria-label="Breadcrumb" className={cn('', classesToString((theme.components as any).Breadcrumb?.all ?? {}))}>
      <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
        {items.map((item: any, index: number) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="inline-flex items-center gap-1.5">
              {index > 0 && (
                <span className="text-muted-foreground/50" aria-hidden="true">
                  {separator}
                </span>
              )}
              {isLast ? (
                <span className="font-normal text-foreground" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={() => {
                    if (item.action?.name && onAction) {
                      onAction({
                        actionName: item.action.name,
                        sourceComponentId: node.id,
                        timestamp: new Date().toISOString(),
                        context: { href: item.href },
                      });
                    }
                  }}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
