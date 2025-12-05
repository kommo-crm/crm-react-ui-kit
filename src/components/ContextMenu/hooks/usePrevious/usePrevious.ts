import { useLayoutEffect, useRef } from 'react';

/**
 * This hook is used to get the previous value of a prop.
 *
 * Useful for disable of repositioning and other cases when you need to
 * know the previous value of a prop.
 */
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();

  useLayoutEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
