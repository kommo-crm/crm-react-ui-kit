jest.mock('@/design/primitives', () => ({
  __esModule: true,
  default: require('./__fixtures__/tokens').mockPrimitives,
}));
jest.mock('@/design/themes', () => ({
  __esModule: true,
  default: require('./__fixtures__/tokens').mockThemes,
}));

import { collectPrimitives, collectThemes } from '@/scripts/collectTokens';
import {
  generatePrimitivesSass,
  generateThemesSass,
} from '@/scripts/generateSass';

const primitives = collectPrimitives();
const themes = collectThemes();

describe('generatePrimitivesSass', () => {
  const scss = generatePrimitivesSass(primitives);

  it('contains expected SCSS variables with hex values', () => {
    expect(scss).toContain('$color-light-azure-50: #f8fcfe;');
    expect(scss).toContain('$color-light-azure-500: #76939f;');
    expect(scss).toContain('$color-dark-azure-50: #0b2934;');
  });

  it('groups are separated by family comments', () => {
    expect(scss).toContain('// azure');
    expect(scss).toContain('// blue');
  });
});

describe('generateThemesSass', () => {
  const result = generateThemesSass(themes);

  it('produces output for light and dark themes', () => {
    expect(Object.keys(result)).toEqual(['light', 'dark']);
  });

  it('primitive path references become $color-... references', () => {
    expect(result.light).toContain(
      '$background-default: $color-light-neutral-100;'
    );
    expect(result.light).toContain(
      '$button-background: $color-light-blue-600;'
    );
  });

  it('raw color values are kept as-is', () => {
    expect(result.light).toContain('$button-color: #ffffff;');
  });

  it('contains semantic section', () => {
    for (const scss of Object.values(result)) {
      expect(scss).toContain('// ── Semantic ──');
    }
  });
});
