import React, {
  ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import { Content as RadixDropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useSpring, animated, easings } from '@react-spring/web';

import { mergeRefs } from 'src/lib/utils';

import { KeyboardKey } from 'src/lib/keyboard';

import { LevelProvider } from '../../providers/LevelProvider';

import {
  useContextMenuContext,
  useContextMenuRootContext,
} from '../../ContextMenu.context';

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

type El = HTMLDivElement;

export const Content = forwardRef<El, ContentProps>((props, ref) => {
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
    onPointerDownOutside,
    onEscapeKeyDown,
    onCloseAutoFocus,
    onOpenAutoFocus,
    onFocusOutside,

    ...rest
  } = props;

  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  /**
   * Root level doesn't have menu aim tracking, always returns false.
   */
  const isAiming = () => false;

  const {
    triggerRef,
    contentRef,
    isOpen,
    isAnimatedOpen,
    skipAnimation,
    animationDuration,
    mode,
    isRootContentBlocked,
    isChildOpen,
    shouldCloseCurrentMenuOnSelect,
    closeMenuImmediately,
    onContentEnter,
    onContentLeave,
    onChildOpen,
    itemWithFocusedInput,
    setItemWithFocusedInput,
    shouldPreventFocusRestore,
    setOnFocusOutside,
    isChildAiming,
    onChildAiming,
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

  const { navigationContentRef } = useContextMenuRootContext(DISPLAY_NAME);

  /**
   * Register focus outside handler to allow preventing menu closure.
   */
  useEffect(() => {
    if (!onFocusOutside) {
      return;
    }

    setOnFocusOutside?.(onFocusOutside);

    return () => {
      setOnFocusOutside?.(undefined);
    };
  }, [onFocusOutside, setOnFocusOutside]);

  const springStyles = useSpring({
    opacity:
      isPositioned && (mode === ContextMenuMode.CLICK || isAnimatedOpen)
        ? 1
        : 0,
    config:
      mode === ContextMenuMode.CLICK || skipAnimation
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
   * We completely cancel the behavior since we are
   * only interested in the focus in this case.
   */
  const handleInteractOutside = (e: InteractOutsideEvent) => {
    e.preventDefault();
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
    } else if (isOpen) {
      closeMenuImmediately();
    }

    onPointerDownOutside?.(e);
  };

  /**
   * It is necessary to prevent standard behavior such as scrolling a document.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (mode === ContextMenuMode.HOVER) {
      e.preventDefault();

      if (e.key === KeyboardKey.ESCAPE) {
        triggerRef.current?.focus();
      }
    }

    onKeyDown?.(e);
  };

  const handleCloseAutoFocus = (e: Event) => {
    if (mode === ContextMenuMode.HOVER || shouldPreventFocusRestore?.()) {
      e.preventDefault();
    }

    onCloseAutoFocus?.(e);
  };

  const handleOpenAutoFocus = (e: Event) => {
    if (mode === ContextMenuMode.HOVER) {
      e.preventDefault();
    }

    onOpenAutoFocus?.(e);
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
      itemWithFocusedInput={itemWithFocusedInput}
      setItemWithFocusedInput={setItemWithFocusedInput}
      isAiming={isAiming}
      isChildAiming={isChildAiming}
      onChildAiming={onChildAiming}
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
            ref={mergeRefs(contentRef, navigationContentRef, ref)}
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
            onKeyDown={handleKeyDown}
            onCloseAutoFocus={handleCloseAutoFocus}
            /**
             * Radix ContextMenu supports `onOpenAutoFocus`, but the prop is missing
             * in its TypeScript defs. The event works at runtime (passed through
             * FocusScope), but TS doesn't recognize it. Using @ts-expect-error is
             * intentional until Radix exposes proper types.
             */
            // @ts-expect-error - Property 'onOpenAutoFocus' does not exist on type
            onOpenAutoFocus={handleOpenAutoFocus}
            data-menu-level={1}
            {...rest}
          >
            {children}

            {isRootContentBlocked && <FocusBlocker />}
          </RadixDropdownMenuContent>
        </animated.div>
      )}
    </LevelProvider>
  );
});

Content.displayName = DISPLAY_NAME;
