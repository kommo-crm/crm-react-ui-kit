import React, { forwardRef, useLayoutEffect, useMemo, useState } from 'react';
import { Content as RadixDropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useSpring, animated, easings } from '@react-spring/web';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { mergeRefs } from 'src/lib/utils';

import { LevelProvider } from '../../providers/LevelProvider';

import { hasAnyItemWithIcon } from '../../utils';

import { useContextMenuContext } from '../../ContextMenu.context';

import { ContextMenuMode } from '../../ContextMenu.enums';

import type { ContentProps } from './Content.props';

import { Direction } from './Content.enums';

import s from './Content.module.css';

const directionToSide: Record<Direction, 'top' | 'bottom' | 'left' | 'right'> =
  {
    [Direction.UP_LEFT]: 'top',
    [Direction.UP_RIGHT]: 'top',
    [Direction.DOWN_LEFT]: 'bottom',
    [Direction.DOWN_RIGHT]: 'bottom',
    [Direction.LEFT_UP]: 'left',
    [Direction.LEFT_DOWN]: 'left',
    [Direction.RIGHT_UP]: 'right',
    [Direction.RIGHT_DOWN]: 'right',
  };

const DISPLAY_NAME = 'ContextMenu.Content';

export const Content = forwardRef<HTMLDivElement, ContentProps>(
  (
    {
      theme,
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
    const themeClassName = useThemeClassName(theme);

    const [hasItemWithIcon, setHasItemWithIcon] = useState(false);
    const [isPositioned, setIsPositioned] = useState(false);
    const [align, setAlign] = useState<'start' | 'end'>(
      direction === Direction.UP_RIGHT ||
        direction === Direction.DOWN_RIGHT ||
        direction === Direction.RIGHT_UP ||
        direction === Direction.RIGHT_DOWN
        ? 'start'
        : 'end'
    );
    const [labelOffset, setLabelOffset] = useState<number | undefined>(
      undefined
    );

    const {
      triggerRef,
      contentRef,
      animatedOpen,
      animationDuration,
      mode,
      temporaryHoverClose,
      disableLabelOffset,
    } = useContextMenuContext(DISPLAY_NAME);

    const hasIcon = useMemo(() => hasAnyItemWithIcon(children), [children]);

    useLayoutEffect(() => {
      if (
        disableLabelOffset ||
        !contentRef.current ||
        (direction !== Direction.LEFT_DOWN &&
          direction !== Direction.RIGHT_DOWN)
      ) {
        setLabelOffset(undefined);

        return;
      }

      const contentElement = contentRef.current;
      const label = contentElement.firstElementChild;
      const item = contentElement.children[1];
      const trigger = triggerRef.current;

      if (label && label.hasAttribute('data-label') && trigger) {
        const labelHeight = label.getBoundingClientRect().height;
        const itemHeight = item.getBoundingClientRect().height;
        const triggerHeight = trigger.getBoundingClientRect().height;

        const dynamicOffset = (triggerHeight - itemHeight) / 2;

        setLabelOffset(-labelHeight + dynamicOffset);
      } else {
        setLabelOffset(undefined);
      }
    }, [disableLabelOffset, children, direction]);

    useLayoutEffect(() => {
      if (hasIcon) {
        setHasItemWithIcon(true);
      }
    }, [hasIcon]);

    useLayoutEffect(() => {
      if (disableAutoPositioning || !triggerRef?.current) {
        return;
      }

      let ro: ResizeObserver | null = null;
      let mounted = true;

      const boundaryEl =
        (collisionBoundary instanceof Element && collisionBoundary) ||
        document.documentElement;

      const measureAndAdjust = () => {
        if (!mounted) {
          return;
        }

        const triggerEl = triggerRef.current;
        const el = contentRef.current;

        if (!triggerEl || !el) {
          return;
        }

        const triggerRect = triggerEl.getBoundingClientRect();
        const contentRect = el.getBoundingClientRect();

        if (contentRect.width <= 0) {
          return;
        }

        const boundaryRect = boundaryEl.getBoundingClientRect();

        const fits = {
          right: boundaryRect.right - triggerRect.right >= contentRect.width,
          left: triggerRect.left - boundaryRect.left >= contentRect.width,
          bottom:
            boundaryRect.bottom - triggerRect.bottom >= contentRect.height,
          top: triggerRect.top - boundaryRect.top >= contentRect.height,
        };

        let alignCandidate: 'start' | 'end' = 'start';

        switch (direction) {
          case Direction.UP_RIGHT:

          case Direction.DOWN_RIGHT: {
            if (fits.right) {
              alignCandidate = 'start';
            } else if (fits.left) {
              alignCandidate = 'end';
            } else {
              alignCandidate = 'start';
            }

            break;
          }

          case Direction.UP_LEFT:

          case Direction.DOWN_LEFT: {
            if (fits.left) {
              alignCandidate = 'end';
            } else if (fits.right) {
              alignCandidate = 'start';
            } else {
              alignCandidate = 'end';
            }

            break;
          }

          case Direction.RIGHT_DOWN:

          case Direction.LEFT_DOWN: {
            if (fits.bottom) {
              alignCandidate = 'start';
            } else if (fits.top) {
              alignCandidate = 'end';
            } else {
              alignCandidate = 'start';
            }

            break;
          }

          case Direction.RIGHT_UP:

          case Direction.LEFT_UP: {
            if (fits.top) {
              alignCandidate = 'end';
            } else if (fits.bottom) {
              alignCandidate = 'start';
            } else {
              alignCandidate = 'end';
            }

            break;
          }
        }

        setAlign(alignCandidate);
        setIsPositioned(true);
      };

      requestAnimationFrame(measureAndAdjust);

      if (contentRef.current && typeof ResizeObserver !== 'undefined') {
        ro = new ResizeObserver(measureAndAdjust);
        ro.observe(contentRef.current);
      }

      return () => {
        mounted = false;

        if (ro) {
          ro.disconnect();
        }
      };
    }, [direction[0], collisionBoundary, triggerRef]);

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
      <LevelProvider hasItemWithIcon={hasItemWithIcon}>
        <animated.div style={springStyles} data-content-wrapper>
          <RadixDropdownMenuContent
            ref={mergeRefs(contentRef, ref)}
            className={cx(s.content, themeClassName, className)}
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
