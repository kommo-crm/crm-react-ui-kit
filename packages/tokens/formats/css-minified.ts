import type { Format } from 'style-dictionary/types';

import { toCssVar } from '../utils/tree';

export const cssMinifiedFormat: Format = {
  name: 'custom/css-minified',
  format: ({ dictionary, options }) => {
    const selector: string = options?.selector ?? ':root';
    const prefix: string = options?.prefix ?? '';
    const vars = dictionary.allTokens
      .map((t) => `${toCssVar(t.path, prefix)}:${String(t.$value ?? t.value)}`)
      .join(';');
    return `${selector}{${vars}}`;
  },
};
