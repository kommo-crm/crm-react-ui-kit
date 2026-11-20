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

const clearThumb = (scrollbar: HTMLElement | null) => {
  scrollbar?.removeAttribute('data-thumb-fallback');
  scrollbar?.style.removeProperty(SIZE_VAR);
  scrollbar?.style.removeProperty(OFFSET_VAR);
};

const setOverflow = (root: HTMLElement, hasOverflow: boolean) => {
  if (root.hasAttribute('data-overflow') !== hasOverflow) {
    root.toggleAttribute('data-overflow', hasOverflow);
  }
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
  const { isEnabled, type, rootRef, viewportRef, scrollbarRef } = options;

  /**
   * Returns whether the content overflows, or null when nothing was measured.
   */
  const drawThumb = useCallback((): boolean | null => {
    const viewport = viewportRef.current;
    const scrollbar = scrollbarRef.current;

    if (!isEnabled || !viewport || !scrollbar) {
      return null;
    }

    const { scrollTop, scrollHeight, offsetHeight } = viewport;
    const maxScrollPos = scrollHeight - offsetHeight;

    if (maxScrollPos <= 0) {
      clearThumb(scrollbar);

      return false;
    }

    const style = getComputedStyle(scrollbar);
    /**
     * parseInt, not parseFloat: Radix truncates the padding the same way,
     * otherwise the thumb jumps by a subpixel when Radix takes over.
     */
    const track =
      scrollbar.clientHeight -
      (parseInt(style.paddingTop) || 0) -
      (parseInt(style.paddingBottom) || 0);
    const size = Math.max(
      (track * offsetHeight) / scrollHeight,
      MIN_THUMB_SIZE
    );
    const scrollPos = Math.min(Math.max(scrollTop, 0), maxScrollPos);
    const offset = (scrollPos / maxScrollPos) * (track - size);

    /**
     * Custom properties are inherited, so on the root they would restyle
     * the whole scrolled content on every scroll event.
     */
    scrollbar.style.setProperty(SIZE_VAR, `${size}px`);
    scrollbar.style.setProperty(OFFSET_VAR, `${offset}px`);

    if (!scrollbar.hasAttribute('data-thumb-fallback')) {
      scrollbar.setAttribute('data-thumb-fallback', '');
    }

    return true;
  }, [isEnabled, viewportRef, scrollbarRef]);

  const updateThumb = useCallback(() => {
    const root = rootRef.current;
    const hasOverflow = drawThumb();

    if (root && hasOverflow !== null) {
      setOverflow(root, hasOverflow);
    }
  }, [drawThumb, rootRef]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const viewport = viewportRef.current;

    if (!root || !viewport) {
      return;
    }

    if (!isEnabled) {
      setOverflow(root, false);
      clearThumb(scrollbarRef.current);

      return;
    }

    updateThumb();

    if (!window.ResizeObserver) {
      return;
    }

    let frameId = 0;

    /**
     * Unlike the Radix one, the thumb is drawn without waiting for the next
     * frame. data-overflow changes the viewport padding, so it is deferred:
     * resizing an observed element inside the callback makes the browser
     * report "ResizeObserver loop completed with undelivered notifications".
     */
    const resizeObserver = new ResizeObserver(() => {
      drawThumb();
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateThumb);
    });

    resizeObserver.observe(viewport);

    /**
     * The content wrapper Radix renders inside the viewport,
     * present even when children are empty.
     */
    if (viewport.firstElementChild) {
      resizeObserver.observe(viewport.firstElementChild);
    }

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, [
    isEnabled,
    type,
    drawThumb,
    updateThumb,
    rootRef,
    viewportRef,
    scrollbarRef,
  ]);

  return { updateThumb };
};
