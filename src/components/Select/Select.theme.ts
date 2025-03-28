type SelectRootThemeKey =
  | '--crm-ui-kit-select-z-index'
  | '--crm-ui-kit-select-opened-z-index';

export const SelectRootTheme: SelectRootThemeType = {
  '--crm-ui-kit-select-z-index': 'auto',
  '--crm-ui-kit-select-opened-z-index': '60',
};

export type SelectRootThemeType = {
  [K in SelectRootThemeKey]: string;
};
