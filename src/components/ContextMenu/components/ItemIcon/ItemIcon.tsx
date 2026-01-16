import React, { forwardRef } from 'react';
import cx from 'classnames';

import { ItemIconProps } from './ItemIcon.props';

import s from './ItemIcon.module.css';

const DISPLAY_NAME = 'ContextMenu.ItemIcon';

type El = HTMLSpanElement;

export const ItemIcon = forwardRef<El, ItemIconProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <span ref={ref} className={cx(s.icon, className)} {...rest}>
      {children}
    </span>
  );
});

ItemIcon.displayName = DISPLAY_NAME;
