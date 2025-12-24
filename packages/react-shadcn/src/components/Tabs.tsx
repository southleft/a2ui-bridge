import { useState, type JSX } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

export function Tabs({ node, children, onAction }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const properties = node.properties as any;
  const tabs = properties.tabs ?? [];
  const defaultTab = properties.defaultTab ?? tabs[0]?.id ?? '';
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (properties.onChange?.name && onAction) {
      onAction({
        actionName: properties.onChange.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { tab: tabId },
      });
    }
  };

  return (
    <div className={cn('w-full', classesToString((theme.components as any).Tabs?.all ?? {}))}>
      {/* Tab List */}
      <div
        role="tablist"
        className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground"
      >
        {tabs.map((tab: any) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => handleTabChange(tab.id)}
            className={cn(
              'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium',
              'ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'disabled:pointer-events-none disabled:opacity-50',
              activeTab === tab.id
                ? 'bg-background text-foreground shadow-sm'
                : 'hover:bg-background/50'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tab Panels */}
      <div className="mt-2">
        {children}
      </div>
    </div>
  );
}
