import React, { forwardRef, useId } from 'react';
import { RadioItem as RadixDropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { useLevelContext } from '../../providers/LevelProvider';

import {
  useChildrenWithBlocker,
  useContextMenuItemFocus,
  useSubMenu,
} from '../../hooks';

import { useRadioGroupContext } from '../RadioGroup';

import { useContextMenuRootContext } from '../../ContextMenu.context';

import type { RadioItemProps } from './RadioItem.props';

import s from './RadioItem.module.css';

const DISPLAY_NAME = 'ContextMenu.RadioItem';

export const RadioItem = forwardRef<HTMLDivElement, RadioItemProps>(
  (
    {
      className,
      children,
      isDisabled,
      shouldCloseCurrentMenuOnSelect = true,
      shouldCloseRootMenuOnSelect = false,
      value,
      onMouseEnter,
      onBlur,
      onMouseLeave,
      onSelect,
      onFocus,
      onClick,
      onKeyDown,

      ...rest
    },
    ref
  ) => {
    const id = useId();

    const {
      closeMenuImmediately,
      shouldCloseCurrentMenuOnSelect: shouldCloseCurrentMenuOnSelectContext,
      shouldCloseRootMenuOnSelect: shouldCloseRootMenuOnSelectContext,
    } = useLevelContext(DISPLAY_NAME);

    const { itemRef, hasSubmenu, subMenuOpen, handleKeyDown, withProvider } =
      useSubMenu({ onKeyDown });

    const { closeRootMenuImmediately } =
      useContextMenuRootContext(DISPLAY_NAME);

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

    const { onChange } = useRadioGroupContext(DISPLAY_NAME);

    const content = useChildrenWithBlocker({
      children,
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

    const handleSelect = (e: Event) => {
      onSelect?.(e);

      handleCloseOnClick();
    };

    /**
     * Handles click on radio item.
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

      onChange(value);

      handleCloseOnClick();
    };

    return withProvider(
      <RadixDropdownMenuRadioItem
        ref={mergeRefs(ref, itemRef)}
        className={cx(s.radio_item, className)}
        disabled={isDisabled}
        data-highlighted={subMenuOpen || dataHighlighted}
        data-item
        value={value}
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
      </RadixDropdownMenuRadioItem>
    );
  }
);

RadioItem.displayName = DISPLAY_NAME;
