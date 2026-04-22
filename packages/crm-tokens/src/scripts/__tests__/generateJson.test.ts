jest.mock('@/design/primitives', () => ({
  __esModule: true,
  primitives: jest.requireActual<typeof import('./__fixtures__/tokens')>(
    './__fixtures__/tokens'
  ).mockPrimitives,
}));

import { generatePrimitivesJson } from '@/scripts/generateJson';

describe('generatePrimitivesJson', () => {
  const parsed = JSON.parse(generatePrimitivesJson());

  it('wraps each primitive value in a DTCG token', () => {
    expect(parsed.color.light.azure[50]).toEqual({
      $type: 'color',
      $value: '#f8fcfe',
    });
    expect(parsed.color.light.azure[500]).toEqual({
      $type: 'color',
      $value: '#76939f',
    });
    expect(parsed.color.dark.azure[50]).toEqual({
      $type: 'color',
      $value: '#0b2934',
    });
  });
});
