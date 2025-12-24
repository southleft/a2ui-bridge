import type { JSX, ReactNode } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

/**
 * Fallback component for unknown component types.
 * This prevents rendering errors when the A2UI protocol sends component types
 * that haven't been implemented yet.
 */
export function Fallback({ node, children }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const componentType = node.type ?? 'Unknown';

  // Show debug info with collapsible details
  return (
    <div
      className={cn(
        'border-2 border-dashed border-yellow-500/50 rounded p-3 bg-yellow-50/10',
        classesToString((theme.components as any).Fallback?.all ?? {})
      )}
    >
      <div className="text-xs text-yellow-600 dark:text-yellow-400 mb-2 font-mono">
        ⚠️ Unknown component: <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">{componentType}</code>
      </div>
      {children && <div className="mt-2">{children}</div>}
      <details className="mt-2 text-xs">
        <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
          Component data
        </summary>
        <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto max-h-40">
          {JSON.stringify(node, null, 2)}
        </pre>
      </details>
    </div>
  );
}
