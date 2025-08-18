import React, { forwardRef } from 'react';
import { Separator as RadixDropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import type { SeparatorProps } from './Separator.props';

import s from './Separator.module.css';

const DISPLAY_NAME = 'ContextMenu.Separator';

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ theme, className, ...rest }, ref) => {
    const themeClassName = useThemeClassName(theme);

    return (
      <RadixDropdownMenuSeparator
        ref={ref}
        className={cx(s.separator, themeClassName, className)}
        {...rest}
      />
    );
  }
);

Separator.displayName = DISPLAY_NAME;
