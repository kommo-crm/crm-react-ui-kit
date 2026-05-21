type RibbonThemeKey =
  | '--crm-ui-kit-ribbon-background-color'
  | '--crm-ui-kit-ribbon-color';

export type RibbonTheme = {
  [K in RibbonThemeKey]: string;
};

export const RibbonPrimaryTheme: RibbonTheme = {
  '--crm-ui-kit-ribbon-background-color': 'var(--crm-ui-kit-color-error)',
  '--crm-ui-kit-ribbon-color': 'var(--crm-ui-kit-color-white)',
};
