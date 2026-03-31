import semanticTokens from './semantic';
import componentTokens from './component';
import { ThemeConfig } from '@/types/common';

const darkTheme: ThemeConfig = {
  id: 'dark',
  semanticTokens,
  componentTokens,
  conditions: [
    ":root[data-crm-ui-kit-theme='alternative']",
    ":root[data-color-scheme='dark']",
  ],
};

export default darkTheme;
