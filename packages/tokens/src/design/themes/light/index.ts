import { ThemeConfig } from '@/types/common';
import { semanticTokens } from './semantic';
import { componentTokens } from './component';

const lightTheme: ThemeConfig = {
  id: 'light',
  semanticTokens,
  componentTokens,
};

export default lightTheme;
