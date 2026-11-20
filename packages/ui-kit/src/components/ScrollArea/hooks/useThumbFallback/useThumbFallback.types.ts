import { type RefObject } from 'react';

export interface UseThumbFallbackOptions {
  /**
   * Measures only for the types with a permanently mounted scrollbar.
   */
  isEnabled: boolean;
  /**
   * Receives the measured geometry as CSS variables and `data-overflow`.
   */
  rootRef: RefObject<HTMLDivElement>;
  /**
   * The scrolled element.
   */
  viewportRef: RefObject<HTMLDivElement>;
  /**
   * The track the thumb moves in.
   */
  scrollbarRef: RefObject<HTMLDivElement>;
}

export interface UseThumbFallbackResult {
  /**
   * Remeasures after a scroll.
   */
  updateThumb: () => void;
}
