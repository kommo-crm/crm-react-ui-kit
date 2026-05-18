type DropdownListThemeKey =
  | '--crm-ui-kit-dropdown-list-top'
  | '--crm-ui-kit-dropdown-list-max-height'
  | '--crm-ui-kit-dropdown-list-width'
  | '--crm-ui-kit-dropdown-list-border-radius'
  | '--crm-ui-kit-dropdown-list-border-color'
  | '--crm-ui-kit-dropdown-list-background-color'
  | '--crm-ui-kit-dropdown-list-left'
  | '--crm-ui-kit-dropdown-list-padding-right'
  | '--crm-ui-kit-dropdown-list-margin-right'
  | '--crm-ui-kit-dropdown-list-border-width'
  | '--crm-ui-kit-dropdown-list-outline'
  | '--crm-ui-kit-dropdown-list-z-index'
  | '--crm-ui-kit-dropdown-list-border-style'
  | '--crm-ui-kit-dropdown-list-color';

export type DropdownListThemeType = {
  [K in DropdownListThemeKey]: string;
};

export const DropdownListTheme: DropdownListThemeType = {
  '--crm-ui-kit-dropdown-list-top': '0px',
  '--crm-ui-kit-dropdown-list-max-height': '211px',
  '--crm-ui-kit-dropdown-list-z-index': '30',
  '--crm-ui-kit-dropdown-list-border-style': 'solid',
  '--crm-ui-kit-dropdown-list-left': '-13px',
  '--crm-ui-kit-dropdown-list-width': '100%',
  '--crm-ui-kit-dropdown-list-padding-right': '11px',
  '--crm-ui-kit-dropdown-list-margin-right': '-13px',
  '--crm-ui-kit-dropdown-list-background-color':
    'var(--crm-ui-kit-palette-background-primary)',
  '--crm-ui-kit-dropdown-list-border-width': '1px',
  '--crm-ui-kit-dropdown-list-border-color':
    'var(--crm-ui-kit-palette-border-primary)',
  '--crm-ui-kit-dropdown-list-border-radius':
    'var(--crm-ui-kit-border-radius-default)',
  '--crm-ui-kit-dropdown-list-outline': 'none',
  '--crm-ui-kit-dropdown-list-color': 'var(--crm-ui-kit-palette-text-primary)',
};
