import { TextPrimaryTheme, type TextTheme } from 'src/components/Text';

type InputThemeKey =
  | '--crm-ui-kit-input-font-size'
  | '--crm-ui-kit-input-line-height'
  | '--crm-ui-kit-input-border-top'
  | '--crm-ui-kit-input-border-bottom'
  | '--crm-ui-kit-input-border-left'
  | '--crm-ui-kit-input-error-border-top'
  | '--crm-ui-kit-input-error-border-bottom'
  | '--crm-ui-kit-input-error-border-left'
  | '--crm-ui-kit-input-error-border-right'
  | '--crm-ui-kit-input-border-width'
  | '--crm-ui-kit-input-border-right'
  | '--crm-ui-kit-input-border-radius'
  | '--crm-ui-kit-input-color'
  | '--crm-ui-kit-input-padding-right'
  | '--crm-ui-kit-input-padding-left'
  | '--crm-ui-kit-input-height'
  | '--crm-ui-kit-input-width'
  | '--crm-ui-kit-input-before-min-width'
  | '--crm-ui-kit-input-after-min-width'
  | '--crm-ui-kit-input-error-color'
  | '--crm-ui-kit-input-error-description-color'
  | '--crm-ui-kit-input-error-description-offset-placement-right'
  | '--crm-ui-kit-input-error-description-offset-placement-bottom'
  | '--crm-ui-kit-input-error-placement-right-width'
  | '--crm-ui-kit-input-error-placeholder-color'
  | '--crm-ui-kit-input-disabled-opacity'
  | '--crm-ui-kit-input-disabled-background-color'
  | '--crm-ui-kit-input-disabled-border-top'
  | '--crm-ui-kit-input-disabled-border-bottom'
  | '--crm-ui-kit-input-disabled-border-left'
  | '--crm-ui-kit-input-disabled-border-right'
  | '--crm-ui-kit-input-disabled-color'
  | '--crm-ui-kit-input-placeholder-color'
  | '--crm-ui-kit-input-background-color';

export type InputTheme = {
  [K in InputThemeKey]: string;
};

const InputBaseValues: Omit<
  InputTheme,
  | '--crm-ui-kit-input-border-top'
  | '--crm-ui-kit-input-border-bottom'
  | '--crm-ui-kit-input-border-left'
  | '--crm-ui-kit-input-border-right'
  | '--crm-ui-kit-input-error-border-top'
  | '--crm-ui-kit-input-error-border-bottom'
  | '--crm-ui-kit-input-error-border-left'
  | '--crm-ui-kit-input-error-border-right'
  | '--crm-ui-kit-input-disabled-border-top'
  | '--crm-ui-kit-input-disabled-border-bottom'
  | '--crm-ui-kit-input-disabled-border-left'
  | '--crm-ui-kit-input-disabled-border-right'
> = {
  '--crm-ui-kit-input-disabled-color': 'var(--crm-ui-kit-palette-text-primary)',
  '--crm-ui-kit-input-color': 'var(--crm-ui-kit-palette-text-primary)',
  '--crm-ui-kit-input-error-color': 'var(--crm-ui-kit-palette-text-primary)',
  '--crm-ui-kit-input-placeholder-color':
    'var(--crm-ui-kit-palette-placeholder-primary)',
  '--crm-ui-kit-input-error-placeholder-color':
    'var(--crm-ui-kit-palette-placeholder-primary)',
  '--crm-ui-kit-input-error-description-color': 'var(--crm-ui-kit-color-error)',
  '--crm-ui-kit-input-background-color':
    'var(--crm-ui-kit-palette-background-primary)',
  '--crm-ui-kit-input-font-size': 'var(--crm-ui-kit-base-font-size)',
  '--crm-ui-kit-input-border-width': '1px',
  '--crm-ui-kit-input-line-height': '19.42px',
  '--crm-ui-kit-input-disabled-opacity': '0.6',
  '--crm-ui-kit-input-disabled-background-color': 'transparent',
  '--crm-ui-kit-input-error-placement-right-width': '250px',
  '--crm-ui-kit-input-before-min-width': '36px',
  '--crm-ui-kit-input-after-min-width': '36px',
  '--crm-ui-kit-input-error-description-offset-placement-bottom': '5px',
  '--crm-ui-kit-input-error-description-offset-placement-right': '10px',
  '--crm-ui-kit-input-border-radius': 'var(--crm-ui-kit-border-radius-default)',
  '--crm-ui-kit-input-padding-right': '9px',
  '--crm-ui-kit-input-padding-left': '9px',
  '--crm-ui-kit-input-height': '34px',
  '--crm-ui-kit-input-width': '100%',
};

