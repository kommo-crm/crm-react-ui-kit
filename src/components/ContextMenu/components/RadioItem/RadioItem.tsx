import React, { forwardRef } from 'react';
import { RadioItem as RadixDropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { useLevelContext } from '../../providers/LevelProvider';

import type { RadioItemProps } from './RadioItem.props';

import s from './RadioItem.module.css';

const DISPLAY_NAME = 'ContextMenu.RadioItem';

export const RadioItem = forwardRef<HTMLDivElement, RadioItemProps>(
  ({ theme, className, children, icon, text, isDisabled, ...props }, ref) => {
    const themeClassName = useThemeClassName(theme);

    const { hasItemWithIcon } = useLevelContext(DISPLAY_NAME);

    return (
      <RadixDropdownMenuRadioItem
        ref={ref}
        className={cx(s.radio_item, themeClassName, className)}
        disabled={isDisabled}
        data-no-icon-align={icon || !hasItemWithIcon ? '' : undefined}
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
