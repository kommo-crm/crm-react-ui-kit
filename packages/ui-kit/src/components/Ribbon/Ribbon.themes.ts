type RibbonThemeKey =
  | '--crm-ui-kit-ribbon-background-color'
  | '--crm-ui-kit-ribbon-color'
  | '--crm-ui-kit-ribbon-height'
  | '--crm-ui-kit-ribbon-font-size'
  | '--crm-ui-kit-ribbon-line-height'
  | '--crm-ui-kit-ribbon-font-weight'
  | '--crm-ui-kit-ribbon-text-transform';

export type RibbonTheme = {
  [K in RibbonThemeKey]: string;
};

export const RibbonPrimaryTheme: RibbonTheme = {
  '--crm-ui-kit-ribbon-background-color': 'var(--crm-ui-kit-color-error)',
  '--crm-ui-kit-ribbon-color': 'var(--crm-ui-kit-color-white)',
  '--crm-ui-kit-ribbon-height': '19px',
  '--crm-ui-kit-ribbon-font-size': '10px',
  '--crm-ui-kit-ribbon-line-height': '14px',
  '--crm-ui-kit-ribbon-font-weight': '700',
  '--crm-ui-kit-ribbon-text-transform': 'uppercase',
};
