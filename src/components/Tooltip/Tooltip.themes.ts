type TooltipPrimaryThemeKey =
  | '--crm-ui-kit-link-color'
  | '--crm-ui-kit-link-hover-color'
  | '--crm-ui-kit-link-focus-visible-outline-color'
  | '--crm-ui-kit-link-focus-visible-outline-width'
  | '--crm-ui-kit-link-focus-visible-outline-style'
  | '--crm-ui-kit-link-focus-visible-outline-offset'
  | '--crm-ui-kit-link-focus-visible-border-radius'
  | '--crm-ui-kit-link-text-decoration';

export type TooltipTheme = {
  [K in TooltipPrimaryThemeKey]: string;
};

export const TooltipPrimaryTheme: TooltipTheme = {
  '--crm-ui-kit-link-color': 'var(--crm-ui-kit-palette-link-primary)',
  '--crm-ui-kit-link-hover-color':
    'var(--crm-ui-kit-palette-link-hover-primary)',
  '--crm-ui-kit-link-text-decoration': 'underline',
  '--crm-ui-kit-link-focus-visible-outline-color':
    'var(--crm-ui-kit-palette-focus-visible-color)',
  '--crm-ui-kit-link-focus-visible-outline-width':
    'var(--crm-ui-kit-palette-focus-visible-outline-width)',
  '--crm-ui-kit-link-focus-visible-outline-style':
    'var(--crm-ui-kit-palette-focus-visible-outline-style)',
  '--crm-ui-kit-link-focus-visible-outline-offset':
    'var(--crm-ui-kit-palette-focus-visible-outline-offset)',
  '--crm-ui-kit-link-focus-visible-border-radius':
    'var(--crm-ui-kit-palette-focus-visible-border-radius)',
};
