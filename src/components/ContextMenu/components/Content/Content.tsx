import React, { forwardRef, useState } from 'react';
import { Content as RadixDropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useSpring, animated, easings } from '@react-spring/web';

import { mergeRefs } from 'src/lib/utils';

import { LevelProvider } from '../../providers/LevelProvider';

import { useContextMenuContext } from '../../ContextMenu.context';

import { ContextMenuMode } from '../../ContextMenu.enums';

import { useContentPositioning } from '../../hooks';

import { FocusBlocker } from '../FocusBlocker';

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
      alignOffset,
      arrowPadding = 5,
      collisionBoundary,
      direction = Direction.DOWN_RIGHT,
      disableAutoPositioning = false,
      disableRepositioning = false,
      onMouseEnter,
      onMouseLeave,
      onPointerDownOutside,
      onInteractOutside,
      onEscapeKeyDown,

      ...rest
    },
    ref
  ) => {
    const [hasItemWithIcon, setHasItemWithIcon] = useState(false);
    const [activeItemId, setActiveItemId] = useState<string | null>(null);

    const {
      triggerRef,
      contentRef,
      isOpen,
      animatedOpen,
      animationDuration,
      mode,
      temporaryHoverClose,
      onMouseEnter: onMouseEnterContext,
      onMouseLeave: onMouseLeaveContext,
      onChildOpen,
      isRootContentBlocked,
      isChildOpen,
      closeMenuImmediately,
      isCloseOnClick,
    } = useContextMenuContext(DISPLAY_NAME);

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

    return (
      <LevelProvider
        hasItemWithIcon={hasItemWithIcon}
        setHasItemWithIcon={setHasItemWithIcon}
        activeItemId={activeItemId}
        setActiveItemId={setActiveItemId}
        onChildOpen={onChildOpen}
        isCloseOnClick={isCloseOnClick}
        closeMenuImmediately={closeMenuImmediately}
        shouldCloseRootMenuOnClick={false}
        level={1}
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
              onInteractOutside={(e) => {
                if (isChildOpen) {
                  e.preventDefault();
                }

                onInteractOutside?.(e);
              }}
              onEscapeKeyDown={(e) => {
                if (isChildOpen) {
                  e.preventDefault();
                }

                onEscapeKeyDown?.(e);
              }}
              onPointerDownOutside={(e) => {
                if (isChildOpen) {
                  e.preventDefault();
                }

                onPointerDownOutside?.(e);
              }}
              {...rest}
            >
              {children}

              {isRootContentBlocked && <FocusBlocker />}
            </RadixDropdownMenuContent>
          </animated.div>
        )}
      </LevelProvider>
    );
  }
);

Content.displayName = DISPLAY_NAME;
