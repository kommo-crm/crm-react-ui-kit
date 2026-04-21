import ErrorIcon from '@/icons/error.svg';

import { CalloutBaseValues, CalloutThemeType } from './CalloutBase.theme';

export const CalloutErrorTheme: CalloutThemeType = {
  ...CalloutBaseValues,
  'Icon': ErrorIcon,
  '--crm-ui-kit-callout-background-color':
    'var(--crm-ui-kit-palette-callout-error-background-color)',
  '--crm-ui-kit-callout-icon-color': 'var(--crm-ui-kit-palette-text-error)',
  '--crm-ui-kit-callout-text-color':
    'var(--crm-ui-kit-palette-text-error, var(--_crm-ui-kit-palette-text-error))',
};
