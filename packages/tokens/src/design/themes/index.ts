import { SemanticLight, SemanticDark } from '@/design/semantics';
import { Theme, ThemeConfig, SemanticNode } from '@/types/common';

import dark from './dark';
import light from './light';

const themes: Record<Theme, ThemeConfig<SemanticNode>> = { light, dark };

export type { SemanticLight, SemanticDark };
export default themes;
