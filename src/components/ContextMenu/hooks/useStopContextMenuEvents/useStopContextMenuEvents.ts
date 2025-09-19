import { useCallback } from 'react';

import { DivHandlers } from './useStopContextMenuEvents.types';

export const useStopContextMenuEvents = (
  handlers: Partial<DivHandlers> = {}
) => {
  const stop = useCallback((e: React.SyntheticEvent) => {
    e.stopPropagation();
  }, []);

  const wrap =
    <E extends React.SyntheticEvent>(
      userHandler?: (e: E) => void
    ): ((e: E) => void) =>
    (e: E) => {
      stop(e);
      userHandler?.(e);
    };

  return {
    onClick: wrap(handlers.onClick),
    onKeyDown: wrap(handlers.onKeyDown),
    onKeyUp: wrap(handlers.onKeyUp),
    onKeyPress: wrap(handlers.onKeyPress),
    onPointerDown: wrap(handlers.onPointerDown),
    onPointerUp: wrap(handlers.onPointerUp),
    onPointerEnter: wrap(handlers.onPointerEnter),
    onPointerLeave: wrap(handlers.onPointerLeave),
    onPointerMove: wrap(handlers.onPointerMove),
  };
};
