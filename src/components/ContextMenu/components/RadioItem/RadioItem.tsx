import React, { forwardRef, useId, useMemo } from 'react';
import { RadioItem as RadixDropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useLevelContext } from '../../providers/LevelProvider';

import { useContextMenuContext } from '../../ContextMenu.context';

import { hasItemIcon } from '../../utils';

import { useContextMenuItemFocus } from '../../hooks';

import { useRadioGroupContext } from '../RadioGroup';

import type { RadioItemProps } from './RadioItem.props';

import s from './RadioItem.module.css';

const DISPLAY_NAME = 'ContextMenu.RadioItem';

export const RadioItem = forwardRef<HTMLDivElement, RadioItemProps>(
  (
    {
      className,
      children,
      isDisabled,
      hasIconCheckFn = hasItemIcon,
      onFocus,
      onMouseEnter,
      onBlur,
      onMouseLeave,
      onSelect,
      onClick,
      isCloseMenuOnClick = true,
      value,

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

    const { onChange } = useRadioGroupContext(DISPLAY_NAME);

    return (
      <RadixDropdownMenuRadioItem
        ref={ref}
        className={cx(s.radio_item, className)}
        disabled={isDisabled}
        data-item
        data-no-icon-align={hasIcon || !hasItemWithIcon ? '' : undefined}
        data-highlighted={dataHighlighted}
        onSelect={(e) => {
          onSelect?.(e);

          if (isCloseOnClick && isCloseMenuOnClick) {
            closeMenuImmediately(true);
          }
        }}
        onClick={(e) => {
          e.preventDefault();

          onChange(value);
          onClick?.(e);

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
        value={value}
        {...rest}
      >
        {children}
      </RadixDropdownMenuRadioItem>
    );
  }
);

RadioItem.displayName = DISPLAY_NAME;