export const InputLightTheme: InputTheme = {
  ...InputBaseValues,
  '--crm-ui-kit-input-border-top':
    'var(--crm-ui-kit-input-border-width) solid var(--crm-ui-kit-palette-border-default)',
  '--crm-ui-kit-input-border-bottom':
    'var(--crm-ui-kit-input-border-width) solid var(--crm-ui-kit-palette-border-default)',
  '--crm-ui-kit-input-border-left':
    'var(--crm-ui-kit-input-border-width) solid var(--crm-ui-kit-palette-border-default)',
  '--crm-ui-kit-input-border-right':
    'var(--crm-ui-kit-input-border-width) solid var(--crm-ui-kit-palette-border-default)',

  '--crm-ui-kit-input-error-border-top':
    'var(--crm-ui-kit-input-border-width) solid var(--crm-ui-kit-palette-border-error)',
  '--crm-ui-kit-input-error-border-bottom':
    'var(--crm-ui-kit-input-border-width) solid var(--crm-ui-kit-palette-border-error)',
  '--crm-ui-kit-input-error-border-left':
    'var(--crm-ui-kit-input-border-width) solid var(--crm-ui-kit-palette-border-error)',
  '--crm-ui-kit-input-error-border-right':
    'var(--crm-ui-kit-input-border-width) solid var(--crm-ui-kit-palette-border-error)',

  '--crm-ui-kit-input-disabled-border-top':
    'var(--crm-ui-kit-input-border-width) solid var(--crm-ui-kit-palette-border-primary)',
  '--crm-ui-kit-input-disabled-border-bottom':
    'var(--crm-ui-kit-input-border-width) solid var(--crm-ui-kit-palette-border-primary)',
  '--crm-ui-kit-input-disabled-border-left':
    'var(--crm-ui-kit-input-border-width) solid var(--crm-ui-kit-palette-border-primary)',
  '--crm-ui-kit-input-disabled-border-right':
    'var(--crm-ui-kit-input-border-width) solid var(--crm-ui-kit-palette-border-primary)',
};

export const InputDarkTheme: InputTheme = {
  ...InputBaseValues,
  '--crm-ui-kit-input-border-top':
    'var(--crm-ui-kit-input-border-width) solid var(--crm-ui-kit-palette-border-primary)',
  '--crm-ui-kit-input-border-bottom':
    'var(--crm-ui-kit-input-border-width) solid var(--crm-ui-kit-palette-border-primary)',
  '--crm-ui-kit-input-border-left':
    'var(--crm-ui-kit-input-border-width) solid var(--crm-ui-kit-palette-border-primary)',
  '--crm-ui-kit-input-border-right':
    'var(--crm-ui-kit-input-border-width) solid var(--crm-ui-kit-palette-border-primary)',

  '--crm-ui-kit-input-error-border-top':
    'var(--crm-ui-kit-input-border-width) solid var(--crm-ui-kit-palette-border-error)',
  '--crm-ui-kit-input-error-border-bottom':
    'var(--crm-ui-kit-input-border-width) solid var(--crm-ui-kit-palette-border-error)',
  '--crm-ui-kit-input-error-border-left':
    'var(--crm-ui-kit-input-border-width) solid var(--crm-ui-kit-palette-border-error)',
  '--crm-ui-kit-input-error-border-right':
    'var(--crm-ui-kit-input-border-width) solid var(--crm-ui-kit-palette-border-error)',

  '--crm-ui-kit-input-disabled-border-top':
    'var(--crm-ui-kit-input-border-width) solid var(--crm-ui-kit-palette-border-primary)',
  '--crm-ui-kit-input-disabled-border-bottom':
    'var(--crm-ui-kit-input-border-width) solid var(--crm-ui-kit-palette-border-primary)',
  '--crm-ui-kit-input-disabled-border-left':
    'var(--crm-ui-kit-input-border-width) solid var(--crm-ui-kit-palette-border-primary)',
  '--crm-ui-kit-input-disabled-border-right':
    'var(--crm-ui-kit-input-border-width) solid var(--crm-ui-kit-palette-border-primary)',
};

export const InputInvalidTextTheme: TextTheme = {
  ...TextPrimaryTheme,
  '--crm-ui-kit-text-color': 'var(--crm-ui-kit-input-error-description-color)',
};
