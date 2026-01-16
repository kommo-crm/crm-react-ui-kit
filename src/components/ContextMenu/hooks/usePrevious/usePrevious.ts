import { useRef } from 'react';

/**
 * This hook is used to get the previous value of a prop.
 *
 * Useful for disable of repositioning and other cases when you need to
 * know the previous value of a prop.
 *
 * https://habr.com/ru/articles/752818/
 */
export const usePrevious = <T>(value: T): T | undefined => {
  const currentRef = useRef<T>(value);
  const previousRef = useRef<T>(undefined);

  if (currentRef.current !== value) {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }

  return previousRef.current;
};
