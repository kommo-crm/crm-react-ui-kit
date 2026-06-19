import type { TransformedToken } from 'style-dictionary/types';

export interface TokenLeaf {
  value: string;
  cssVar: string;
}

export type TokenTree = { [key: string]: TokenTree | TokenLeaf };

export function toCssVar(path: string[], prefix: string): string {
  return prefix ? `--${prefix}-${path.join('-')}` : `--${path.join('-')}`;
}

export function buildTree(tokens: TransformedToken[], prefix: string): TokenTree {
  const root: TokenTree = {};
  for (const token of tokens) {
    const parts = token.path;
    let node = root;
    for (let i = 0; i < parts.length - 1; i++) {
      const key = parts[i];
      if (!node[key] || isLeaf(node[key])) {
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

export function isLeaf(val: unknown): val is TokenLeaf {
  return typeof val === 'object' && val !== null && 'value' in val && 'cssVar' in val;
}
