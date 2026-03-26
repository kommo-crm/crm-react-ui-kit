import primitives from '@/design/primitives';
import semantic, { SemanticLight } from '@/design/semantics';
import { ThemeConfig } from '@/types/common';

const lightTheme: ThemeConfig<SemanticLight> = {
  primitives,
  semantic: semantic.light,
};

export default lightTheme;
