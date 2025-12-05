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
      onEscapeKeyDown,

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
     * Prevent Radix from automatically focusing the trigger after submenu closes.
     * We handle focus management manually to support custom close behavior.
     */
    const handleCloseAutoFocus = (e: Event) => {
      e.preventDefault();

      onCloseAutoFocus?.(e);
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

    return (
      <LevelProvider
        activeItemId={activeItemId}
        setActiveItemId={setActiveItemId}
        onChildOpen={onChildOpen}
        shouldCloseCurrentMenuOnSelect={shouldCloseCurrentMenuOnSelect}
        closeMenuImmediately={closeMenuImmediately}
        shouldCloseRootMenuOnSelect={shouldCloseRootMenuOnSelect ?? false}
        isAnimatedOpen={isAnimatedOpen}
        level={level + 1}
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
              onKeyDown={handleKeyDown}
              onCloseAutoFocus={handleCloseAutoFocus}
              onEscapeKeyDown={handleEscapeKeyDown}
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
