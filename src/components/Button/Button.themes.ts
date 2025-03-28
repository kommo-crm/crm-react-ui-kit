type ButtonThemeKey =
  | '--crm-ui-kit-button-z-index'
  | '--crm-ui-kit-button-height'
  | '--crm-ui-kit-button-color'
  | '--crm-ui-kit-button-font-size'
  | '--crm-ui-kit-button-line-height'
  | '--crm-ui-kit-button-font-weight'
  | '--crm-ui-kit-button-padding'
  | '--crm-ui-kit-button-elements-spacing'
  | '--crm-ui-kit-button-sibling-element-spacing'
  | '--crm-ui-kit-button-border-width'
  | '--crm-ui-kit-button-border-color'
  | '--crm-ui-kit-button-border-style'
  | '--crm-ui-kit-button-border-radius'
  | '--crm-ui-kit-button-background-color'
  | '--crm-ui-kit-button-disabled-opacity'
  | '--crm-ui-kit-button-disabled-color'
  | '--crm-ui-kit-button-disabled-background-color'
  | '--crm-ui-kit-button-disabled-border-color'
  | '--crm-ui-kit-button-spinner-disabled-border-color'
  | '--crm-ui-kit-button-hover-color'
  | '--crm-ui-kit-button-hover-background-color'
  | '--crm-ui-kit-button-hover-border-width'
  | '--crm-ui-kit-button-hover-border-color'
  | '--crm-ui-kit-button-hover-border-style'
  | '--crm-ui-kit-button-hover-border-radius'
  | '--crm-ui-kit-button-success-color'
  | '--crm-ui-kit-button-success-background-color'
  | '--crm-ui-kit-button-success-hover-background-color'
  | '--crm-ui-kit-button-success-border-color'
  | '--crm-ui-kit-button-spinner-border-color'
  | '--crm-ui-kit-button-spinner-circle-size'
  | '--crm-ui-kit-button-spinner-border-width'
  | '--crm-ui-kit-button-spinner-border-style';

export type ButtonThemeType = {
  [K in ButtonThemeKey]: string;
};

const ButtonBaseThemeValues = {
  '--crm-ui-kit-button-z-index': '1',
  '--crm-ui-kit-button-height': '36px',
  '--crm-ui-kit-button-elements-spacing': '4px',
  '--crm-ui-kit-button-font-size': '14px',
  '--crm-ui-kit-button-line-height': '14px',
  '--crm-ui-kit-button-font-weight': 'bold',
  '--crm-ui-kit-button-sibling-element-spacing': '7px',
  '--crm-ui-kit-button-disabled-opacity': 'var(--crm-ui-kit-disabled-opacity)',
  '--crm-ui-kit-button-padding': '0px 10px',

  '--crm-ui-kit-button-border-width': '1px',
  '--crm-ui-kit-button-border-style': 'solid',
  '--crm-ui-kit-button-border-radius': '3px',

  '--crm-ui-kit-button-hover-border-width': '1px',
  '--crm-ui-kit-button-hover-border-style': 'solid',
  '--crm-ui-kit-button-hover-border-radius': '3px',

  '--crm-ui-kit-button-success-color': 'var(--crm-ui-kit-color-white)',
  '--crm-ui-kit-button-success-background-color':
    'var(--crm-ui-ki-color-mustard-yellow)',
  '--crm-ui-kit-button-success-hover-background-color':
    'var(--crm-ui-kit-color-amber)',
  '--crm-ui-kit-button-success-border-color':
    'var(--crm-ui-kit-color-goldenrod)',

  '--crm-ui-kit-button-spinner-border-color':
    'var(--crm-ui-kit-color-bright-blue)',
  '--crm-ui-kit-button-spinner-disabled-border-color':
    'var(--crm-ui-kit-color-bright-blue)',
  '--crm-ui-kit-button-spinner-border-width': '2px',
  '--crm-ui-kit-button-spinner-circle-size': '16px',
  '--crm-ui-kit-button-spinner-border-style': 'solid',
};

export const ButtonNeutralTheme: ButtonThemeType = {
  ...ButtonBaseThemeValues,
  '--crm-ui-kit-button-color': 'var(--crm-ui-kit-palette-text-primary)',

  '--crm-ui-kit-button-border-color':
    'var(--crm-ui-kit-palette-border-primary)',

  '--crm-ui-kit-button-background-color':
    'var(--crm-ui-kit-palette-background-primary)',

  '--crm-ui-kit-button-disabled-color':
    'var(--crm-ui-kit-palette-text-primary)',
  '--crm-ui-kit-button-disabled-background-color':
    'var(--crm-ui-kit-palette-background-primary)',
  '--crm-ui-kit-button-disabled-border-color':
    'var(--crm-ui-kit-palette-border-primary)',

  '--crm-ui-kit-button-hover-color': 'var(--crm-ui-kit-palette-text-primary)',
  '--crm-ui-kit-button-hover-background-color':
    'var(--crm-ui-kit-palette-button-classic-hover-background)',

  '--crm-ui-kit-button-hover-border-color':
    'var(--crm-ui-kit-palette-border-primary)',
};
export const ButtonPrimaryTheme: ButtonThemeType = {
  ...ButtonBaseThemeValues,
  '--crm-ui-kit-button-color': 'var(--crm-ui-kit-color-white)',

  '--crm-ui-kit-button-border-color': 'var(--crm-ui-kit-color-cerulean-blue)',

  '--crm-ui-kit-button-disabled-color':
    'var(--crm-ui-kit-palette-text-primary)',
  '--crm-ui-kit-button-disabled-background-color':
    'var(--crm-ui-kit-palette-background-primary)',
  '--crm-ui-kit-button-disabled-border-color':
    'var(--crm-ui-kit-palette-border-primary)',

  '--crm-ui-kit-button-background-color':
    'var(--crm-ui-kit-palette-active-element-900)',

  '--crm-ui-kit-button-hover-color': 'var(--crm-ui-kit-color-white)',
  '--crm-ui-kit-button-hover-background-color':
    'var(--crm-ui-kit-color-azure-blue)',

  '--crm-ui-kit-button-hover-border-color':
    'var(--crm-ui-kit-color-cerulean-blue)',

  '--crm-ui-kit-button-spinner-border-color': 'var(--crm-ui-kit-color-white)',
  '--crm-ui-kit-button-spinner-disabled-border-color':
    'var(--crm-ui-kit-color-bright-blue)',
};
export const ButtonSecondaryTheme: ButtonThemeType = {
  ...ButtonBaseThemeValues,
  '--crm-ui-kit-button-height': '30px',
  '--crm-ui-kit-button-color': 'var(--crm-ui-kit-palette-text-secondary-light)',
  '--crm-ui-kit-button-padding': '0px 8px',
  '--crm-ui-kit-button-border-color': 'transparent',
  '--crm-ui-kit-button-background-color': 'inherit',

  '--crm-ui-kit-button-disabled-color':
    'var(--crm-ui-kit-palette-text-secondary-light)',
  '--crm-ui-kit-button-disabled-background-color': 'inherit',
  '--crm-ui-kit-button-disabled-border-color': 'transparent',

  '--crm-ui-kit-button-hover-background-color': 'inherit',
  '--crm-ui-kit-button-hover-border-color': 'transparent',
  '--crm-ui-kit-button-hover-color':
    'var(--crm-ui-kit-palette-text-secondary-light)',
};
