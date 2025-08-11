type ContextMenuRadioItemThemeKey =
  | '--crm-ui-kit-context-menu-radio-item-gap'
  | '--crm-ui-kit-context-menu-radio-item-padding'
  | '--crm-ui-kit-context-menu-radio-item-color'
  | '--crm-ui-kit-context-menu-radio-item-background-color'
  | '--crm-ui-kit-context-menu-radio-item-cursor'
  | '--crm-ui-kit-context-menu-radio-item-disabled-color'
  | '--crm-ui-kit-context-menu-radio-item-disabled-cursor'
  | '--crm-ui-kit-context-menu-radio-item-hovered-background-color'
  | '--crm-ui-kit-context-menu-radio-item-checked-color'
  | '--crm-ui-kit-context-menu-radio-item-without-icon-align-padding';

export const ContextMenuRadioItemTheme: ContextMenuRadioItemThemeType = {
  '--crm-ui-kit-context-menu-radio-item-padding': '10px 16px 10px 40px',
  '--crm-ui-kit-context-menu-radio-item-gap': '8px',
  '--crm-ui-kit-context-menu-radio-item-color':
    'var(--crm-ui-kit-palette-text-primary)',
  '--crm-ui-kit-context-menu-radio-item-background-color': 'transparent',
  '--crm-ui-kit-context-menu-radio-item-cursor': 'pointer',

  '--crm-ui-kit-context-menu-radio-item-disabled-color':
    'var(--crm-ui-kit-palette-text-secondary-light)',
  '--crm-ui-kit-context-menu-radio-item-disabled-cursor': 'auto',

  '--crm-ui-kit-context-menu-radio-item-hovered-background-color':
    'var(--crm-ui-kit-palette-background-default)',

  '--crm-ui-kit-context-menu-radio-item-checked-color':
    'var(--crm-ui-kit-palette-active-element-900)',

  '--crm-ui-kit-context-menu-radio-item-without-icon-align-padding':
    '10px 16px',
};

export type ContextMenuRadioItemThemeType = {
  [K in ContextMenuRadioItemThemeKey]: string;
};
