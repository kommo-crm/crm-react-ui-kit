import type { TransformedToken } from 'style-dictionary/types';

export interface TokenLeaf {
  value: string;
  cssVar: string;
}

export type TokenTree = { [key: string]: TokenTree | TokenLeaf };

export function toKebabCase(segment: string): string {
  return segment
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

export function toCamelCase(segment: string): string {
  const camel = segment.replace(/-([a-z0-9])/g, (_, c: string) =>
    c.toUpperCase()
  );

  return /^[0-9]/.test(camel) ? `_${camel}` : camel;
}

export function toCssVar(path: string[], prefix: string): string {
  const kebabPath = path.map(toKebabCase).join('-');

  return prefix ? `--${prefix}-${kebabPath}` : `--${kebabPath}`;
}

export function isLeaf(val: unknown): val is TokenLeaf {
  return (
    typeof val === 'object' && val !== null && 'value' in val && 'cssVar' in val
  );
}

export function buildTree(
  tokens: TransformedToken[],
  prefix: string
): TokenTree {
  const root: TokenTree = {};

  for (const token of tokens) {
    const parts = token.path;
    let node = root;

    for (let i = 0; i < parts.length - 1; i++) {
      const key = parts[i];

      if (isLeaf(node[key])) {
        throw new Error(
          `Token path collision: "${parts.slice(0, i + 1).join('.')}" is ` +
            'used as both a leaf token and a parent node'
        );
      }

      if (!node[key]) {
        node[key] = {};
      }

      node = node[key] as TokenTree;
    }

    const leaf = parts[parts.length - 1];

    node[leaf] = {
      value: String(token.$value ?? token.value),
      cssVar: toCssVar(parts, prefix),
    };
  }

  return root;
}
