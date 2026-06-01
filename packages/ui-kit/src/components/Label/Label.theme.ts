type LabelGroupThemeKey = '--crm-ui-kit-label-group-margin-bottom';
type LabelThemeKey =
  | '--crm-ui-kit-label-spacing'
  | '--crm-ui-kit-label-text-width'
  | '--crm-ui-kit-label-description-spacing';

export type LabelGroupThemeType = {
  [K in LabelGroupThemeKey]: string;
};

export type LabelThemeType = {
  [K in LabelThemeKey]: string;
};

export const LabelGroupTheme: LabelGroupThemeType = {
  '--crm-ui-kit-label-group-margin-bottom': '16px',
};

export const LabelTheme: LabelThemeType = {
  '--crm-ui-kit-label-spacing': '4px',
  '--crm-ui-kit-label-description-spacing': '4px',
  '--crm-ui-kit-label-text-width': 'auto',
};
