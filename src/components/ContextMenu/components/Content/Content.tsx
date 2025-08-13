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
      direction = Direction.UP_RIGHT,
      disableAutoPositioning = false,
      ...props
    },
    ref
  ) => {
    const themeClassName = useThemeClassName(theme);

    const [hasItemWithIcon, setHasItemWithIcon] = useState(false);
    const [isPositioned, setIsPositioned] = useState(false);
    const [align, setAlign] = useState<'start' | 'end'>(
      direction === Direction.UP_RIGHT || direction === Direction.DOWN_RIGHT
        ? 'start'
        : 'end'
    );

    const {
      triggerRef,
      contentRef,
      animatedOpen,
      animationDuration,
      mode,
      temporaryHoverClose,
    } = useContextMenuContext(DISPLAY_NAME);

    const hasIcon = useMemo(() => hasAnyItemWithIcon(children), [children]);

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

        if (
          direction === Direction.UP_RIGHT ||
          direction === Direction.DOWN_RIGHT
        ) {
          const spaceRight = boundaryRect.right - triggerRect.right;

          setAlign(spaceRight < contentRect.width ? 'end' : 'start');
        } else {
          const spaceLeft = triggerRect.left - boundaryRect.left;

          setAlign(spaceLeft < contentRect.width ? 'start' : 'end');
        }

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
        (mode === ContextMenuMode.CLICK && !temporaryHoverClose) ||
        (isPositioned && animatedOpen)
          ? 1
          : 0,
      config: { duration: animationDuration, easing: easings.easeInOutCubic },
    });

    return (
      <LevelProvider hasItemWithIcon={hasItemWithIcon}>
        <animated.div style={springStyles}>
          <RadixDropdownMenuContent
            ref={mergeRefs(contentRef, ref)}
            className={cx(s.content, themeClassName, className)}
            style={{
              ...(style || {}),
              pointerEvents:
                disableAutoPositioning || isPositioned ? 'auto' : 'none',
            }}
            collisionBoundary={collisionBoundary}
            side={
              direction === Direction.UP_RIGHT ||
              direction === Direction.UP_LEFT
                ? 'top'
                : 'bottom'
            }
            align={align}
            arrowPadding={arrowPadding}
            {...props}
          >
            {children}
          </RadixDropdownMenuContent>
        </animated.div>
      </LevelProvider>
    );
  }
);

Content.displayName = DISPLAY_NAME;
