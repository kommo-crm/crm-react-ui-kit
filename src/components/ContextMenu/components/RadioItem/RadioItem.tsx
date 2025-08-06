import React, { forwardRef, useEffect } from 'react';
import { RadioItem as RadixDropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { useLevelProviderContext } from '../LevelProvider';

import { useContextMenuContext } from '../../ContextMenu.context';

import type { RadioItemProps } from './RadioItem.props';

import s from './RadioItem.module.css';

const DISPLAY_NAME = 'ContextMenu.RadioItem';

export const RadioItem = forwardRef<HTMLDivElement, RadioItemProps>(
  ({ theme, className, children, icon, text, isDisabled, ...props }, ref) => {
    const { disableItemIconAlign } = useContextMenuContext(DISPLAY_NAME);
    const { hasItemWithIcon, registerItemWithItem } =
      useLevelProviderContext(DISPLAY_NAME);

    const themeClassName = useThemeClassName(theme);

    useEffect(() => {
      if (icon) {
        registerItemWithItem();
      }
    }, [icon]);

    return (
      <RadixDropdownMenuRadioItem
        ref={ref}
        className={cx(s.radio_item, themeClassName, className)}
        disabled={isDisabled}
        data-no-icon-align={
          icon || (!disableItemIconAlign && !hasItemWithIcon) ? '' : undefined
        }
        {...props}
      >
        {icon}
        {text}
        {children}
      </RadixDropdownMenuRadioItem>
    );
  }
);

RadioItem.displayName = DISPLAY_NAME;
