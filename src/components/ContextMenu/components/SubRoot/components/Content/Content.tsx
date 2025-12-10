import React, { forwardRef, useState } from 'react';
import { Content as RadixDropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useSpring, animated, easings } from '@react-spring/web';

import { mergeRefs } from 'src/lib/utils';

import { KeyboardKey } from 'src/lib/keyboard';

import {
  LevelProvider,
  useLevelContext,
} from '../../../../providers/LevelProvider';

import { useContextMenuContext } from '../../../../ContextMenu.context';

import { ContextMenuMode } from '../../../../ContextMenu.enums';

import { useContentPositioning } from '../../../../hooks';

import type { ContentProps } from '../../../Content';

import { Direction } from '../../../Content';

import { directionToSide } from '../../../Content';

import { focusParentItem } from './utils';

import s from './Content.module.css';

const DISPLAY_NAME = 'ContextMenu.SubRoot.Content';

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
      onKeyDown,
      onCloseAutoFocus,
      onOpenAutoFocus,
      onEscapeKeyDown,
      onClick,
      onPointerDown,
      onPointerUp,

      ...rest
    } = props;

    const [activeItemId, setActiveItemId] = useState<string | null>(null);

    const {
      triggerRef,
      contentRef,
      isAnimatedOpen,
      animationDuration,
      mode,
      isOpen,
      shouldCloseCurrentMenuOnSelect,
      shouldCloseRootMenuOnSelect,
      closeMenuImmediately,
      onContentEnter,
      onContentLeave,
      onChildOpen,
      itemWithFocusedInput,
      setItemWithFocusedInput,
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
        isPositioned && (mode === ContextMenuMode.CLICK || isAnimatedOpen)
          ? 1
          : 0,
      config:
        mode === ContextMenuMode.CLICK
          ? { duration: 0 }
          : { duration: animationDuration, easing: easings.easeInOutCubic },
    });

    const onSubRootContentClose = () => {
      closeMenuImmediately();

      focusParentItem(triggerRef.current);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      onContentEnter?.(e);

      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      onContentLeave?.(e);

      onMouseLeave?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === KeyboardKey.ARROW_LEFT) {
        onSubRootContentClose();
      }

      onKeyDown?.(e);
    };

    /**
     * Prevent Radix from closing the entire menu tree.
     * We handle Escape manually to close only this submenu level.
     */
    const handleEscapeKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();

      onSubRootContentClose();
      onEscapeKeyDown?.(e);
    };

    /**
     * Prevent Radix from automatically focusing the trigger after submenu closes.
     * We handle focus management manually to support custom close behavior.
     */
    const handleCloseAutoFocus = (e: Event) => {
      if (mode === ContextMenuMode.HOVER) {
        e.preventDefault();
      }

      onCloseAutoFocus?.(e);
    };

    /**
     * Prevent Radix from automatically focusing content after submenu opens.
     * We handle focus management manually to support custom open behavior.
     */
    const handleOpenAutoFocus = (e: Event) => {
      if (mode === ContextMenuMode.HOVER) {
        e.preventDefault();
      }

      onOpenAutoFocus?.(e);
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      /**
       * It is necessary that the click does not pop up to
       * the ItemRightSlot where the preventDefault occurs.
       * For example, otherwise the input to the SubRoot will
       * snot be able to focus and exist correctly.
       */
      e.stopPropagation();

      onClick?.(e);
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      /**
       * It is necessary that the click does not pop up to
       * the ItemRightSlot where the preventDefault occurs.
       * For example, otherwise the input to the SubRoot will
       * snot be able to focus and exist correctly.
       */
      e.stopPropagation();

      onPointerDown?.(e);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
      /**
       * It is necessary that the click does not pop up to
       * the ItemRightSlot where the preventDefault occurs.
       * For example, otherwise the input to the SubRoot will
       * snot be able to focus and exist correctly.
       */
      e.stopPropagation();

      onPointerUp?.(e);
    };

    return (
      <LevelProvider
        activeItemId={activeItemId}
        setActiveItemId={setActiveItemId}
        onChildOpen={onChildOpen}
        shouldCloseCurrentMenuOnSelect={shouldCloseCurrentMenuOnSelect}
        closeMenuImmediately={closeMenuImmediately}
        shouldCloseRootMenuOnSelect={shouldCloseRootMenuOnSelect ?? false}
        isAnimatedOpen={isAnimatedOpen}
        itemWithFocusedInput={itemWithFocusedInput}
        setItemWithFocusedInput={setItemWithFocusedInput}
        level={level + 1}
      >
        {isOpen && (
          <animated.div
            data-menu-level={level + 1}
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
              onKeyDown={handleKeyDown}
              onCloseAutoFocus={handleCloseAutoFocus}
              onEscapeKeyDown={handleEscapeKeyDown}
              /**
               * Radix ContextMenu supports `onOpenAutoFocus`, but the prop is missing
               * in its TypeScript defs. The event works at runtime (passed through
               * FocusScope), but TS doesn't recognize it. Using @ts-expect-error is
               * intentional until Radix exposes proper types.
               */
              // @ts-expect-error - Property 'onOpenAutoFocus' does not exist on type
              onOpenAutoFocus={handleOpenAutoFocus}
              onClick={handleClick}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
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
