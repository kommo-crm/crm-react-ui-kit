import { useCallback } from 'react';

import { Handlers } from './useStopContextMenuEvents.types';

export const useStopContextMenuEvents = <T extends HTMLElement>(
  handlers: Partial<Handlers<T>> = {}
) => {
  const stop = useCallback((e: React.SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
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
