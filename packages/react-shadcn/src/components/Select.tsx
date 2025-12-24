import type { JSX } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

interface SelectProperties {
  label?: { literalString?: string; literal?: string };
  placeholder?: { literalString?: string; literal?: string };
  value?: { literalString?: string; literal?: string };
  disabled?: boolean;
  options?: { label: string; value?: string }[];
  action?: { name: string };
}

export function Select({ node, onAction }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const properties = node.properties as SelectProperties;
  const label = properties.label?.literalString ?? properties.label?.literal ?? '';
  const placeholder = properties.placeholder?.literalString ?? properties.placeholder?.literal ?? 'Select...';
  const value = properties.value?.literalString ?? properties.value?.literal ?? '';
  const disabled = properties.disabled ?? false;
  const options = properties.options ?? [];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (properties.action?.name) {
      onAction({
        actionName: properties.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { value: e.target.value },
      });
    }
  };

  return (
    <div className={cn('flex flex-col gap-1.5', classesToString((theme.components as Record<string, any>).Select?.all ?? {}))}>
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}
      <select
        value={value}
        disabled={disabled}
        onChange={handleChange}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
          'ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50'
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option: { label: string; value?: string }, index: number) => (
          <option key={index} value={option.value ?? option.label}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
