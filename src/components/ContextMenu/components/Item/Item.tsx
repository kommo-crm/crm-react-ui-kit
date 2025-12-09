import React, { forwardRef, useId } from 'react';
import { Item as RadixDropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { useLevelContext } from '../../providers/LevelProvider';

import {
  useItemInnerFocus,
  useSubMenu,
  useContextMenuItemFocus,
} from '../../hooks';

import { useContextMenuRootContext } from '../../ContextMenu.context';

import type { ItemProps } from './Item.props';

import { NonSelectableItem } from './components';

import s from './Item.module.css';

const DISPLAY_NAME = 'ContextMenu.Item';

export const Item = forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
  const {
    className,
    children,
    isDisabled,
    isDanger,
    shouldCloseCurrentMenuOnSelect = true,
    shouldCloseRootMenuOnSelect = false,
    isSelectable: isSelectableProp,
    asChild,
    onSelect,
    onClick,
    onFocus,
    onMouseEnter,
    onBlur,
    onMouseLeave,
    onKeyDown,
    onPointerEnter,
    onPointerLeave,
    onPointerMove,

    ...rest
  } = props;

  const id = useId();

  const {
    closeMenuImmediately,
    shouldCloseCurrentMenuOnSelect: shouldCloseCurrentMenuOnSelectContext,
    shouldCloseRootMenuOnSelect: shouldCloseRootMenuOnSelectContext,
  } = useLevelContext(DISPLAY_NAME);

  const { closeRootMenuImmediately } = useContextMenuRootContext(DISPLAY_NAME);

  const { itemRef, hasSubmenu, subMenuOpen, handleKeyDown, withProvider } =
    useSubMenu({ onKeyDown });

  const { isSelectableConsideringInputFocus, handleNodeRef } =
    useItemInnerFocus({
      id,
      isSelectableProp,
      displayName: DISPLAY_NAME,
    });

  const {
    dataHighlighted,
    onFocus: handleItemFocus,
    onMouseEnter: handleItemMouseEnter,
    onBlur: handleItemBlur,
    onMouseLeave: handleItemMouseLeave,
    onPointerEnter: handleItemPointerEnter,
    onPointerLeave: handleItemPointerLeave,
    onPointerMove: handleItemPointerMove,
  } = useContextMenuItemFocus({
    displayName: DISPLAY_NAME,
    ref: itemRef,
    id,
    isDisabled,
    hasSubmenu,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    onPointerEnter,
    onPointerLeave,
    onPointerMove,
    isSelectable: isSelectableConsideringInputFocus,
  });

  const handleCloseOnClick = () => {
    if (
      shouldCloseCurrentMenuOnSelect &&
      shouldCloseCurrentMenuOnSelectContext
    ) {
      closeMenuImmediately();

      if (shouldCloseRootMenuOnSelect && shouldCloseRootMenuOnSelectContext) {
        closeRootMenuImmediately?.();
      }
    }
  };

  const handleItemSelect = (e: Event) => {
    /**
     * Otherwise, when clicking from the second nesting level,
     * the parent menu will always close.
     */
    e.preventDefault();

    if (isSelectableConsideringInputFocus && !isDisabled) {
      handleCloseOnClick();
    }

    onSelect?.(e);
  };

  const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isSelectableConsideringInputFocus && !isDisabled) {
      handleCloseOnClick();
    }

    onClick?.(e);
  };

  return isSelectableConsideringInputFocus
    ? withProvider(
        <RadixDropdownMenuItem
          ref={mergeRefs(ref, itemRef, handleNodeRef)}
          className={cx(
            s.item,
            {
              [s.danger]: isDanger,
              [s.disabled]: isDisabled,
            },
            className
          )}
          data-has-submenu={hasSubmenu ? '' : undefined}
          /**
           * Standart Radix attribute for highlighting the focused item.
           */
          data-highlighted={subMenuOpen || dataHighlighted}
          disabled={isDisabled}
          data-item
          onSelect={handleItemSelect}
          onClick={handleItemClick}
          onFocus={handleItemFocus}
          onMouseEnter={handleItemMouseEnter}
          onBlur={handleItemBlur}
          onMouseLeave={handleItemMouseLeave}
          onKeyDown={handleKeyDown}
          onPointerEnter={handleItemPointerEnter}
          onPointerLeave={handleItemPointerLeave}
          onPointerMove={handleItemPointerMove}
          asChild={asChild}
          {...rest}
        >
          {children}
        </RadixDropdownMenuItem>
      )
    : withProvider(
        <NonSelectableItem
          ref={mergeRefs(ref, itemRef, handleNodeRef)}
          className={cx(
            s.item,
            s.nonSelectable,
            {
              [s.danger]: isDanger,
            },
            className
          )}
          data-has-submenu={hasSubmenu ? '' : undefined}
          data-item
          onFocus={onFocus}
          onMouseEnter={onMouseEnter}
          onBlur={onBlur}
          onMouseLeave={onMouseLeave}
          onKeyDown={onKeyDown}
          onClick={onClick}
          onPointerEnter={handleItemPointerEnter}
          onPointerLeave={handleItemPointerLeave}
          onPointerMove={handleItemPointerMove}
          asChild={asChild}
          {...rest}
        >
          {children}
        </NonSelectableItem>
      );
});

Item.displayName = DISPLAY_NAME;
