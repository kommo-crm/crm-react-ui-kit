import { FC } from 'react';

import InfoIcon from 'src/icons/info.svg';
import SuccessIcon from 'src/icons/success.svg';
import WarningIcon from 'src/icons/warning.svg';
import ErrorIcon from 'src/icons/error.svg';

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

const CalloutBaseValues: Omit<
  CalloutThemeType,
  'Icon' | '--crm-ui-kit-callout-background-color'
> = {
  '--crm-ui-kit-callout-padding': '12px',
  '--crm-ui-kit-callout-border-radius':
    'var(--crm-ui-kit-border-radius-default)',
  '--crm-ui-kit-callout-icon-color': 'var(--crm-ui-kit-palette-text-primary);',
};

export const CalloutInfoTheme: CalloutThemeType = {
  ...CalloutBaseValues,
  'Icon': InfoIcon,
  '--crm-ui-kit-callout-background-color':
    'var(--crm-ui-kit-palette-callout-info-background-color)',
};

export const CalloutSuccessTheme: CalloutThemeType = {
  ...CalloutBaseValues,
  'Icon': SuccessIcon,
  '--crm-ui-kit-callout-background-color':
    'var(--crm-ui-kit-palette-callout-success-background-color)',
};

export const CalloutWarningTheme: CalloutThemeType = {
  ...CalloutBaseValues,
  'Icon': WarningIcon,
  '--crm-ui-kit-callout-background-color':
    'var(--crm-ui-kit-palette-callout-warning-background-color)',
};

export const CalloutErrorTheme: CalloutThemeType = {
  ...CalloutBaseValues,
  'Icon': ErrorIcon,
  '--crm-ui-kit-callout-background-color':
    'var(--crm-ui-kit-palette-callout-error-background-color)',
};
