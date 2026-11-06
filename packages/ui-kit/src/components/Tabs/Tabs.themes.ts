type KeyType<T extends string> = {
  [K in T]: string;
};

type TabsThemeKey =
  | '--crm-ui-kit-tabs-list-spacing'
  | '--crm-ui-kit-tabs-list-border-width'
  | '--crm-ui-kit-tabs-list-border-color'
  | '--crm-ui-kit-tabs-trigger-padding'
  | '--crm-ui-kit-tabs-trigger-elements-spacing'
  | '--crm-ui-kit-tabs-trigger-font-size'
  | '--crm-ui-kit-tabs-trigger-line-height'
  | '--crm-ui-kit-tabs-trigger-color'
  | '--crm-ui-kit-tabs-trigger-active-color'
  | '--crm-ui-kit-tabs-trigger-indicator-height'
  | '--crm-ui-kit-tabs-trigger-indicator-color';

export type TabsThemeType = KeyType<TabsThemeKey>;

export const TabsPrimaryTheme: TabsThemeType = {
  '--crm-ui-kit-tabs-list-spacing': '32px',
  '--crm-ui-kit-tabs-list-border-width': '1px',
  '--crm-ui-kit-tabs-list-border-color':
    'var(--crm-ui-kit-palette-border-active)',
  '--crm-ui-kit-tabs-trigger-padding': '2px 5px 7px',
  '--crm-ui-kit-tabs-trigger-elements-spacing': '6px',
  '--crm-ui-kit-tabs-trigger-font-size': '15px',
  '--crm-ui-kit-tabs-trigger-line-height': '20px',
  '--crm-ui-kit-tabs-trigger-color':
    'var(--crm-ui-kit-palette-text-secondary-light)',
  '--crm-ui-kit-tabs-trigger-active-color':
    'var(--crm-ui-kit-palette-text-primary)',
  '--crm-ui-kit-tabs-trigger-indicator-height': '3px',
  '--crm-ui-kit-tabs-trigger-indicator-color':
    'var(--crm-ui-kit-palette-border-active)',
};
