import { generatePrimitivesTs, generateThemesTs } from '@/scripts/generateTs';

import { mockPrimitives } from './__fixtures__/tokens';

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

describe('generatePrimitivesTs', () => {
  const output = generatePrimitivesTs();

  it('starts with the auto-generated header comment', () => {
    expect(output).toMatch(/^\/\/ Auto-generated\. Do not edit manually\./);
  });

  it('exports color const with primitive data', () => {
    expect(output).toContain('export const color =');
    const match = output.match(/export const color = ([\s\S]+?) as const;/);

    expect(JSON.parse(match![1])).toEqual(mockPrimitives.color);
  });
});

describe('generateThemesTs', () => {
  const result = generateThemesTs();

  it('produces output for light and dark themes', () => {
    expect(Object.keys(result)).toEqual(['light', 'dark']);
  });

  it('each theme starts with the auto-generated header', () => {
    for (const output of Object.values(result)) {
      expect(output).toMatch(/^\/\/ Auto-generated\. Do not edit manually\./);
    }
  });

  it('resolves primitive paths to actual hex values in semantic tokens', () => {
    const match = result.light.match(
      /export const semantic = ([\s\S]+?) as const;/
    );
    const semantic = JSON.parse(match![1]);

    expect(semantic.background.default).toBe('#f5f5f5'); // color.light.neutral.100
    expect(semantic.foreground.default).toBe('#76939f'); // color.light.azure.500
  });

  it('resolves cross-theme primitive references to correct hex values', () => {
    const lightMatch = result.light.match(
      /export const semantic = ([\s\S]+?) as const;/
    );
    const lightSemantic = JSON.parse(lightMatch![1]);

    // light theme uses color.dark.azure.50
    expect(lightSemantic.foreground.inverted).toBe('#0b2934');

    const darkMatch = result.dark.match(
      /export const semantic = ([\s\S]+?) as const;/
    );
    const darkSemantic = JSON.parse(darkMatch![1]);

    // dark theme uses color.light.neutral.50
    expect(darkSemantic.foreground.inverted).toBe('#ffffff');
  });
});
