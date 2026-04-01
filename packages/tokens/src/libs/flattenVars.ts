/**
 * Recursively flattens a nested token object into a flat record of CSS variable name → value.
 * Keys are joined with `-`. A `$` key is treated as the value of its parent path.
 * @example { color: { light: { azure: { 50: '#fff' } } } } → { 'color-light-azure-50': '#fff' }
 */
export default function flattenVars(
  obj: Record<string, unknown>,
  prefix = ''
): Record<string, string> {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      const name = key === '$' ? (prefix || '$') : prefix ? `${prefix}-${key}` : key;

      if (typeof value === 'string') {
        acc[name] = value;
      } else {
        Object.assign(acc, flattenVars(value as Record<string, unknown>, name));
      }

      return acc;
    },
    {} as Record<string, string>
  );
}
