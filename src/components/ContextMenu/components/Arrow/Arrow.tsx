import React, { forwardRef } from 'react';
import { Arrow as RadixDropdownMenuArrow } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { useContextMenuContext } from '../../ContextMenu.context';

import type { ArrowProps } from './Arrow.props';

import s from './Arrow.module.css';

const DISPLAY_NAME = 'ContextMenu.Arrow';

export const Arrow = forwardRef<SVGSVGElement, ArrowProps>(
  ({ theme, className, ...rest }, ref) => {
    const { inheritedArrowColor } = useContextMenuContext(DISPLAY_NAME);

    const themeClassName = useThemeClassName(theme);

    return (
      <span data-arrow>
        <RadixDropdownMenuArrow
          className={cx(s.arrow_border, themeClassName, className)}
          {...rest}
        />
        <RadixDropdownMenuArrow
          className={cx(s.arrow, themeClassName, className)}
          style={{
            ...(inheritedArrowColor ? { fill: inheritedArrowColor } : {}),
          }}
          ref={ref}
          {...rest}
        />
      </span>
    );
  }
);

Arrow.displayName = DISPLAY_NAME;
