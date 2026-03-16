import React, { forwardRef, MouseEvent, useCallback } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { noop } from 'src/utils';

import { useSelectContext } from '../../Select.context';

import Option from '../Option/Option';

import { ItemProps } from './Item.props';

import { SelectItemThemeType } from './Item.theme';

import s from './Item.module.css';

const DISPLAY_NAME = 'Select.Item';

type L = HTMLLIElement;

export const Item = forwardRef<L, ItemProps>((props, ref) => {
  const { item, children, index, className, theme, ...rest } = props;

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

  return (
    <li
      {...rest}
      ref={ref}
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
