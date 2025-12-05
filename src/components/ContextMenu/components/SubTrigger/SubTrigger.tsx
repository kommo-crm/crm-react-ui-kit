import React, { forwardRef } from 'react';
import { SubTrigger as RadixDropdownMenuSubTrigger } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';
import { KeyboardKey } from 'src/lib/keyboard';

import { useContextMenuSubContext } from '../Sub/Sub.context';

import {
  useChildrenWithBlocker,
  useContextMenuItemFocus,
  useSubMenu,
} from '../../hooks';

import { ContextMenuMode } from '../../ContextMenu.enums';

import type { SubTriggerProps } from './SubTrigger.props';

import s from './SubTrigger.module.css';

const DISPLAY_NAME = 'ContextMenu.SubTrigger';

export const SubTrigger = forwardRef<HTMLDivElement, SubTriggerProps>(
  (props, ref) => {
    const {
      className,
      children,
      isDisabled,
      onKeyDown,
      onFocus,
      onBlur,
      onClick,
      onPointerEnter,
      onPointerMove,
      onPointerLeave,
      onMouseEnter,
      onMouseMove,
      onMouseLeave,

      ...rest
    } = props;

    const {
      mode,
      isOpen,
      defaultOpen,
      triggerId,
      triggerRef,
      setOpen,
      onContentEnter,
      onContentLeave,
      onOpenByKeyboard,
    } = useContextMenuSubContext(DISPLAY_NAME);

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
      id: triggerId,
      isDisabled,
      hasSubmenu,
      onMouseEnter: onContentEnter,
      onMouseLeave: (e) => {
        onContentLeave(e);
        onMouseLeave?.(e);
      },
      onFocus,
      onBlur,
    });

    const content = useChildrenWithBlocker({
      children,
      displayName: DISPLAY_NAME,
      blockerClassName: s.blocker,
    });

    const handleKeyDownSubTrigger = (
      e: React.KeyboardEvent<HTMLDivElement>
    ) => {
      if (mode === ContextMenuMode.HOVER) {
        if (
          [
            KeyboardKey.ENTER,
            KeyboardKey.SPACE,
            KeyboardKey.ARROW_RIGHT,
          ].includes(e.key as KeyboardKey)
        ) {
          onOpenByKeyboard(true);
        } else if (e.key === KeyboardKey.ARROW_LEFT) {
          onOpenByKeyboard(false);
        }
      }

      handleKeyDown?.(e);

      onKeyDown?.(e);
    };

    /**
     * In click/controlled mode, prevent Radix's default hover-based submenu
     * behavior. We manage submenu open state manually.
     */
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (mode === ContextMenuMode.CLICK || defaultOpen !== undefined) {
        e.preventDefault();
        e.stopPropagation();

        if (defaultOpen === undefined) {
          setOpen(!isOpen);
        }
      }

      onClick?.(e);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      handleItemMouseEnter?.(e);

      onMouseEnter?.(e);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      handleItemMouseEnter?.(e);

      onMouseMove?.(e);
    };

    /**
     * Disable Radix's hover-based submenu opening in click/controlled mode.
     * Submenu should only open on explicit click.
     */
    const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
      if (mode === ContextMenuMode.CLICK || defaultOpen !== undefined) {
        e.preventDefault();
        e.stopPropagation();
      }

      onPointerEnter?.(e);
    };

    /**
     * Disable Radix's hover-based submenu behavior in click/controlled mode.
     */
    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      if (mode === ContextMenuMode.CLICK || defaultOpen !== undefined) {
        e.preventDefault();
        e.stopPropagation();
      }

      onPointerMove?.(e);
    };

    /**
     * Disable Radix's hover-based submenu closing in click/controlled mode.
     * Submenu should remain open until explicitly closed.
     */
    const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
      if (mode === ContextMenuMode.CLICK || defaultOpen !== undefined) {
        e.preventDefault();
        e.stopPropagation();
      }

      onPointerLeave?.(e);
    };

    return withProvider(
      <RadixDropdownMenuSubTrigger
        ref={mergeRefs(ref, triggerRef, itemRef)}
        className={cx(s.sub_trigger, className)}
        disabled={isDisabled}
        data-highlighted={
          subMenuOpen ||
          isOpen ||
          dataHighlighted === '' ||
          (mode === ContextMenuMode.CLICK && isOpen)
            ? ''
            : undefined
        }
        data-item
        data-submenu-trigger
        onKeyDown={handleKeyDownSubTrigger}
        onClick={handleClick}
        onFocus={handleItemFocus}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onBlur={handleItemBlur}
        onMouseLeave={handleItemMouseLeave}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        {...rest}
      >
        {content}
      </RadixDropdownMenuSubTrigger>
    );
  }
);

SubTrigger.displayName = DISPLAY_NAME;
