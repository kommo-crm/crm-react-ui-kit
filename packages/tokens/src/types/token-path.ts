export type Leaves<T> = T extends object
  ? {
      [K in keyof T & (string | number)]: T[K] extends object
        ? `${K}.${Leaves<T[K]>}`
        : `${K}`;
    }[keyof T & (string | number)]
  : never;
