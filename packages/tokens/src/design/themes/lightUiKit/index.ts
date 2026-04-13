import { ThemeConfig } from '@/types/common';
import { semanticTokens } from './semantic';
import { componentTokens } from './component';

const lightUiKitTheme: ThemeConfig = {
  id: 'light-ui-kit',
  semanticTokens,
  componentTokens,
  prefix: 'crm-ui-kit',
  isUiKitTheme: true,
};

export default lightUiKitTheme;
