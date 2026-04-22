import { generatePrimitivesTs } from '@/scripts/generateTs';

import { mockPrimitives } from './__fixtures__/tokens';

jest.mock('@/design/primitives', () => ({
  __esModule: true,
  primitives: jest.requireActual<typeof import('./__fixtures__/tokens')>(
    './__fixtures__/tokens'
  ).mockPrimitives,
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
