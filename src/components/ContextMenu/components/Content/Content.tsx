import React, { forwardRef, useState } from 'react';
import { Content as RadixDropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useSpring, animated, easings } from '@react-spring/web';

import { mergeRefs } from 'src/lib/utils';

import { LevelProvider } from '../../providers/LevelProvider';

import { useContextMenuContext } from '../../ContextMenu.context';

import { ContextMenuMode } from '../../ContextMenu.enums';

import { useContentPositioning } from '../../hooks';

import type { ContentProps } from './Content.props';

import { Direction } from './Content.enums';

import { directionToSide } from './Content.utils';

import s from './Content.module.css';

const DISPLAY_NAME = 'ContextMenu.Content';

export const Content = forwardRef<HTMLDivElement, ContentProps>(
  (
    {
      style,
      className,
      children,
      arrowPadding = 5,
      collisionBoundary,
      direction = Direction.DOWN_RIGHT,
      disableAutoPositioning = false,
      ...rest
    },
    ref
  ) => {
    const [hasItemWithIcon, setHasItemWithIcon] = useState(false);
    const [activeItemId, setActiveItemId] = useState<string | null>(null);

    const {
      triggerRef,
      contentRef,
      animatedOpen,
      animationDuration,
      mode,
      temporaryHoverClose,
      onMouseEnter,
      onMouseLeave,
    } = useContextMenuContext(DISPLAY_NAME);

    const { align, labelOffset, isPositioned } = useContentPositioning({
      direction,
      disableAutoPositioning,
      triggerRef,
      contentRef,
      collisionBoundary,
      children,
    });

    const springStyles = useSpring({
      opacity:
        isPositioned &&
        ((mode === ContextMenuMode.CLICK && !temporaryHoverClose) ||
          animatedOpen)
          ? 1
          : 0,
      config:
        mode === ContextMenuMode.CLICK && !temporaryHoverClose
          ? { duration: 0 }
          : { duration: animationDuration, easing: easings.easeInOutCubic },
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
            zIndex: Number.MAX_SAFE_INTEGER,
            position: 'fixed',
            ...springStyles,
          }}
          data-content-wrapper
        >
          <RadixDropdownMenuContent
            ref={mergeRefs(contentRef, ref)}
            className={cx(s.content, className)}
            style={{
              ...(style || {}),
              pointerEvents:
                disableAutoPositioning || isPositioned ? 'auto' : 'none',
            }}
            collisionBoundary={collisionBoundary}
            side={directionToSide[direction]}
            align={align}
            arrowPadding={arrowPadding}
            alignOffset={labelOffset}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            {...rest}
          >
            {children}
          </RadixDropdownMenuContent>
        </animated.div>
      </LevelProvider>
    );
  }
);

Content.displayName = DISPLAY_NAME;
