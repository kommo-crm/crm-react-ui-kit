import { type RefObject } from 'react';

import { type ScrollAreaProps } from '../../ScrollArea.props';

export interface UseThumbFallbackOptions {
  /**
   * Measures only for the types with a permanently mounted scrollbar.
   */
  isEnabled: boolean;
  /**
   * Radix renders `auto` and `always` with different scrollbar components,
   * so switching between them mounts a new scrollbar to measure.
   */
  type: NonNullable<ScrollAreaProps['type']>;
  /**
   * Receives `data-overflow`, which the content offset depends on.
   */
  rootRef: RefObject<HTMLDivElement>;
  /**
   * The scrolled element.
   */
  viewportRef: RefObject<HTMLDivElement>;
  /**
   * The track the thumb moves in, receives the measured geometry
   * as CSS variables and `data-thumb-fallback`.
   */
  scrollbarRef: RefObject<HTMLDivElement>;
}

export interface UseThumbFallbackResult {
  /**
   * Remeasures after a scroll.
   */
  updateThumb: () => void;
}
