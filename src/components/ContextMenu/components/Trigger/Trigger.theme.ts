type ContextMenuTriggerThemeKey =
  | '--crm-ui-kit-context-menu-trigger-padding'
  | '--crm-ui-kit-context-menu-trigger-color'
  | '--crm-ui-kit-context-menu-trigger-cursor';

export const ContextMenuTriggerTheme: ContextMenuTriggerThemeType = {
  '--crm-ui-kit-context-menu-trigger-padding': '4px',
  '--crm-ui-kit-context-menu-trigger-color':
    'var(--crm-ui-kit-palette-text-secondary-dark)',
  '--crm-ui-kit-context-menu-trigger-cursor': 'pointer',
};

export type ContextMenuTriggerThemeType = {
  [K in ContextMenuTriggerThemeKey]: string;
};
