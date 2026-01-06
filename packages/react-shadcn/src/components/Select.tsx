import { useState, useRef, useEffect } from 'react';
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
  options?: Array<string | { label: string; value?: string }>;
  action?: { name: string };
}

export function Select({ node, onAction }: A2UIComponentProps<AnyComponentNode>): JSX.Element {
  const theme = useTheme();
  const properties = node.properties as SelectProperties;
  const label = properties.label?.literalString ?? properties.label?.literal ?? '';
  const placeholder = properties.placeholder?.literalString ?? properties.placeholder?.literal ?? 'Select an option';
  const currentValue = properties.value?.literalString ?? properties.value?.literal ?? '';
  const disabled = properties.disabled ?? false;
  const rawOptions = properties.options ?? [];

  // Normalize options to {label, value} format
  const options = rawOptions.map((opt) => {
    if (typeof opt === 'string') {
      return { label: opt, value: opt };
    }
    return { label: opt.label, value: opt.value ?? opt.label };
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(currentValue);
  const containerRef = useRef<HTMLDivElement>(null);

  // Find the label for the selected value
  const selectedOption = options.find(opt => opt.value === selectedValue);
  const displayText = selectedOption?.label || placeholder;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);

    if (properties.action?.name) {
      onAction({
        actionName: properties.action.name,
        sourceComponentId: node.id,
        timestamp: new Date().toISOString(),
        context: { value },
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex flex-col gap-1.5',
        classesToString((theme.components as Record<string, any>).Select?.all ?? {})
      )}
    >
      {label && (
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
      )}

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm',
          'bg-white dark:bg-zinc-900',
          'border-zinc-200 dark:border-zinc-700',
          'text-zinc-900 dark:text-zinc-100',
          'focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:focus:ring-zinc-600',
          'disabled:cursor-not-allowed disabled:opacity-50',
          !selectedValue && 'text-zinc-500 dark:text-zinc-400'
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="truncate">{displayText}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            'h-4 w-4 opacity-50 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={cn(
            'absolute top-full left-0 z-50 mt-1 w-full min-w-[8rem] overflow-hidden rounded-md',
            'bg-white dark:bg-zinc-900',
            'border border-zinc-200 dark:border-zinc-700',
            'shadow-md'
          )}
          role="listbox"
        >
          <div className="max-h-[300px] overflow-auto py-1">
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelect(option.value)}
                role="option"
                aria-selected={option.value === selectedValue}
                className={cn(
                  'flex w-full cursor-pointer select-none items-center gap-2 px-3 py-2 text-sm',
                  'text-zinc-700 dark:text-zinc-300',
                  'hover:bg-zinc-100 dark:hover:bg-zinc-800',
                  option.value === selectedValue && 'bg-zinc-100 dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-100'
                )}
              >
                {/* Checkmark for selected item */}
                <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                  {option.value === selectedValue && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </span>
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
