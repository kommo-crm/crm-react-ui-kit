type RadioThemeKey =
  | '--crm-ui-kit-radio-size'
  | '--crm-ui-kit-radio-z-index'
  | '--crm-ui-kit-radio-background-color'
  | '--crm-ui-kit-radio-border-width'
  | '--crm-ui-kit-radio-border-radius'
  | '--crm-ui-kit-radio-border-style'
  | '--crm-ui-kit-radio-border-color'
  | '--crm-ui-kit-radio-checked-circle-size'
  | '--crm-ui-kit-radio-checked-circle-color'
  | '--crm-ui-kit-radio-focus-visible-outline-color'
  | '--crm-ui-kit-radio-focus-visible-outline-width'
  | '--crm-ui-kit-radio-focus-visible-outline-style'
  | '--crm-ui-kit-radio-focus-visible-outline-offset'
  | '--crm-ui-kit-radio-focus-visible-border-radius';

export type RadioThemeType = {
  [K in RadioThemeKey]: string;
};

export const RadioPrimaryTheme: RadioThemeType = {
  '--crm-ui-kit-radio-size': '20px',
  '--crm-ui-kit-radio-z-index': '3',
  '--crm-ui-kit-radio-checked-circle-size': '8px',
  '--crm-ui-kit-radio-checked-circle-color':
    'var(--crm-ui-kit-color-blueberry)',

  '--crm-ui-kit-radio-border-width': '1px',
  '--crm-ui-kit-radio-border-radius': '50%',
  '--crm-ui-kit-radio-border-style': 'solid',
  '--crm-ui-kit-radio-border-color': 'var(--crm-ui-kit-palette-border-primary)',
  '--crm-ui-kit-radio-background-color':
    'var(--crm-ui-kit-palette-background-primary)',

  '--crm-ui-kit-radio-focus-visible-outline-color':
    'var(--crm-ui-kit-palette-focus-visible-color)',
  '--crm-ui-kit-radio-focus-visible-outline-width':
    'var(--crm-ui-kit-palette-focus-visible-outline-width)',
  '--crm-ui-kit-radio-focus-visible-outline-style':
    'var(--crm-ui-kit-palette-focus-visible-outline-style)',
  '--crm-ui-kit-radio-focus-visible-outline-offset':
    'var(--crm-ui-kit-palette-focus-visible-outline-offset)',
  '--crm-ui-kit-radio-focus-visible-border-radius': '50%',
};
