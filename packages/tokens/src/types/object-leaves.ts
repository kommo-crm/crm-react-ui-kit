export type ObjectLeaves<T> = T extends object
  ? {
      [K in keyof T & (string | number)]: T[K] extends object
        ? `${K}.${ObjectLeaves<T[K]>}`
        : `${K}`;
    }[keyof T & (string | number)]
  : never;
