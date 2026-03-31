import semanticTokens from './semantic';
import componentTokens from './component';
import { ThemeConfig } from '@/types/common';

const lightTheme: ThemeConfig = {
  id: 'light',
  semanticTokens,
  componentTokens,
};

export default lightTheme;
