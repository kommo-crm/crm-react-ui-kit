import React, { forwardRef } from 'react';
import cx from 'classnames';

import { ItemIconProps } from './ItemIcon.props';

import s from './ItemIcon.module.css';

const DISPLAY_NAME = 'ContextMenu.ItemIcon';

export const ItemIcon = forwardRef<HTMLSpanElement, ItemIconProps>(
  (props, ref) => {
    const { children, className, ...rest } = props;

    return (
      <span ref={ref} className={cx(s.icon, className)} {...rest}>
        {children}
      </span>
    );
  }
);

ItemIcon.displayName = DISPLAY_NAME;
