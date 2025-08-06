import React, { forwardRef, useCallback, useState } from 'react';
import { Content as RadixDropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { LevelProvider } from '../LevelProvider';

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

    const themeClassName = useThemeClassName(theme);

    const registerItemWithItem = useCallback(() => {
      setHasItemWithIcon(true);
    }, []);

    return (
      <RadixDropdownMenuContent
        ref={ref}
        className={cx(s.content, themeClassName, className)}
        collisionPadding={collisionPadding}
        arrowPadding={arrowPadding}
        {...props}
      >
        <LevelProvider
          hasItemWithIcon={hasItemWithIcon}
          registerItemWithItem={registerItemWithItem}
        >
          {children}
        </LevelProvider>
      </RadixDropdownMenuContent>
    );
  }
);

Content.displayName = DISPLAY_NAME;
