import React, { forwardRef } from 'react';

import cx from 'classnames';

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
      onClick,
      onPointerDown,
      onPointerUp,

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

    const handleClick = (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      onClick?.(e);
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      onPointerDown?.(e);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      onPointerUp?.(e);
    };

    return (
      <div
        ref={ref}
        className={cx(s.blocker, className)}
        tabIndex={0}
        data-blocker
        onFocus={handleFocus}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        {...rest}
      />
    );
  }
);

FocusBlocker.displayName = 'FocusBlocker';
