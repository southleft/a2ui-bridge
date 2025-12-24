import type { JSX } from 'react';
import type { AnyComponentNode } from '@a2ui-bridge/core';
import type { A2UIComponentProps } from '@a2ui-bridge/react';
import { useTheme } from '../theme/context.js';
import { cn, classesToString } from '../utils.js';

interface CheckboxProperties {
  label?: { literalString?: string; literal?: string };
  checked?: boolean;
  disabled?: boolean;
  action?: { name: string };
}

export function Checkbox({ node, onAction }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const properties = node.properties as CheckboxProperties;
  const label = properties.label?.literalString ?? properties.label?.literal ?? '';
  const checked = properties.checked ?? false;
  const disabled = properties.disabled ?? false;

  const handleChange = () => {
    if (properties.action?.name) {
      onAction({
        actionName: properties.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { checked: !checked },
      });
    }
  };

  return (
    <label
      className={cn(
        'flex items-center gap-2 cursor-pointer',
        disabled && 'opacity-50 cursor-not-allowed',
        classesToString((theme.components as Record<string, any>).Checkbox?.all ?? {})
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
      />
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
}
