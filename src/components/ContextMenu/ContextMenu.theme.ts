type ContextMenuRootThemeKey = '--crm-ui-kit-context-menu-z-index';

export const ContextMenuRootTheme: ContextMenuRootThemeType = {
  '--crm-ui-kit-context-menu-z-index': 'auto',
};

export type ContextMenuRootThemeType = {
  [K in ContextMenuRootThemeKey]: string;
};
