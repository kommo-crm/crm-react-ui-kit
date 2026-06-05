import React, { forwardRef, MouseEvent, useCallback } from 'react';
import cx from 'classnames';

import { useThemeClassName } from '@ui-kit/hooks/useThemeClassName';

import { noop } from '@ui-kit/utils';

import { useSelectContext } from '../../Select.context';
import { getSelectItemTitle } from '../../Select.types';

import Option from '../Option/Option';

import { ItemProps } from './Item.props';

import { SelectItemThemeType } from './Item.theme';

import s from './Item.module.css';

const DISPLAY_NAME = 'Select.Item';

type L = HTMLLIElement;

export const Item = forwardRef<L, ItemProps>((props, ref) => {
  const {
    item,
    children,
    index,
    className,
    theme,
    title: titleProp,
    ...rest
  } = props;

  const themeClassName = useThemeClassName<SelectItemThemeType>(theme);

  const {
    value: selected,
    onChange = noop,
    onHoveredIndexChange,
    hoveredIndex,
  } = useSelectContext(DISPLAY_NAME);

  const { option, value } = item;

  const handleClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();

      onHoveredIndexChange(index);

      onChange(item);
    },
    [onChange, item]
  );

  const isSelected = selected?.value === value;
  const isHovered = hoveredIndex === index;

  /**
   *  Default-rendered <li> shows the native tooltip for the (possibly truncated)
   *  option. When `children` is provided, the consumer is in charge of composing
   *  their own tooltip (they can still pass `title` to <Select.Item> directly).
   */
  const title = titleProp ?? (children ? undefined : getSelectItemTitle(item));

  return (
    <li
      {...rest}
      ref={ref}
      title={title}
      className={cx(
        s.item,
        {
          [s.selected]: isSelected,
          [s.hovered]: isHovered,
        },
        className,
        themeClassName
      )}
      onClick={handleClick}
    >
      {children ? children : <Option>{option}</Option>}
    </li>
  );
});

Item.displayName = DISPLAY_NAME;
