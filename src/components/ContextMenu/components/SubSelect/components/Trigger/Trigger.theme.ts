type ContextMenuSubSelectTriggerThemeKey =
  | '--crm-ui-kit-context-menu-sub-select-trigger-padding'
  | '--crm-ui-kit-context-menu-sub-select-trigger-gap'
  | '--crm-ui-kit-context-menu-sub-select-trigger-color'
  | '--crm-ui-kit-context-menu-sub-select-trigger-background-color'
  | '--crm-ui-kit-context-menu-sub-select-trigger-disabled-color'
  | '--crm-ui-kit-context-menu-sub-select-trigger-hovered-background-color'
  | '--crm-ui-kit-context-menu-sub-select-trigger-with-icon-padding'
  | '--crm-ui-kit-context-menu-sub-select-trigger-opened-background-color'
  | '--crm-ui-kit-context-menu-sub-select-trigger-chevron-color'
  | '--crm-ui-kit-context-menu-sub-select-trigger-chevron-margin'
  | '--crm-ui-kit-context-menu-sub-select-trigger-chevron-padding';

export const ContextMenuSubSelectTriggerTheme: ContextMenuSubSelectTriggerThemeType =
  {
    '--crm-ui-kit-context-menu-sub-select-trigger-padding':
      '10px 16px 10px 40px',
    '--crm-ui-kit-context-menu-sub-select-trigger-gap': '8px',
    '--crm-ui-kit-context-menu-sub-select-trigger-color':
      'var(--crm-ui-kit-palette-text-primary)',
    '--crm-ui-kit-context-menu-sub-select-trigger-background-color':
      'transparent',

    '--crm-ui-kit-context-menu-sub-select-trigger-disabled-color':
      'var(--crm-ui-kit-palette-text-secondary-light)',

    '--crm-ui-kit-context-menu-sub-select-trigger-hovered-background-color':
      'var(--crm-ui-kit-palette-background-default)',

    '--crm-ui-kit-context-menu-sub-select-trigger-with-icon-padding':
      '10px 16px',

    '--crm-ui-kit-context-menu-sub-select-trigger-opened-background-color':
      'var(--crm-ui-kit-palette-background-default)',

    '--crm-ui-kit-context-menu-sub-select-trigger-chevron-color':
      'var(--crm-ui-kit-palette-text-primary)',
    '--crm-ui-kit-context-menu-sub-select-trigger-chevron-padding':
      '0 0 0 10px',
    '--crm-ui-kit-context-menu-sub-select-trigger-chevron-margin': '0 0 0 auto',
  };

export type ContextMenuSubSelectTriggerThemeType = {
  [K in ContextMenuSubSelectTriggerThemeKey]: string;
};
