import { useEffect } from 'react';

import { UseClickOutsideOptions } from './useClickOutside.types';

export function useClickOutside<T extends HTMLElement>({
  refs,
  handler,
}: UseClickOutsideOptions<T>) {
  useEffect(() => {
    function listener(event: MouseEvent | TouchEvent) {
      const isInside = refs.some((ref) => {
        const el = ref?.current;

        return el && el.contains(event.target as Node);
      });

      if (isInside) {
        return;
      }

      handler(event);
    }

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [refs, handler]);
}
