import React, { forwardRef, useId } from 'react';
import { CheckboxItem as RadixDropdownMenuCheckboxItem } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useLevelContext } from '../../providers/LevelProvider';

import { useContextMenuContext } from '../../ContextMenu.context';

import { hasItemIcon } from '../../utils';

import { useContextMenuItemFocus } from '../../hooks';

import type { CheckboxItemProps } from './CheckboxItem.props';

import s from './CheckboxItem.module.css';

const DISPLAY_NAME = 'ContextMenu.CheckboxItem';

export const CheckboxItem = forwardRef<HTMLDivElement, CheckboxItemProps>(
  ({ className, children, onChange, isDisabled, isChecked, ...rest }, ref) => {
    const id = useId();

    const { hasItemWithIcon } = useLevelContext(DISPLAY_NAME);
    const { closeMenuImmediately } = useContextMenuContext(DISPLAY_NAME);

    const { dataHighlighted, onFocus, onMouseEnter, onBlur, onMouseLeave } =
      useContextMenuItemFocus({
        displayName: DISPLAY_NAME,
        id,
        isDisabled,
        isNotSelectable: false,
      });

    return (
      <RadixDropdownMenuCheckboxItem
        ref={ref}
        className={cx(s.checkbox_item, className)}
        disabled={isDisabled}
        checked={isChecked}
        data-item
        data-no-icon-align={
          hasItemIcon(children) || !hasItemWithIcon ? '' : undefined
        }
        onCheckedChange={(checked) => {
          if (onChange) {
            const event = {
              target: { checked },
            } as React.ChangeEvent<HTMLInputElement>;

            onChange(event);
          }
        }}
        onSelect={() => closeMenuImmediately()}
        data-highlighted={dataHighlighted}
        onFocus={onFocus}
        onMouseEnter={onMouseEnter}
        onBlur={onBlur}
        onMouseLeave={onMouseLeave}
        {...rest}
      >
        {children}
      </RadixDropdownMenuCheckboxItem>
    );
  }
);

CheckboxItem.displayName = DISPLAY_NAME;
