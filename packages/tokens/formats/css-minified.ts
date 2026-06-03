import type { Format } from 'style-dictionary/types';

export const cssMinifiedFormat: Format = {
  name: 'custom/css-minified',
  format: ({ dictionary, options }) => {
    const selector = (options?.selector as string) ?? ':root';
    const vars = dictionary.allTokens
      .map((t) => `--${t.name}:${String(t.$value ?? t.value)}`)
      .join(';');
    return `${selector}{${vars}}`;
  },
};
