import { useEffect } from 'react';

export function useMouseMoveOutside(
  ref: React.RefObject<HTMLElement>,
  callback: (event: MouseEvent) => void
) {
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
}
