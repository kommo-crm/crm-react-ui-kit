/**
 * Converts a dot-separated primitive path to a CSS variable name.
 * @example 'color.light.neutral.100' → 'color-light-neutral-100'
 */
export const getPrimitiveVarName = (path: string): string =>
  path.split('.').join('-');
