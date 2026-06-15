import { buildTree, isLeaf } from '../utils/tree';

const token = (path: string[], value: string) => ({
  path,
  value,
  $value: undefined,
  name: path.join('-'),
  filePath: '',
  isSource: true,
  original: { value },
  type: 'color' as const,
  attributes: {},
});

describe('isLeaf', () => {
  it('returns true for leaf node', () => {
    expect(isLeaf({ value: '#fff', cssVar: '--color' })).toBe(true);
  });

  it('returns false for tree node', () => {
    expect(isLeaf({ blue: { value: '#fff', cssVar: '--color' } })).toBe(false);
  });

  it('returns false for null', () => {
    expect(isLeaf(null)).toBe(false);
  });
});

describe('buildTree', () => {
  it('builds nested tree from token paths', () => {
    const tokens = [token(['color', 'light', 'blue', '500'], '#4c8bf7')];
    const tree = buildTree(tokens, '');

    expect(tree).toEqual({
      color: {
        light: {
          blue: {
            '500': { value: '#4c8bf7', cssVar: '--color-light-blue-500' },
          },
        },
      },
    });
  });

  it('applies prefix to cssVar', () => {
    const tokens = [token(['color', 'blue', '500'], '#4c8bf7')];
    const tree = buildTree(tokens, 'crm');

    const leaf = (tree.color as any).blue['500'];
    expect(leaf.cssVar).toBe('--crm-color-blue-500');
  });

  it('builds multiple tokens under same parent', () => {
    const tokens = [
      token(['color', 'blue', '50'], '#f6f8fc'),
      token(['color', 'blue', '500'], '#4c8bf7'),
    ];
    const tree = buildTree(tokens, '');
    const blue = (tree.color as any).blue;

    expect(Object.keys(blue)).toEqual(['50', '500']);
  });

  it('uses $value over value when present', () => {
    const t = { ...token(['color', 'x'], '#aaa'), $value: '#bbb' };
    const tree = buildTree([t], '');

    expect((tree.color as any).x.value).toBe('#bbb');
  });
});
