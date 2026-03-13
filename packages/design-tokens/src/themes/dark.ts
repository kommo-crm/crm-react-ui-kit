import primitives from '@/primitives';
import darkSemanticTokens from '@/semantic/dark';

const darkTheme = {
  theme: 'dark',
  primitives,
  semantic: darkSemanticTokens,
} as const;

export default darkTheme;
