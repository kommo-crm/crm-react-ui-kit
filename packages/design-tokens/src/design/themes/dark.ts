import primitives from '@/design/primitives';
import semantic from '@/design/semantics';

const darkTheme = {
  theme: 'dark',
  primitives,
  semantic: semantic.dark,
} as const;

export default darkTheme;
