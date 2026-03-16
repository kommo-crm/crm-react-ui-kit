type SpinnerThemeKey =
  | '--crm-ui-kit-spinner-border-color'
  | '--crm-ui-kit-spinner-circle-size'
  | '--crm-ui-kit-spinner-border-width'
  | '--crm-ui-kit-spinner-border-style';

export type SpinnerTheme = {
  [K in SpinnerThemeKey]: string;
};

export const SpinnerPrimaryTheme: SpinnerTheme = {
  '--crm-ui-kit-spinner-border-color': 'var(--crm-ui-kit-color-bright-blue)',
  '--crm-ui-kit-spinner-border-width': '2px',
  '--crm-ui-kit-spinner-circle-size': '16px',
  '--crm-ui-kit-spinner-border-style': 'solid',
};
