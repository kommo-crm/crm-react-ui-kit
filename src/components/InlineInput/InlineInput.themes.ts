import { TextPrimaryTheme, type TextTheme } from 'src/components/Text';

type InlineInputThemeKey =
  | '--crm-ui-kit-inline-input-font-size'
  | '--crm-ui-kit-inline-input-line-height'
  | '--crm-ui-kit-inline-input-color'
  | '--crm-ui-kit-inline-input-placeholder-color'
  | '--crm-ui-kit-inline-input-disabled-color'
  | '--crm-ui-kit-inline-input-width'
  | '--crm-ui-kit-inline-input-height'
  | '--crm-ui-kit-inline-input-padding-left'
  | '--crm-ui-kit-inline-input-padding-right'
  | '--crm-ui-kit-input-after-min-width'
  | '--crm-ui-kit-inline-input-border-color'
  | '--crm-ui-kit-inline-input-border-style'
  | '--crm-ui-kit-inline-input-border-width'
  | '--crm-ui-kit-inline-input-focus-border-color'
  | '--crm-ui-kit-inline-input-disabled-opacity'
  | '--crm-ui-kit-inline-input-invalid-description-offset'
  | '--crm-ui-kit-inline-input-invalid-description-padding-x'
  | '--crm-ui-kit-inline-input-invalid-description-padding-y'
  | '--crm-ui-kit-inline-input-invalid-description-width'
  | '--crm-ui-kit-inline-input-invalid-description-background-color'
  | '--crm-ui-kit-inline-input-invalid-description-border-radius'
  | '--crm-ui-kit-inline-input-invalid-description-arrow-width'
  | '--crm-ui-kit-inline-input-invalid-description-color'
  | '--crm-ui-kit-inline-input-invalid-description-arrow-top'
  | '--crm-ui-kit-inline-input-invalid-description-arrow-left';

export type InlineInputTheme = {
  [K in InlineInputThemeKey]: string;
};

const InlineInputBaseValues: Omit<
  InlineInputTheme,
  | '--crm-ui-kit-inline-input-border-color'
  | '--crm-ui-kit-inline-input-focus-border-color'
> = {
  '--crm-ui-kit-inline-input-color': 'var(--crm-ui-kit-palette-text-primary)',
  '--crm-ui-kit-inline-input-placeholder-color':
    'var(--crm-ui-kit-palette-placeholder-primary)',
  '--crm-ui-kit-inline-input-disabled-color':
    'var(--crm-ui-kit-palette-text-primary)',
  '--crm-ui-kit-inline-input-invalid-description-color':
    'var(--crm-ui-kit-color-white)',
  '--crm-ui-kit-inline-input-invalid-description-background-color':
    'var(--crm-ui-kit-color-error)',
  '--crm-ui-kit-inline-input-font-size': 'var(--crm-ui-kit-base-font-size)',
  '--crm-ui-kit-input-after-min-width': '36px',
  '--crm-ui-kit-inline-input-line-height': '20px',
  '--crm-ui-kit-inline-input-width': '100%',
  '--crm-ui-kit-inline-input-height': '19px',
  '--crm-ui-kit-inline-input-invalid-description-width': 'auto',
  '--crm-ui-kit-inline-input-disabled-opacity': '0.6',
  '--crm-ui-kit-inline-input-padding-left': '1px',
  '--crm-ui-kit-inline-input-padding-right': '1px',
  '--crm-ui-kit-inline-input-border-style': 'solid',
  '--crm-ui-kit-inline-input-border-width': '1px',
  '--crm-ui-kit-inline-input-invalid-description-offset': '5px',
  '--crm-ui-kit-inline-input-invalid-description-padding-x': '5px',
  '--crm-ui-kit-inline-input-invalid-description-padding-y': '9px',
  '--crm-ui-kit-inline-input-invalid-description-border-radius': '3px',
  '--crm-ui-kit-inline-input-invalid-description-arrow-width': '4px',
  '--crm-ui-kit-inline-input-invalid-description-arrow-top': '13px',
  '--crm-ui-kit-inline-input-invalid-description-arrow-left': '-5px',
};

export const InlineInputPrimaryTheme: InlineInputTheme = {
  ...InlineInputBaseValues,
  '--crm-ui-kit-inline-input-border-color': 'transparent',
  '--crm-ui-kit-inline-input-focus-border-color':
    'var(--crm-ui-kit-color-blueberry)',
};

export const InlineInputPrimaryFocusedTheme: InlineInputTheme = {
  ...InlineInputBaseValues,
  '--crm-ui-kit-inline-input-border-color': 'var(--crm-ui-kit-color-blueberry)',
  '--crm-ui-kit-inline-input-focus-border-color':
    'var(--crm-ui-kit-color-blueberry)',
};

export const InputInvalidTextTheme: TextTheme = {
  ...TextPrimaryTheme,
  '--crm-ui-kit-text-color':
    'var(--crm-ui-kit-inline-input-invalid-description-color)',
  '--crm-ui-kit-text-size-m-line-height': '15px',
};
