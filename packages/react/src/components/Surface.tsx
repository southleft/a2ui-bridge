/**
 * @a2ui-bridge/react - Surface component
 * MIT License - Copyright (c) 2024 tpitre
 */

import type { CSSProperties } from 'react';
import type { UserAction } from '@a2ui-bridge/core';
import type { ReactA2uiMessageProcessor } from '../processor.js';
import { useComponentTree, useSurface } from '../hooks.js';
import { Root } from './Root.js';
import type { ComponentMapping } from '../types.js';

export interface SurfaceProps {
  /** The message processor instance */
  processor: ReactA2uiMessageProcessor;
  /** The surface ID to render */
  surfaceId?: string;
  /** Mapping of component types to React components */
  components: ComponentMapping;
  /** Handler for user actions */
  onAction: (action: UserAction) => void;
  /** Optional className for the container */
  className?: string;
}

/**
 * Generate CSS custom properties from surface styles.
 * Supports: font, primaryColor (generates a color palette)
 */
function generateSurfaceStyles(styles: Record<string, string>): CSSProperties {
  const cssProps: CSSProperties = {};

  for (const [key, value] of Object.entries(styles)) {
    switch (key) {
      case 'font':
        // Apply font to CSS custom properties
        (cssProps as Record<string, string>)['--a2ui-font-family'] = value;
        (cssProps as Record<string, string>)['fontFamily'] = value;
        break;

      case 'primaryColor':
        // Generate a color palette from the primary color
        (cssProps as Record<string, string>)['--a2ui-primary'] = value;
        (cssProps as Record<string, string>)['--a2ui-primary-50'] = value;
        break;

      default:
        // Pass through other styles as CSS custom properties
        (cssProps as Record<string, string>)[`--a2ui-${key}`] = value;
    }
  }

  return cssProps;
}

/**
 * Surface component that renders an A2UI surface.
 * This connects the processor to the Root renderer.
 */
export function Surface({
  processor,
  surfaceId = '@default',
  components,
  onAction,
  className,
}: SurfaceProps): JSX.Element {
  const tree = useComponentTree(processor, surfaceId);
  const surface = useSurface(processor, surfaceId);

  // Generate CSS properties from surface styles
  const surfaceStyles = surface?.styles
    ? generateSurfaceStyles(surface.styles)
    : {};

  return (
    <div
      className={className}
      data-a2ui-surface={surfaceId}
      style={surfaceStyles}
    >
      <Root
        tree={tree}
        components={components}
        onAction={onAction}
        surfaceId={surfaceId}
      />
    </div>
  );
}
