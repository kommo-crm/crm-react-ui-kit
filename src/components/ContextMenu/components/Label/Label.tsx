import React, { forwardRef } from 'react';
import { Label as RadixDropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useLevelContext } from '../../providers/LevelProvider';

import type { LabelProps } from './Label.props';

import s from './Label.module.css';

const DISPLAY_NAME = 'ContextMenu.Label';

export const Label = forwardRef<HTMLDivElement, LabelProps>(
  ({ className, children, icon, text, ...rest }, ref) => {
    const { hasItemWithIcon } = useLevelContext(DISPLAY_NAME);

    return (
      <RadixDropdownMenuLabel
        ref={ref}
        className={cx(s.label, className)}
        data-no-icon-align={icon || !hasItemWithIcon ? '' : undefined}
        data-label
        {...rest}
      >
        {icon}
        {text}
        {children}
      </RadixDropdownMenuLabel>
    );
  }
);

Label.displayName = DISPLAY_NAME;
