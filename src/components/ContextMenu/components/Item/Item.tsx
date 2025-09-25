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
  const { hasItemWithIcon } = useLevelContext(DISPLAY_NAME);

  if ('isSelectable' in props && props.isSelectable === false) {
    const {
      className,
      children,
      isSelectable,
      hasIconCheckFn = hasItemIcon,
      ...rest
    } = props;

    /**
     * Set the hasIcon state based on the presence of an icon.
     */
    const hasIcon = useMemo(() => hasIconCheckFn(children), [children]);

    return (
      <div
        ref={ref}
        className={cx(s.item, className)}
        data-not-selectable={!isSelectable}
        data-no-icon-align={hasIcon || !hasItemWithIcon ? '' : undefined}
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
    onClick,
    onFocus,
    onMouseEnter,
    onBlur,
    onMouseLeave,
    onKeyDown,
    isCloseMenuOnClick = true,

    ...rest
  } = props as SelectableItemProps;

  const id = useId();

  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [hasSubmenu, setHasSubmenu] = useState(false);

  const itemRef = useRef<HTMLDivElement>(null);

  /**
   * Set the hasIcon state based on the presence of an icon.
   */
  const hasIcon = useMemo(() => hasIconCheckFn(children), [children]);

  const { closeMenuImmediately, isCloseOnClick } =
    useContextMenuContext(DISPLAY_NAME);

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
   * Handle the keydown event for the item.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (hasSubmenu && e.key === 'ArrowRight') {
      setSubMenuOpen(true);
    }

    onKeyDown?.(e);
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

          if (isCloseOnClick && isCloseMenuOnClick) {
            closeMenuImmediately(true);
          }
        }}
        onClick={(e) => {
          e.preventDefault();

          onClick?.(e);

          if (isCloseOnClick && isCloseMenuOnClick) {
            closeMenuImmediately(true);
          }
        }}
        data-highlighted={subMenuOpen || dataHighlighted}
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
      </RadixDropdownMenuItem>
    </ContextMenuItemProvider>
  );
});

Item.displayName = DISPLAY_NAME;
