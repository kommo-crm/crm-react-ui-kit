import React, { forwardRef, MouseEvent, useCallback, useMemo } from 'react';
import cx from 'classnames';

import { useThemeClassName } from '@ui-kit/hooks/useThemeClassName';

import { mergeRefs } from '@ui-kit/lib/utils';

import { noop } from '@ui-kit/utils';

import { useSelectContext } from '../../Select.context';
import { getSelectItemTitle } from '../../Select.types';

import { useListContext } from '../List/List.context';

import Option from '../Option/Option';

import { ItemProps } from './Item.props';
import { isSelectPrevented } from './utils';

import { SelectItemThemeType } from './Item.theme';

import s from './Item.module.css';

const DISPLAY_NAME = 'Select.Item';

type L = HTMLLIElement;

const CONTROL_SELECTOR =
  'input, textarea, select, button, a[href], [contenteditable], [tabindex]';

/**
 * Whether the click target is a control inside the item
 * or a block around one, such as an input with its unit.
 */
const isControlClick = (target: EventTarget, itemElement: Element) => {
  for (
    let node = target instanceof Element ? target : null;
    node && node !== itemElement;
    node = node.parentElement
  ) {
    if (
      node.matches(CONTROL_SELECTOR) ||
      node.querySelector(CONTROL_SELECTOR)
    ) {
      return true;
    }
  }

  return false;
};

export const Item = forwardRef<L, ItemProps>((props, ref) => {
  const {
    item,
    children,
    index,
    className,
    theme,
    title: titleProp,
    isInteractive = false,
    onClick,
    onSelect,
    ...rest
  } = props;

  const themeClassName = useThemeClassName<SelectItemThemeType>(theme);

  const {
    value: selected,
    onChange = noop,
    onHoveredIndexChange,
    hoveredIndex,
  } = useSelectContext(DISPLAY_NAME);

  const { measureItem } = useListContext();

  /**
   * A new merged callback on every render would make React detach
   * and reattach the refs, measuring the item again each time.
   */
  const mergedRef = useMemo(
    () => mergeRefs<L>(ref, measureItem),
    [ref, measureItem]
  );

  const { option, value } = item;

  const handleClick = useCallback(
    (e: MouseEvent<L>) => {
      onClick?.(e);

      if (isInteractive && isControlClick(e.target, e.currentTarget)) {
        return;
      }

      if (isSelectPrevented(onSelect)) {
        return;
      }

      e.preventDefault();

      onHoveredIndexChange(index);

      onChange(item);
    },
    [
      onClick,
      isInteractive,
      onSelect,
      onHoveredIndexChange,
      index,
      onChange,
      item,
    ]
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
      ref={mergedRef}
      title={title}
      data-index={index}
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
