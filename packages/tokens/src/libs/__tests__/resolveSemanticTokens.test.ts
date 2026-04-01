import { resolveSemanticTokens } from '@/libs/resolveSemanticTokens';

const primitives = {
  color: {
    light: {
      azure: { 50: '#f8fcfe' },
    },
  },
} as any;

describe('resolveSemanticTokens', () => {
  it('resolves a flat string primitive path to its value', () => {
    expect(resolveSemanticTokens('color.light.azure.50', primitives)).toBe('#f8fcfe');
  });

  it('passes through a raw CSS color unchanged', () => {
    expect(resolveSemanticTokens('#ff0000', primitives)).toBe('#ff0000');
  });

  it('recursively resolves a nested token object', () => {
    const tokens = {
      background: {
        default: 'color.light.azure.50',
      },
    };
    expect(resolveSemanticTokens(tokens, primitives)).toEqual({
      background: { default: '#f8fcfe' },
    });
  });

  it('handles mixed raw and path values in the same object', () => {
    const tokens = {
      a: 'color.light.azure.50',
      b: '#000000',
    };
    expect(resolveSemanticTokens(tokens, primitives)).toEqual({
      a: '#f8fcfe',
      b: '#000000',
    });
  });
});
