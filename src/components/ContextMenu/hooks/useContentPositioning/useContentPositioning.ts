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
    if (
      !contentRef.current ||
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

    const contentElement = contentRef.current;
    const label = contentElement.firstElementChild;
    let item;

    if (align === 'start') {
      if (contentElement.children[1].hasAttribute('data-separator')) {
        item = contentElement.children[2];
      } else {
        item = contentElement.children[1];
      }
    } else if (
      contentElement.children[contentElement.children.length - 1].hasAttribute(
        'data-arrow'
      )
    ) {
      item = contentElement.children[contentElement.children.length - 2];
    } else {
      item = contentElement.children[contentElement.children.length - 1];
    }

    const trigger = triggerRef.current;

    if (trigger) {
      const itemHeight = item.getBoundingClientRect().height;
      const triggerHeight = trigger.getBoundingClientRect().height;
      const dynamicOffset = (triggerHeight - itemHeight) / 2;

      if (align === 'start') {
        if (label instanceof HTMLElement && label.hasAttribute('data-label')) {
          const labelHeight = label.getBoundingClientRect().height;

          setLabelOffset(alignOffset - labelHeight + dynamicOffset);
        }
      } else {
        setLabelOffset(alignOffset + dynamicOffset - 1);
      }
    }
  }, [children, direction, contentRef, triggerRef, align]);

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
