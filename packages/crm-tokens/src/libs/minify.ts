/**
 * Minifies a CSS string by removing comments and collapsing whitespace.
 */
export function minify(string: string): string {
  return string
    .replace(/\/\*.*?\*\//gs, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*\{\s*/g, '{')
    .replace(/\s*\}\s*/g, '}')
    .replace(/\s*:\s*/g, ':')
    .replace(/\s*;\s*/g, ';')
    .replace(/\s*,\s*/g, ',')
    .trim();
}
