type ContextMenuLabelThemeKey =
  | '--crm-ui-kit-context-menu-label-gap'
  | '--crm-ui-kit-context-menu-label-padding'
  | '--crm-ui-kit-context-menu-label-color'
  | '--crm-ui-kit-context-menu-label-background-color'
  | '--crm-ui-kit-context-menu-label-font-weight'
  | '--crm-ui-kit-context-menu-label-without-icon-align-padding';

export const ContextMenuLabelTheme: ContextMenuLabelThemeType = {
  '--crm-ui-kit-context-menu-label-gap': '8px',
  '--crm-ui-kit-context-menu-label-padding': '10px 16px 10px 40px',
  '--crm-ui-kit-context-menu-label-color':
    'var(--crm-ui-kit-palette-text-primary)',
  '--crm-ui-kit-context-menu-label-background-color':
    'var(--crm-ui-kit-palette-background-primary)',
  '--crm-ui-kit-context-menu-label-font-weight': '700',
  '--crm-ui-kit-context-menu-label-without-icon-align-padding': '10px 16px',
};

export type ContextMenuLabelThemeType = {
  [K in ContextMenuLabelThemeKey]: string;
};
