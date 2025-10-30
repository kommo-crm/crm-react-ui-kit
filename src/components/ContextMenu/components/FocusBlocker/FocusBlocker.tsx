import React, { forwardRef, useEffect, useCallback, useState } from 'react';

import cx from 'classnames';

import { useStopContextMenuEvents } from '../../hooks';

import { FocusBlockerProps } from './FocusBlocker.props';

import { CutoutRect } from './FocusBlocker.types';

import s from './FocusBlocker.module.css';

export const FocusBlocker = forwardRef<HTMLDivElement, FocusBlockerProps>(
  (props, ref) => {
    const {
      className,
      style,
      disabledHandlers = [],
      cutoutRef,
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

    const [cutout, setCutout] = useState<CutoutRect | null>(null);

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

    const updateCutout = useCallback(() => {
      if (!cutoutRef?.current) {
        return;
      }

      const rect = cutoutRef.current.getBoundingClientRect();

      setCutout({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    }, [cutoutRef]);

    useEffect(() => {
      updateCutout();
      window.addEventListener('resize', updateCutout);
      window.addEventListener('scroll', updateCutout, true);

      return () => {
        window.removeEventListener('resize', updateCutout);
        window.removeEventListener('scroll', updateCutout, true);
      };
    }, [updateCutout]);

    const commonProps = {
      'tabIndex': 0,
      'data-blocker': true,
      ...handlers,
      ...rest,
    };

    if (!cutout) {
      return (
        <div
          ref={ref}
          className={cx(s.blocker, { [s.pure]: !cutout }, className)}
          {...commonProps}
        />
      );
    }

    /**
     * The cutout is a transparent hole in the blocker that allows clicks to pass through.
     * It is created by 4 blocks around the cutout.
     * The blocks are created by the cutout position and size.
     */
    return (
      <>
        <div
          className={cx(s.top, className)}
          style={{ height: cutout.top, ...style }}
          {...commonProps}
        />

        <div
          className={cx(s.left, className)}
          style={{
            top: cutout.top,
            width: cutout.left,
            height: cutout.height,
            ...style,
          }}
          {...commonProps}
        />

        <div
          className={cx(s.right, className)}
          style={{
            top: cutout.top,
            left: cutout.left + cutout.width,
            right: 0,
            height: cutout.height,
            ...style,
          }}
          {...commonProps}
        />

        <div
          className={cx(s.bottom, className)}
          style={{
            top: cutout.top + cutout.height,
            bottom: 0,
            ...style,
          }}
          {...commonProps}
        />
      </>
    );
  }
);

FocusBlocker.displayName = 'FocusBlocker';
