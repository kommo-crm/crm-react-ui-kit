import { Theme, ThemeConfig } from '@/types/common';

import dark from './dark';
import light from './light';

const themes: Record<Theme, ThemeConfig> = { light, dark };

export default themes;
