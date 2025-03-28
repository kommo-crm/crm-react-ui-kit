import { FC } from 'react';

type CalloutKey =
  | '--crm-ui-kit-callout-background-color'
  | '--crm-ui-kit-callout-padding'
  | '--crm-ui-kit-callout-border-radius'
  | '--crm-ui-kit-callout-icon-color';

export type CalloutThemeType = {
  Icon: FC<React.SVGProps<SVGSVGElement>>;
} & {
  [K in CalloutKey]: string;
};

export const CalloutBaseValues: Omit<
  CalloutThemeType,
  'Icon' | '--crm-ui-kit-callout-background-color'
> = {
  '--crm-ui-kit-callout-padding': '12px',
  '--crm-ui-kit-callout-border-radius':
    'var(--crm-ui-kit-palette-focus-visible-border-radius)',
  '--crm-ui-kit-callout-icon-color': 'var(--crm-ui-kit-palette-text-primary);',
};
