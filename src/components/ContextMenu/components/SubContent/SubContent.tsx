import React, { forwardRef, useLayoutEffect, useMemo, useState } from 'react';
import { SubContent as RadixDropdownMenuSubContent } from '@radix-ui/react-dropdown-menu';
import { useSpring, animated, easings } from '@react-spring/web';
import cx from 'classnames';

import { LevelProvider } from '../../providers/LevelProvider';

import { hasAnyItemWithIcon } from '../../utils';

import { useContextMenuSubContext } from '../Sub/Sub.context';

import { useContextMenuContext } from '../../ContextMenu.context';

import { ContextMenuMode } from '../../ContextMenu.enums';

import type { SubContentProps } from './SubContent.props';

import s from './SubContent.module.css';

const DISPLAY_NAME = 'ContextMenu.SubContent';

export const SubContent = forwardRef<HTMLDivElement, SubContentProps>(
  (
    { className, children, sideOffset = 4, collisionPadding = 10, ...rest },
    ref
  ) => {
    const { animatedOpen, startAnimation, mode } =
      useContextMenuSubContext(DISPLAY_NAME);
    const {
      animationDuration,
      animatedOpen: animatedFullOpen,
      mode: rootMode,
    } = useContextMenuContext(DISPLAY_NAME);

    const [hasItemWithIcon, setHasItemWithIcon] = useState(false);

    const hasIcon = useMemo(() => hasAnyItemWithIcon(children), [children]);

    useLayoutEffect(() => {
      if (hasIcon) {
        setHasItemWithIcon(true);
      }
    }, [hasIcon]);

    useLayoutEffect(() => {
      if (mode === ContextMenuMode.HOVER) {
        startAnimation();
      }
    }, []);

    const springStyles =
      mode === ContextMenuMode.CLICK
        ? { opacity: 1 }
        : useSpring({
            opacity:
              animatedOpen &&
              (animatedFullOpen || rootMode === ContextMenuMode.CLICK)
                ? 1
                : 0,
            config: {
              duration: animationDuration,
              easing: easings.easeInOutCubic,
            },
          });

    return (
      <LevelProvider hasItemWithIcon={hasItemWithIcon}>
        <animated.div style={springStyles} data-content-wrapper>
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
