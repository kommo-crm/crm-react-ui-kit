import React, { forwardRef, useCallback, useState } from 'react';
import { SubContent as RadixDropdownMenuSubContent } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { LevelProvider } from '../../../LevelProvider';

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
    const [hasItemWithIcon, setHasItemWithIcon] = useState(false);

    const themeClassName = useThemeClassName(theme);

    const registerItemWithItem = useCallback(() => {
      setHasItemWithIcon(true);
    }, []);

    return (
      <RadixDropdownMenuSubContent
        ref={ref}
        className={cx(s.content, themeClassName, className)}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        {...props}
      >
        <LevelProvider
          hasItemWithIcon={hasItemWithIcon}
          registerItemWithItem={registerItemWithItem}
        >
          {children}
        </LevelProvider>
      </RadixDropdownMenuSubContent>
    );
  }
);

Content.displayName = DISPLAY_NAME;
