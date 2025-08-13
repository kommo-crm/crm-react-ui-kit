type ContextMenuCheckboxItemThemeKey =
  | '--crm-ui-kit-context-menu-checkbox-item-padding'
  | '--crm-ui-kit-context-menu-checkbox-item-gap'
  | '--crm-ui-kit-context-menu-checkbox-item-color'
  | '--crm-ui-kit-context-menu-checkbox-item-background-color'
  | '--crm-ui-kit-context-menu-checkbox-item-cursor'
  | '--crm-ui-kit-context-menu-checkbox-item-disabled-color'
  | '--crm-ui-kit-context-menu-checkbox-item-disabled-cursor'
  | '--crm-ui-kit-context-menu-checkbox-item-hovered-background-color'
  | '--crm-ui-kit-context-menu-checkbox-item-checked-color'
  | '--crm-ui-kit-context-menu-checkbox-item-without-icon-align-padding';

export const ContextMenuCheckboxItemTheme: ContextMenuCheckboxItemThemeType = {
  '--crm-ui-kit-context-menu-checkbox-item-padding': '10px 16px 10px 40px',
  '--crm-ui-kit-context-menu-checkbox-item-gap': '8px',
  '--crm-ui-kit-context-menu-checkbox-item-color':
    'var(--crm-ui-kit-palette-text-primary)',
  '--crm-ui-kit-context-menu-checkbox-item-background-color':
    'var(--crm-ui-kit-palette-background-primary)',
  '--crm-ui-kit-context-menu-checkbox-item-cursor': 'pointer',

  '--crm-ui-kit-context-menu-checkbox-item-disabled-color':
    'var(--crm-ui-kit-palette-text-secondary-light)',
  '--crm-ui-kit-context-menu-checkbox-item-disabled-cursor': 'auto',

  '--crm-ui-kit-context-menu-checkbox-item-hovered-background-color':
    'var(--crm-ui-kit-palette-background-default)',

  '--crm-ui-kit-context-menu-checkbox-item-checked-color':
    'var(--crm-ui-kit-palette-active-element-900)',

  '--crm-ui-kit-context-menu-checkbox-item-without-icon-align-padding':
    '10px 16px',
};

export type ContextMenuCheckboxItemThemeType = {
  [K in ContextMenuCheckboxItemThemeKey]: string;
};
