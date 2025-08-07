import React, { forwardRef, useLayoutEffect, useMemo, useState } from 'react';
import { Content as RadixDropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { LevelProvider } from '../LevelProvider';

import { hasAnyItemWithIcon } from '../../utils';

import { useContextMenuContext } from '../../ContextMenu.context';

import type { ContentProps } from './Content.props';

import s from './Content.module.css';

const DISPLAY_NAME = 'ContextMenu.Content';

export const Content = forwardRef<HTMLDivElement, ContentProps>(
  (
    {
      theme,
      className,
      children,
      arrowPadding = 10,
      collisionPadding = 20,
      ...props
    },
    ref
  ) => {
    const [hasItemWithIcon, setHasItemWithIcon] = useState(false);

    const { disableItemIconAlign } = useContextMenuContext(DISPLAY_NAME);

    const themeClassName = useThemeClassName(theme);

    if (!disableItemIconAlign) {
      const hasIcon = useMemo(() => hasAnyItemWithIcon(children), [children]);

      useLayoutEffect(() => {
        if (hasIcon) {
          setHasItemWithIcon(true);
        }
      }, [hasIcon]);
    }

    return (
      <RadixDropdownMenuContent
        ref={ref}
        className={cx(s.content, themeClassName, className)}
        collisionPadding={collisionPadding}
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
