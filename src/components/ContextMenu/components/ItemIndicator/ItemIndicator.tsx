import React, { forwardRef, useEffect, useRef } from 'react';
import { ItemIndicator as RadixDropdownMenuItemIndicator } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { useLevelContext } from '../../providers';

import { isFirstElement } from '../../utils';

import type { ItemIndicatorProps } from './ItemIndicator.props';

import s from './ItemIndicator.module.css';

const DISPLAY_NAME = 'ContextMenu.ItemIndicator';

export const ItemIndicator = forwardRef<HTMLDivElement, ItemIndicatorProps>(
  ({ className, children, ...rest }, ref) => {
    const { setHasItemWithIcon } = useLevelContext(DISPLAY_NAME);
    const localRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
      if (isFirstElement(localRef)) {
        setHasItemWithIcon(true);
      }
    }, [setHasItemWithIcon]);

    return (
      <RadixDropdownMenuItemIndicator
        ref={mergeRefs(ref, localRef)}
        className={cx(s.item_indicator, className)}
        {...rest}
      >
        {children}
      </RadixDropdownMenuItemIndicator>
    );
  }
);

ItemIndicator.displayName = DISPLAY_NAME;
