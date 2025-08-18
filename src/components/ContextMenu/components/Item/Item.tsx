import React, { forwardRef } from 'react';
import { Item as RadixDropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { useLevelContext } from '../../providers/LevelProvider';

import { useContextMenuContext } from '../../ContextMenu.context';

import type { ItemProps } from './Item.props';

import s from './Item.module.css';

const DISPLAY_NAME = 'ContextMenu.Item';

export const Item = forwardRef<HTMLDivElement, ItemProps>(
  (
    { theme, className, children, icon, text, isDisabled, isDanger, ...rest },
    ref
  ) => {
    const themeClassName = useThemeClassName(theme);

    const { hasItemWithIcon } = useLevelContext(DISPLAY_NAME);
    const { closeMenuImmediately } = useContextMenuContext(DISPLAY_NAME);

    return (
      <RadixDropdownMenuItem
        ref={ref}
        className={cx(s.item, themeClassName, className)}
        disabled={isDisabled}
        data-item
        data-danger={isDanger ? '' : undefined}
        data-no-icon-align={icon || !hasItemWithIcon ? '' : undefined}
        onSelect={() => closeMenuImmediately()}
        {...rest}
      >
        {icon}
        {text}
        {children}
      </RadixDropdownMenuItem>
    );
  }
);

Item.displayName = DISPLAY_NAME;
