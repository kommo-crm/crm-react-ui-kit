import React, { forwardRef, useLayoutEffect, useMemo, useState } from 'react';
import { SubContent as RadixDropdownMenuSubContent } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { hasAnyItemWithIcon } from 'src/components/ContextMenu/utils';

import { useContextMenuContext } from 'src/components/ContextMenu/ContextMenu.context';

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
      <RadixDropdownMenuSubContent
        ref={ref}
        className={cx(s.content, themeClassName, className)}
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

Content.displayName = DISPLAY_NAME;
