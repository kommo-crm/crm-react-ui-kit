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
import {
  generatePrimitivesCss,
  generateThemesCss,
  minifyCss,
} from '@/scripts/generateCss';

const primitives = collectPrimitives();
const themes = collectThemes();

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

describe('generateThemesCss', () => {
  const result = generateThemesCss(themes);

  it('produces output for light and dark themes', () => {
    expect(Object.keys(result)).toEqual(['light', 'dark']);
  });

  it('light theme is scoped to :root', () => {
    expect(result.light).toMatch(/^:root\s*\{/);
  });

  it('dark theme uses the conditions selector', () => {
    expect(result.dark).toContain(":root[data-theme='dark']");
  });

  it('primitive path references become var(--color-...) references', () => {
    expect(result.light).toContain(
      '--background-default: var(--color-light-neutral-100);'
    );
    expect(result.light).toContain(
      '--button-background: var(--color-light-blue-600);'
    );
  });

  it('raw color values are kept as-is', () => {
    expect(result.light).toContain('--button-color: #ffffff;');
  });

  it('cross-theme references point to the correct primitive var', () => {
    // light theme uses dark primitive → var(--color-dark-azure-50)
    expect(result.light).toContain(
      '--foreground-inverted: var(--color-dark-azure-50);'
    );
    // dark theme uses light primitive → var(--color-light-neutral-50)
    expect(result.dark).toContain(
      '--foreground-inverted: var(--color-light-neutral-50);'
    );
  });

  it('contains semantic section', () => {
    for (const css of Object.values(result)) {
      expect(css).toContain('/* ── Semantic ── */');
    }
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
