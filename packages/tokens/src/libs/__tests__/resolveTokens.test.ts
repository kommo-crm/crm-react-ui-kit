import { resolveTokens } from '@/libs/resolveTokens';

const primitives = {
  color: {
    light: {
      azure: { 50: '#f8fcfe' },
    },
  },
} as any;

describe('resolveTokens', () => {
  it('resolves a flat string primitive path to its value', () => {
    expect(resolveTokens('color.light.azure.50', primitives)).toBe('#f8fcfe');
  });

  it('passes through a raw CSS color unchanged', () => {
    expect(resolveTokens('#ff0000', primitives)).toBe('#ff0000');
  });

  it('recursively resolves a nested token object', () => {
    const tokens = {
      background: {
        default: 'color.light.azure.50',
      },
    };
    expect(resolveTokens(tokens, primitives)).toEqual({
      background: { default: '#f8fcfe' },
    });
  });

  it('handles mixed raw and path values in the same object', () => {
    const tokens = {
      a: 'color.light.azure.50',
      b: '#000000',
    };
    expect(resolveTokens(tokens, primitives)).toEqual({
      a: '#f8fcfe',
      b: '#000000',
    });
  });
});
