import React, { forwardRef, useRef, useId, useState, useEffect } from 'react';
import { Item as RadixDropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { useLevelContext } from '../../providers/LevelProvider';

import { useContextMenuContext } from '../../ContextMenu.context';

import { hasItemIcon } from '../../utils';

import { useContextMenuItemFocus } from '../../hooks';

import type { ItemProps } from './Item.props';

import { ContextMenuItemProvider } from './Item.context';

import s from './Item.module.css';

const DISPLAY_NAME = 'ContextMenu.Item';

export const Item = forwardRef<HTMLDivElement, ItemProps>(
  (
    { className, children, isDisabled, isDanger, isNotSelectable, ...rest },
    ref
  ) => {
    const id = useId();

    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const [hasSubmenu, setHasSubmenu] = useState(false);

    const itemRef = useRef<HTMLDivElement>(null);

    const { hasItemWithIcon } = useLevelContext(DISPLAY_NAME);
    const { closeMenuImmediately } = useContextMenuContext(DISPLAY_NAME);

    const { dataHighlighted, onFocus, onMouseEnter, onBlur, onMouseLeave } =
      useContextMenuItemFocus({
        displayName: DISPLAY_NAME,
        id,
        isDisabled,
        isNotSelectable: false,
        hasSubmenu,
      });

    useEffect(() => {
      if (!itemRef.current) {
        return;
      }

      const trigger = itemRef.current.querySelector('[data-submenu-trigger]');

      setHasSubmenu(Boolean(trigger));
    }, [itemRef]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (hasSubmenu && e.key === 'ArrowRight') {
        setSubMenuOpen(true);
      }
    };

    return (
      <ContextMenuItemProvider
        hasSubmenu={hasSubmenu}
        subMenuOpen={subMenuOpen}
        setSubMenuOpen={setSubMenuOpen}
      >
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

            closeMenuImmediately(true);
          }}
          data-highlighted={subMenuOpen || dataHighlighted}
          onFocus={onFocus}
          onMouseEnter={onMouseEnter}
          onBlur={onBlur}
          onMouseLeave={onMouseLeave}
          onKeyDown={handleKeyDown}
          {...rest}
        >
          {children}
        </RadixDropdownMenuItem>
      </ContextMenuItemProvider>
    );
  }
);

Item.displayName = DISPLAY_NAME;
