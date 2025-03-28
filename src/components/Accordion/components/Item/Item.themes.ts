type KeyType<T extends string> = {
  [K in T]: string;
};

type ItemThemeKey =
  | '--crm-ui-kit-accordion-item-border-radius'
  | '--crm-ui-kit-accordion-item-border-color'
  | '--crm-ui-kit-accordion-item-box-shadow'
  | '--crm-ui-kit-accordion-item-background-color'
  | '--crm-ui-kit-accordion-item-padding'
  | '--crm-ui-kit-accordion-item-margin-bottom'
  | '--crm-ui-kit-accordion-item-chevron-icon-color';

export type AccordionItemThemeType = KeyType<ItemThemeKey>;

export const AccordionItemTheme: AccordionItemThemeType = {
  '--crm-ui-kit-accordion-item-border-radius':
    'var(--crm-ui-kit-palette-focus-visible-border-radius)',
  '--crm-ui-kit-accordion-item-box-shadow':
    'var(--crm-ui-kit-palette-accordion-item-box-shadow)',
  '--crm-ui-kit-accordion-item-background-color':
    'var(--crm-ui-kit-palette-background-primary)',
  '--crm-ui-kit-accordion-item-padding': '12px 12px 12px 22px',
  '--crm-ui-kit-accordion-item-margin-bottom': '16px',
  '--crm-ui-kit-accordion-item-chevron-icon-color':
    'var(--crm-ui-kit-palette-text-primary)',
  '--crm-ui-kit-accordion-item-border-color':
    'var(--crm-ui-kit-palette-border-primary)',
};
