import primitives from '@/design/primitives';
import semantic from '@/design/semantic';
import { resolveSemanticTokens } from '@/utils/resolveSemanticTokens';

export const tokens = {
  primitive: primitives,
  semantic: {
    light: resolveSemanticTokens(semantic.light, primitives),
    dark: resolveSemanticTokens(semantic.dark, primitives),
  },
};

export type Tokens = typeof tokens;
