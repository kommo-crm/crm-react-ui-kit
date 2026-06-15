import { deepMerge } from '../utils/deep-merge';

describe('deepMerge', () => {
  it('merges flat keys', () => {
    expect(deepMerge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
  });

  it('overwrites primitive with primitive', () => {
    expect(deepMerge({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
  });

  it('deep merges nested objects', () => {
    const result = deepMerge(
      { color: { blue: '#00f' } },
      { color: { red: '#f00' } },
    );
    expect(result).toEqual({ color: { blue: '#00f', red: '#f00' } });
  });

  it('overwrites nested primitive with new value', () => {
    const result = deepMerge(
      { color: { blue: '#00f' } },
      { color: { blue: '#4c8bf7' } },
    );
    expect(result).toEqual({ color: { blue: '#4c8bf7' } });
  });

  it('overwrites object with primitive', () => {
    const result = deepMerge(
      { color: { blue: { 500: '#4c8bf7' } } },
      { color: { blue: '#4c8bf7' } },
    );
    expect(result).toEqual({ color: { blue: '#4c8bf7' } });
  });

  it('overwrites primitive with object', () => {
    const result = deepMerge(
      { color: { blue: '#4c8bf7' } },
      { color: { blue: { 500: '#4c8bf7' } } },
    );
    expect(result).toEqual({ color: { blue: { 500: '#4c8bf7' } } });
  });

  it('does not merge arrays — overwrites them', () => {
    const result = deepMerge({ a: [1, 2] }, { a: [3] });
    expect(result).toEqual({ a: [3] });
  });

  it('mutates target', () => {
    const target = { a: 1 };
    const result = deepMerge(target, { b: 2 });
    expect(result).toBe(target);
  });

  it('handles empty source', () => {
    expect(deepMerge({ a: 1 }, {})).toEqual({ a: 1 });
  });

  it('handles empty target', () => {
    expect(deepMerge({}, { a: 1 })).toEqual({ a: 1 });
  });
});
