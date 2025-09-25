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
      direction === Direction.RIGHT_DOWN
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

    if (
      !contentEl ||
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

    const childrenCollection = contentEl.children;

    if (!childrenCollection || childrenCollection.length === 0) {
      return;
    }

    const label = contentEl.firstElementChild;
    let item: Element | null = null;

    if (align === 'start') {
      const second = childrenCollection.item(1);

      if (second instanceof Element && second.hasAttribute('data-separator')) {
        const third = childrenCollection.item(2);

        if (third instanceof Element) {
          item = third;
        } else {
          item = null;
        }
      } else if (second instanceof Element) {
        item = second;
      }
    } else {
      const lastIndex = childrenCollection.length - 1;
      const last = childrenCollection.item(lastIndex);

      if (last instanceof Element && last.hasAttribute('data-arrow')) {
        const prev = childrenCollection.item(lastIndex - 1);

        if (prev instanceof Element) {
          item = prev;
        } else {
          item = null;
        }
      } else if (last instanceof Element) {
        item = last;
      }
    }

    const trigger = triggerRef?.current;

    if (!trigger || !item) {
      return;
    }

    const itemRect = item.getBoundingClientRect();
    const triggerRect = (trigger as Element).getBoundingClientRect();

    const itemHeight = itemRect.height;
    const triggerHeight = triggerRect.height;
    const dynamicOffset = (triggerHeight - itemHeight) / 2;

    if (align === 'start') {
      if (label instanceof Element && label.hasAttribute('data-label')) {
        const labelHeight = label.getBoundingClientRect().height;

        setLabelOffset(alignOffset - labelHeight + dynamicOffset);
      }
    } else {
      setLabelOffset(alignOffset + dynamicOffset - 1);
    }
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
    if (disableAutoPositioning || !triggerRef?.current) {
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
