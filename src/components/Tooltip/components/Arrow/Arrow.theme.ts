type PopupPrimaryThemeKey =
  | '--crm-ui-kit-popup-padding'
  | '--crm-ui-kit-popup-max-width'
  | '--crm-ui-kit-popup-border-radius'
  | '--crm-ui-kit-popup-box-shadow'
  | '--crm-ui-kit-popup-border'
  | '--crm-ui-kit-popup-background'
  | '--crm-ui-kit-popup-line-height'
  | '--crm-ui-kit-popup-font-size'
  | '--crm-ui-kit-popup-color';

export const PopupPrimaryTheme: PopupPrimaryThemeType = {
  '--crm-ui-kit-popup-padding': '8px',
  '--crm-ui-kit-popup-max-width': '360px',
  '--crm-ui-kit-popup-color': 'var(--crm-ui-kit-palette-text-secondary-light)',
  '--crm-ui-kit-popup-line-height': 'auto',
  '--crm-ui-kit-popup-font-size':
    'var(--crm-ui-kit-palette-text-secondary-light)',
  '--crm-ui-kit-popup-background':
    'var(--crm-ui-kit-palette-background-primary)',
  '--crm-ui-kit-popup-border':
    '1px solid var(--crm-ui-kit-palette-border-default)',
  '--crm-ui-kit-popup-border-radius': '3px',
  '--crm-ui-kit-popup-box-shadow':
    '0px 2px 6px 0px var(--crm-ui-kit-palette-box-shadow-default)',
};

export type PopupPrimaryThemeType = {
  [K in PopupPrimaryThemeKey]: string;
};
