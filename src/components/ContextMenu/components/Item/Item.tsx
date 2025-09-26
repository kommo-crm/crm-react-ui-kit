import React, { forwardRef, useId, useMemo } from 'react';
import { Item as RadixDropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { useLevelContext } from '../../providers/LevelProvider';

import { useContextMenuContext } from '../../ContextMenu.context';

import { hasItemIcon } from '../../utils';

import { useContextMenuItemFocus, useSubMenu } from '../../hooks';

import type { ItemProps, SelectableItemProps } from './Item.props';

import s from './Item.module.css';

const DISPLAY_NAME = 'ContextMenu.Item';

export const Item = forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
  const { hasItemWithIcon } = useLevelContext(DISPLAY_NAME);

  if ('isSelectable' in props && props.isSelectable === false) {
    const {
      className,
      children,
      isSelectable,
      hasIconCheckFn = hasItemIcon,
      ...rest
    } = props;

    /**
     * Set the hasIcon state based on the presence of an icon.
     */
    const hasIcon = useMemo(() => hasIconCheckFn(children), [children]);

    return (
      <div
        ref={ref}
        className={cx(s.item, className)}
        data-not-selectable={!isSelectable}
        data-no-icon-align={hasIcon || !hasItemWithIcon ? '' : undefined}
        {...rest}
      >
        {children}
      </div>
    );
  }

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

    ...rest
  } = props as SelectableItemProps;

  const id = useId();

  /**
   * Set the hasIcon state based on the presence of an icon.
   */
  const hasIcon = useMemo(() => hasIconCheckFn(children), [children]);

  const { closeMenuImmediately, isCloseOnClick } =
    useContextMenuContext(DISPLAY_NAME);

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
    id,
    isDisabled,
    hasSubmenu,
  });

  return withProvider(
    <RadixDropdownMenuItem
      ref={mergeRefs(ref, itemRef)}
      className={cx(s.item, className)}
      disabled={isDisabled}
      data-item
      data-danger={isDanger ? '' : undefined}
      data-no-icon-align={hasIcon || !hasItemWithIcon ? '' : undefined}
      data-has-submenu={hasSubmenu ? '' : undefined}
      onSelect={(e) => {
        onSelect?.(e);

        if (isCloseOnClick && isCloseMenuOnClick) {
          closeMenuImmediately(true);
        }
      }}
      onClick={(e) => {
        const target = e.target as HTMLElement;

        const isLink = target.closest('a');

        if (!isLink) {
          e.preventDefault();
        }

        onClick?.(e);

        if (isCloseOnClick && isCloseMenuOnClick) {
          closeMenuImmediately(true);
        }
      }}
      data-highlighted={subMenuOpen || dataHighlighted}
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
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
    </RadixDropdownMenuItem>
  );
});

Item.displayName = DISPLAY_NAME;
