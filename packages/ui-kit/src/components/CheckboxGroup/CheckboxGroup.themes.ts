type KeyType<T extends string> = {
  [K in T]: string;
};

type CheckboxGroupThemeKey = '--crm-ui-kit-checkbox-group-spacing';

export type CheckboxGroupThemeType = KeyType<CheckboxGroupThemeKey>;

export const CheckboxGroupTheme: CheckboxGroupThemeType = {
  '--crm-ui-kit-checkbox-group-spacing': '8px',
};
