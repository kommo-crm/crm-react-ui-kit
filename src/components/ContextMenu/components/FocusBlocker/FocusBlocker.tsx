import React, { forwardRef } from 'react';

import cx from 'classnames';

import { useStopEvents } from '../../hooks';

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
      disabledHandlers = [],
      onFocus,
      onClick,
      onKeyDown,
      onKeyUp,
      onKeyPress,
      onPointerDown,
      onPointerUp,
      onPointerEnter,
      onPointerLeave,
      onPointerMove,

      ...rest
    } = props;

    const defaultHandlers = {
      onClick,
      onFocus,
      onKeyDown,
      onKeyUp,
      onKeyPress,
      onPointerDown,
      onPointerUp,
      onPointerEnter,
      onPointerLeave,
      onPointerMove,
    };

    const handlers = useStopEvents({
      handlers: defaultHandlers,
      disabledHandlers,
    });

    return (
      <div
        ref={ref}
        className={cx(s.blocker, className)}
        tabIndex={0}
        data-blocker
        {...handlers}
        {...rest}
      />
    );
  }
);

FocusBlocker.displayName = 'FocusBlocker';
