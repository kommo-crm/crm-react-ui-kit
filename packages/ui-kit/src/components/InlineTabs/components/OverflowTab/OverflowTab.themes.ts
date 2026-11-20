import {
  ContextMenuPrimaryTheme,
  type ContextMenuThemeType,
} from '@ui-kit/components/ContextMenu';

/**
 * Theme of the overflow menu, styled as a continuation of the panel.
 */
export const InlineTabsMenuTheme: ContextMenuThemeType = {
  ...ContextMenuPrimaryTheme,
  '--crm-ui-kit-context-menu-content-background':
    'var(--crm-ui-kit-inline-tabs-background)',
  '--crm-ui-kit-context-menu-content-border-width': '0',
  '--crm-ui-kit-context-menu-content-border-radius': '0',
  '--crm-ui-kit-context-menu-content-box-shadow': 'none',
  '--crm-ui-kit-context-menu-item-padding': '0',
  '--crm-ui-kit-context-menu-item-background':
    'var(--crm-ui-kit-inline-tabs-background)',
  '--crm-ui-kit-context-menu-item-highlighted-background':
    'var(--crm-ui-kit-inline-tabs-background)',
};
