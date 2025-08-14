import React, { forwardRef, useLayoutEffect, useMemo, useState } from 'react';
import { SubContent as RadixDropdownMenuSubContent } from '@radix-ui/react-dropdown-menu';
import { useSpring, animated, easings } from '@react-spring/web';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { hasAnyItemWithIcon } from 'src/components/ContextMenu/utils';

import { useContextMenuContext } from 'src/components/ContextMenu/ContextMenu.context';

import { ContextMenuMode } from 'src/components/ContextMenu/ContextMenu.enums';

import { LevelProvider } from '../../../../providers/LevelProvider';

import { useContextMenuSubSelectContext } from '../../SubSelect.context';

import type { SubSelectContentProps } from './Content.props';

import s from './Content.module.css';

const DISPLAY_NAME = 'ContextMenu.SubSelect.Content';

export const Content = forwardRef<HTMLDivElement, SubSelectContentProps>(
  (
    {
      theme,
      className,
      children,
      sideOffset = 4,
      collisionPadding = 10,
      ...props
    },
    ref
  ) => {
    const themeClassName = useThemeClassName(theme);

    const { animatedOpen, startAnimation, open, mode } =
      useContextMenuSubSelectContext(DISPLAY_NAME);
    const {
      animationDuration,
      animatedOpen: animatedFullOpen,
      mode: rootMode,
    } = useContextMenuContext(DISPLAY_NAME);

    const [hasItemWithIcon, setHasItemWithIcon] = useState(false);

    const hasIcon = useMemo(() => hasAnyItemWithIcon(children), [children]);

    useLayoutEffect(() => {
      if (hasIcon) {
        setHasItemWithIcon(true);
      }
    }, [hasIcon]);

    useLayoutEffect(() => {
      if (open && mode === ContextMenuMode.HOVER) {
        startAnimation();
      }
    }, [open]);

    const springStyles =
      mode === ContextMenuMode.CLICK
        ? { opacity: 1 }
        : useSpring({
            opacity:
              animatedOpen &&
              (animatedFullOpen || rootMode === ContextMenuMode.CLICK)
                ? 1
                : 0,
            config: {
              duration: animationDuration,
              easing: easings.easeInOutCubic,
            },
          });

    return (
      <LevelProvider hasItemWithIcon={hasItemWithIcon}>
        <animated.div style={springStyles} data-content-wrapper>
          <RadixDropdownMenuSubContent
            ref={ref}
            className={cx(s.content, themeClassName, className)}
            sideOffset={sideOffset}
            collisionPadding={collisionPadding}
            {...props}
          >
            {children}
          </RadixDropdownMenuSubContent>
        </animated.div>
      </LevelProvider>
    );
  }
);

Content.displayName = DISPLAY_NAME;
