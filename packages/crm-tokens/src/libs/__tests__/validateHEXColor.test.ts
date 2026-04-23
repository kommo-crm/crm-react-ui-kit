import { isHexColor } from '@/libs/isHexColor';

describe('isHexColor', () => {
  describe('returns true for valid hex colors', () => {
    it.each(['#fff', '#FFF', '#ffffff', '#FFFFFF', '#1a2b3c'])(
      '%s',
      (color) => {
        expect(isHexColor(color)).toBe(true);
      }
    );
  });

  describe('returns false for invalid hex colors', () => {
    it.each([
      'fff',
      '#ffff',
      '#fffff',
      '#fffffff',
      '#gggggg',
      '',
      '#',
      'red',
      '#1a2b3c4d',
    ])('%s', (color) => {
      expect(isHexColor(color)).toBe(false);
    });
  });
});
