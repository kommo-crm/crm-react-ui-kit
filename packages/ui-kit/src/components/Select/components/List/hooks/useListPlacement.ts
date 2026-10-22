import { type RefObject, useLayoutEffect, useRef, useState } from 'react';

import { type DropdownListPlacement } from '@ui-kit/components/DropdownList';

export type UseListPlacementOptions = {
  /**
   * Whether the list is currently open. While closed, placement is reset
   * to 'bottom'.
   */
  isOpened?: boolean;
  /**
   * Ref to the rendered list element used to measure its position.
   */
  listRef: RefObject<HTMLUListElement>;
};

/**
 * Resolves the next vertical placement from the current one and the list
 * geometry.
 *
 * - From 'bottom': flips to 'top' only if the list overflows the viewport bottom.
 * - From 'top': falls back to 'bottom' if it overflows the top or is taller than
 *   the viewport (doesn't fit above either), otherwise stays 'top'.
 */
const resolveListPlacement = (
  placement: DropdownListPlacement,
  listEl: HTMLUListElement
): DropdownListPlacement => {
  const { top, bottom, height } = listEl.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const overflowsBottom = bottom > viewportHeight;
  const overflowsTop = top < 0;
  const tallerThanViewport = height > viewportHeight;

  if (placement === 'bottom') {
    return overflowsBottom ? 'top' : 'bottom';
  }

  if (overflowsTop || tallerThanViewport) {
    return 'bottom';
  }

  return 'top';
};

/**
 * Owns the list placement state and focus-on-open behavior.
 *
 * useLayoutEffect is used instead of useEffect to resolve the list placement
 * and focus it before the browser paints. This prevents a visible flicker
 * where the list briefly appears in the wrong position (e.g. bottom) before
 * jumping to the correct one (e.g. top).
 *
 * On open, the effect may run twice when placement needs to change:
 * 1st run — measures the list via getBoundingClientRect and updates placement state.
 * 2nd run — placement is already correct, so the list gets focused.
 *
 * preferBottomFallbackRef guards against an infinite loop when neither
 * placement fits (e.g. not enough space above or below). When the list in
 * "top" placement resolves back to "bottom", we accept "bottom" as the final
 * placement and skip re-resolving on the next run.
 */
export const useListPlacement = ({
  isOpened,
  listRef,
}: UseListPlacementOptions): DropdownListPlacement => {
  const preferBottomFallbackRef = useRef(false);
  const [placement, setPlacement] = useState<DropdownListPlacement>('bottom');

  useLayoutEffect(() => {
    if (!isOpened) {
      preferBottomFallbackRef.current = false;
      setPlacement('bottom');

      return;
    }

    const listEl = listRef.current;

    if (!listEl) {
      return;
    }

    if (preferBottomFallbackRef.current) {
      listEl.focus();

      return;
    }

    const nextPlacement = resolveListPlacement(placement, listEl);

    if (nextPlacement === placement) {
      listEl.focus();

      return;
    }

    if (nextPlacement === 'bottom' && placement === 'top') {
      preferBottomFallbackRef.current = true;
    }

    setPlacement(nextPlacement);
  }, [isOpened, placement, listRef]);

  return placement;
};
