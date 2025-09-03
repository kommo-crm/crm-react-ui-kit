import React, { forwardRef, useRef, useId } from 'react';
import { Item as RadixDropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { useLevelContext } from '../../providers/LevelProvider';

import { useContextMenuContext } from '../../ContextMenu.context';

import { hasItemIcon } from '../../utils';

import { useContextMenuItemFocus } from '../../hooks';

import type { ItemProps } from './Item.props';

import s from './Item.module.css';

const DISPLAY_NAME = 'ContextMenu.Item';

export const Item = forwardRef<HTMLDivElement, ItemProps>(
  (
    {
      className,
      children,
      isDisabled,
      isDanger,
      isNotSelectable,
      hasSubmenu,
      ...rest
    },
    ref
  ) => {
    const id = useId();

    const itemRef = useRef<HTMLDivElement>(null);

    const { hasItemWithIcon } = useLevelContext(DISPLAY_NAME);
    const { closeMenuImmediately } = useContextMenuContext(DISPLAY_NAME);

    const { dataHighlighted, onFocus, onMouseEnter, onBlur, onMouseLeave } =
      useContextMenuItemFocus({
        displayName: DISPLAY_NAME,
        id,
        isDisabled,
        isNotSelectable: false,
      });

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (hasSubmenu && e.key === 'ArrowRight') {
        const slot = itemRef.current?.querySelector('[data-submenu-trigger]');

        console.log('🔵 handleKeyDown →', slot);

        if (slot instanceof HTMLElement) {
          slot.click();
          e.preventDefault();
        }
      }
    };

    return (
      <RadixDropdownMenuItem
        ref={mergeRefs(ref, itemRef)}
        className={cx(s.item, className)}
        disabled={isDisabled || isNotSelectable}
        data-item
        data-danger={isDanger ? '' : undefined}
        data-no-icon-align={
          hasItemIcon(children) || !hasItemWithIcon ? '' : undefined
        }
        data-not-selectable={isNotSelectable ? '' : undefined}
        data-has-submenu={hasSubmenu ? '' : undefined}
        onSelect={(e) => {
          if (isNotSelectable) {
            e.preventDefault();
            e.stopPropagation();

            return;
          }

          closeMenuImmediately();
        }}
        data-highlighted={dataHighlighted}
        onFocus={onFocus}
        onMouseEnter={onMouseEnter}
        onBlur={onBlur}
        onMouseLeave={onMouseLeave}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {children}
      </RadixDropdownMenuItem>
    );
  }
);

Item.displayName = DISPLAY_NAME;
