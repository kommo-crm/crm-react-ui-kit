import { createComponentContext } from '@ui-kit/lib/react';

import {
  ContextMenuContextProps,
  ContextMenuRootContextProps,
  ContextMenuThemeContextProps,
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

const THEME_DISPLAY_NAME = 'ContextMenu.Theme';

/**
 * Context that carries the class name holding the CSS custom properties
 * of the menu theme.
 *
 * Separated from both other contexts because it is the only piece of state
 * that every menu level may override: `Root`, `Sub` and `SubRoot` each render
 * their own provider, so a nested menu can be themed independently while
 * inheriting the theme of its parent by default.
 *
 * The default value keeps consumers rendered outside of a themed level
 * working instead of throwing.
 */
const [ContextMenuThemeProvider, useContextMenuThemeContext] =
  createComponentContext<ContextMenuThemeContextProps>(THEME_DISPLAY_NAME, {
    themeClassName: '',
  });

export {
  ContextMenuProvider,
  useContextMenuContext,
  DISPLAY_NAME,
  ContextMenuRootProvider,
  useContextMenuRootContext,
  ROOT_DISPLAY_NAME,
  ContextMenuThemeProvider,
  useContextMenuThemeContext,
  THEME_DISPLAY_NAME,
};
