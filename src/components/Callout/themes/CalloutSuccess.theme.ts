import SuccessIcon from 'src/icons/success.svg';

import { CalloutBaseValues, CalloutThemeType } from './CalloutBase.theme';

export const CalloutSuccessTheme: CalloutThemeType = {
  ...CalloutBaseValues,
  'Icon': SuccessIcon,
  '--crm-ui-kit-callout-background-color':
    'var(--crm-ui-kit-palette-callout-success-background-color)',
};
