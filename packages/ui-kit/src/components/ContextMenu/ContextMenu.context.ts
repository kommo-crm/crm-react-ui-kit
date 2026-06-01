import { createComponentContext } from 'src/lib/react';

import {
  ContextMenuContextProps,
  ContextMenuRootContextProps,
} from './ContextMenu.props';

const DISPLAY_NAME = 'ContextMenu';

/**
 * Context for sharing menu state between ContextMenu components.
 *
 * Provides access to:
 * - Refs for trigger and content elements (for positioning and focus management)
 * - Menu mode (click/hover) and open state
 * - Mouse enter/leave handlers for hover mode
 * - Animation state and timing configuration
 * - Submenu coordination (child open state, close callbacks)
 *
 * Used by: Trigger, Content, Sub, SubTrigger, SubContent and other menu parts.
 */
const [ContextMenuProvider, useContextMenuContext] =
  createComponentContext<ContextMenuContextProps>(DISPLAY_NAME);

const ROOT_DISPLAY_NAME = 'ContextMenu.Root';

/**
 * Context for root-level state that must be accessible from any nested level.
 *
 * Separated from ContextMenuContext because submenus create their own
 * ContextMenuContext, but certain state must remain global across all levels:
 * - `closeRootMenuImmediately` - to close the entire menu tree at once
 * - `navigationContentRef` - to access the root content ref for keyboard navigation
 *
 * This separation allows submenus to have their own local state while still
 * being able to affect the root menu behavior.
 */
const [ContextMenuRootProvider, useContextMenuRootContext] =
  createComponentContext<ContextMenuRootContextProps>(ROOT_DISPLAY_NAME);

export {
  ContextMenuProvider,
  useContextMenuContext,
  DISPLAY_NAME,
  ContextMenuRootProvider,
  useContextMenuRootContext,
  ROOT_DISPLAY_NAME,
};
