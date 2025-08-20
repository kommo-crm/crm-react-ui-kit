import React, { forwardRef } from 'react';
import { RadioItem as RadixDropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useLevelContext } from '../../providers/LevelProvider';

import { useContextMenuContext } from '../../ContextMenu.context';

import type { RadioItemProps } from './RadioItem.props';

import s from './RadioItem.module.css';

const DISPLAY_NAME = 'ContextMenu.RadioItem';

export const RadioItem = forwardRef<HTMLDivElement, RadioItemProps>(
  ({ className, children, icon, text, isDisabled, ...rest }, ref) => {
    const { hasItemWithIcon } = useLevelContext(DISPLAY_NAME);
    const { closeMenuImmediately } = useContextMenuContext(DISPLAY_NAME);

    return (
      <RadixDropdownMenuRadioItem
        ref={ref}
        className={cx(s.radio_item, className)}
        disabled={isDisabled}
        data-item
        data-no-icon-align={icon || !hasItemWithIcon ? '' : undefined}
        onSelect={() => closeMenuImmediately()}
        {...rest}
      >
        {icon}
        {text}
        {children}
      </RadixDropdownMenuRadioItem>
    );
  }
);

RadioItem.displayName = DISPLAY_NAME;
