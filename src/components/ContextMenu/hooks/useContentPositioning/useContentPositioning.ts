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
  const [labelOffset, setLabelOffset] = useState<number>(alignOffset);
  const [isPositioned, setIsPositioned] = useState(false);

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

    const childrenCollection = Array.from(contentEl.children);

    if (childrenCollection.length === 0) {
      return;
    }

    const label = contentEl.firstElementChild;

    const getEl = (index: number): Element | null => {
      const el = childrenCollection[index];

      return el instanceof Element ? el : null;
    };

    const resolveItem = (): Element | null => {
      if (align === 'start') {
        const second = getEl(1);

        if (second?.hasAttribute('data-separator')) {
          return getEl(2);
        }

        return second;
      }

      const lastIndex = childrenCollection.length - 1;
      const last = getEl(lastIndex);

      if (last?.hasAttribute('data-arrow')) {
        return getEl(lastIndex - 1);
      }

      return last;
    };

    const item = resolveItem();

    if (!item) {
      return;
    }

    const updateOffset = () => {
      const { height: itemHeight } = item.getBoundingClientRect();
      const { height: triggerHeight } = triggerEl.getBoundingClientRect();
      const dynamicOffset = (triggerHeight - itemHeight) / 2;

      if (align === 'start') {
        if (label instanceof Element && label.hasAttribute('data-label')) {
          const { height: labelHeight } = label.getBoundingClientRect();

          setLabelOffset(alignOffset - labelHeight + dynamicOffset);
        }
      } else {
        setLabelOffset(alignOffset + dynamicOffset - 1);
      }
    };

    updateOffset();

    const resizeObserver = new ResizeObserver(updateOffset);

    resizeObserver.observe(item);

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

  return { align, labelOffset, isPositioned };
}
