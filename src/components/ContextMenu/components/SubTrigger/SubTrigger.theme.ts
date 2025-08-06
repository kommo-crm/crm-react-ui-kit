type ContextMenuSubTriggerThemeKey =
  | '--crm-ui-kit-context-menu-sub-trigger-padding'
  | '--crm-ui-kit-context-menu-sub-trigger-gap'
  | '--crm-ui-kit-context-menu-sub-trigger-color'
  | '--crm-ui-kit-context-menu-sub-trigger-background-color'
  | '--crm-ui-kit-context-menu-sub-trigger-disabled-color'
  | '--crm-ui-kit-context-menu-sub-trigger-danger-color'
  | '--crm-ui-kit-context-menu-sub-trigger-hovered-background-color'
  | '--crm-ui-kit-context-menu-sub-trigger-without-icon-align-padding'
  | '--crm-ui-kit-context-menu-sub-trigger-opened-background-color'
  | '--crm-ui-kit-context-menu-sub-trigger-chevron-color'
  | '--crm-ui-kit-context-menu-sub-trigger-chevron-margin'
  | '--crm-ui-kit-context-menu-sub-trigger-chevron-padding';

export const ContextMenuSubTriggerTheme: ContextMenuSubTriggerThemeType = {
  '--crm-ui-kit-context-menu-sub-trigger-padding': '10px 16px 10px 40px',
  '--crm-ui-kit-context-menu-sub-trigger-gap': '8px',
  '--crm-ui-kit-context-menu-sub-trigger-color':
    'var(--crm-ui-kit-palette-text-primary)',
  '--crm-ui-kit-context-menu-sub-trigger-background-color': 'transparent',

  '--crm-ui-kit-context-menu-sub-trigger-disabled-color':
    'var(--crm-ui-kit-palette-text-secondary-light)',

  '--crm-ui-kit-context-menu-sub-trigger-danger-color':
    'var(--crm-ui-kit-color-error)',

  '--crm-ui-kit-context-menu-sub-trigger-hovered-background-color':
    'var(--crm-ui-kit-palette-background-default)',

  '--crm-ui-kit-context-menu-sub-trigger-without-icon-align-padding':
    '10px 16px',

  '--crm-ui-kit-context-menu-sub-trigger-opened-background-color':
    'var(--crm-ui-kit-palette-background-default)',

  '--crm-ui-kit-context-menu-sub-trigger-chevron-color':
    'var(--crm-ui-kit-palette-text-primary)',
  '--crm-ui-kit-context-menu-sub-trigger-chevron-padding': '0 0 0 10px',
  '--crm-ui-kit-context-menu-sub-trigger-chevron-margin': '0 0 0 auto',
};

export type ContextMenuSubTriggerThemeType = {
  [K in ContextMenuSubTriggerThemeKey]: string;
};
