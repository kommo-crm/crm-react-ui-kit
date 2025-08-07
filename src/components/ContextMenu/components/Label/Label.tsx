import React, { forwardRef } from 'react';
import { Label as RadixDropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { useContextMenuContext } from '../../ContextMenu.context';

import { useLevelProviderContext } from '../LevelProvider';

import type { LabelProps } from './Label.props';

import s from './Label.module.css';

const DISPLAY_NAME = 'ContextMenu.Label';

export const Label = forwardRef<HTMLDivElement, LabelProps>(
  ({ theme, className, children, icon, text, ...props }, ref) => {
    const { disableItemIconAlign } = useContextMenuContext(DISPLAY_NAME);
    const { hasItemWithIcon } = useLevelProviderContext(DISPLAY_NAME);

    const themeClassName = useThemeClassName(theme);

    return (
      <RadixDropdownMenuLabel
        ref={ref}
        className={cx(s.label, themeClassName, className)}
        data-no-icon-align={
          icon || (!disableItemIconAlign && !hasItemWithIcon) ? '' : undefined
        }
        {...props}
      >
        {icon}
        {text}
        {children}
      </RadixDropdownMenuLabel>
    );
  }
);

Label.displayName = DISPLAY_NAME;
