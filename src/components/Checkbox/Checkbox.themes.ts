import { LabelTheme, type LabelThemeType } from 'src/components/Label';

type CheckboxThemeKey =
  | '--crm-ui-kit-checkbox-size'
  | '--crm-ui-kit-checkbox-z-index'
  | '--crm-ui-kit-checkbox-background-color'
  | '--crm-ui-kit-checkbox-disabled-background-color'
  | '--crm-ui-kit-checkbox-border-width'
  | '--crm-ui-kit-checkbox-border-radius'
  | '--crm-ui-kit-checkbox-border-style'
  | '--crm-ui-kit-checkbox-border-color'
  | '--crm-ui-kit-checkbox-error-border-color'
  | '--crm-ui-kit-checkbox-checked-background'
  | '--crm-ui-kit-checkbox-indeterminate-background'
  | '--crm-ui-kit-checkbox-focus-visible-outline-color'
  | '--crm-ui-kit-checkbox-focus-visible-outline-width'
  | '--crm-ui-kit-checkbox-focus-visible-outline-style'
  | '--crm-ui-kit-checkbox-focus-visible-outline-offset'
  | '--crm-ui-kit-checkbox-focus-visible-border-radius';

export type CheckboxThemeType = {
  [K in CheckboxThemeKey]: string;
};

export const CheckboxBaseValues: Omit<
  CheckboxThemeType,
  '--crm-ui-kit-checkbox-size' | '--crm-ui-kit-checkbox-border-color'
> = {
  '--crm-ui-kit-checkbox-z-index': '3',

  '--crm-ui-kit-checkbox-border-width': '1px',
  '--crm-ui-kit-checkbox-border-radius':
    'var(--crm-ui-kit-border-radius-default)',
  '--crm-ui-kit-checkbox-border-style': 'solid',

  '--crm-ui-kit-checkbox-background-color':
    'var(--crm-ui-kit-palette-background-primary)',

  '--crm-ui-kit-checkbox-disabled-background-color':
    'var(--crm-ui-kit-palette-background-primary-disabled)',

  '--crm-ui-kit-checkbox-error-border-color': 'var(--crm-ui-kit-color-error)',

  '--crm-ui-kit-checkbox-checked-background':
    'var(--crm-ui-kit-checkbox-background-color) var(--crm-ui-kit-icon-checked-mark) no-repeat center / 70%',
  '--crm-ui-kit-checkbox-indeterminate-background':
    'var(--crm-ui-kit-checkbox-background-color) var(--crm-ui-kit-icon-minus) no-repeat center',

  '--crm-ui-kit-checkbox-focus-visible-outline-color':
    'var(--crm-ui-kit-palette-focus-visible-color)',
  '--crm-ui-kit-checkbox-focus-visible-outline-width':
    'var(--crm-ui-kit-palette-focus-visible-outline-width)',
  '--crm-ui-kit-checkbox-focus-visible-outline-style':
    'var(--crm-ui-kit-palette-focus-visible-outline-style)',
  '--crm-ui-kit-checkbox-focus-visible-outline-offset':
    'var(--crm-ui-kit-palette-focus-visible-outline-offset)',
  '--crm-ui-kit-checkbox-focus-visible-border-radius':
    'var(--crm-ui-kit-border-radius-default)',
};

export const CheckboxLightTheme: CheckboxThemeType = {
  ...CheckboxBaseValues,
  '--crm-ui-kit-checkbox-size': '20px',
  '--crm-ui-kit-checkbox-border-color':
    'var(--crm-ui-kit-palette-border-default)',
};
export const CheckboxSmallLightTheme: CheckboxThemeType = {
  ...CheckboxBaseValues,
  '--crm-ui-kit-checkbox-size': '16px',
  '--crm-ui-kit-checkbox-border-color':
    'var(--crm-ui-kit-palette-border-default)',
};

export const CheckboxDarkTheme: CheckboxThemeType = {
  ...CheckboxBaseValues,
  '--crm-ui-kit-checkbox-size': '20px',
  '--crm-ui-kit-checkbox-border-color':
    'var(--crm-ui-kit-palette-border-primary)',
};

export const CheckboxSmallDarkTheme: CheckboxThemeType = {
  ...CheckboxBaseValues,
  '--crm-ui-kit-checkbox-size': '16px',
  '--crm-ui-kit-checkbox-border-color':
    'var(--crm-ui-kit-palette-border-primary)',
};

export const CheckboxLabelTheme: LabelThemeType = {
  ...LabelTheme,
  '--crm-ui-kit-label-description-spacing': '8px',
  '--crm-ui-kit-label-spacing': '8px',
};
