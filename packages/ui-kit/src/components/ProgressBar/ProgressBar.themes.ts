type ProgressBarThemeKey =
  | '--crm-ui-kit-progress-bar-background-color'
  | '--crm-ui-kit-progress-bar-indicator-background'
  | '--crm-ui-kit-progress-bar-height'
  | '--crm-ui-kit-progress-bar-border-radius';

export type ProgressBarTheme = {
  [K in ProgressBarThemeKey]: string;
};

const ProgressBarBaseThemeValues = {
  '--crm-ui-kit-progress-bar-background-color':
    'var(--crm-ui-kit-palette-progress-bar-track-color)',
  '--crm-ui-kit-progress-bar-height': '4px',
  '--crm-ui-kit-progress-bar-border-radius': '999px',
};

export const ProgressBarPrimaryTheme: ProgressBarTheme = {
  ...ProgressBarBaseThemeValues,
  '--crm-ui-kit-progress-bar-indicator-background':
    'var(--crm-ui-kit-palette-progress-bar-fill-color)',
};
