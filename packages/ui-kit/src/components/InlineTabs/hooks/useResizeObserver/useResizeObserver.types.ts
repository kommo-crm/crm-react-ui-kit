import type React from 'react';

/**
 * Options for the `useResizeObserver` hook.
 */
export interface UseResizeObserverOptions {
  /**
   * Elements to observe; a target may mount or unmount between renders.
   */
  targets: ReadonlyArray<React.RefObject<Element>>;
  /**
   * Called when any of the targets changes its size. A new function
   * recreates the observer, so it should be stable.
   */
  onResize: () => void;
}
