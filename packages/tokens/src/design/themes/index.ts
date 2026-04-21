import { ThemeConfig } from '@/types/common';

import { lightUiKitTheme } from './lightUiKit';
import { alternativeUiKitTheme } from './alternativeUiKit';
import { lightTheme } from './light';
import { darkTheme } from './dark';

export const themes: ThemeConfig[] = [
  lightUiKitTheme,
  alternativeUiKitTheme,
  lightTheme,
  darkTheme,
];
