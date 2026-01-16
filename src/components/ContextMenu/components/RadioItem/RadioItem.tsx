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

type El = HTMLDivElement;

export const RadioItem = forwardRef<El, RadioItemProps>((props, ref) => {
  const {
    className,
    children,
    isDisabled,
    shouldCloseCurrentMenuOnSelect = true,
    shouldCloseRootMenuOnSelect = true,
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

  const { closeRootMenuImmediately } = useContextMenuRootContext(DISPLAY_NAME);

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
    e.stopPropagation();

    handleCloseOnClick();

    onClick?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    handleSubMenuOpenByKeyDown(e);

    onKeyDown?.(e);
  };

  return withProvider(
    <RadixDropdownMenuRadioItem
      ref={mergeRefs(ref, itemRef)}
      className={cx(s.radio_item, className)}
      disabled={isDisabled}
      data-highlighted={isSubMenuOpen || dataHighlighted}
      data-item
      value={value}
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
    </RadixDropdownMenuRadioItem>
  );
});

RadioItem.displayName = DISPLAY_NAME;
