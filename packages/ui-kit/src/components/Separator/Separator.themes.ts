type SeparatorThemeKey =
  | '--crm-ui-kit-separator-color'
  | '--crm-ui-kit-separator-border-radius';

export type SeparatorTheme = {
  [K in SeparatorThemeKey]: string;
};

const SeparatorBaseThemeValues: Omit<
  SeparatorTheme,
  '--crm-ui-kit-separator-border-radius'
> = {
  '--crm-ui-kit-separator-color': 'var(--crm-ui-kit-palette-border-primary)',
};

export const SeparatorRoundedLightTheme: SeparatorTheme = {
  ...SeparatorBaseThemeValues,
  '--crm-ui-kit-separator-border-radius':
    'var(--crm-ui-kit-border-radius-default)',
};

export const SeparatorSquaredLightTheme: SeparatorTheme = {
  ...SeparatorBaseThemeValues,
  '--crm-ui-kit-separator-border-radius': '0',
};

export const SeparatorRoundedDarkTheme: SeparatorTheme = {
  ...SeparatorBaseThemeValues,
  '--crm-ui-kit-separator-border-radius':
    'var(--crm-ui-kit-border-radius-default)',
  '--crm-ui-kit-separator-color': 'var(--crm-ui-kit-palette-border-default)',
};

export const SeparatorSquaredDarkTheme: SeparatorTheme = {
  ...SeparatorBaseThemeValues,
  '--crm-ui-kit-separator-border-radius': '0',
  '--crm-ui-kit-separator-color': 'var(--crm-ui-kit-palette-border-default)',
};
