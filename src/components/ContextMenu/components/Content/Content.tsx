import React, { ComponentPropsWithoutRef, forwardRef, useState } from 'react';
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

type RadixContentProps = ComponentPropsWithoutRef<
  typeof RadixDropdownMenuContent
>;

type InteractOutsideEvent = Parameters<
  NonNullable<RadixContentProps['onInteractOutside']>
>[0];

type PointerDownOutsideEvent = Parameters<
  NonNullable<RadixContentProps['onPointerDownOutside']>
>[0];

type EscapeKeyDownEvent = Parameters<
  NonNullable<RadixContentProps['onEscapeKeyDown']>
>[0];

const DISPLAY_NAME = 'ContextMenu.Content';

export const Content = forwardRef<HTMLDivElement, ContentProps>(
  (props, ref) => {
    const {
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
    } = props;

    const [activeItemId, setActiveItemId] = useState<string | null>(null);

    const {
      triggerRef,
      contentRef,
      isOpen,
      isAnimatedOpen,
      animationDuration,
      mode,
      isRootContentBlocked,
      isChildOpen,
      shouldCloseCurrentMenuOnSelect,
      closeMenuImmediately,
      onContentEnter,
      onContentLeave,
      onChildOpen,
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
        isPositioned && (mode === ContextMenuMode.CLICK || isAnimatedOpen)
          ? 1
          : 0,
      config:
        mode === ContextMenuMode.CLICK
          ? { duration: 0 }
          : { duration: animationDuration, easing: easings.easeInOutCubic },
    });

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      onContentEnter?.(e);

      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      onContentLeave?.(e);

      onMouseLeave?.(e);
    };

    /**
     * Prevent closing parent menu when a child submenu is open.
     * The child submenu should handle closing itself first.
     */
    const handleInteractOutside = (e: InteractOutsideEvent) => {
      if (isChildOpen) {
        e.preventDefault();
      }

      onInteractOutside?.(e);
    };

    /**
     * Prevent closing parent menu on Escape when a child submenu is open.
     * The child submenu should close first.
     */
    const handleEscapeKeyDown = (e: EscapeKeyDownEvent) => {
      if (isChildOpen) {
        e.preventDefault();
      }

      onEscapeKeyDown?.(e);
    };

    /**
     * Prevent closing parent menu on outside click when a child submenu is open.
     * The child submenu should handle the outside click first.
     */
    const handlePointerDownOutside = (e: PointerDownOutsideEvent) => {
      if (isChildOpen) {
        e.preventDefault();
      }

      onPointerDownOutside?.(e);
    };

    return (
      <LevelProvider
        activeItemId={activeItemId}
        setActiveItemId={setActiveItemId}
        onChildOpen={onChildOpen}
        shouldCloseCurrentMenuOnSelect={shouldCloseCurrentMenuOnSelect}
        closeMenuImmediately={closeMenuImmediately}
        shouldCloseRootMenuOnSelect={false}
        isAnimatedOpen={isAnimatedOpen}
        level={1}
      >
        {isOpen && (
          <animated.div
            style={{
              zIndex: Number.MAX_SAFE_INTEGER - 10,
              position: 'fixed',
              ...springStyles,
            }}
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
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onInteractOutside={handleInteractOutside}
              onEscapeKeyDown={handleEscapeKeyDown}
              onPointerDownOutside={handlePointerDownOutside}
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
