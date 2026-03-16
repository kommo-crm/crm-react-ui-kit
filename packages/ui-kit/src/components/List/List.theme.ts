type ListThemeKey =
  | '--crm-ui-kit-list-top'
  | '--crm-ui-kit-list-max-height'
  | '--crm-ui-kit-list-width'
  | '--crm-ui-kit-list-border-radius'
  | '--crm-ui-kit-list-border-color'
  | '--crm-ui-kit-list-background-color'
  | '--crm-ui-kit-list-left'
  | '--crm-ui-kit-list-padding-right'
  | '--crm-ui-kit-list-margin-right'
  | '--crm-ui-kit-list-border-width'
  | '--crm-ui-kit-list-outline'
  | '--crm-ui-kit-list-z-index'
  | '--crm-ui-kit-list-border-style'
  | '--crm-ui-kit-list-color';

export type ListThemeType = {
  [K in ListThemeKey]: string;
};

export const ListTheme: ListThemeType = {
  '--crm-ui-kit-list-top': '0px',
  '--crm-ui-kit-list-max-height': '211px',
  '--crm-ui-kit-list-z-index': '30',
  '--crm-ui-kit-list-border-style': 'solid',
  '--crm-ui-kit-list-left': '-13px',
  '--crm-ui-kit-list-width': '100%',
  '--crm-ui-kit-list-padding-right': '11px',
  '--crm-ui-kit-list-margin-right': '-13px',
  '--crm-ui-kit-list-background-color':
    'var(--crm-ui-kit-palette-background-primary)',
  '--crm-ui-kit-list-border-width': '1px',
  '--crm-ui-kit-list-border-color': 'var(--crm-ui-kit-palette-border-primary)',
  '--crm-ui-kit-list-border-radius': 'var(--crm-ui-kit-border-radius-default)',
  '--crm-ui-kit-list-outline': 'none',
  '--crm-ui-kit-list-color': 'var(--crm-ui-kit-palette-text-primary)',
};
