import React, { forwardRef } from 'react';
import { ItemIndicator as RadixDropdownMenuItemIndicator } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import type { ItemIndicatorProps } from './ItemIndicator.props';

import s from './ItemIndicator.module.css';

const DISPLAY_NAME = 'ContextMenu.ItemIndicator';

type El = HTMLDivElement;
type P = ItemIndicatorProps;

export const ItemIndicator = forwardRef<El, P>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <RadixDropdownMenuItemIndicator
      ref={ref}
      className={cx(s.item_indicator, className)}
      {...rest}
    >
      {children}
    </RadixDropdownMenuItemIndicator>
  );
});

ItemIndicator.displayName = DISPLAY_NAME;
