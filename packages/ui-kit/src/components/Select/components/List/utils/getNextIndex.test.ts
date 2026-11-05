import { getNextIndex } from './getNextIndex';

describe('getNextIndex', () => {
  it('should move to the next and previous item', () => {
    expect(getNextIndex(1, 1, 5)).toBe(2);
    expect(getNextIndex(1, -1, 5)).toBe(0);
  });

  it('should wrap around the list', () => {
    expect(getNextIndex(4, 1, 5)).toBe(0);
    expect(getNextIndex(0, -1, 5)).toBe(4);
  });

  it('should start from the edges when nothing is hovered', () => {
    expect(getNextIndex(-1, 1, 5)).toBe(0);
    expect(getNextIndex(-1, -1, 5)).toBe(4);
  });

  it('should return -1 when the list is empty', () => {
    expect(getNextIndex(-1, 1, 0)).toBe(-1);
  });
});
