import type { JSX } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

export function TabPanel({ node, children }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const properties = node.properties as any;
  const tabId = properties.tabId ?? '';
  const active = properties.active ?? false;

  if (!active) return <></>;

  return (
    <div
      role="tabpanel"
      id={`panel-${tabId}`}
      aria-labelledby={tabId}
      className={cn(
        'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        classesToString((theme.components as any).TabPanel?.all ?? {})
      )}
    >
      {children}
    </div>
  );
}
