import { useCallback, useMemo } from 'react';

import { noop } from 'src/utils';

import { Handlers, useStopEventsOptions } from './useStopEvents.types';

/**
 * A hook that stops events from propagating.
 *
 * Used for:
 * 1) preventing a click on the SubRoot trigger from propagating to the parent item.
 * 2) preventing other elements from intercepting the focus, which may
 * break the functionality of the radix context menu working on focus
 */
export const useStopEvents = <T extends HTMLElement>(
  options: useStopEventsOptions<T>
) => {
  const { handlers = {}, disabledHandlers = [] } = options;

  const disabledSet = useMemo(
    () => new Set(disabledHandlers),
    [disabledHandlers]
  );

  /**
   * Stops event propagation and prevents default behavior.
   *
   * - stopPropagation: prevent event from bubbling to parent menu items
   * - preventDefault: prevent Radix default behavior (e.g., focus changes)
   */
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
