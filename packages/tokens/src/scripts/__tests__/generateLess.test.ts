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
  generatePrimitivesLess,
  generateThemesLess,
} from '@/scripts/generateLess';

const primitives = collectPrimitives();
const themes = collectThemes();

describe('generatePrimitivesLess', () => {
  const less = generatePrimitivesLess(primitives);

  it('contains expected LESS variables with hex values', () => {
    expect(less).toContain('@color-light-azure-50: #f8fcfe;');
    expect(less).toContain('@color-light-azure-500: #76939f;');
    expect(less).toContain('@color-dark-azure-50: #0b2934;');
  });

  it('groups are separated by family comments', () => {
    expect(less).toContain('// azure');
    expect(less).toContain('// blue');
  });
});

describe('generateThemesLess', () => {
  const result = generateThemesLess(themes);

  it('produces output for light and dark themes', () => {
    expect(Object.keys(result)).toEqual(['light', 'dark']);
  });

  it('primitive path references become @color-... references', () => {
    expect(result.light).toContain(
      '@background-default: @color-light-neutral-100;'
    );
    expect(result.light).toContain(
      '@button-background: @color-light-blue-600;'
    );
  });

  it('raw color values are kept as-is', () => {
    expect(result.light).toContain('@button-color: #ffffff;');
  });

  it('contains semantic section', () => {
    for (const less of Object.values(result)) {
      expect(less).toContain('// ── Semantic ──');
    }
  });
});
