import React, { forwardRef } from 'react';
import { Arrow as RadixDropdownMenuArrow } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import type { ArrowProps } from './Arrow.props';

import s from './Arrow.module.css';

const DISPLAY_NAME = 'ContextMenu.Arrow';

export const Arrow = forwardRef<SVGSVGElement, ArrowProps>(
  ({ theme, className, ...props }, ref) => {
    const themeClassName = useThemeClassName(theme);

    return (
      <>
        <RadixDropdownMenuArrow
          className={cx(s.arrow_border, themeClassName, className)}
          {...props}
        />
        <RadixDropdownMenuArrow
          className={cx(s.arrow, themeClassName, className)}
          ref={ref}
          {...props}
        />
      </>
    );
  }
);

Arrow.displayName = DISPLAY_NAME;
