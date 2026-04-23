/**
 * Recursively extracts all dot-notation paths to leaf values of an object type.
 *
 * @example
 * type Tokens = { color: { primary: string; secondary: string }; size: { sm: number } };
 * type Paths = ObjectLeaves<Tokens>; // "color.primary" | "color.secondary" | "size.sm"
 */
export type ObjectLeaves<T> = T extends object
  ? {
      [K in keyof T & (string | number)]: T[K] extends object
        ? `${K}.${ObjectLeaves<T[K]>}`
        : `${K}`;
    }[keyof T & (string | number)]
  : never;
