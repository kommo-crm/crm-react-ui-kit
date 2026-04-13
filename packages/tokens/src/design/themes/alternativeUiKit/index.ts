import { ThemeConfig } from '@/types/common';
import { semanticTokens } from './semantic';
import { componentTokens } from './component';

const alternativeUiKitTheme: ThemeConfig = {
  id: 'alternative-ui-kit',
  semanticTokens,
  componentTokens,
  conditions: [':root[data-crm-ui-kit-theme="alternative"]'],
  prefix: 'crm-ui-kit',
  isUiKitTheme: true,
};

export default alternativeUiKitTheme;
