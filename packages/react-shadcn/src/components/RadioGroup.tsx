import type { JSX } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

interface RadioGroupProperties {
  label?: { literalString?: string; literal?: string };
  value?: { literalString?: string; literal?: string };
  disabled?: boolean;
  options?: { label: string; value?: string }[];
  action?: { name: string };
}

export function RadioGroup({ node, onAction }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const properties = node.properties as RadioGroupProperties;
  const label = properties.label?.literalString ?? properties.label?.literal ?? '';
  const value = properties.value?.literalString ?? properties.value?.literal ?? '';
  const disabled = properties.disabled ?? false;
  const options = properties.options ?? [];

  const handleChange = (newValue: string) => {
    if (properties.action?.name) {
      onAction({
        actionName: properties.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { value: newValue },
      });
    }
  };

  return (
    <div className={cn('flex flex-col gap-3', classesToString((theme.components as Record<string, any>).RadioGroup?.all ?? {}))}>
      {label && (
        <label className="text-sm font-medium leading-none">
          {label}
        </label>
      )}
      <div className="flex flex-col gap-2">
        {options.map((option: { label: string; value?: string }, index: number) => (
          <label
            key={index}
            className={cn(
              'flex items-center gap-2 cursor-pointer',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <input
              type="radio"
              name={node.id}
              value={option.value ?? option.label}
              checked={value === (option.value ?? option.label)}
              disabled={disabled}
              onChange={() => handleChange(option.value ?? option.label)}
              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
