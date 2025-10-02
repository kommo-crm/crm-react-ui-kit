import React, { forwardRef } from 'react';

import cx from 'classnames';

import { useStopContextMenuEvents } from '../../hooks';

import { FocusBlockerProps } from './FocusBlocker.props';

import s from './FocusBlocker.module.css';

export const FocusBlocker = forwardRef<HTMLDivElement, FocusBlockerProps>(
  (props, ref) => {
    const {
      className,
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
      onClick: onClick,
      onKeyDown: onKeyDown,
      onKeyUp: onKeyUp,
      onKeyPress: onKeyPress,
      onPointerDown: onPointerDown,
      onPointerUp: onPointerUp,
      onPointerEnter: onPointerEnter,
      onPointerLeave: onPointerLeave,
      onPointerMove: onPointerMove,
    };

    const handlers = useStopContextMenuEvents(defaultHandlers);

    return (
      <div
        ref={ref}
        className={cx(s.blocker, className)}
        tabIndex={0}
        onFocus={(e) => {
          e.preventDefault();

          onFocus?.(e);
        }}
        data-blocker
        {...handlers}
        {...rest}
      />
    );
  }
);

FocusBlocker.displayName = 'FocusBlocker';
