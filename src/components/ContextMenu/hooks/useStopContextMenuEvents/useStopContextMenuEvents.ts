import { useCallback, useMemo } from 'react';

import { noop } from 'src/utils';

import { Handlers } from './useStopContextMenuEvents.types';

export const useStopContextMenuEvents = <T extends HTMLElement>({
  handlers = {},
  disabledHandlers = [],
}: {
  handlers?: Partial<Handlers<T>>;
  disabledHandlers?: Array<keyof Handlers<T>>;
}) => {
  const disabledSet = useMemo(
    () => new Set(disabledHandlers),
    [disabledHandlers]
  );

  const stop = useCallback((e: React.SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);

  const wrap = useCallback(
    <E extends React.SyntheticEvent>(
      name: keyof Handlers<T>,
      handler?: (e: E) => void
    ): ((e: E) => void) => {
      if (disabledSet.has(name)) {
        return (e) => handler?.(e) ?? noop;
      }

      return (e: E) => {
        stop(e);
        handler?.(e);
      };
    },
    [disabledSet, stop]
  );

  return useMemo(
    () => ({
      onClick: wrap('onClick', handlers.onClick),
      onKeyDown: wrap('onKeyDown', handlers.onKeyDown),
      onKeyUp: wrap('onKeyUp', handlers.onKeyUp),
      onKeyPress: wrap('onKeyPress', handlers.onKeyPress),
      onPointerDown: wrap('onPointerDown', handlers.onPointerDown),
      onPointerUp: wrap('onPointerUp', handlers.onPointerUp),
      onPointerEnter: wrap('onPointerEnter', handlers.onPointerEnter),
      onPointerLeave: wrap('onPointerLeave', handlers.onPointerLeave),
      onPointerMove: wrap('onPointerMove', handlers.onPointerMove),
      onFocus: wrap('onFocus', handlers.onFocus),
    }),
    [handlers, wrap]
  );
};
