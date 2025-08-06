type ContextMenuTriggerThemeKey = '--crm-ui-kit-context-menu-trigger-color';

export const ContextMenuTriggerTheme: ContextMenuTriggerThemeType = {
  '--crm-ui-kit-context-menu-trigger-color':
    'var(--crm-ui-kit-palette-text-secondary-dark)',
};

export type ContextMenuTriggerThemeType = {
  [K in ContextMenuTriggerThemeKey]: string;
};
