import primitives from '@/design/primitives';
import { dark as semantic } from '@/design/semantics';
import { ThemeConfig } from '@/types/common';

const darkTheme: ThemeConfig = {
  primitives,
  semantic,
  conditions: [
    ":root[data-crm-ui-kit-theme='alternative']",
    ":root[data-color-scheme='dark']",
  ],
};

export default darkTheme;
