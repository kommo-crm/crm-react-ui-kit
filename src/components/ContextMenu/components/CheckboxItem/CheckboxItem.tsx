import React, { forwardRef, useId, useMemo } from 'react';
import { CheckboxItem as RadixDropdownMenuCheckboxItem } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { useLevelContext } from '../../providers/LevelProvider';

import { hasItemIcon } from '../../utils';

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
  (
    {
      className,
      children,
      onChange,
      isDisabled,
      isChecked,
      hasIconCheckFn = hasItemIcon,
      onFocus,
      onMouseEnter,
      onBlur,
      onMouseLeave,
      onSelect,
      onClick,
      isCloseMenuOnClick = true,
      shouldCloseRootMenuOnClick,
      onCheckedChange,
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

    const { closeRootMenuImmediately } =
      useContextMenuRootContext(DISPLAY_NAME);

    const handleCheckedChange = (checked: boolean) => {
      onCheckedChange?.(checked);

      if (onChange) {
        const event = {
          target: { checked },
        } as React.ChangeEvent<HTMLInputElement>;

        onChange(event);
      }
    };

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
      <RadixDropdownMenuCheckboxItem
        ref={mergeRefs(ref, itemRef)}
        className={cx(s.checkbox_item, className)}
        disabled={isDisabled}
        checked={isChecked}
        data-item
        data-no-icon-align={hasIcon || !hasItemWithIcon ? '' : undefined}
        onCheckedChange={(checked) => {
          if (onChange) {
            const event = {
              target: { checked },
            } as React.ChangeEvent<HTMLInputElement>;

            onChange(event);
          }
        }}
        data-highlighted={subMenuOpen || dataHighlighted}
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

          handleCheckedChange(!isChecked);

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
      </RadixDropdownMenuCheckboxItem>
    );
  }
);

CheckboxItem.displayName = DISPLAY_NAME;
