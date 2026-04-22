jest.mock('@/design/primitives', () => ({
  __esModule: true,
  primitives: jest.requireActual<typeof import('./__fixtures__/tokens')>(
    './__fixtures__/tokens'
  ).mockPrimitives,
}));

import { collectPrimitives } from '@/scripts/collectTokens';
import { generatePrimitivesCss, minifyCss } from '@/scripts/generateCss';

const primitives = collectPrimitives();

describe('generatePrimitivesCss', () => {
  const css = generatePrimitivesCss(primitives);

  it('wraps output in :root {}', () => {
    expect(css).toMatch(/^:root \{[\s\S]+\}$/);
  });

  it('contains expected CSS variables with hex values', () => {
    expect(css).toContain('--color-light-azure-50: #f8fcfe;');
    expect(css).toContain('--color-light-azure-500: #76939f;');
    expect(css).toContain('--color-dark-azure-50: #0b2934;');
  });

  it('groups are separated by family comments', () => {
    expect(css).toContain('/* azure */');
    expect(css).toContain('/* blue */');
    expect(css).toContain('/* neutral */');
  });
});

describe('minifyCss', () => {
  it('removes newlines and extra whitespace from generated CSS', () => {
    const minified = minifyCss(generatePrimitivesCss(primitives));

    expect(minified).not.toContain('\n');
    expect(minified).not.toMatch(/\s{2,}/);
  });

  it('minified output is shorter than original', () => {
    const original = generatePrimitivesCss(primitives);

    expect(minifyCss(original).length).toBeLessThan(original.length);
  });
});
