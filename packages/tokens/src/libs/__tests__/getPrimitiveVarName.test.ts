import getPrimitiveVarName from '@/libs/getPrimitiveVarName';

describe('getPrimitiveVarName', () => {
  it('converts a dot-separated path to a dash-separated CSS variable name', () => {
    expect(getPrimitiveVarName('color.light.azure.50')).toBe('color-light-azure-50');
  });

  it('handles a single segment with no dots', () => {
    expect(getPrimitiveVarName('color')).toBe('color');
  });

  it('handles two segments', () => {
    expect(getPrimitiveVarName('color.red')).toBe('color-red');
  });
});
