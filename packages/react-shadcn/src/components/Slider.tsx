import type { JSX } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

export function Slider({
  node,
  onAction,
}: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const properties = node.properties as any;
  const label = properties.label?.literalString ?? properties.label?.literal ?? '';
  const value = properties.value ?? 50;
  const min = properties.min ?? 0;
  const max = properties.max ?? 100;
  const step = properties.step ?? 1;
  const disabled = properties.disabled ?? false;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (properties.action?.name && onAction) {
      onAction({
        actionName: properties.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { value: parseFloat(e.target.value) },
      });
    }
  };

  return (
    <div className={cn('flex flex-col gap-2 w-full', classesToString((theme.components as any).Slider?.all ?? {}))}>
      {label && (
        <div className="flex justify-between">
          <label className="text-sm font-medium leading-none">{label}</label>
          <span className="text-sm text-muted-foreground">{value}</span>
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        className={cn(
          'w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer',
          'accent-primary',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      />
    </div>
  );
}
