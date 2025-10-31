import React, { forwardRef } from 'react';

import cx from 'classnames';

import { useStopContextMenuEvents } from '../../hooks';

import { FocusBlockerProps } from './FocusBlocker.props';

import s from './FocusBlocker.module.css';

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

    const handlers = useStopContextMenuEvents({
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
