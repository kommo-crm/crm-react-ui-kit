import React, { forwardRef, useState } from 'react';
import { Content as RadixDropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useSpring, animated, easings } from '@react-spring/web';

import { mergeRefs } from 'src/lib/utils';

import {
  LevelProvider,
  useLevelContext,
} from '../../../../providers/LevelProvider';

import { useContextMenuContext } from '../../../../ContextMenu.context';

import { ContextMenuMode } from '../../../../ContextMenu.enums';

import { useContentPositioning } from '../../../../hooks';

import { focusParentItem } from '../../../../utils';

import type { ContentProps } from '../../../Content';

import { Direction } from '../../../Content';

import { directionToSide } from '../../../Content';

import s from './Content.module.css';

const DISPLAY_NAME = 'ContextMenu.SubRoot.Content';

export const Content = forwardRef<HTMLDivElement, ContentProps>(
  (
    {
      style,
      className,
      children,
      alignOffset,
      arrowPadding = 5,
      collisionBoundary,
      direction = Direction.DOWN_RIGHT,
      disableAutoPositioning = false,
      disableRepositioning = false,
      onMouseEnter,
      onMouseLeave,
      onKeyDown,
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
      onMouseEnter: onMouseEnterContext,
      onMouseLeave: onMouseLeaveContext,
      closeMenuImmediately,
      isOpen,
      onChildOpen,
      isCloseOnClick,
      shouldCloseRootMenuOnClick,
    } = useContextMenuContext(DISPLAY_NAME);

    const { level } = useLevelContext(DISPLAY_NAME);

    const { align, offset, isPositioned } = useContentPositioning({
      direction,
      alignOffset,
      disableAutoPositioning,
      triggerRef,
      contentRef,
      collisionBoundary,
      children,
      disableRepositioning,
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowLeft') {
        closeMenuImmediately();

        focusParentItem(triggerRef.current);
      }

      onKeyDown?.(e);
    };

    return (
      <LevelProvider
        hasItemWithIcon={hasItemWithIcon}
        setHasItemWithIcon={setHasItemWithIcon}
        activeItemId={activeItemId}
        setActiveItemId={setActiveItemId}
        onChildOpen={onChildOpen}
        isCloseOnClick={isCloseOnClick}
        closeMenuImmediately={closeMenuImmediately}
        shouldCloseRootMenuOnClick={shouldCloseRootMenuOnClick ?? false}
        level={level + 1}
      >
        {isOpen && (
          <animated.div
            style={{
              zIndex: Number.MAX_SAFE_INTEGER - 10,
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
              alignOffset={offset}
              onMouseEnter={(e) => {
                onMouseEnterContext?.(e);

                onMouseEnter?.(e);
              }}
              onMouseLeave={(e) => {
                onMouseLeaveContext?.(e);

                onMouseLeave?.(e);
              }}
              onKeyDown={(e) => {
                handleKeyDown(e);
              }}
              {...rest}
            >
              {children}
            </RadixDropdownMenuContent>
          </animated.div>
        )}
      </LevelProvider>
    );
  }
);

Content.displayName = DISPLAY_NAME;
