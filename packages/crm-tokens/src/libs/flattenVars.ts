type NestedTokenObj = { [key: string]: string | NestedTokenObj };

/**
 * Flattens a nested token object into a flat record of CSS variable name → value.
 * Keys are joined with `-`.
 * @example
 * { color: { light: { azure: { 50: '#fff' } } } } → { 'color-light-azure-50': '#fff' }
 */
export function flattenVars(
  obj: NestedTokenObj,
  prefix = ''
): Record<string, string> {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      const name = prefix ? `${prefix}-${key}` : key;

      if (typeof value === 'string') {
        acc[name] = value;
      } else {
        Object.assign(acc, flattenVars(value, name));
      }

      return acc;
    },
    {} as Record<string, string>
  );
}
