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

export const SeparatorRoundedTheme: SeparatorTheme = {
  ...SeparatorBaseThemeValues,
  '--crm-ui-kit-separator-border-radius':
    'var(--crm-ui-kit-border-radius-default)',
};

export const SeparatorSquareTheme: SeparatorTheme = {
  ...SeparatorBaseThemeValues,
  '--crm-ui-kit-separator-border-radius': '0',
};
