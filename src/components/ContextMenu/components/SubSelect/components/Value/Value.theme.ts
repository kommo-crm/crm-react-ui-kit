type ContextMenuSubSelectValueThemeKey =
  | '--crm-ui-kit-context-menu-sub-select-value-gap'
  | '--crm-ui-kit-context-menu-sub-select-value-padding'
  | '--crm-ui-kit-context-menu-sub-select-value-color'
  | '--crm-ui-kit-context-menu-sub-select-value-label-margin'
  | '--crm-ui-kit-context-menu-sub-select-value-label-font-weight'
  | '--crm-ui-kit-context-menu-sub-select-value-label-color'
  | '--crm-ui-kit-context-menu-sub-select-value-placeholder-font-weight'
  | '--crm-ui-kit-context-menu-sub-select-value-placeholder-color';

export const ContextMenuSubSelectValueTheme: ContextMenuSubSelectValueThemeType =
  {
    '--crm-ui-kit-context-menu-sub-select-value-gap': '8px',
    '--crm-ui-kit-context-menu-sub-select-value-padding': '0',
    '--crm-ui-kit-context-menu-sub-select-value-color':
      'var(--crm-ui-kit-palette-text-primary)',

    '--crm-ui-kit-context-menu-sub-select-value-label-margin': '0 8px 0 0',
    '--crm-ui-kit-context-menu-sub-select-value-label-font-weight': '400',
    '--crm-ui-kit-context-menu-sub-select-value-label-color':
      'var(--crm-ui-kit-palette-text-secondary-light)',

    '--crm-ui-kit-context-menu-sub-select-value-placeholder-font-weight':
      'auto',
    '--crm-ui-kit-context-menu-sub-select-value-placeholder-color': 'auto',
  };

export type ContextMenuSubSelectValueThemeType = {
  [K in ContextMenuSubSelectValueThemeKey]: string;
};
