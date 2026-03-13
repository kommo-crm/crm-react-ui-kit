import primitives from '@/design/primitives';
import semantic, { SemanticDark } from '@/design/semantics';
import { ThemeConfig } from '@/types/common';

const darkTheme: ThemeConfig<SemanticDark> = {
  id: 'dark',
  primitives,
  semantic: semantic.dark,
};

export default darkTheme;
