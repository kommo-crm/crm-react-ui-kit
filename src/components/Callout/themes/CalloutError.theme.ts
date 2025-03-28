import ErrorIcon from 'src/icons/error.svg';

import { CalloutBaseValues, CalloutThemeType } from './CalloutBase.theme';

export const CalloutErrorTheme: CalloutThemeType = {
  ...CalloutBaseValues,
  'Icon': ErrorIcon,
  '--crm-ui-kit-callout-background-color':
    'var(--crm-ui-kit-palette-callout-error-background-color)',
};
