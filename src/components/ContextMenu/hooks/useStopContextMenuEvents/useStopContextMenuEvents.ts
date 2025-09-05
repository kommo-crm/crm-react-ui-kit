import { useCallback } from 'react';

export const useStopContextMenuEvents = () => {
  const stop = useCallback((e: React.SyntheticEvent) => {
    e.stopPropagation();
  }, []);

  return {
    onClick: stop,
    onKeyDown: stop,
    onKeyUp: stop,
    onKeyPress: stop,
    onPointerDown: stop,
    onPointerUp: stop,
    onPointerEnter: stop,
    onPointerLeave: stop,
    onPointerMove: stop,
  };
};
