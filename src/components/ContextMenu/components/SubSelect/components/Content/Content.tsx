import React, { forwardRef } from 'react';
import { SubContent as RadixDropdownMenuSubContent } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

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

    return (
      <RadixDropdownMenuSubContent
        ref={ref}
        className={cx(s.content, themeClassName, className)}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        {...props}
      >
        {children}
      </RadixDropdownMenuSubContent>
    );
  }
);

Content.displayName = DISPLAY_NAME;
