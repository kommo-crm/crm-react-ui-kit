import React, { forwardRef, useEffect } from 'react';
import { Content as RadixTooltipContent } from '@radix-ui/react-tooltip';
import cx from 'classnames';

import { useTooltipRootContext } from '../../Tooltip.context';

import type { TooltipContentProps } from './Content.props';

import s from './Content.module.css';

const DISPLAY_NAME = 'Tooltip.Content';

export const Content = forwardRef<HTMLDivElement, TooltipContentProps>(
  (props, ref) => {
    const { children, className, onPointerDownCapture, ...rest } = props;

    const { themeClassName, isContentPointerDownRef } =
      useTooltipRootContext(DISPLAY_NAME);

    useEffect(
      () => () => {
        isContentPointerDownRef.current = false;
      },
      [isContentPointerDownRef]
    );

    return (
      <RadixTooltipContent
        {...rest}
        ref={ref}
        side="top"
        align="center"
        sideOffset={2}
        avoidCollisions
        collisionPadding={8}
        sticky="partial"
        className={cx(s.content, themeClassName, className)}
        /**
         * `theme.css` swaps palette tokens to their inverse values inside it
         */
        data-crm-ui-kit-surface="inverse"
        onPointerDownCapture={(event) => {
          onPointerDownCapture?.(event);
          isContentPointerDownRef.current = event.pointerType === 'touch';
        }}
      >
        {children}
      </RadixTooltipContent>
    );
  }
);

Content.displayName = DISPLAY_NAME;
