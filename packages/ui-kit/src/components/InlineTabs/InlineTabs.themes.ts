type KeyType<T extends string> = {
  [K in T]: string;
};

type InlineTabsThemeKey =
  | '--crm-ui-kit-inline-tabs-background'
  | '--crm-ui-kit-inline-tabs-height'
  | '--crm-ui-kit-inline-tabs-trigger-padding'
  | '--crm-ui-kit-inline-tabs-trigger-color'
  | '--crm-ui-kit-inline-tabs-trigger-hover-color'
  | '--crm-ui-kit-inline-tabs-trigger-selected-color'
  | '--crm-ui-kit-inline-tabs-trigger-font-weight'
  | '--crm-ui-kit-inline-tabs-trigger-line-height'
  | '--crm-ui-kit-inline-tabs-label-max-width'
  | '--crm-ui-kit-inline-tabs-counter-spacing'
  | '--crm-ui-kit-inline-tabs-slider-height'
  | '--crm-ui-kit-inline-tabs-slider-color'
  | '--crm-ui-kit-inline-tabs-overflow-width'
  | '--crm-ui-kit-inline-tabs-menu-max-width'
  | '--crm-ui-kit-inline-tabs-menu-item-height'
  | '--crm-ui-kit-inline-tabs-menu-item-padding'
  | '--crm-ui-kit-inline-tabs-menu-item-separator-color'
  | '--crm-ui-kit-inline-tabs-menu-item-selected-color'
  | '--crm-ui-kit-inline-tabs-menu-item-icon-size'
  | '--crm-ui-kit-inline-tabs-menu-item-icon-spacing';

export type InlineTabsThemeType = KeyType<InlineTabsThemeKey>;

const InlineTabsBaseThemeValues = {
  '--crm-ui-kit-inline-tabs-height': '29px',
  '--crm-ui-kit-inline-tabs-trigger-padding': '0 8px 8px',
  '--crm-ui-kit-inline-tabs-trigger-color':
    'var(--crm-ui-kit-palette-inline-tabs-text-color)',
  '--crm-ui-kit-inline-tabs-trigger-font-weight': '700',
  '--crm-ui-kit-inline-tabs-trigger-line-height': '20px',
  '--crm-ui-kit-inline-tabs-label-max-width': '65px',
  '--crm-ui-kit-inline-tabs-counter-spacing': '4px',
  '--crm-ui-kit-inline-tabs-slider-height': '3px',
  '--crm-ui-kit-inline-tabs-overflow-width': '32px',
  '--crm-ui-kit-inline-tabs-menu-max-width': '230px',
  '--crm-ui-kit-inline-tabs-menu-item-height': '36px',
  '--crm-ui-kit-inline-tabs-menu-item-padding': '0 15px',
  '--crm-ui-kit-inline-tabs-menu-item-icon-size': '20px',
  '--crm-ui-kit-inline-tabs-menu-item-icon-spacing': '8px',
} satisfies Partial<InlineTabsThemeType>;

export const InlineTabsPrimaryTheme: InlineTabsThemeType = {
  ...InlineTabsBaseThemeValues,
  '--crm-ui-kit-inline-tabs-background':
    'var(--crm-ui-kit-palette-inline-tabs-primary-background)',
  '--crm-ui-kit-inline-tabs-trigger-hover-color':
    'var(--crm-ui-kit-palette-inline-tabs-primary-hover-color)',
  '--crm-ui-kit-inline-tabs-trigger-selected-color':
    'var(--crm-ui-kit-palette-inline-tabs-primary-selected-color)',
  '--crm-ui-kit-inline-tabs-slider-color':
    'var(--crm-ui-kit-palette-background-primary)',
  '--crm-ui-kit-inline-tabs-menu-item-separator-color':
    'var(--crm-ui-kit-palette-inline-tabs-primary-menu-separator-color)',
  '--crm-ui-kit-inline-tabs-menu-item-selected-color':
    'var(--crm-ui-kit-palette-inline-tabs-primary-selected-color)',
};

export const InlineTabsSecondaryTheme: InlineTabsThemeType = {
  ...InlineTabsBaseThemeValues,
  '--crm-ui-kit-inline-tabs-background':
    'var(--crm-ui-kit-palette-background-default)',
  '--crm-ui-kit-inline-tabs-trigger-hover-color':
    'var(--crm-ui-kit-palette-inline-tabs-secondary-hover-color)',
  '--crm-ui-kit-inline-tabs-trigger-selected-color':
    'var(--crm-ui-kit-palette-inline-tabs-secondary-selected-color)',
  '--crm-ui-kit-inline-tabs-slider-color':
    'var(--crm-ui-kit-palette-inline-tabs-secondary-slider-color)',
  '--crm-ui-kit-inline-tabs-menu-item-separator-color':
    'var(--crm-ui-kit-palette-border-primary)',
  '--crm-ui-kit-inline-tabs-menu-item-selected-color':
    'var(--crm-ui-kit-palette-inline-tabs-secondary-menu-selected-color)',
};
