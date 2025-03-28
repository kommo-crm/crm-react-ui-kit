type TextAreaThemeKey =
  | '--crm-ui-kit-textarea-font-size'
  | '--crm-ui-kit-textarea-font-weight'
  | '--crm-ui-kit-textarea-line-height'
  | '--crm-ui-kit-textarea-border-color'
  | '--crm-ui-kit-textarea-border-width'
  | '--crm-ui-kit-textarea-border-style'
  | '--crm-ui-kit-textarea-border-radius'
  | '--crm-ui-kit-textarea-color'
  | '--crm-ui-kit-textarea-padding-top'
  | '--crm-ui-kit-textarea-padding-horizontal'
  | '--crm-ui-kit-textarea-padding-bottom'
  | '--crm-ui-kit-textarea-width'
  | '--crm-ui-kit-textarea-spacing'
  | '--crm-ui-kit-textarea-min-height'
  | '--crm-ui-kit-textarea-error-color'
  | '--crm-ui-kit-textarea-error-border-color'
  | '--crm-ui-kit-textarea-error-placeholder-color'
  | '--crm-ui-kit-textarea-disabled-color'
  | '--crm-ui-kit-textarea-disabled-background-color'
  | '--crm-ui-kit-textarea-disabled-border-color'
  | '--crm-ui-kit-textarea-disabled-opacity'
  | '--crm-ui-kit-textarea-placeholder-color'
  | '--crm-ui-kit-textarea-background-color'
  | '--crm-ui-kit-textarea-scrollbar-thumb-background'
  | '--crm-ui-kit-textarea-scrollbar-offset';

export type TextAreaTheme = {
  [K in TextAreaThemeKey]: string;
};

const TextAreaBaseValues: Omit<
  TextAreaTheme,
  '--crm-ui-kit-textarea-border-color'
> = {
  '--crm-ui-kit-textarea-disabled-border-color':
    'var(--crm-ui-kit-palette-border-primary)',
  '--crm-ui-kit-textarea-color': 'var(--crm-ui-kit-palette-text-primary)',
  '--crm-ui-kit-textarea-disabled-color':
    'var(--crm-ui-kit-palette-text-primary)',
  '--crm-ui-kit-textarea-placeholder-color':
    'var(--crm-ui-kit-palette-placeholder-primary)',
  '--crm-ui-kit-textarea-error-border-color':
    'var(--crm-ui-kit-palette-border-error)',
  '--crm-ui-kit-textarea-error-color': 'var(--crm-ui-kit-color-error)',
  '--crm-ui-kit-textarea-error-placeholder-color':
    'var(--crm-ui-kit-palette-placeholder-primary)',
  '--crm-ui-kit-textarea-background-color':
    'var(--crm-ui-kit-palette-background-primary)',
  '--crm-ui-kit-textarea-disabled-background-color': 'transparent',
  '--crm-ui-kit-textarea-disabled-opacity': '0.6',
  '--crm-ui-kit-textarea-font-weight': '400',
  '--crm-ui-kit-textarea-font-size': 'var(--crm-ui-kit-base-font-size)',
  '--crm-ui-kit-textarea-line-height': '19px',
  '--crm-ui-kit-textarea-padding-top': '8px',
  '--crm-ui-kit-textarea-padding-horizontal': '9px',
  '--crm-ui-kit-textarea-padding-bottom': '7px',
  '--crm-ui-kit-textarea-border-radius': '3px',
  '--crm-ui-kit-textarea-spacing': '4px',
  '--crm-ui-kit-textarea-width': '100%',
  '--crm-ui-kit-textarea-min-height': '56px',
  '--crm-ui-kit-textarea-border-width': '1px',
  '--crm-ui-kit-textarea-border-style': 'solid',
  '--crm-ui-kit-textarea-scrollbar-thumb-background':
    'var(--crm-ui-kit-palette-scrollbar-thumb-background)',
  '--crm-ui-kit-textarea-scrollbar-offset': '4px',
};

export const TextareaLightTheme: TextAreaTheme = {
  ...TextAreaBaseValues,
  '--crm-ui-kit-textarea-border-color':
    'var(--crm-ui-kit-palette-border-default)',
};

export const TextareaDarkTheme: TextAreaTheme = {
  ...TextAreaBaseValues,
  '--crm-ui-kit-textarea-border-color':
    'var(--crm-ui-kit-palette-border-primary)',
};
