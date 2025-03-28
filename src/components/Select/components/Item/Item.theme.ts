type SelectItemThemeKey =
  | '--crm-ui-kit-select-item-padding'
  | '--crm-ui-kit-select-item-margin'
  | '--crm-ui-kit-select-item-font-size'
  | '--crm-ui-kit-select-item-font-weight'
  | '--crm-ui-kit-select-item-selected-background-color'
  | '--crm-ui-kit-select-item-selected-background'
  | '--crm-ui-kit-select-item-hovered-background-color'
  | '--crm-ui-kit-select-item-hover-background-color';

export const SelectItemTheme: SelectItemThemeType = {
  '--crm-ui-kit-select-item-padding': '7px 6px 7px 22px',
  '--crm-ui-kit-select-item-margin': '0px -11px 0px 0px',
  '--crm-ui-kit-select-item-font-size': 'var(--crm-ui-kit-base-font-size)',
  '--crm-ui-kit-select-item-font-weight': '400',
  '--crm-ui-kit-select-item-selected-background-color':
    'var(--crm-ui-kit-palette-background-default)',
  '--crm-ui-kit-select-item-selected-background':
    'var(--crm-ui-kit-icon-check-mark) 8px 14px no-repeat',
  '--crm-ui-kit-select-item-hovered-background-color':
    'var(--crm-ui-kit-palette-background-default)',
  '--crm-ui-kit-select-item-hover-background-color':
    'var(--crm-ui-kit-palette-background-default)',
};

export type SelectItemThemeType = {
  [K in SelectItemThemeKey]: string;
};
