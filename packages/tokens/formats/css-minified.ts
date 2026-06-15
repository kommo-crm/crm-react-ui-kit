import type { Format } from 'style-dictionary/types';

import { toCssVar } from '../utils/tree';

export const cssMinifiedFormat: Format = {
  name: 'custom/css-minified',
  format: ({ dictionary, options }) => {
    const selector = (options?.selector as string) ?? ':root';
    const prefix = (options?.prefix as string) ?? '';
    const vars = dictionary.allTokens
      .map((t) => `${toCssVar(t.path, prefix)}:${String(t.$value ?? t.value)}`)
      .join(';');
    return `${selector}{${vars}}`;
  },
};
