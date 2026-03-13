import primitives from '@/primitives';
import semantic from '@/semantic';

const darkTheme = {
  theme: 'dark',
  primitives,
  semantic: semantic.dark,
} as const;

export default darkTheme;
