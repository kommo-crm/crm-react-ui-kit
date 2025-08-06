type ContextMenuItemIndicatorThemeKey =
  '--crm-ui-kit-context-menu-item-indicator-color';

export const ContextMenuItemIndicatorTheme: ContextMenuItemIndicatorThemeType =
  {
    '--crm-ui-kit-context-menu-item-indicator-color': 'inherit',
  };

export type ContextMenuItemIndicatorThemeType = {
  [K in ContextMenuItemIndicatorThemeKey]: string;
};
