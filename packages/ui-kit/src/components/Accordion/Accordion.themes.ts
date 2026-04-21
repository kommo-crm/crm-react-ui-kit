type KeyType<T extends string> = {
  [K in T]: string;
};

type AccordionThemeKey = '--crm-ui-kit-accordion-width';

export type AccordionThemeType = KeyType<AccordionThemeKey>;

export const AccordionTheme: AccordionThemeType = {
  '--crm-ui-kit-accordion-width': '100%',
};
