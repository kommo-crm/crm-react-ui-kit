type SwitcherThemeKey =
  | '--crm-ui-kit-switcher-active-element-color'
  | '--crm-ui-kit-switcher-border-color'
  | '--crm-ui-kit-switcher-circle-size'
  | '--crm-ui-kit-switcher-line-border-radius'
  | '--crm-ui-kit-switcher-line-width'
  | '--crm-ui-kit-switcher-border-width'
  | '--crm-ui-kit-switcher-disabled-opacity'
  | '--crm-ui-kit-switcher-focus-visible-outline-color'
  | '--crm-ui-kit-switcher-focus-visible-outline-width'
  | '--crm-ui-kit-switcher-focus-visible-outline-style'
  | '--crm-ui-kit-switcher-focus-visible-outline-offset'
  | '--crm-ui-kit-switcher-focus-visible-border-radius';

export type SwitcherTheme = {
  [K in SwitcherThemeKey]: string;
};

export const SwitcherPrimaryTheme: SwitcherTheme = {
  '--crm-ui-kit-switcher-active-element-color':
    'var(--crm-ui-kit-palette-active-element-900)',
  '--crm-ui-kit-switcher-border-color':
    'var(--crm-ui-kit-palette-switcher-border-default)',

  '--crm-ui-kit-switcher-line-border-radius': '26px',
  '--crm-ui-kit-switcher-circle-size': '14px',
  '--crm-ui-kit-switcher-line-width': '9px',
  '--crm-ui-kit-switcher-border-width': '1px',
  '--crm-ui-kit-switcher-disabled-opacity':
    'var(--crm-ui-kit-disabled-opacity)',

  '--crm-ui-kit-switcher-focus-visible-outline-color':
    'var(--crm-ui-kit-palette-focus-visible-color)',
  '--crm-ui-kit-switcher-focus-visible-outline-width':
    'var(--crm-ui-kit-palette-focus-visible-outline-width)',
  '--crm-ui-kit-switcher-focus-visible-outline-style':
    'var(--crm-ui-kit-palette-focus-visible-outline-style)',
  '--crm-ui-kit-switcher-focus-visible-outline-offset':
    'var(--crm-ui-kit-palette-focus-visible-outline-offset)',
  '--crm-ui-kit-switcher-focus-visible-border-radius':
    'var(--crm-ui-kit-palette-focus-visible-border-radius)',
};
