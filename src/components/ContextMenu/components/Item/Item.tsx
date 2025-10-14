import React, { forwardRef, useId, useMemo } from 'react';
import { Item as RadixDropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { useLevelContext } from '../../providers/LevelProvider';

import { hasItemIcon } from '../../utils';

import {
  useContextMenuItemFocus,
  useSubMenu,
  useItemInnerFocus,
} from '../../hooks';

import { useContextMenuRootContext } from '../../ContextMenu.context';

import type { ItemProps } from './Item.props';

import { MaybeAsChild } from './components';

import s from './Item.module.css';

const DISPLAY_NAME = 'ContextMenu.Item';

export const Item = forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
  const {
    className,
    children,
    isDisabled,
    isDanger,
    hasIconCheckFn = hasItemIcon,
    onSelect,
    onClick,
    onFocus,
    onMouseEnter,
    onBlur,
    onMouseLeave,
    onKeyDown,
    isCloseMenuOnClick = true,
    shouldCloseRootMenuOnClick,
    isSelectable: isSelectableProp,
    asChild,

    ...rest
  } = props;

  const id = useId();

  const {
    hasItemWithIcon,
    closeMenuImmediately,
    isCloseOnClick,
    shouldCloseRootMenuOnClick: shouldCloseRootMenuOnClickContext,
  } = useLevelContext(DISPLAY_NAME);

  /**
   * Set the hasIcon state based on the presence of an icon.
   */
  const hasIcon = useMemo(() => hasIconCheckFn(children), [children]);

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
    if (isCloseOnClick && isCloseMenuOnClick) {
      closeMenuImmediately(shouldCloseRootMenuOnClick);

      if (shouldCloseRootMenuOnClick ?? shouldCloseRootMenuOnClickContext) {
        closeRootMenuImmediately?.();
      }
    }
  };

  return isSelectable
    ? withProvider(
        <RadixDropdownMenuItem
          ref={mergeRefs(ref, itemRef, handleNodeRef)}
          className={cx(s.item, className)}
          disabled={isDisabled}
          data-item
          data-danger={isDanger ? '' : undefined}
          data-no-icon-align={hasIcon || !hasItemWithIcon ? '' : undefined}
          data-has-submenu={hasSubmenu ? '' : undefined}
          onSelect={(e) => {
            onSelect?.(e);

            handleCloseOnClick();
          }}
          onClick={(e) => {
            e.stopPropagation();

            const target = e.target as HTMLElement;

            const isLink = target.closest('a');

            if (!isLink) {
              e.preventDefault();
            }

            onClick?.(e);

            handleCloseOnClick();
          }}
          data-highlighted={subMenuOpen || dataHighlighted}
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
        <MaybeAsChild
          ref={mergeRefs(ref, itemRef, handleNodeRef)}
          className={cx(s.item, className)}
          data-not-selectable
          data-item
          data-danger={isDanger ? '' : undefined}
          data-no-icon-align={hasIcon || !hasItemWithIcon ? '' : undefined}
          data-has-submenu={hasSubmenu ? '' : undefined}
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
        </MaybeAsChild>
      );
});

Item.displayName = DISPLAY_NAME;
