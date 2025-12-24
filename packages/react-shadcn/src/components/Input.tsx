import type { JSX } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

export function Input({ node, onAction }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const properties = node.properties as any;
  const type = properties.type ?? 'text';
  const value = properties.value ?? '';
  const placeholder = properties.placeholder ?? '';
  const disabled = properties.disabled ?? false;
  const readOnly = properties.readOnly ?? false;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      onChange={handleChange}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
        'ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        classesToString((theme.components as any).Input?.all ?? {})
      )}
    />
  );
}
