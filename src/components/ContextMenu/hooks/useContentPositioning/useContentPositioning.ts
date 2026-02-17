import { useLayoutEffect, useRef, useState } from 'react';

import { Direction } from '../../components/Content';

import {
  UseContentPositioningOptions,
  UseContentPositioningResult,
} from './useContentPositioning.types';

/**
 * A hook for smart positioning relative to the trigger and the first
 * item of the context menu on any of the levels of the context menu.
 */
export const useContentPositioning = (
  options: UseContentPositioningOptions
): UseContentPositioningResult => {
  const {
    direction,
    alignOffset = 0,
    disableAutoPositioning,
    triggerRef,
    contentRef,
    collisionBoundary,
    disableRepositioning,
    children,
    isSubContent,
  } = options;

  const [align, setAlign] = useState<'start' | 'end'>(
    direction === Direction.UP_RIGHT ||
      direction === Direction.DOWN_RIGHT ||
      direction === Direction.RIGHT_DOWN ||
      direction === Direction.LEFT_DOWN ||
      !direction
      ? 'start'
      : 'end'
  );
  const [offset, setOffset] = useState<number>(alignOffset);

  const [positionedDirection, setPositionedDirection] = useState(false);
  const [positionedOffset, setPositionedOffset] = useState(false);
  const [isPositioned, setIsPositioned] = useState(false);

  const hasPositionedRef = useRef(false);

  /**
   * Positions the content based on the direction and the trigger height.
   */
  useLayoutEffect(() => {
    if (
      isSubContent ||
      disableAutoPositioning ||
      !triggerRef?.current ||
      !direction
    ) {
      setPositionedDirection(true);

      return;
    }

    let ro: ResizeObserver | null = null;
    let mounted = true;

    const boundaryEl =
      (collisionBoundary instanceof Element && collisionBoundary) ||
      document.documentElement;

    const measureAndAdjust = () => {
      if (!mounted) {
        return;
      }

      const triggerEl = triggerRef.current;
      const el = contentRef.current;

      if (!triggerEl || !el) {
        return;
      }

      const triggerRect = triggerEl.getBoundingClientRect();
      const contentRect = el.getBoundingClientRect();

      if (contentRect.width <= 0) {
        return;
      }

      const boundaryRect = boundaryEl.getBoundingClientRect();

      const fits = {
        right: boundaryRect.right - triggerRect.right >= contentRect.width,
        left: triggerRect.left - boundaryRect.left >= contentRect.width,
        bottom: boundaryRect.bottom - triggerRect.bottom >= contentRect.height,
        top: triggerRect.top - boundaryRect.top >= contentRect.height,
      };

      let alignCandidate: 'start' | 'end' = 'start';

      switch (direction) {
        case Direction.UP_RIGHT:

        case Direction.DOWN_RIGHT: {
          if (fits.right) {
            alignCandidate = 'start';
          } else if (fits.left) {
            alignCandidate = 'end';
          } else {
            alignCandidate = 'start';
          }

          break;
        }

        case Direction.UP_LEFT:

        case Direction.DOWN_LEFT: {
          if (fits.left) {
            alignCandidate = 'end';
          } else if (fits.right) {
            alignCandidate = 'start';
          } else {
            alignCandidate = 'end';
          }

          break;
        }

        case Direction.RIGHT_DOWN:

        case Direction.LEFT_DOWN: {
          if (fits.bottom) {
            alignCandidate = 'start';
          } else if (fits.top) {
            alignCandidate = 'end';
          } else {
            alignCandidate = 'start';
          }

          break;
        }

        case Direction.RIGHT_UP:

        case Direction.LEFT_UP: {
          if (fits.top) {
            alignCandidate = 'end';
          } else if (fits.bottom) {
            alignCandidate = 'start';
          } else {
            alignCandidate = 'end';
          }

          break;
        }
      }

      setAlign(alignCandidate);
      setPositionedDirection(true);
      hasPositionedRef.current = true;
    };

    /**
     * Skip repositioning if already positioned and repositioning is disabled
     */
    if (disableRepositioning && hasPositionedRef.current) {
      setPositionedDirection(true);

      return;
    }

    /**
     * Schedule measurement via microtask instead of rAF.
     * Microtasks run before the browser paints, so isPositioned becomes
     * true before the first paint — eliminating the one-frame flash.
     * rAF runs AFTER paint, causing a visible frame with opacity 0.
     */
    setTimeout(() => {
      measureAndAdjust();
    }, 0);

    if (
      !disableRepositioning &&
      contentRef.current &&
      typeof ResizeObserver !== 'undefined'
    ) {
      ro = new ResizeObserver(measureAndAdjust);
      ro.observe(contentRef.current);
    }

    return () => {
      mounted = false;
      ro?.disconnect();
    };
  }, [
    direction,
    disableAutoPositioning,
    disableRepositioning,
    triggerRef,
    contentRef,
    collisionBoundary,
  ]);

  /**
   * Calculates the label offset based on the direction and the trigger height.
   */
  useLayoutEffect(() => {
    /**
     * Skip repositioning if already positioned and repositioning is disabled
     */
    if (disableRepositioning && hasPositionedRef.current) {
      setPositionedOffset(true);

      return;
    }

    const contentEl = contentRef?.current;
    const triggerEl = triggerRef?.current;

    if (
      !contentEl ||
      !triggerEl ||
      disableAutoPositioning ||
      [
        Direction.DOWN_LEFT,
        Direction.DOWN_RIGHT,
        Direction.UP_LEFT,
        Direction.UP_RIGHT,
      ].includes(direction as Direction)
    ) {
      setPositionedOffset(true);

      return;
    }

    const items = Array.from(contentEl.querySelectorAll('[data-item]')).filter(
      (item) => !item.hasAttribute('data-non-selectable')
    );

    if (items.length === 0) {
      return;
    }

    const item =
      align === 'start'
        ? (items[0] as Element)
        : (items[items.length - 1] as Element);

    const updateOffset = () => {
      const triggerRect = triggerEl.getBoundingClientRect();
      const contentRect = contentEl.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();

      const isRectEmpty = (rect: DOMRect) => {
        return (
          !rect.width ||
          !rect.height ||
          !isFinite(rect.top) ||
          !isFinite(rect.left)
        );
      };

      if ([triggerRect, contentRect, itemRect].some(isRectEmpty)) {
        requestAnimationFrame(updateOffset);

        return;
      }

      const triggerCenter = triggerRect.height / 2;
      const itemCenter = itemRect.height / 2;
      const itemTop = itemRect.top - contentRect.top;
      const itemBottom = itemRect.bottom - contentRect.bottom;

      if (align === 'start') {
        setOffset(alignOffset + triggerCenter - itemTop - itemCenter);
      } else {
        setOffset(alignOffset + triggerCenter + itemBottom - itemCenter);
      }

      hasPositionedRef.current = true;
      setPositionedOffset(true);
    };

    /**
     * Same as above: use microtask for the initial measurement.
     * The internal rAF retry (for empty rects) is kept as a fallback.
     */
    setTimeout(() => {
      updateOffset();
    }, 0);

    if (disableRepositioning) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      updateOffset();
    });

    resizeObserver.observe(item);
    resizeObserver.observe(triggerEl);

    return () => resizeObserver.disconnect();
  }, [
    children,
    direction,
    disableRepositioning,
    align,
    contentRef,
    triggerRef,
    alignOffset,
    disableAutoPositioning,
  ]);

  useLayoutEffect(() => {
    if (positionedDirection && positionedOffset) {
      setIsPositioned(true);
    }
  }, [positionedDirection, positionedOffset]);

  return { align, offset, isPositioned };
};
