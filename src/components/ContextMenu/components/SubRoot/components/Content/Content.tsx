import React, { forwardRef, useState } from 'react';
import { Content as RadixDropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useSpring, animated, easings } from '@react-spring/web';

import { mergeRefs } from 'src/lib/utils';

import { LevelProvider } from '../../../../providers/LevelProvider';

import { useContextMenuContext } from '../../../../ContextMenu.context';

import { ContextMenuMode } from '../../../../ContextMenu.enums';

import { useContentPositioning } from '../../../../hooks';

import { focusParentItem } from '../../../../utils';

import type { ContentProps } from '../../../Content';

import { Direction } from '../../../Content';

import { directionToSide } from '../../../Content';

import s from '../../../Content/Content.module.css';

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
      onContentMouseEnter,
    } = useContextMenuContext(DISPLAY_NAME);

    const { align, labelOffset, isPositioned } = useContentPositioning({
      direction,
      alignOffset,
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
              alignOffset={labelOffset}
              onMouseEnter={(e) => {
                onContentMouseEnter?.();

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
