type KeyType<T extends string> = {
  [K in T]: string;
};

type TooltipThemeKey =
  | '--crm-ui-kit-tooltip-background'
  | '--crm-ui-kit-tooltip-text-color'
  | '--crm-ui-kit-tooltip-font-size'
  | '--crm-ui-kit-tooltip-line-height'
  | '--crm-ui-kit-tooltip-font-weight'
  | '--crm-ui-kit-tooltip-border-color'
  | '--crm-ui-kit-tooltip-box-shadow'
  | '--crm-ui-kit-tooltip-padding'
  | '--crm-ui-kit-tooltip-border-radius'
  | '--crm-ui-kit-tooltip-box-sizing'
  | '--crm-ui-kit-tooltip-max-width'
  | '--crm-ui-kit-tooltip-z-index';

export type TooltipThemeType = KeyType<TooltipThemeKey>;

export const TooltipPrimaryTheme: TooltipThemeType = {
  '--crm-ui-kit-tooltip-background':
    'var(--crm-ui-kit-palette-background-secondary-inverse)',
  '--crm-ui-kit-tooltip-text-color':
    'var(--crm-ui-kit-palette-text-primary-inverse)',
  '--crm-ui-kit-tooltip-font-size': '13px',
  '--crm-ui-kit-tooltip-line-height': '15px',
  '--crm-ui-kit-tooltip-font-weight': '400',
  '--crm-ui-kit-tooltip-border-color':
    'var(--crm-ui-kit-palette-background-secondary-inverse)',
  '--crm-ui-kit-tooltip-box-shadow':
    'var(--crm-ui-kit-palette-tooltip-box-shadow)',
  '--crm-ui-kit-tooltip-padding': '8px',
  '--crm-ui-kit-tooltip-border-radius': '4px',
  '--crm-ui-kit-tooltip-box-sizing': 'content-box',
  '--crm-ui-kit-tooltip-max-width': '240px',
  '--crm-ui-kit-tooltip-z-index': '1001',
};
