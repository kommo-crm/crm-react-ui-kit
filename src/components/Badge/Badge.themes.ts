type BadgeThemeKey =
  | '--crm-ui-kit-badge-height'
  | '--crm-ui-kit-badge-border-radius'
  | '--crm-ui-kit-badge-padding'
  | '--crm-ui-kit-badge-font-weight'
  | '--crm-ui-kit-badge-color'
  | '--crm-ui-kit-badge-background-color';

export type BadgeThemeType = {
  [K in BadgeThemeKey]: string;
};

const BadgeBaseThemeValues = {
  '--crm-ui-kit-badge-height': '20px',
  '--crm-ui-kit-badge-border-radius': 'var(--crm-ui-kit-border-radius-default)',
  '--crm-ui-kit-badge-padding': '0 8px',
  '--crm-ui-kit-badge-font-weight': '700',
};

export const BadgeNeutralTheme: BadgeThemeType = {
  ...BadgeBaseThemeValues,
  '--crm-ui-kit-badge-color': 'var(--crm-ui-kit-palette-badge-color-neutral)',
  '--crm-ui-kit-badge-background-color':
    'var(--crm-ui-kit-palette-badge-background-color-neutral)',
};

export const BadgePurpleTheme: BadgeThemeType = {
  ...BadgeBaseThemeValues,
  '--crm-ui-kit-badge-color': 'var(--crm-ui-kit-palette-badge-color-purple)',
  '--crm-ui-kit-badge-background-color':
    'var(--crm-ui-kit-palette-badge-background-color-purple)',
};

export const BadgeBlueTheme: BadgeThemeType = {
  ...BadgeBaseThemeValues,
  '--crm-ui-kit-badge-color': 'var(--crm-ui-kit-palette-badge-color-blue)',
  '--crm-ui-kit-badge-background-color':
    'var(--crm-ui-kit-palette-badge-background-color-blue)',
};

export const BadgePinkTheme: BadgeThemeType = {
  ...BadgeBaseThemeValues,
  '--crm-ui-kit-badge-color': 'var(--crm-ui-kit-palette-badge-color-pink)',
  '--crm-ui-kit-badge-background-color':
    'var(--crm-ui-kit-palette-badge-background-color-pink)',
};

export const BadgeGreenTheme: BadgeThemeType = {
  ...BadgeBaseThemeValues,
  '--crm-ui-kit-badge-color': 'var(--crm-ui-kit-palette-badge-color-green)',
  '--crm-ui-kit-badge-background-color':
    'var(--crm-ui-kit-palette-badge-background-color-green)',
};

export const BadgeOrangeTheme: BadgeThemeType = {
  ...BadgeBaseThemeValues,
  '--crm-ui-kit-badge-color': 'var(--crm-ui-kit-palette-badge-color-orange)',
  '--crm-ui-kit-badge-background-color':
    'var(--crm-ui-kit-palette-badge-background-color-orange)',
};

export const BadgeRedTheme: BadgeThemeType = {
  ...BadgeBaseThemeValues,
  '--crm-ui-kit-badge-color': 'var(--crm-ui-kit-palette-badge-color-red)',
  '--crm-ui-kit-badge-background-color':
    'var(--crm-ui-kit-palette-badge-background-color-red)',
};
