/**
 * Recursively converts a runtime value into its TypeScript type string.
 * @example { azure: { 50: '#fff' } } → "{\n  azure: {\n    '50': ColorValue;\n  };\n}"
 */
export function buildTypeString(
  value: unknown,
  indent = 0,
  stringType = 'string'
): string {
  if (typeof value === 'string') {
    return stringType;
  }

  if (typeof value === 'number') {
    return 'number';
  }

  if (typeof value === 'boolean') {
    return 'boolean';
  }

  const pad = '  '.repeat(indent);

  const innerPad = '  '.repeat(indent + 1);

  const lines = Object.entries(value as Record<string, unknown>).map(
    ([key, val]) => {
      const needsQuotes =
        /[^a-zA-Z_$][^a-zA-Z0-9_$]*/.test(key) || /^\d/.test(key);

      const keyStr = needsQuotes ? `'${key}'` : key;

      return `${innerPad}${keyStr}: ${buildTypeString(val, indent + 1, stringType)};`;
    }
  );

  return `{\n${lines.join('\n')}\n${pad}}`;
}
