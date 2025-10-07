import { useLayoutEffect, useRef } from 'react';

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useLayoutEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
