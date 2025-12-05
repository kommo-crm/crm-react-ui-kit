import React, { forwardRef, useId } from 'react';
import { CheckboxItem as RadixDropdownMenuCheckboxItem } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { useLevelContext } from '../../providers/LevelProvider';

import {
  useChildrenWithBlocker,
  useContextMenuItemFocus,
  useSubMenu,
} from '../../hooks';

import { useContextMenuRootContext } from '../../ContextMenu.context';

import type { CheckboxItemProps } from './CheckboxItem.props';

import s from './CheckboxItem.module.css';

const DISPLAY_NAME = 'ContextMenu.CheckboxItem';

export const CheckboxItem = forwardRef<HTMLDivElement, CheckboxItemProps>(
  (props, ref) => {
    const {
      className,
      children,
      isDisabled,
      isChecked,
      shouldCloseCurrentMenuOnSelect = true,
      shouldCloseRootMenuOnSelect = false,
      onChange,
      onFocus,
      onMouseEnter,
      onBlur,
      onMouseLeave,
      onSelect,
      onClick,
      onCheckedChange,
      onKeyDown,

      ...rest
    } = props;

    const id = useId();

    const {
      closeMenuImmediately,
      shouldCloseCurrentMenuOnSelect: shouldCloseCurrentMenuOnSelectContext,
      shouldCloseRootMenuOnSelect: shouldCloseRootMenuOnSelectContext,
    } = useLevelContext(DISPLAY_NAME);

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

    const { closeRootMenuImmediately } =
      useContextMenuRootContext(DISPLAY_NAME);

    const content = useChildrenWithBlocker({
      children,
      displayName: DISPLAY_NAME,
      blockerClassName: s.blocker,
    });

    const handleCheckedChange = (checked: boolean) => {
      onCheckedChange?.(checked);

      if (onChange) {
        const event = {
          target: { checked },
        } as React.ChangeEvent<HTMLInputElement>;

        onChange(event);
      }
    };

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
      onSelect?.(e);

      handleCloseOnClick();
    };

    /**
     * Handles click on checkbox item.
     *
     * - stopPropagation: prevent click from bubbling to parent menu items
     * - preventDefault: only for non-link items to allow links to navigate normally
     */
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      const target = e.target as HTMLElement;
      const isLink = target.closest('a');

      if (!isLink) {
        e.preventDefault();
      }

      onClick?.(e);

      handleCheckedChange(!isChecked);

      handleCloseOnClick();
    };

    return withProvider(
      <RadixDropdownMenuCheckboxItem
        ref={mergeRefs(ref, itemRef)}
        className={cx(s.checkbox_item, className)}
        disabled={isDisabled}
        checked={isChecked}
        data-highlighted={subMenuOpen || dataHighlighted}
        data-item
        onCheckedChange={handleCheckedChange}
        onSelect={handleSelect}
        onClick={handleClick}
        onFocus={handleItemFocus}
        onMouseEnter={handleItemMouseEnter}
        onBlur={handleItemBlur}
        onMouseLeave={handleItemMouseLeave}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {content}
      </RadixDropdownMenuCheckboxItem>
    );
  }
);

CheckboxItem.displayName = DISPLAY_NAME;
