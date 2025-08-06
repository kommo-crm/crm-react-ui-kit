type ContextMenuItemThemeKey =
  | '--crm-ui-kit-context-menu-item-padding'
  | '--crm-ui-kit-context-menu-item-gap'
  | '--crm-ui-kit-context-menu-item-color'
  | '--crm-ui-kit-context-menu-item-disabled-color'
  | '--crm-ui-kit-context-menu-item-danger-color'
  | '--crm-ui-kit-context-menu-item-hovered-background-color'
  | '--crm-ui-kit-context-menu-item-with-icon-padding';

export const ContextMenuItemTheme: ContextMenuItemThemeType = {
  '--crm-ui-kit-context-menu-item-gap': '8px',
  '--crm-ui-kit-context-menu-item-padding': '10px 16px 10px 40px',
  '--crm-ui-kit-context-menu-item-color':
    'var(--crm-ui-kit-palette-text-primary)',

  '--crm-ui-kit-context-menu-item-disabled-color':
    'var(--crm-ui-kit-palette-text-secondary-light)',

  '--crm-ui-kit-context-menu-item-danger-color':
    'var(--crm-ui-kit-color-error)',

  '--crm-ui-kit-context-menu-item-hovered-background-color':
    'var(--crm-ui-kit-palette-background-default)',

  '--crm-ui-kit-context-menu-item-with-icon-padding': '10px 16px',
};

export type ContextMenuItemThemeType = {
  [K in ContextMenuItemThemeKey]: string;
};
