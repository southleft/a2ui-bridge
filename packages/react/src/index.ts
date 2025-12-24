/**
 * @a2ui-bridge/react
 * React adapter for A2UI protocol - hooks and components for React applications
 *
 * MIT License - Copyright (c) 2024 tpitre
 */

// Processor
export {
  ReactA2uiMessageProcessor,
  createReactA2uiMessageProcessor,
  type ProcessorChangeListener,
} from './processor.js';

// Hooks
export {
  useA2uiProcessor,
  useSurfaces,
  useSurface,
  useComponentTree,
  useProcessMessages,
  useClearSurfaces,
} from './hooks.js';

// Components
export { Root, Surface, renderChildren, renderChild } from './components/index.js';
export type { RootProps, SurfaceProps } from './components/index.js';

// Types
export type {
  ComponentMapping,
  A2UIComponentProps,
  ActionHandler,
} from './types.js';

// Adapter utilities - for integrating ANY component library
export {
  createAdapter,
  createActionHandler,
  createPassthroughAdapter,
  createComponentMapping,
  extractValue,
  mapVariant,
  type AdapterContext,
  type AdapterOptions,
} from './adapter.js';

// Re-export core types for convenience
export type {
  AnyComponentNode,
  Surface as SurfaceData,
  ServerToClientMessage,
  UserAction,
  DataValue,
  Theme,
} from '@a2ui-bridge/core';
