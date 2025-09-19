import React, { forwardRef, useLayoutEffect, useState } from 'react';
import { SubContent as RadixDropdownMenuSubContent } from '@radix-ui/react-dropdown-menu';
import { useSpring, animated, easings } from '@react-spring/web';
import cx from 'classnames';

import { LevelProvider } from '../../providers/LevelProvider';

import { useContextMenuSubContext } from '../Sub/Sub.context';

import { useContextMenuContext } from '../../ContextMenu.context';

import type { SubContentProps } from './SubContent.props';

import s from './SubContent.module.css';

const DISPLAY_NAME = 'ContextMenu.SubContent';

export const SubContent = forwardRef<HTMLDivElement, SubContentProps>(
  (
    {
      className,
      children,
      sideOffset = 4,
      collisionPadding = 10,
      onMouseEnter,
      onMouseLeave,
      ...rest
    },
    ref
  ) => {
    const [activeItemId, setActiveItemId] = useState<string | null>(null);

    const {
      animatedOpen,
      startAnimation,
      onMouseEnter: onMouseEnterContext,
      onMouseLeave: onMouseLeaveContext,
      defaultOpen,
    } = useContextMenuSubContext(DISPLAY_NAME);
    const { animationDuration } = useContextMenuContext(DISPLAY_NAME);

    const [hasItemWithIcon, setHasItemWithIcon] = useState(false);
    const [isPositioned, setIsPositioned] = useState(false);

    useLayoutEffect(() => {
      startAnimation();
    }, []);

    /**
     * Handles the prerender of the submenu (needed for the icons).
     */
    useLayoutEffect(() => {
      let raf: number;

      if (animatedOpen) {
        setIsPositioned(false);
        raf = requestAnimationFrame(() => {
          setIsPositioned(true);
        });
      } else {
        setIsPositioned(false);
      }

      return () => {
        if (raf) {
          cancelAnimationFrame(raf);
        }
      };
    }, [animatedOpen]);

    const springStyles = useSpring({
      opacity:
        (isPositioned && animatedOpen) || defaultOpen !== undefined ? 1 : 0,
      config:
        defaultOpen === undefined
          ? { duration: animationDuration, easing: easings.easeInOutCubic }
          : { duration: 0 },
    });

    return (
      <LevelProvider
        hasItemWithIcon={hasItemWithIcon}
        setHasItemWithIcon={setHasItemWithIcon}
        activeItemId={activeItemId}
        setActiveItemId={setActiveItemId}
      >
        <animated.div
          style={{
            position: 'fixed',
            zIndex: Number.MAX_SAFE_INTEGER,
            ...springStyles,
          }}
          onMouseEnter={(e) => {
            onMouseEnterContext?.(e);

            onMouseEnter?.(e);
          }}
          onMouseLeave={(e) => {
            onMouseLeaveContext?.(e);

            onMouseLeave?.(e);
          }}
          data-content-wrapper
        >
          <RadixDropdownMenuSubContent
            ref={ref}
            className={cx(s.sub_content, className)}
            sideOffset={sideOffset}
            collisionPadding={collisionPadding}
            {...rest}
          >
            {children}
          </RadixDropdownMenuSubContent>
        </animated.div>
      </LevelProvider>
    );
  }
);

SubContent.displayName = DISPLAY_NAME;
