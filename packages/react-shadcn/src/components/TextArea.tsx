import type { JSX } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

export function TextArea({ node, onAction }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const properties = node.properties as any;
  const value = properties.value ?? '';
  const placeholder = properties.placeholder ?? '';
  const disabled = properties.disabled ?? false;
  const readOnly = properties.readOnly ?? false;
  const rows = properties.rows ?? 3;
  const maxLength = properties.maxLength;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (properties.onChange?.name && onAction) {
      onAction({
        actionName: properties.onChange.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { value: e.target.value },
      });
    }
  };

  return (
    <textarea
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      rows={rows}
      maxLength={maxLength}
      onChange={handleChange}
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2',
        'text-sm ring-offset-background placeholder:text-muted-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        classesToString((theme.components as any).TextArea?.all ?? {})
      )}
    />
  );
}
