import primitives from '@/design/primitives';
import { dark as semantic } from '@/design/semantics';
import { ThemeConfig } from '@/types/common';
import { dark as components } from '@/design/components';

const darkTheme: ThemeConfig = {
  primitiveTokens: primitives,
  semanticTokens: semantic,
  componentTokens: components,
  conditions: [
    ":root[data-crm-ui-kit-theme='alternative']",
    ":root[data-color-scheme='dark']",
  ],
};

export default darkTheme;
