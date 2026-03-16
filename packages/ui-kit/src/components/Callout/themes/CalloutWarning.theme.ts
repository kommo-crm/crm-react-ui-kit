import WarningIcon from 'src/icons/warning.svg';

import { CalloutBaseValues, CalloutThemeType } from './CalloutBase.theme';

export const CalloutWarningTheme: CalloutThemeType = {
  ...CalloutBaseValues,
  'Icon': WarningIcon,
  '--crm-ui-kit-callout-background-color':
    'var(--crm-ui-kit-palette-callout-warning-background-color)',
};
