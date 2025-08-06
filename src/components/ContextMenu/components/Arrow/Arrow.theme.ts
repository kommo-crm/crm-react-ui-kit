type ContextMenuArrowThemeKey =
  | '--crm-ui-kit-context-menu-arrow-fill'
  | '--crm-ui-kit-context-menu-arrow-border-color'
  | '--crm-ui-kit-context-menu-arrow-border-size';

export const ContextMenuArrowTheme: ContextMenuArrowThemeType = {
  '--crm-ui-kit-context-menu-arrow-fill':
    'var(--crm-ui-kit-palette-background-primary)',
  '--crm-ui-kit-context-menu-arrow-border-color':
    'var(--crm-ui-kit-palette-border-default)',
  '--crm-ui-kit-context-menu-arrow-border-size': '1px',
};

export type ContextMenuArrowThemeType = {
  [K in ContextMenuArrowThemeKey]: string;
};
