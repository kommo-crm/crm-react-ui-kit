import { resolveTokenValue } from '@/libs/resolveToken';

const primitives = {
  color: {
    light: {
      azure: { 50: '#f8fcfe', 500: '#76939f' },
      blue: { 50: '#f6f8fc' },
    },
  },
} as any;

describe('resolveTokenValue', () => {
  it('returns a raw CSS color as-is', () => {
    expect(resolveTokenValue(primitives, '#ff0000')).toBe('#ff0000');
  });

  it('resolves a dot-separated primitive path', () => {
    expect(resolveTokenValue(primitives, 'color.light.azure.50')).toBe('#f8fcfe');
  });

  it('resolves a deeper primitive path', () => {
    expect(resolveTokenValue(primitives, 'color.light.azure.500')).toBe('#76939f');
  });
});
