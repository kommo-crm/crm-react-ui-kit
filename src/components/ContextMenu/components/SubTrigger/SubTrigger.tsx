import React, { forwardRef } from 'react';
import { SubTrigger as RadixDropdownMenuSubTrigger } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { useLevelContext } from '../../providers/LevelProvider';

import { useContextMenuSubContext } from '../Sub/Sub.context';

import { hasItemIcon } from '../../utils';

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
  (
    {
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
      onMouseLeave,

      ...rest
    },
    ref
  ) => {
    const { hasItemWithIcon } = useLevelContext(DISPLAY_NAME);

    const {
      mode,
      isOpen,
      defaultOpen,
      setOpen,
      onMouseEnter: onMouseEnterContext,
      onMouseLeave: onMouseLeaveContext,
      triggerId,
      triggerRef,
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
      onMouseEnter: (e) => {
        onMouseEnterContext(e);
        onMouseEnter?.(e);
      },
      onMouseLeave: (e) => {
        onMouseLeaveContext(e);
        onMouseLeave?.(e);
      },
      hasSubmenu,
      onFocus,
      onBlur,
    });

    const content = useChildrenWithBlocker({
      children,
      displayName: DISPLAY_NAME,
      blockerClassName: s.blocker,
    });

    return withProvider(
      <RadixDropdownMenuSubTrigger
        ref={mergeRefs(ref, triggerRef, itemRef)}
        className={cx(s.sub_trigger, className)}
        disabled={isDisabled}
        data-item
        data-no-icon-align={
          hasItemIcon(children) || !hasItemWithIcon ? '' : undefined
        }
        data-highlighted={
          subMenuOpen ||
          isOpen ||
          dataHighlighted === '' ||
          (mode === ContextMenuMode.CLICK && isOpen)
            ? ''
            : undefined
        }
        data-submenu-trigger
        onKeyDown={(e) => {
          if (mode === ContextMenuMode.HOVER) {
            if (['Enter', ' ', 'ArrowRight'].includes(e.key)) {
              onOpenByKeyboard(true);
            } else if (e.key === 'ArrowLeft') {
              onOpenByKeyboard(false);
            }
          }

          handleKeyDown?.(e);

          onKeyDown?.(e);
        }}
        onClick={(e) => {
          if (mode === ContextMenuMode.CLICK || defaultOpen !== undefined) {
            e.preventDefault();
            e.stopPropagation();

            if (defaultOpen === undefined) {
              setOpen(!isOpen);
            }
          }

          onClick?.(e);
        }}
        onFocus={handleItemFocus}
        onMouseEnter={handleItemMouseEnter}
        onBlur={handleItemBlur}
        onMouseLeave={handleItemMouseLeave}
        onPointerEnter={(e) => {
          if (mode === ContextMenuMode.CLICK || defaultOpen !== undefined) {
            e.preventDefault();
            e.stopPropagation();
          }

          onPointerEnter?.(e);
        }}
        onPointerMove={(e) => {
          if (mode === ContextMenuMode.CLICK || defaultOpen !== undefined) {
            e.preventDefault();
            e.stopPropagation();
          }

          onPointerMove?.(e);
        }}
        onPointerLeave={(e) => {
          if (mode === ContextMenuMode.CLICK || defaultOpen !== undefined) {
            e.preventDefault();
            e.stopPropagation();
          }

          onPointerLeave?.(e);
        }}
        {...rest}
      >
        {content}
      </RadixDropdownMenuSubTrigger>
    );
  }
);

SubTrigger.displayName = DISPLAY_NAME;
