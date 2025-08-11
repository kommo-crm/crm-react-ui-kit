import React, {
  forwardRef,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Content as RadixDropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { LevelProvider } from '../../providers/LevelProvider';

import { hasAnyItemWithIcon } from '../../utils';

import { useContextMenuContext } from '../../ContextMenu.context';

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
      direction = [Direction.RIGHT, Direction.BOTTOM],
      disableAutoPositioning = false,
      ...props
    },
    ref
  ) => {
    const themeClassName = useThemeClassName(theme);

    const [hasItemWithIcon, setHasItemWithIcon] = useState(false);
    const [align, setAlign] = useState<'start' | 'end'>(
      direction[0] === Direction.RIGHT ? 'start' : 'end'
    );
    const [isPositioned, setIsPositioned] = useState(false);

    const contentRef = useRef<HTMLDivElement | null>(null);

    const { triggerRef } = useContextMenuContext(DISPLAY_NAME);

    const hasIcon = useMemo(() => hasAnyItemWithIcon(children), [children]);

    useLayoutEffect(() => {
      if (hasIcon) {
        setHasItemWithIcon(true);
      }
    }, [hasIcon]);

    const setContentRef = (node: HTMLDivElement | null) => {
      contentRef.current = node;

      if (!ref) {
        return;
      }

      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    };

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

        if (direction[0] === Direction.RIGHT) {
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

    return (
      <RadixDropdownMenuContent
        ref={setContentRef}
        className={cx(s.content, themeClassName, className)}
        style={{
          ...(style || {}),
          ...(disableAutoPositioning || isPositioned
            ? { opacity: 1, pointerEvents: 'auto' }
            : { opacity: 0, pointerEvents: 'none' }),
        }}
        collisionBoundary={collisionBoundary}
        side={direction[1]}
        align={align}
        arrowPadding={arrowPadding}
        {...props}
      >
        <LevelProvider hasItemWithIcon={hasItemWithIcon}>
          {children}
        </LevelProvider>
      </RadixDropdownMenuContent>
    );
  }
);

Content.displayName = DISPLAY_NAME;
