import semanticTokens from './semantic';
import { ThemeConfig } from '@/types/common';
import componentTokens from './component';

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
