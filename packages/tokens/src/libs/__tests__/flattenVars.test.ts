import flattenVars from '@/libs/flattenVars';

describe('flattenVars', () => {
  it('flattens a nested object into dash-joined keys', () => {
    const input = { color: { light: { azure: { '50': '#fff' } } } };
    expect(flattenVars(input)).toEqual({ 'color-light-azure-50': '#fff' });
  });

  it('handles multiple keys at the same level', () => {
    const input = { color: { red: '#f00', blue: '#00f' } };
    expect(flattenVars(input)).toEqual({
      'color-red': '#f00',
      'color-blue': '#00f',
    });
  });

  it('handles the $ key as a shorthand for the parent path', () => {
    const input = { color: { $: '#000' } };
    expect(flattenVars(input)).toEqual({ color: '#000' });
  });

  it('returns $ as key when $ is at root level', () => {
    const input = { $: '#fff' };
    expect(flattenVars(input)).toEqual({ $: '#fff' });
  });

  it('returns an empty object for empty input', () => {
    expect(flattenVars({})).toEqual({});
  });
});
