import React, {
  forwardRef,
  useRef,
  useId,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { Item as RadixDropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { useLevelContext } from '../../providers/LevelProvider';

import { useContextMenuContext } from '../../ContextMenu.context';

import { hasItemIcon } from '../../utils';

import { useContextMenuItemFocus } from '../../hooks';

import type { ItemProps, SelectableItemProps } from './Item.props';

import { ContextMenuItemProvider } from './Item.context';

import s from './Item.module.css';

const DISPLAY_NAME = 'ContextMenu.Item';

export const Item = forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
  if ('isNotSelectable' in props && props.isNotSelectable) {
    const { className, children, isNotSelectable, ...rest } = props;

    return (
      <div
        ref={ref}
        className={cx(s.item, className)}
        data-not-selectable={isNotSelectable}
        {...rest}
      >
        {children}
      </div>
    );
  }

  const {
    className,
    children,
    isDisabled,
    isDanger,
    hasIconCheckFn = hasItemIcon,
    onSelect,

    ...rest
  } = props as SelectableItemProps;

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
      hasSubmenu,
    });

  /**
   * Set the hasSubmenu state based on the presence of a submenu trigger.
   */
  useEffect(() => {
    if (!itemRef.current) {
      return;
    }

    const trigger = itemRef.current.querySelector('[data-submenu-trigger]');

    setHasSubmenu(Boolean(trigger));
  }, [itemRef]);

  /**
   * Set the hasIcon state based on the presence of an icon.
   */
  const hasIcon = useMemo(() => hasIconCheckFn(children), [children]);

  /**
   * Handle the keydown event for the item.
   */
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
        disabled={isDisabled}
        data-item
        data-danger={isDanger ? '' : undefined}
        data-no-icon-align={hasIcon || !hasItemWithIcon ? '' : undefined}
        data-has-submenu={hasSubmenu ? '' : undefined}
        onSelect={(e) => {
          onSelect?.(e);

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
});

Item.displayName = DISPLAY_NAME;
