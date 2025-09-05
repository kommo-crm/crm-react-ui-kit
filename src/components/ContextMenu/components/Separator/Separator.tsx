import React, { forwardRef } from 'react';
import { Separator as RadixDropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import type { SeparatorProps } from './Separator.props';

import s from './Separator.module.css';

const DISPLAY_NAME = 'ContextMenu.Separator';

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, ...rest }, ref) => {
    return (
      <RadixDropdownMenuSeparator
        ref={ref}
        className={cx(s.separator, className)}
        data-separator
        {...rest}
      />
    );
  }
);

Separator.displayName = DISPLAY_NAME;
