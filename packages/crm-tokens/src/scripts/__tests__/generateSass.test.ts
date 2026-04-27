import { collectPrimitives } from '@/scripts/collectTokens';
import { generatePrimitivesSass } from '@/scripts/generateSass';

const primitives = collectPrimitives();

describe('generatePrimitivesSass', () => {
  const scss = generatePrimitivesSass(primitives);

  it('starts with the auto-generated header comment', () => {
    expect(scss).toMatch(/^\/\/ Auto-generated\. Do not edit manually\./);
  });

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
