type SelectButtonThemeKey =
  | '--crm-ui-kit-select-button-background-color'
  | '--crm-ui-kit-select-button-padding'
  | '--crm-ui-kit-select-button-height'
  | '--crm-ui-kit-select-button-z-index'
  | '--crm-ui-kit-select-button-width'
  | '--crm-ui-kit-select-button-font-size'
  | '--crm-ui-kit-select-button-line-height'
  | '--crm-ui-kit-select-button-border-width'
  | '--crm-ui-kit-select-button-border-radius'
  | '--crm-ui-kit-select-button-border'
  | '--crm-ui-kit-select-button-disabled-border'
  | '--crm-ui-kit-select-button-disabled-border-opacity'
  | '--crm-ui-kit-select-button-disabled-border-color'
  | '--crm-ui-kit-select-button-error-border'
  | '--crm-ui-kit-select-button-error-color'
  | '--crm-ui-kit-select-button-focus-visible-border'
  | '--crm-ui-kit-select-button-color';

export type SelectButtonThemeType = {
  [K in SelectButtonThemeKey]: string;
};

const SelectButtonBaseValues: Omit<
  SelectButtonThemeType,
  | '--crm-ui-kit-select-button-border'
  | '--crm-ui-kit-select-button-error-border'
  | '--crm-ui-kit-select-button-disabled-border'
> = {
  '--crm-ui-kit-select-button-border-width': '1px',
  '--crm-ui-kit-select-button-z-index': '10',
  '--crm-ui-kit-select-button-height': '36px',
  '--crm-ui-kit-select-button-width': '100%',
  '--crm-ui-kit-select-button-background-color':
    'var(--crm-ui-kit-palette-background-primary)',
  '--crm-ui-kit-select-button-error-color': 'var(--crm-ui-kit-color-error)',
  '--crm-ui-kit-select-button-border-radius':
    'var(--crm-ui-kit-border-radius-default)',
  '--crm-ui-kit-select-button-padding': '0px 7px 0px 9px',
  '--crm-ui-kit-select-button-disabled-border-color':
    'var(--crm-ui-kit-color-grey)',
  '--crm-ui-kit-select-button-disabled-border-opacity': '0.5',
  '--crm-ui-kit-select-button-font-size': 'var(--crm-ui-kit-base-font-size)',
  '--crm-ui-kit-select-button-line-height': '20px',
  '--crm-ui-kit-select-button-focus-visible-border':
    '1px solid var(--crm-ui-kit-palette-border-active)',
  '--crm-ui-kit-select-button-color': 'var(--crm-ui-kit-palette-text-primary)',
};

export const SelectButtonLightTheme: SelectButtonThemeType = {
  ...SelectButtonBaseValues,

  '--crm-ui-kit-select-button-border':
    'var(--crm-ui-kit-select-button-border-width) solid var(--crm-ui-kit-palette-border-default)',

  '--crm-ui-kit-select-button-error-border':
    'var(--crm-ui-kit-select-button-border-width) solid var(--crm-ui-kit-palette-border-error)',

  '--crm-ui-kit-select-button-disabled-border':
    'var(--crm-ui-kit-select-button-border-width) solid var(--crm-ui-kit-palette-border-primary)',
};

export const SelectButtonDarkTheme: SelectButtonThemeType = {
  ...SelectButtonBaseValues,

  '--crm-ui-kit-select-button-border':
    'var(--crm-ui-kit-select-button-border-width) solid var(--crm-ui-kit-palette-border-primary)',

  '--crm-ui-kit-select-button-error-border':
    'var(--crm-ui-kit-select-button-border-width) solid var(--crm-ui-kit-palette-border-error)',

  '--crm-ui-kit-select-button-disabled-border':
    'var(--crm-ui-kit-select-button-border-width) solid var(--crm-ui-kit-palette-border-primary)',
};
