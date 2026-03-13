import primitives from '@/design/primitives';
import semantic from '@/design/semantics';

const darkTheme = {
  id: 'dark',
  primitives,
  semantic: semantic.dark,
} as const;

export default darkTheme;
