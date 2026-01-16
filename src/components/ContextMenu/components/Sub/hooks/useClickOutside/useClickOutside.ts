import { useEffect } from 'react';

import { UseClickOutsideOptions } from './useClickOutside.types';

/**
 * A click tracking hook outside of the specified references.
 */
export const useClickOutside = <T extends HTMLElement>(
  options: UseClickOutsideOptions<T>
) => {
  const { refs, handler } = options;

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const isInside = refs.some((ref) => {
        const el = ref?.current;

        return el && el.contains(event.target as Node);
      });

      if (isInside) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [refs, handler]);
};
