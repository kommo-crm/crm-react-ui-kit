type ContextMenuMetaItemThemeKey =
  | '--crm-ui-kit-context-menu-meta-item-gap'
  | '--crm-ui-kit-context-menu-meta-item-padding'
  | '--crm-ui-kit-context-menu-meta-item-color'
  | '--crm-ui-kit-context-menu-meta-item-background-color'
  | '--crm-ui-kit-context-menu-meta-item-without-icon-align-padding'
  | '--crm-ui-kit-context-menu-meta-item-label-margin'
  | '--crm-ui-kit-context-menu-meta-item-label-font-weight'
  | '--crm-ui-kit-context-menu-meta-item-label-color'
  | '--crm-ui-kit-context-menu-meta-item-copy-icon-margin'
  | '--crm-ui-kit-context-menu-meta-item-copy-icon-color';

export const ContextMenuMetaItemTheme: ContextMenuMetaItemThemeType = {
  '--crm-ui-kit-context-menu-meta-item-gap': '8px',
  '--crm-ui-kit-context-menu-meta-item-padding': '10px 16px 10px 40px',
  '--crm-ui-kit-context-menu-meta-item-color':
    'var(--crm-ui-kit-palette-text-primary)',
  '--crm-ui-kit-context-menu-meta-item-background-color':
    'var(--crm-ui-kit-palette-background-primary)',

  '--crm-ui-kit-context-menu-meta-item-without-icon-align-padding': '10px 16px',

  '--crm-ui-kit-context-menu-meta-item-label-margin': '0 8px 0 0',
  '--crm-ui-kit-context-menu-meta-item-label-font-weight': '400',
  '--crm-ui-kit-context-menu-meta-item-label-color':
    'var(--crm-ui-kit-palette-text-secondary-light)',

  '--crm-ui-kit-context-menu-meta-item-copy-icon-margin': '0 0 0 4px',
  '--crm-ui-kit-context-menu-meta-item-copy-icon-color':
    'var(--crm-ui-kit-palette-text-secondary-light)',
};

export type ContextMenuMetaItemThemeType = {
  [K in ContextMenuMetaItemThemeKey]: string;
};
