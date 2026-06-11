export const omit = <T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const { ...copy } = obj;

  for (const key of keys) {
    delete copy[key];
  }

  return copy;
};
