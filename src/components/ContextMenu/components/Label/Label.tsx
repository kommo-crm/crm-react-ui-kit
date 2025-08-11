import React, { forwardRef } from 'react';
import { Label as RadixDropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { useLevelContext } from '../../providers/LevelProvider';

import type { LabelProps } from './Label.props';

import s from './Label.module.css';

const DISPLAY_NAME = 'ContextMenu.Label';

export const Label = forwardRef<HTMLDivElement, LabelProps>(
  ({ theme, className, children, icon, text, ...props }, ref) => {
    const themeClassName = useThemeClassName(theme);

    const { hasItemWithIcon } = useLevelContext(DISPLAY_NAME);

    return (
      <RadixDropdownMenuLabel
        ref={ref}
        className={cx(s.label, themeClassName, className)}
        data-no-icon-align={icon || !hasItemWithIcon ? '' : undefined}
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
