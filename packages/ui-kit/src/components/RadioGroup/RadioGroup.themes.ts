type KeyType<T extends string> = {
  [K in T]: string;
};

type RadioGroupThemeKey = '--crm-ui-kit-radio-group-spacing';

export type RadioGroupThemeType = KeyType<RadioGroupThemeKey>;

export const RadioGroupTheme: RadioGroupThemeType = {
  '--crm-ui-kit-radio-group-spacing': '8px',
};
