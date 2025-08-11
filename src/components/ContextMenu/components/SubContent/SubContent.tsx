import React, { forwardRef, useLayoutEffect, useMemo, useState } from 'react';
import { SubContent as RadixDropdownMenuSubContent } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { LevelProvider } from '../../providers/LevelProvider';

import { hasAnyItemWithIcon } from '../../utils';

import type { SubContentProps } from './SubContent.props';

import s from './SubContent.module.css';

const DISPLAY_NAME = 'ContextMenu.SubContent';

export const SubContent = forwardRef<HTMLDivElement, SubContentProps>(
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

    const [hasItemWithIcon, setHasItemWithIcon] = useState(false);

    const hasIcon = useMemo(() => hasAnyItemWithIcon(children), [children]);

    useLayoutEffect(() => {
      if (hasIcon) {
        setHasItemWithIcon(true);
      }
    }, [hasIcon]);

    return (
      <RadixDropdownMenuSubContent
        ref={ref}
        className={cx(s.sub_content, themeClassName, className)}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        {...props}
      >
        <LevelProvider hasItemWithIcon={hasItemWithIcon}>
          {children}
        </LevelProvider>
      </RadixDropdownMenuSubContent>
    );
  }
);

SubContent.displayName = DISPLAY_NAME;
