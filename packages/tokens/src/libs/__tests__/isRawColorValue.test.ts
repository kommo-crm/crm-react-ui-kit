import { isRawColorValue } from '@/libs/isRawColorValue';

describe('isRawColorValue', () => {
  describe('returns true for raw CSS colors', () => {
    it.each([
      '#fff',
      '#ffffff',
      '#ffffffff',
      '#1a2b',
      'rgb(0, 0, 0)',
      'rgba(0, 0, 0, 0.5)',
      'rgb(0 0 0)',
      'rgb(0 0 0 / 0.5)',
      'hsl(0, 100%, 50%)',
      'hsla(0, 100%, 50%, 0.5)',
      'hsl(0deg 100% 50%)',
      'color(display-p3 1 0 0)',
      'oklch(0.5 0.2 30)',
      'transparent',
      'currentColor',
      'inherit',
      'initial',
      'unset',
      'revert',
    ])('%s', (value) => {
      expect(isRawColorValue(value)).toBe(true);
    });
  });

  describe('returns false for primitive token paths', () => {
    it.each([
      'color.light.azure.50',
      'color.dark.neutral.100',
    ])('%s', (value) => {
      expect(isRawColorValue(value)).toBe(false);
    });
  });

  describe('returns false for non-string values', () => {
    it.each([null, undefined, 42, {}, []])('%s', (value) => {
      expect(isRawColorValue(value)).toBe(false);
    });
  });
});
