import React, { forwardRef, useId } from 'react';
import { RadioItem as RadixDropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { useLevelContext } from '../../providers/LevelProvider';

import { useContextMenuItemFocus, useSubMenu } from '../../hooks';

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
      onPointerEnter,
      onPointerLeave,
      onPointerMove,

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
      useSubMenu({ onKeyDown, children });

    const { closeRootMenuImmediately } =
      useContextMenuRootContext(DISPLAY_NAME);

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

      handleCloseOnClick();

      onSelect?.(e);
    };

    const handleItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      handleCloseOnClick();

      onClick?.(e);
    };

    return withProvider(
      <RadixDropdownMenuRadioItem
        ref={mergeRefs(ref, itemRef)}
        className={cx(s.radio_item, className)}
        disabled={isDisabled}
        data-highlighted={subMenuOpen || dataHighlighted}
        data-item
        value={value}
        onSelect={handleItemSelect}
        onClick={handleItemClick}
        onFocus={handleItemFocus}
        onMouseEnter={handleItemMouseEnter}
        onBlur={handleItemBlur}
        onMouseLeave={handleItemMouseLeave}
        onPointerEnter={handleItemPointerEnter}
        onPointerLeave={handleItemPointerLeave}
        onPointerMove={handleItemPointerMove}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {children}
      </RadixDropdownMenuRadioItem>
    );
  }
);

RadioItem.displayName = DISPLAY_NAME;
