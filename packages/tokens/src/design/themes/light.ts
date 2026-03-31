import primitives from '@/design/primitives';
import { light as semantic } from '@/design/semantics';
import { light as components } from '@/design/components';
import { ThemeConfig } from '@/types/common';

const lightTheme: ThemeConfig = {
  primitiveTokens: primitives,
  semanticTokens: semantic,
  componentTokens: components,
};

export default lightTheme;
