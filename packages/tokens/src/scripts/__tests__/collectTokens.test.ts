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

import { collectPrimitives, collectThemes } from '@/scripts/collectTokens';

describe('collectPrimitives', () => {
  const collection = collectPrimitives();

  it('flattens primitives into dash-separated keys', () => {
    expect(collection.flat).toMatchObject({
      'color-light-azure-50': '#f8fcfe',
      'color-light-azure-500': '#76939f',
      'color-dark-azure-50': '#0b2934',
    });
  });

  it('groups by color family (index 2)', () => {
    const names = collection.groups.map((g) => g.name);

    expect(names).toEqual(expect.arrayContaining(['azure', 'blue', 'neutral']));
  });

  it('each group only contains keys of its family', () => {
    for (const group of collection.groups) {
      for (const key of Object.keys(group.vars)) {
        expect(key.split('-')[2]).toBe(group.name);
      }
    }
  });
});

describe('collectThemes', () => {
  const themes = collectThemes();

  it('returns light and dark themes', () => {
    expect(themes.map((t) => t.themeId)).toEqual(['light', 'dark']);
  });

  it('light theme uses :root selector', () => {
    const light = themes.find((t) => t.themeId === 'light')!;

    expect(light.selector).toBe(':root');
  });

  it('dark theme joins conditions with newline', () => {
    const dark = themes.find((t) => t.themeId === 'dark')!;

    expect(dark.selector).toBe(":root[data-theme='dark']");
  });

  it('flattens semantic tokens correctly', () => {
    const light = themes.find((t) => t.themeId === 'light')!;

    expect(light.semantic.flat).toMatchObject({
      'background-default': 'color.light.neutral.100',
      'background-primary': 'color.light.neutral.50',
      'foreground-default': 'color.light.azure.500',
    });
  });

  it('preserves cross-theme primitive references as-is in flat map', () => {
    const light = themes.find((t) => t.themeId === 'light')!;
    const dark = themes.find((t) => t.themeId === 'dark')!;

    // light theme references a dark primitive
    expect(light.semantic.flat['foreground-inverted']).toBe(
      'color.dark.azure.50'
    );
    // dark theme references a light primitive
    expect(dark.semantic.flat['foreground-inverted']).toBe(
      'color.light.neutral.50'
    );
  });

  it('semantic groups are keyed by first token segment', () => {
    for (const theme of themes) {
      for (const group of theme.semantic.groups) {
        for (const key of Object.keys(group.vars)) {
          expect(key.split('-')[0]).toBe(group.name);
        }
      }
    }
  });
});
