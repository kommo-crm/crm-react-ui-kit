type CounterBadgeThemeKey =
  | '--crm-ui-kit-counter-badge-min-width'
  | '--crm-ui-kit-counter-badge-min-height'
  | '--crm-ui-kit-counter-badge-padding'
  | '--crm-ui-kit-counter-badge-font-weight'
  | '--crm-ui-kit-counter-badge-color'
  | '--crm-ui-kit-counter-badge-border-radius'
  | '--crm-ui-kit-counter-badge-background-color';

export type CounterBadgeTheme = {
  [K in CounterBadgeThemeKey]: string;
};

export const CounterBadgePrimaryTheme: CounterBadgeTheme = {
  '--crm-ui-kit-counter-badge-min-width': '16px',
  '--crm-ui-kit-counter-badge-min-height': '16px',
  '--crm-ui-kit-counter-badge-padding': '0 4px',
  '--crm-ui-kit-counter-badge-font-weight': '700',
  '--crm-ui-kit-counter-badge-color': 'var(--crm-ui-kit-color-white)',
  '--crm-ui-kit-counter-badge-border-radius': '8px',
  '--crm-ui-kit-counter-badge-background-color':
    'var(--crm-ui-kit-palette-counter-badge-background)',
};
