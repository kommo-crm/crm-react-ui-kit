jest.mock('@/design/primitives', () => ({
  __esModule: true,
  primitives: jest.requireActual<typeof import('./__fixtures__/tokens')>(
    './__fixtures__/tokens'
  ).mockPrimitives,
}));

import { collectPrimitives } from '@/scripts/collectTokens';
import { generatePrimitivesLess } from '@/scripts/generateLess';

const primitives = collectPrimitives();

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
