import { TokenPath } from '@/types/common';

import { resolveTokenValue } from '@/libs/resolveTokenValue';

const primitives = {
  color: {
    light: {
      azure: { 50: '#f8fcfe', 500: '#76939f' },
      blue: { 50: '#f6f8fc' },
    },
  },
};

describe('resolveTokenValue', () => {
  it('returns a raw CSS color as-is', () => {
    expect(resolveTokenValue(primitives, '#ff0000')).toBe('#ff0000');
  });

  it('resolves a dot-separated primitive path', () => {
    expect(resolveTokenValue(primitives, 'color.light.azure.50')).toBe(
      '#f8fcfe'
    );
  });

  it('resolves a deeper primitive path', () => {
    expect(resolveTokenValue(primitives, 'color.light.azure.500')).toBe(
      '#76939f'
    );
  });

  it('throws a descriptive error when a key does not exist', () => {
    expect(() =>
      resolveTokenValue(primitives, 'color.light.azur.50' as TokenPath)
    ).toThrow(
      'Token not found: "color.light" → "azur" does not exist in path "color.light.azur.50"'
    );
  });

  it('throws a descriptive error when the root key does not exist', () => {
    expect(() =>
      resolveTokenValue(primitives, 'palette.red.50' as TokenPath)
    ).toThrow(
      'Token not found: "palette" does not exist in path "palette.red.50"'
    );
  });
});
