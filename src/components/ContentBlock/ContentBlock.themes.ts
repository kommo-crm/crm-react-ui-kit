type ContentBlockKey =
  | '--crm-ui-kit-content-block-box-shadow'
  | '--crm-ui-kit-content-block-background'
  | '--crm-ui-kit-content-block-box-sizing'
  | '--crm-ui-kit-content-block-padding'
  | '--crm-ui-kit-content-block-border-radius';

export type ContentBlockThemeType = {
  [K in ContentBlockKey]: string;
};

export const ContentBlockTheme: ContentBlockThemeType = {
  '--crm-ui-kit-content-block-box-sizing': 'border-box',
  '--crm-ui-kit-content-block-padding': '18px 18px 29px',
  '--crm-ui-kit-content-block-border-radius':
    'var(--crm-ui-kit-border-radius-default)',
  '--crm-ui-kit-content-block-box-shadow':
    'var(--crm-ui-kit-palette-content-block-box-shadow)',
  '--crm-ui-kit-content-block-background':
    'var(--crm-ui-kit-palette-background-primary)',
};
