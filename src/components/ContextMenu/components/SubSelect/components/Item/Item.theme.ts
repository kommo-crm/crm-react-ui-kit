type ContextMenuSubSelectItemThemeKey =
  | '--crm-ui-kit-context-menu-sub-select-item-padding'
  | '--crm-ui-kit-context-menu-sub-select-item-gap'
  | '--crm-ui-kit-context-menu-sub-select-item-color'
  | '--crm-ui-kit-context-menu-sub-select-item-disabled-color'
  | '--crm-ui-kit-context-menu-sub-select-item-danger-color'
  | '--crm-ui-kit-context-menu-sub-select-item-hovered-background-color'
  | '--crm-ui-kit-context-menu-sub-select-item-active-color'
  | '--crm-ui-kit-context-menu-sub-select-item-sort-icon-color'
  | '--crm-ui-kit-context-menu-sub-select-item-sort-icon-asc-transform'
  | '--crm-ui-kit-context-menu-sub-select-item-with-icon-padding';

export const ContextMenuSubSelectItemTheme: ContextMenuSubSelectItemThemeType =
  {
    '--crm-ui-kit-context-menu-sub-select-item-gap': '8px',
    '--crm-ui-kit-context-menu-sub-select-item-padding': '10px 16px 10px 40px',
    '--crm-ui-kit-context-menu-sub-select-item-color':
      'var(--crm-ui-kit-palette-text-primary)',

    '--crm-ui-kit-context-menu-sub-select-item-disabled-color':
      'var(--crm-ui-kit-palette-text-secondary-light)',

    '--crm-ui-kit-context-menu-sub-select-item-danger-color':
      'var(--crm-ui-kit-color-error)',

    '--crm-ui-kit-context-menu-sub-select-item-hovered-background-color':
      'var(--crm-ui-kit-palette-background-default)',

    '--crm-ui-kit-context-menu-sub-select-item-active-color':
      'var(--crm-ui-kit-palette-active-element-900)',

    '--crm-ui-kit-context-menu-sub-select-item-sort-icon-color': 'inherit',
    '--crm-ui-kit-context-menu-sub-select-item-sort-icon-asc-transform':
      'rotate(180deg)',

    '--crm-ui-kit-context-menu-sub-select-item-with-icon-padding': '10px 16px',
  };

export type ContextMenuSubSelectItemThemeType = {
  [K in ContextMenuSubSelectItemThemeKey]: string;
};
