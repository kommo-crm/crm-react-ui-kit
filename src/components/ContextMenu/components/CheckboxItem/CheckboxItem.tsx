import React, { forwardRef, useId, useMemo } from 'react';
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
  (
    {
      className,
      children,
      onChange,
      isDisabled,
      isChecked,
      hasIconCheckFn = hasItemIcon,
      onFocus,
      onMouseEnter,
      onBlur,
      onMouseLeave,
      onSelect,
      onClick,
      isCloseMenuOnClick = true,
      onCheckedChange,

      ...rest
    },
    ref
  ) => {
    const id = useId();

    const { hasItemWithIcon } = useLevelContext(DISPLAY_NAME);
    const { closeMenuImmediately, isCloseOnClick } =
      useContextMenuContext(DISPLAY_NAME);

    const {
      dataHighlighted,
      onFocus: handleItemFocus,
      onMouseEnter: handleItemMouseEnter,
      onBlur: handleItemBlur,
      onMouseLeave: handleItemMouseLeave,
    } = useContextMenuItemFocus({
      displayName: DISPLAY_NAME,
      id,
      isDisabled,
    });

    const hasIcon = useMemo(() => hasIconCheckFn(children), [children]);

    const handleCheckedChange = (checked: boolean) => {
      onCheckedChange?.(checked);

      if (onChange) {
        const event = {
          target: { checked },
        } as React.ChangeEvent<HTMLInputElement>;

        onChange(event);
      }
    };

    return (
      <RadixDropdownMenuCheckboxItem
        ref={ref}
        className={cx(s.checkbox_item, className)}
        disabled={isDisabled}
        checked={isChecked}
        data-item
        data-no-icon-align={hasIcon || !hasItemWithIcon ? '' : undefined}
        onCheckedChange={handleCheckedChange}
        data-highlighted={dataHighlighted}
        onSelect={(e) => {
          onSelect?.(e);

          if (isCloseOnClick && isCloseMenuOnClick) {
            closeMenuImmediately(true);
          }
        }}
        onClick={(e) => {
          e.preventDefault();

          onClick?.(e);

          handleCheckedChange(!isChecked);

          if (isCloseOnClick && isCloseMenuOnClick) {
            closeMenuImmediately(true);
          }
        }}
        onFocus={(e) => {
          handleItemFocus?.();

          onFocus?.(e);
        }}
        onMouseEnter={(e) => {
          handleItemMouseEnter?.(e);

          onMouseEnter?.(e);
        }}
        onBlur={(e) => {
          handleItemBlur?.();

          onBlur?.(e);
        }}
        onMouseLeave={(e) => {
          handleItemMouseLeave?.(e);

          onMouseLeave?.(e);
        }}
        {...rest}
      >
        {children}
      </RadixDropdownMenuCheckboxItem>
    );
  }
);

CheckboxItem.displayName = DISPLAY_NAME;
