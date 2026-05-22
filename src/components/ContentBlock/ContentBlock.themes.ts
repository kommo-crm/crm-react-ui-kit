type ContentBlockKey =
  | '--crm-ui-kit-content-block-box-shadow'
  | '--crm-ui-kit-content-block-background'
  | '--crm-ui-kit-content-block-box-sizing'
  | '--crm-ui-kit-content-block-padding'
  | '--crm-ui-kit-content-block-border-radius';

type ContentBlockOptionalKey = '--crm-ui-kit-content-block-border';

export type ContentBlockThemeType = {
  [K in ContentBlockKey]: string;
} & {
  [K in ContentBlockOptionalKey]?: string;
};

const ContentBlockBaseThemeValues = {
  '--crm-ui-kit-content-block-box-sizing': 'border-box',
  '--crm-ui-kit-content-block-border-radius':
    'var(--crm-ui-kit-border-radius-default)',
  '--crm-ui-kit-content-block-background':
    'var(--crm-ui-kit-palette-background-primary)',
};

export const ContentBlockPrimaryTheme: ContentBlockThemeType = {
  ...ContentBlockBaseThemeValues,
  '--crm-ui-kit-content-block-padding': '18px 18px 29px',
  '--crm-ui-kit-content-block-box-shadow':
    'var(--crm-ui-kit-palette-content-block-box-shadow)',
};

/**
 * @deprecated This theme will be removed in a future major version.
 * Use {@link ContentBlockPrimaryTheme} instead.
 */
export const ContentBlockTheme = ContentBlockPrimaryTheme;

export const ContentBlockSecondaryTheme: ContentBlockThemeType = {
  ...ContentBlockBaseThemeValues,
  '--crm-ui-kit-content-block-padding': '16px',
  '--crm-ui-kit-content-block-border':
    '1px solid var(--crm-ui-kit-palette-border-primary)',
  '--crm-ui-kit-content-block-box-shadow': 'none',
};
