import { collectPrimitives } from '@/scripts/collectTokens';

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
