import React, { forwardRef, useId, useMemo } from 'react';
import { RadioItem as RadixDropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { useLevelContext } from '../../providers/LevelProvider';

import { useContextMenuContext } from '../../ContextMenu.context';

import { hasItemIcon } from '../../utils';

import { useContextMenuItemFocus, useSubMenu } from '../../hooks';

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
      onKeyDown,
      ...rest
    },
    ref
  ) => {
    const id = useId();

    const { hasItemWithIcon } = useLevelContext(DISPLAY_NAME);
    const { closeMenuImmediately } = useContextMenuContext(DISPLAY_NAME);

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

    const hasIcon = useMemo(() => hasIconCheckFn(children), [children]);

    return withProvider(
      <RadixDropdownMenuRadioItem
        ref={mergeRefs(ref, itemRef)}
        className={cx(s.radio_item, className)}
        disabled={isDisabled}
        data-item
        data-no-icon-align={hasIcon || !hasItemWithIcon ? '' : undefined}
        data-highlighted={subMenuOpen || dataHighlighted}
        onSelect={(e) => {
          closeMenuImmediately(true);

          onSelect?.(e);
        }}
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
      </RadixDropdownMenuRadioItem>
    );
  }
);

RadioItem.displayName = DISPLAY_NAME;
