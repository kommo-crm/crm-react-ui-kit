import React, { forwardRef, useEffect, useRef } from 'react';

import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { FocusBlockerProps } from './FocusBlocker.props';

import s from './FocusBlocker.module.css';

/**
 * The component that blocks focus and pointer events.
 *
 * It is necessary to solve the problems of implementing a Radix based on focus.
 */
export const FocusBlocker = forwardRef<HTMLDivElement, FocusBlockerProps>(
  (props, ref) => {
    const {
      className,
      onFocus,
      onPointerEnter,
      onPointerLeave,
      onPointerMove,

      ...rest
    } = props;

    const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      onFocus?.(e);
    };

    const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      onPointerEnter?.(e);
    };

    const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      onPointerLeave?.(e);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      onPointerMove?.(e);
    };

    // Track mouse position to simulate mouseenter after blocker unmounts
    const mousePositionRef = useRef<{ x: number; y: number } | null>(null);
    const blockerRef = useRef<HTMLDivElement | null>(null);

    /**
     * This block of code is necessary to restore the focus to a different item
     * in case we focused on the item before the blocker unmounted.
     */
    useEffect(() => {
      const blockerElement = blockerRef.current;

      if (!blockerElement) {
        return;
      }

      const handleMouseMove = (e: MouseEvent) => {
        const rect = blockerElement.getBoundingClientRect();
        const isOverBlocker =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (isOverBlocker) {
          mousePositionRef.current = { x: e.clientX, y: e.clientY };
        }
      };

      document.addEventListener('mousemove', handleMouseMove);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);

        if (mousePositionRef.current) {
          const { x, y } = mousePositionRef.current;

          requestAnimationFrame(() => {
            const elementBelow = document.elementFromPoint(x, y);
            const menuItem = elementBelow?.closest(
              '[data-item]'
            ) as HTMLElement;

            if (menuItem) {
              const event = new MouseEvent('mouseover', {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: x,
                clientY: y,
              });

              menuItem.dispatchEvent(event);
            }
          });
        }
      };
    }, []);

    return (
      <div
        ref={mergeRefs(ref, blockerRef)}
        className={cx(s.blocker, className)}
        tabIndex={0}
        data-blocker
        onFocus={handleFocus}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        {...rest}
      />
    );
  }
);

FocusBlocker.displayName = 'FocusBlocker';
