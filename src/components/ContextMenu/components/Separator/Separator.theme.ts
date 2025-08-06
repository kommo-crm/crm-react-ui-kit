type ContextMenuSeparatorThemeKey =
  | '--crm-ui-kit-context-menu-separator-color'
  | '--crm-ui-kit-context-menu-separator-width'
  | '--crm-ui-kit-context-menu-separator-height'
  | '--crm-ui-kit-context-menu-separator-margin';

export const ContextMenuSeparatorTheme: ContextMenuSeparatorThemeType = {
  '--crm-ui-kit-context-menu-separator-color':
    'var(--crm-ui-kit-palette-border-default)',
  '--crm-ui-kit-context-menu-separator-width': '100%',
  '--crm-ui-kit-context-menu-separator-height': '1px',
  '--crm-ui-kit-context-menu-separator-margin': '0',
};

export type ContextMenuSeparatorThemeType = {
  [K in ContextMenuSeparatorThemeKey]: string;
};
