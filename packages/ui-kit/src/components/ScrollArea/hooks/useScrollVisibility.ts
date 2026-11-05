import { useCallback, useLayoutEffect, useRef, useState } from 'react';

import { type ScrollAreaVisibilityState } from '../ScrollArea.props';

const SCROLL_EPSILON = 1;

const INITIAL_STATE: ScrollAreaVisibilityState = {
  isContentClippedAtTop: false,
  isContentClippedAtBottom: false,
};

interface UseScrollVisibilityOptions {
  /**
   * Enables recalculation on scroll and the ResizeObserver subscription.
   */
  isEnabled: boolean;
  /**
   * Called with the first measured state and then on every change.
   */
  onChange?: (state: ScrollAreaVisibilityState) => void;
}

/**
 * Returns whether the viewport content is clipped at the top and bottom.
 * The edge counts as reached within 1px: with a fractional page zoom
 * `scrollTop` does not reach the maximum exactly.
 */
export const useScrollVisibility = (options: UseScrollVisibilityOptions) => {
  const { isEnabled, onChange } = options;

  const [state, setState] = useState(INITIAL_STATE);

  const viewportRef = useRef<HTMLDivElement>(null);

  /**
   * The last state passed to onChange; null until the first measurement.
   */
  const reportedStateRef = useRef<ScrollAreaVisibilityState | null>(null);

  const onChangeRef = useRef(onChange);

  /**
   * Declared before the measuring effect, so the first measurement
   * already calls the current onChange.
   */
  useLayoutEffect(() => {
    onChangeRef.current = onChange;
  });

  const updateVisibility = useCallback(() => {
    const viewport = viewportRef.current;

    if (!isEnabled || !viewport) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = viewport;

    const nextState: ScrollAreaVisibilityState = {
      isContentClippedAtTop: scrollTop > SCROLL_EPSILON,
      isContentClippedAtBottom:
        scrollTop < scrollHeight - clientHeight - SCROLL_EPSILON,
    };

    const reportedState = reportedStateRef.current;

    if (
      reportedState &&
      reportedState.isContentClippedAtTop === nextState.isContentClippedAtTop &&
      reportedState.isContentClippedAtBottom ===
        nextState.isContentClippedAtBottom
    ) {
      return;
    }

    reportedStateRef.current = nextState;
    setState(nextState);
    onChangeRef.current?.(nextState);
  }, [isEnabled]);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;

    if (!isEnabled || !viewport) {
      return;
    }

    /**
     * The state is not tracked while disabled, so report it anew.
     */
    reportedStateRef.current = null;
    updateVisibility();

    if (!window.ResizeObserver) {
      return;
    }

    const resizeObserver = new ResizeObserver(updateVisibility);

    resizeObserver.observe(viewport);

    if (viewport.firstElementChild) {
      resizeObserver.observe(viewport.firstElementChild);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [isEnabled, updateVisibility]);

  return {
    ...state,
    viewportRef,
    updateVisibility,
  };
};
