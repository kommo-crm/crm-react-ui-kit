import React, { forwardRef, useId, useMemo } from 'react';
import { RadioItem as RadixDropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { useLevelContext } from '../../providers/LevelProvider';

import { hasItemIcon } from '../../utils';

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
      hasIconCheckFn = hasItemIcon,
      onFocus,
      onMouseEnter,
      onBlur,
      onMouseLeave,
      onSelect,
      onClick,
      isCloseMenuOnClick = true,
      shouldCloseRootMenuOnClick,
      value,
      onKeyDown,

      ...rest
    },
    ref
  ) => {
    const id = useId();

    const {
      hasItemWithIcon,
      closeMenuImmediately,
      isCloseOnClick,
      shouldCloseRootMenuOnClick: shouldCloseRootMenuOnClickContext,
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

    const hasIcon = useMemo(() => hasIconCheckFn(children), [children]);

    const { onChange } = useRadioGroupContext(DISPLAY_NAME);

    const content = useChildrenWithBlocker({
      children,
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

    return withProvider(
      <RadixDropdownMenuRadioItem
        ref={mergeRefs(ref, itemRef)}
        className={cx(s.radio_item, className)}
        disabled={isDisabled}
        data-item
        data-no-icon-align={hasIcon || !hasItemWithIcon ? '' : undefined}
        data-highlighted={subMenuOpen || dataHighlighted}
        value={value}
        onSelect={(e) => {
          onSelect?.(e);

          handleCloseOnClick();
        }}
        onClick={(e) => {
          e.preventDefault();

          onChange(value);
          onClick?.(e);

          handleCloseOnClick();
        }}
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
