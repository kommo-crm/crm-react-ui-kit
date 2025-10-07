import { useLayoutEffect, useState } from 'react';

import { Direction } from '../../components/Content';

import { UseContentPositioningOptions } from './useContentPositioning.types';

export function useContentPositioning({
  direction,
  alignOffset = 0,
  disableAutoPositioning,
  triggerRef,
  contentRef,
  collisionBoundary,
  children,
}: UseContentPositioningOptions) {
  const [align, setAlign] = useState<'start' | 'end'>(
    direction === Direction.UP_RIGHT ||
      direction === Direction.DOWN_RIGHT ||
      direction === Direction.RIGHT_UP ||
      direction === Direction.RIGHT_DOWN ||
      !direction
      ? 'start'
      : 'end'
  );
  const [offset, setOffset] = useState<number>(alignOffset);
  const [isPositioned, setIsPositioned] = useState(false);

  const isRectEmpty = (rect: DOMRect) => {
    return (
      !rect.width || !rect.height || !isFinite(rect.top) || !isFinite(rect.left)
    );
  };

  /**
   * Calculates the label offset based on the direction and the trigger height.
   */
  useLayoutEffect(() => {
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
      return;
    }

    const items = Array.from(contentEl.querySelectorAll('[data-item]'));

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
    };

    requestAnimationFrame(updateOffset);

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateOffset);
    });

    resizeObserver.observe(item);
    resizeObserver.observe(triggerEl);

    return () => resizeObserver.disconnect();
  }, [
    children,
    direction,
    contentRef,
    triggerRef,
    align,
    alignOffset,
    disableAutoPositioning,
  ]);

  /**
   * Positions the content based on the direction and the trigger height.
   */
  useLayoutEffect(() => {
    if (disableAutoPositioning || !triggerRef?.current || !direction) {
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
      setIsPositioned(true);
    };

    requestAnimationFrame(measureAndAdjust);

    if (contentRef.current && typeof ResizeObserver !== 'undefined') {
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
    triggerRef,
    contentRef,
    collisionBoundary,
  ]);

  return { align, offset, isPositioned };
}
