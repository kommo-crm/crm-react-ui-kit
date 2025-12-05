import React, { forwardRef, useId } from 'react';
import { Item as RadixDropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { useLevelContext } from '../../providers/LevelProvider';

import {
  useContextMenuItemFocus,
  useSubMenu,
  useItemInnerFocus,
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

  const {
    dataHighlighted,
    onFocus: handleItemFocus,
    onMouseEnter: handleItemMouseEnter,
    onBlur: handleItemBlur,
    onMouseLeave: handleItemMouseLeave,
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
  });

  const { isSelectable, handleNodeRef, childrenWithBlocker } =
    useItemInnerFocus({
      id,
      children,
      isSelectableProp,
      displayName: DISPLAY_NAME,
      blockerClassName: s.blocker,
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
    onSelect?.(e);

    handleCloseOnClick();
  };

  /**
   * Handles click on selectable item.
   *
   * - stopPropagation: prevent click from bubbling to parent menu items
   * - preventDefault: only for non-link items to allow links to navigate normally
   */
  const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const target = e.target as HTMLElement;

    const isLink = target.closest('a');

    if (!isLink) {
      e.preventDefault();
    }

    onClick?.(e);

    handleCloseOnClick();
  };

  return isSelectable && !isDisabled
    ? withProvider(
        <RadixDropdownMenuItem
          ref={mergeRefs(ref, itemRef, handleNodeRef)}
          className={cx(s.item, className, { [s.danger]: isDanger })}
          data-has-submenu={hasSubmenu ? '' : undefined}
          /**
           * Standart Radix attribute for highlighting the focused item.
           */
          data-highlighted={subMenuOpen || dataHighlighted}
          data-item
          onSelect={handleItemSelect}
          onClick={handleItemClick}
          onFocus={handleItemFocus}
          onMouseEnter={handleItemMouseEnter}
          onBlur={handleItemBlur}
          onMouseLeave={handleItemMouseLeave}
          onKeyDown={handleKeyDown}
          asChild={asChild}
          {...rest}
        >
          {childrenWithBlocker}
        </RadixDropdownMenuItem>
      )
    : withProvider(
        <NonSelectableItem
          ref={mergeRefs(ref, itemRef, handleNodeRef)}
          className={cx(s.item, className, {
            [s.danger]: isDanger,
            [s.nonSelectable]: !isSelectable,
            [s.disabled]: isDisabled,
          })}
          data-has-submenu={hasSubmenu ? '' : undefined}
          data-item
          onFocus={onFocus}
          onMouseEnter={onMouseEnter}
          onBlur={onBlur}
          onMouseLeave={onMouseLeave}
          onKeyDown={onKeyDown}
          onClick={onClick}
          asChild={asChild}
          {...rest}
        >
          {children}
        </NonSelectableItem>
      );
});

Item.displayName = DISPLAY_NAME;
