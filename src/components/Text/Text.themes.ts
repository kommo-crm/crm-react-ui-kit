type TextThemeKey =
  | '--crm-ui-kit-text-color'
  | '--crm-ui-kit-text-font'
  | '--crm-ui-kit-text-size-s-font-size'
  | '--crm-ui-kit-text-size-s-line-height'
  | '--crm-ui-kit-text-size-m-font-size'
  | '--crm-ui-kit-text-size-m-line-height'
  | '--crm-ui-kit-text-size-ms-font-size'
  | '--crm-ui-kit-text-size-ms-line-height'
  | '--crm-ui-kit-text-size-l-font-size'
  | '--crm-ui-kit-text-size-l-line-height'
  | '--crm-ui-kit-text-size-xl-font-size'
  | '--crm-ui-kit-text-size-xl-line-height';

export type TextTheme = {
  [K in TextThemeKey]: string;
};

type TextBaseSizesThemeType = Omit<
  TextTheme,
  '--crm-ui-kit-text-color' | '--crm-ui-kit-text-font'
>;

export const TextBaseSizesTheme: TextBaseSizesThemeType = {
  '--crm-ui-kit-text-size-s-font-size': '11px',
  '--crm-ui-kit-text-size-s-line-height': '15px',
  '--crm-ui-kit-text-size-m-font-size': '13px',
  '--crm-ui-kit-text-size-m-line-height': '20px',
  '--crm-ui-kit-text-size-ms-font-size': '13px',
  '--crm-ui-kit-text-size-ms-line-height': '15px',
  '--crm-ui-kit-text-size-l-font-size': '15px',
  '--crm-ui-kit-text-size-l-line-height': '20px',
  '--crm-ui-kit-text-size-xl-font-size': '18px',
  '--crm-ui-kit-text-size-xl-line-height': '24px',
};

export const TextPrimaryTheme: TextTheme = {
  ...TextBaseSizesTheme,
  '--crm-ui-kit-text-color': 'var(--crm-ui-kit-palette-text-primary)',
  '--crm-ui-kit-text-font': 'PT Sans',
};

export const TextSecondaryLightTheme: TextTheme = {
  ...TextBaseSizesTheme,
  '--crm-ui-kit-text-color': 'var(--crm-ui-kit-palette-text-secondary-light)',
  '--crm-ui-kit-text-font': 'PT Sans',
};

export const TextSecondaryDarkTheme: TextTheme = {
  ...TextBaseSizesTheme,
  '--crm-ui-kit-text-color': 'var(--crm-ui-kit-palette-text-secondary-dark)',
  '--crm-ui-kit-text-font': 'PT Sans',
};

export const TextErrorTheme: TextTheme = {
  ...TextBaseSizesTheme,
  '--crm-ui-kit-text-color': 'var(--crm-ui-kit-color-error)',
  '--crm-ui-kit-text-font': 'PT Sans',
};
