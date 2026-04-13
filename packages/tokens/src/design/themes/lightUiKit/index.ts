import { defineUiKitTheme } from '@/define';
import semanticTokens from './semantic';
import componentTokens from './component';

export default defineUiKitTheme({
  id: 'light-ui-kit',
  prefix: 'crm-ui-kit',
  semanticTokens,
  componentTokens,
});
