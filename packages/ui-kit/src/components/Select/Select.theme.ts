import { TextPrimaryTheme, type TextTheme } from '@ui-kit/components/Text';

type SelectRootThemeKey =
  | '--crm-ui-kit-select-z-index'
  | '--crm-ui-kit-select-opened-z-index'
  | '--crm-ui-kit-select-invalid-description-color'
  | '--crm-ui-kit-select-invalid-description-offset';

export const SelectRootTheme: SelectRootThemeType = {
  '--crm-ui-kit-select-z-index': 'auto',
  '--crm-ui-kit-select-opened-z-index': '60',
  '--crm-ui-kit-select-invalid-description-color':
    'var(--crm-ui-kit-color-error)',
  '--crm-ui-kit-select-invalid-description-offset': '0px',
};

export type SelectRootThemeType = {
  [K in SelectRootThemeKey]: string;
};

export const SelectInvalidTextTheme: TextTheme = {
  ...TextPrimaryTheme,
  '--crm-ui-kit-text-color':
    'var(--crm-ui-kit-select-invalid-description-color)',
};
