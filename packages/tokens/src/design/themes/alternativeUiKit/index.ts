import { defineUiKitTheme } from '@/define';
import semanticTokens from './semantic';
import componentTokens from './component';

export default defineUiKitTheme({
  id: 'alternative-ui-kit',
  prefix: 'crm-ui-kit',
  conditions: [':root[data-crm-ui-kit-theme="alternative"]'],
  semanticTokens,
  componentTokens,
});
