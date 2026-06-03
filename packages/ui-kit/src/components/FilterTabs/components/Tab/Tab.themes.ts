type TabThemeKey =
  | '--crm-ui-kit-filter-tabs-tab-z-index'
  | '--crm-ui-kit-filter-tabs-tab-background-color'
  | '--crm-ui-kit-filter-tabs-tab-border-width'
  | '--crm-ui-kit-filter-tabs-tab-border-radius'
  | '--crm-ui-kit-filter-tabs-tab-border-style'
  | '--crm-ui-kit-filter-tabs-tab-action-color'
  | '--crm-ui-kit-filter-tabs-tab-focus-visible-outline-color'
  | '--crm-ui-kit-filter-tabs-tab-focus-visible-outline-width'
  | '--crm-ui-kit-filter-tabs-tab-focus-visible-outline-style'
  | '--crm-ui-kit-filter-tabs-tab-focus-visible-outline-offset'
  | '--crm-ui-kit-filter-tabs-tab-text-color'
  | '--crm-ui-kit-filter-tabs-tab-hover-background-color';

export type TabThemeType = {
  [K in TabThemeKey]: string;
};

export const TabPrimaryTheme: TabThemeType = {
  '--crm-ui-kit-filter-tabs-tab-z-index': '3',
  '--crm-ui-kit-filter-tabs-tab-action-color':
    'var(--crm-ui-kit-color-blueberry)',

  '--crm-ui-kit-filter-tabs-tab-border-width': '1px',
  '--crm-ui-kit-filter-tabs-tab-border-radius':
    'var(--crm-ui-kit-border-radius-default)',
  '--crm-ui-kit-filter-tabs-tab-border-style': 'solid',

  '--crm-ui-kit-filter-tabs-tab-focus-visible-outline-color':
    'var(--crm-ui-kit-color-cobalt-blue)',
  '--crm-ui-kit-filter-tabs-tab-focus-visible-outline-width':
    'var(--crm-ui-kit-palette-focus-visible-outline-width)',
  '--crm-ui-kit-filter-tabs-tab-focus-visible-outline-style':
    'var(--crm-ui-kit-palette-focus-visible-outline-style)',
  '--crm-ui-kit-filter-tabs-tab-focus-visible-outline-offset':
    'var(--crm-ui-kit-palette-focus-visible-outline-offset)',
  '--crm-ui-kit-filter-tabs-tab-background-color':
    'var(--crm-ui-kit-palette-surface-background-color)',
  '--crm-ui-kit-filter-tabs-tab-text-color':
    'var(--crm-ui-kit-palette-surface-text-color)',
  '--crm-ui-kit-filter-tabs-tab-hover-background-color':
    'var(--crm-ui-kit-palette-surface-hover-background-color)',
};
