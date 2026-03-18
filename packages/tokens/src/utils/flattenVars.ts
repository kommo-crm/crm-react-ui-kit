export default function flattenVars(
  obj: Record<string, unknown>,
  prefix = ''
): Record<string, string> {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      const name = prefix ? `${prefix}-${key}` : key;

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
