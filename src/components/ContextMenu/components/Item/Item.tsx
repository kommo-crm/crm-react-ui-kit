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
    shouldCloseRootMenuOnSelect = true,
    isSelectable: isInitialSelectable,
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

  const {
    itemRef,
    hasSubmenu,
    isSubMenuOpen,
    handleSubMenuOpenByKeyDown,
    withProvider,
    subMenuTriggerId,
  } = useSubMenu({ children });

  const { isSelectableConsideringInputFocus, handleNodeRef } =
    useItemInnerFocus({
      id,
      isSelectable: isInitialSelectable,
      displayName: DISPLAY_NAME,
    });

  const {
    dataHighlighted,
    onFocus: handleFocus,
    onMouseEnter: handleMouseEnter,
    onBlur: handleBlur,
    onMouseLeave: handleMouseLeave,
    onPointerEnter: handlePointerEnter,
    onPointerLeave: handlePointerLeave,
    onPointerMove: handlePointerMove,
  } = useContextMenuItemFocus({
    displayName: DISPLAY_NAME,
    ref: itemRef,
    id,
    isDisabled,
    hasSubmenu,
    subMenuTriggerId,
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

  const handleSelect = (e: Event) => {
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

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isSelectableConsideringInputFocus && !isDisabled) {
      handleCloseOnClick();
    }

    onClick?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    handleSubMenuOpenByKeyDown(e);

    onKeyDown?.(e);
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
          /**
           * Standart Radix attribute for highlighting the focused item.
           */
          data-highlighted={isSubMenuOpen || dataHighlighted}
          disabled={isDisabled}
          data-item
          onSelect={handleSelect}
          onClick={handleClick}
          onFocus={handleFocus}
          onMouseEnter={handleMouseEnter}
          onBlur={handleBlur}
          onMouseLeave={handleMouseLeave}
          onKeyDown={handleKeyDown}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerMove={handlePointerMove}
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
          data-item
          data-non-selectable
          onFocus={onFocus}
          onMouseEnter={onMouseEnter}
          onBlur={onBlur}
          onMouseLeave={onMouseLeave}
          onKeyDown={onKeyDown}
          onClick={onClick}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerMove={handlePointerMove}
          asChild={asChild}
          {...rest}
        >
          {children}
        </NonSelectableItem>
      );
});

Item.displayName = DISPLAY_NAME;
