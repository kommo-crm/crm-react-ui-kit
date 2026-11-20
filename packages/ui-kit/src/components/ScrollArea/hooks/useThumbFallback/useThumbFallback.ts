import { useCallback, useLayoutEffect } from 'react';

import type {
  UseThumbFallbackOptions,
  UseThumbFallbackResult,
} from './useThumbFallback.types';

/**
 * The minimum thumb size Radix applies in getThumbSize.
 */
const MIN_THUMB_SIZE = 18;

const SIZE_VAR = '--crm-ui-kit-scroll-area-fallback-thumb-size';
const OFFSET_VAR = '--crm-ui-kit-scroll-area-fallback-thumb-offset';

const clearThumb = (root: HTMLElement) => {
  root.removeAttribute('data-overflow');
  root.style.removeProperty(SIZE_VAR);
  root.style.removeProperty(OFFSET_VAR);
};

/**
 * Radix measures the scrollbar through ResizeObserver, rAF and a 10ms
 * debounce, so the thumb appears a few frames after mount. This hook
 * measures the same geometry synchronously, so the thumb is drawn
 * on the first paint and Radix takes over once its sizes are ready.
 *
 * The geometry is written to the DOM, not to state: a consumer may scroll
 * the viewport after this layout effect, and a state update from the scroll
 * event would be rendered only after the next paint.
 */
export const useThumbFallback = (
  options: UseThumbFallbackOptions
): UseThumbFallbackResult => {
  const { isEnabled, rootRef, viewportRef, scrollbarRef } = options;

  const updateThumb = useCallback(() => {
    const root = rootRef.current;
    const viewport = viewportRef.current;
    const scrollbar = scrollbarRef.current;

    if (!isEnabled || !root || !viewport || !scrollbar) {
      return;
    }

    const { scrollTop, scrollHeight, offsetHeight } = viewport;
    const maxScrollPos = scrollHeight - offsetHeight;

    if (maxScrollPos <= 0) {
      clearThumb(root);

      return;
    }

    const style = getComputedStyle(scrollbar);
    const track =
      scrollbar.clientHeight -
      parseFloat(style.paddingTop) -
      parseFloat(style.paddingBottom);
    const size = Math.max(
      (track * offsetHeight) / scrollHeight,
      MIN_THUMB_SIZE
    );
    const scrollPos = Math.min(Math.max(scrollTop, 0), maxScrollPos);
    const offset = (scrollPos / maxScrollPos) * (track - size);

    root.setAttribute('data-overflow', '');
    root.style.setProperty(SIZE_VAR, `${size}px`);
    root.style.setProperty(OFFSET_VAR, `${offset}px`);
  }, [isEnabled, rootRef, viewportRef, scrollbarRef]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const viewport = viewportRef.current;

    if (!root || !viewport) {
      return;
    }

    if (!isEnabled) {
      clearThumb(root);

      return;
    }

    updateThumb();

    if (!window.ResizeObserver) {
      return;
    }

    /**
     * Unlike the Radix one, the callback is not deferred to the next frame.
     */
    const resizeObserver = new ResizeObserver(updateThumb);

    resizeObserver.observe(viewport);

    /**
     * The content wrapper Radix renders inside the viewport,
     * present even when children are empty.
     */
    if (viewport.firstElementChild) {
      resizeObserver.observe(viewport.firstElementChild);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [isEnabled, updateThumb, rootRef, viewportRef]);

  return { updateThumb };
};
