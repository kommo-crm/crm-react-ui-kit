type SkeletonThemeKey =
  | '--crm-ui-kit-skeleton-background'
  | '--crm-ui-kit-skeleton-border-radius';

export type SkeletonTheme = {
  [K in SkeletonThemeKey]: string;
};

const SkeletonBaseThemeValues = {
  '--crm-ui-kit-skeleton-background':
    'var(--crm-ui-kit-palette-skeleton-background)',
};

export const SkeletonPrimaryTheme: SkeletonTheme = {
  ...SkeletonBaseThemeValues,
  '--crm-ui-kit-skeleton-border-radius':
    'var(--crm-ui-kit-border-radius-default)',
};

export const SkeletonCirclePrimaryTheme: SkeletonTheme = {
  ...SkeletonBaseThemeValues,
  '--crm-ui-kit-skeleton-border-radius': '50%',
};
