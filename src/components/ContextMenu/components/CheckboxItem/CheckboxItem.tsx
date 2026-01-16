import React, { forwardRef, useId } from 'react';
import { CheckboxItem as RadixDropdownMenuCheckboxItem } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { useLevelContext } from '../../providers/LevelProvider';

import { useContextMenuItemFocus, useSubMenu } from '../../hooks';

import { useContextMenuRootContext } from '../../ContextMenu.context';

import type { CheckboxItemProps } from './CheckboxItem.props';

import s from './CheckboxItem.module.css';

const DISPLAY_NAME = 'ContextMenu.CheckboxItem';

type El = HTMLDivElement;

export const CheckboxItem = forwardRef<El, CheckboxItemProps>((props, ref) => {
  const {
    className,
    children,
    isDisabled,
    isChecked,
    shouldCloseCurrentMenuOnSelect = true,
    shouldCloseRootMenuOnSelect = true,
    onChange,
    onFocus,
    onMouseEnter,
    onBlur,
    onMouseLeave,
    onSelect,
    onClick,
    onCheckedChange,
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

  const {
    itemRef,
    hasSubmenu,
    isSubMenuOpen,
    handleSubMenuOpenByKeyDown,
    withProvider,
    subMenuTriggerId,
  } = useSubMenu({ children });

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
  });

  const { closeRootMenuImmediately } = useContextMenuRootContext(DISPLAY_NAME);

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
    /**
     * Otherwise, when clicking from the second nesting level,
     * the parent menu will always close.
     */
    e.preventDefault();

    handleCloseOnClick();

    onSelect?.(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    handleCloseOnClick();

    onClick?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    handleSubMenuOpenByKeyDown(e);

    onKeyDown?.(e);
  };

  return withProvider(
    <RadixDropdownMenuCheckboxItem
      ref={mergeRefs(ref, itemRef)}
      className={cx(s.checkbox_item, className)}
      disabled={isDisabled}
      checked={isChecked}
      data-highlighted={isSubMenuOpen || dataHighlighted}
      data-item
      onCheckedChange={handleCheckedChange}
      onSelect={handleSelect}
      onClick={handleClick}
      onFocus={handleFocus}
      onMouseEnter={handleMouseEnter}
      onBlur={handleBlur}
      onMouseLeave={handleMouseLeave}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
    </RadixDropdownMenuCheckboxItem>
  );
});

CheckboxItem.displayName = DISPLAY_NAME;
