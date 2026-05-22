import React, { forwardRef } from 'react';
import cx from 'classnames';

import { ItemProps } from './Item.props';

import s from './Item.module.css';

const DISPLAY_NAME = 'List.Item';

export const Item = forwardRef<HTMLLIElement, ItemProps>((props, ref) => {
  const { className = '', children, ...rest } = props;

  return (
    <li ref={ref} className={cx(s.item, className)} {...rest}>
      {children}
    </li>
  );
});

Item.displayName = DISPLAY_NAME;
