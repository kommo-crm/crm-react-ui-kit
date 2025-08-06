import React, { forwardRef } from 'react';
import { Label as RadixDropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import type { LabelProps } from './Label.props';

import s from './Label.module.css';

const DISPLAY_NAME = 'ContextMenu.Label';

export const Label = forwardRef<HTMLDivElement, LabelProps>(
  ({ theme, className, children, icon, text, ...props }, ref) => {
    const themeClassName = useThemeClassName(theme);

    return (
      <RadixDropdownMenuLabel
        ref={ref}
        className={cx(s.label, themeClassName, className)}
        data-has-icon={icon ? '' : undefined}
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
