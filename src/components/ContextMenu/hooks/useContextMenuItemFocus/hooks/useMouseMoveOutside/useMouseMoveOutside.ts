import { useEffect } from 'react';

/**
 * A hook for tracking mouse moves outside of the specified reference.
 *
 * It is necessary for cases when we do not lose focus on
 * some element due to the internal blocker.
 */
export const useMouseMoveOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: (event: MouseEvent) => void
) => {
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const el = ref.current;

      if (!el) {
        return;
      }

      if (!el.contains(event.target as Node)) {
        callback(event);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [ref, callback]);
};
