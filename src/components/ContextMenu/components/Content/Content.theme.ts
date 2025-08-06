type ContextMenuContentThemeKey =
  | '--crm-ui-kit-context-menu-content-background-color'
  | '--crm-ui-kit-context-menu-content-border-color'
  | '--crm-ui-kit-context-menu-content-border-size'
  | '--crm-ui-kit-context-menu-content-border-radius'
  | '--crm-ui-kit-context-menu-content-padding'
  | '--crm-ui-kit-context-menu-content-overflow'
  | '--crm-ui-kit-context-menu-content-box-shadow';

export const ContextMenuContentTheme: ContextMenuContentThemeType = {
  '--crm-ui-kit-context-menu-content-background-color':
    'var(--crm-ui-kit-palette-background-primary)',
  '--crm-ui-kit-context-menu-content-border-color':
    'var(--crm-ui-kit-palette-border-default)',
  '--crm-ui-kit-context-menu-content-border-size': '1px',
  '--crm-ui-kit-context-menu-content-border-radius': '3px',
  '--crm-ui-kit-context-menu-content-padding': '0',
  '--crm-ui-kit-context-menu-content-overflow': 'hidden',
  '--crm-ui-kit-context-menu-content-box-shadow':
    '0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)',
};

export type ContextMenuContentThemeType = {
  [K in ContextMenuContentThemeKey]: string;
};
