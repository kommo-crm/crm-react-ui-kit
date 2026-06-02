import type { TransformedToken } from 'style-dictionary/types';

const COLOR_GROUP_ORDER = [
  'azure',
  'blue',
  'green',
  'orange',
  'red',
  'pink',
  'purple',
  'neutral',
];

function colorGroupRank(token: TransformedToken): number {
  if (token.path[0] !== 'color') return -1;
  // color.light.{group} / color.dark.{group} → path[2]
  // color.{group} → path[1]
  const group = token.path.length >= 3 ? token.path[2] : token.path[1];
  return COLOR_GROUP_ORDER.indexOf(group);
}

/** Sorts tokens so color groups follow the canonical order. Non-color tokens are untouched. */
export function sortTokens(tokens: TransformedToken[]): TransformedToken[] {
  return [...tokens].sort((a, b) => {
    if (a.path[0] !== 'color' || b.path[0] !== 'color') return 0;
    // Only reorder within the same theme bucket (light/dark)
    if (a.path[1] !== b.path[1]) return 0;
    const ra = colorGroupRank(a);
    const rb = colorGroupRank(b);
    if (ra === -1 || rb === -1) return 0;
    return ra - rb;
  });
}
