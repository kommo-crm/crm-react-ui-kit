import { useEffect, useState } from 'react';

export const useIsTouchDevice = () => {
  const [isTouch, setIsTouch] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      // For older browsers
      (window.matchMedia && window.matchMedia('(pointer: coarse)').matches)
    );
  });

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        setIsTouch(true);
      } else if (event.pointerType === 'mouse') {
        setIsTouch(false);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return isTouch;
};
