jest.mock('@/design/primitives', () => ({
  __esModule: true,
  primitives: jest.requireActual<typeof import('./__fixtures__/tokens')>(
    './__fixtures__/tokens'
  ).mockPrimitives,
}));
jest.mock('@/design/themes', () => ({
  __esModule: true,
  themes: jest.requireActual<typeof import('./__fixtures__/tokens')>(
    './__fixtures__/tokens'
  ).mockThemes,
}));

import {
  generatePrimitivesJson,
  generateThemesJson,
} from '@/scripts/generateJson';

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

describe('generateThemesJson', () => {
  const result = generateThemesJson();
  const light = JSON.parse(result.light);
  const dark = JSON.parse(result.dark);

  it('produces output for light and dark themes', () => {
    expect(Object.keys(result)).toEqual(['light', 'dark']);
  });

  it('each theme has semantic section', () => {
    expect(light).toHaveProperty('semantic');
    expect(dark).toHaveProperty('semantic');
  });

  it('primitive path references are wrapped in {curly braces}', () => {
    expect(light.semantic.background.default).toEqual({
      $type: 'color',
      $value: '{color.light.neutral.100}',
    });
  });
});
