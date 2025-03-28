import InfoIcon from 'src/icons/info.svg';

import { CalloutBaseValues, CalloutThemeType } from './CalloutBase.theme';

export const CalloutInfoTheme: CalloutThemeType = {
  ...CalloutBaseValues,
  'Icon': InfoIcon,
  '--crm-ui-kit-callout-background-color':
    'var(--crm-ui-kit-palette-callout-info-background-color)',
};
