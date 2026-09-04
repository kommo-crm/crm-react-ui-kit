type KeyType<T extends string> = {
  [K in T]: string;
};

type ContextMenuThemeKey =
  | '--crm-ui-kit-context-menu-content-min-width'
  | '--crm-ui-kit-context-menu-content-background'
  | '--crm-ui-kit-context-menu-content-border-width'
  | '--crm-ui-kit-context-menu-content-border-style'
  | '--crm-ui-kit-context-menu-content-border-color'
  | '--crm-ui-kit-context-menu-content-border-radius'
  | '--crm-ui-kit-context-menu-content-box-shadow'
  | '--crm-ui-kit-context-menu-item-padding'
  | '--crm-ui-kit-context-menu-item-color'
  | '--crm-ui-kit-context-menu-item-background'
  | '--crm-ui-kit-context-menu-item-highlighted-background'
  | '--crm-ui-kit-context-menu-item-disabled-color'
  | '--crm-ui-kit-context-menu-item-danger-color'
  | '--crm-ui-kit-context-menu-item-checked-color'
  | '--crm-ui-kit-context-menu-label-padding'
  | '--crm-ui-kit-context-menu-label-color'
  | '--crm-ui-kit-context-menu-label-background'
  | '--crm-ui-kit-context-menu-item-icon-min-width'
  | '--crm-ui-kit-context-menu-item-icon-margin-right'
  | '--crm-ui-kit-context-menu-item-indicator-margin-right'
  | '--crm-ui-kit-context-menu-item-right-slot-padding-left'
  | '--crm-ui-kit-context-menu-arrow-fill'
  | '--crm-ui-kit-context-menu-arrow-border-fill';

export type ContextMenuThemeType = KeyType<ContextMenuThemeKey>;

export const ContextMenuTheme: ContextMenuThemeType = {
  '--crm-ui-kit-context-menu-content-min-width': '50px',
  '--crm-ui-kit-context-menu-content-background':
    'var(--crm-ui-kit-palette-background-primary)',
  '--crm-ui-kit-context-menu-content-border-width': '1px',
  '--crm-ui-kit-context-menu-content-border-style': 'solid',
  '--crm-ui-kit-context-menu-content-border-color':
    'var(--crm-ui-kit-palette-border-default)',
  '--crm-ui-kit-context-menu-content-border-radius':
    'var(--crm-ui-kit-border-radius-default)',
  '--crm-ui-kit-context-menu-content-box-shadow':
    'var(--crm-ui-kit-palette-context-menu-box-shadow)',
  '--crm-ui-kit-context-menu-item-padding': '10px 16px',
  '--crm-ui-kit-context-menu-item-color':
    'var(--crm-ui-kit-palette-text-primary)',
  '--crm-ui-kit-context-menu-item-background':
    'var(--crm-ui-kit-palette-background-primary)',
  '--crm-ui-kit-context-menu-item-highlighted-background':
    'var(--crm-ui-kit-palette-background-default)',
  '--crm-ui-kit-context-menu-item-disabled-color':
    'var(--crm-ui-kit-palette-text-secondary-light)',
  '--crm-ui-kit-context-menu-item-danger-color':
    'var(--crm-ui-kit-color-error)',
  '--crm-ui-kit-context-menu-item-checked-color':
    'var(--crm-ui-kit-palette-active-element-900)',
  '--crm-ui-kit-context-menu-label-padding': '10px 16px',
  '--crm-ui-kit-context-menu-label-color':
    'var(--crm-ui-kit-palette-text-primary)',
  '--crm-ui-kit-context-menu-label-background':
    'var(--crm-ui-kit-palette-background-primary)',
  '--crm-ui-kit-context-menu-item-icon-min-width': '16px',
  '--crm-ui-kit-context-menu-item-icon-margin-right': '8px',
  '--crm-ui-kit-context-menu-item-indicator-margin-right': '8px',
  '--crm-ui-kit-context-menu-item-right-slot-padding-left': '8px',
  '--crm-ui-kit-context-menu-arrow-fill':
    'var(--crm-ui-kit-palette-background-primary)',
  '--crm-ui-kit-context-menu-arrow-border-fill':
    'var(--crm-ui-kit-palette-border-default)',
};
