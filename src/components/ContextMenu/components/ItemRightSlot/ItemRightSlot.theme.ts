type ContextMenuItemRightSlotThemeKey =
  | '--crm-ui-kit-context-menu-item-right-slot-padding'
  | '--crm-ui-kit-context-menu-item-right-slot-margin';

export const ContextMenuItemRightSlotTheme: ContextMenuItemRightSlotThemeType =
  {
    '--crm-ui-kit-context-menu-item-right-slot-padding': '0 0 0 16px',
    '--crm-ui-kit-context-menu-item-right-slot-margin': '0 0 0 auto',
  };

export type ContextMenuItemRightSlotThemeType = {
  [K in ContextMenuItemRightSlotThemeKey]: string;
};
