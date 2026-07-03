import { buildTree, isLeaf, toCamelCase, toKebabCase, toCssVar } from '../utils/tree';

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

    expect(tree).toMatchObject({
      color: { blue: { '500': { cssVar: '--crm-color-blue-500' } } },
    });
  });

  it('builds multiple tokens under same parent', () => {
    const tokens = [
      token(['color', 'blue', '50'], '#f6f8fc'),
      token(['color', 'blue', '500'], '#4c8bf7'),
    ];
    const tree = buildTree(tokens, '');

    expect(tree).toEqual({
      color: {
        blue: {
          '50': { value: '#f6f8fc', cssVar: '--color-blue-50' },
          '500': { value: '#4c8bf7', cssVar: '--color-blue-500' },
        },
      },
    });
  });

  it('uses $value over value when present', () => {
    const t = { ...token(['color', 'x'], '#aaa'), $value: '#bbb' };
    const tree = buildTree([t], '');

    expect(tree).toEqual({
      color: { x: { value: '#bbb', cssVar: '--color-x' } },
    });
  });
});

describe('toKebabCase', () => {
  it('leaves already-kebab/lowercase segments unchanged', () => {
    expect(toKebabCase('color')).toBe('color');
    expect(toKebabCase('light-blue')).toBe('light-blue');
  });

  it('inserts dashes between camelCase words', () => {
    expect(toKebabCase('lightBlue')).toBe('light-blue');
  });

  it('handles consecutive-uppercase acronyms', () => {
    expect(toKebabCase('XMLColor')).toBe('xml-color');
    expect(toKebabCase('myHTTPHeader')).toBe('my-http-header');
  });

  it('leaves numeric segments unchanged', () => {
    expect(toKebabCase('500')).toBe('500');
  });
});

describe('toCamelCase', () => {
  it('leaves already-camelCase/lowercase segments unchanged', () => {
    expect(toCamelCase('color')).toBe('color');
  });

  it('converts kebab-case to camelCase', () => {
    expect(toCamelCase('light-blue')).toBe('lightBlue');
    expect(toCamelCase('my-color-2x')).toBe('myColor2x');
  });

  it('prefixes with underscore when the result starts with a digit', () => {
    expect(toCamelCase('500')).toBe('_500');
    expect(toCamelCase('100-percent')).toBe('_100Percent');
  });
});

describe('toCssVar', () => {
  it('kebab-cases every path segment before joining, regardless of source casing', () => {
    expect(toCssVar(['color', 'lightBlue', '500'], '')).toBe(
      '--color-light-blue-500'
    );
  });

  it('applies prefix as-is (only path segments are kebab-cased)', () => {
    expect(toCssVar(['color', 'lightBlue', '500'], 'crm')).toBe(
      '--crm-color-light-blue-500'
    );
  });
});
