import React, { forwardRef } from 'react';
import { SubTrigger as RadixDropdownMenuSubTrigger } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { useLevelContext } from '../../providers/LevelProvider';

import { useContextMenuSubContext } from '../Sub/Sub.context';

import { hasItemIcon } from '../../utils';

import { useContextMenuItemFocus } from '../../hooks';

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
      open,
      defaultOpen,
      setOpen,
      onMouseEnter: onMouseEnterContext,
      onMouseLeave: onMouseLeaveContext,
      triggerId,
      triggerRef,
      onOpenByKeyboard,
    } = useContextMenuSubContext(DISPLAY_NAME);

    const {
      dataHighlighted,
      onFocus: handleItemFocus,
      onMouseEnter: handleItemMouseEnter,
      onBlur: handleItemBlur,
      onMouseLeave: handleItemMouseLeave,
    } = useContextMenuItemFocus({
      displayName: DISPLAY_NAME,
      id: triggerId,
      isDisabled,
      onMouseEnter: onMouseEnterContext,
      onMouseLeave: onMouseLeaveContext,
    });

    return (
      <RadixDropdownMenuSubTrigger
        ref={mergeRefs(triggerRef, ref)}
        className={cx(s.sub_trigger, className)}
        disabled={isDisabled}
        data-item
        data-no-icon-align={
          hasItemIcon(children) || !hasItemWithIcon ? '' : undefined
        }
        data-highlighted={
          open ||
          dataHighlighted === '' ||
          (mode === ContextMenuMode.CLICK && open)
            ? ''
            : undefined
        }
        data-submenu-trigger
        onMouseEnter={(e) => {
          handleItemMouseEnter?.(e);

          onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          handleItemMouseLeave?.(e);

          onMouseLeave?.(e);
        }}
        onKeyDown={(e) => {
          if (mode === ContextMenuMode.HOVER) {
            if (['Enter', ' ', 'ArrowRight'].includes(e.key)) {
              onOpenByKeyboard(true);
            } else if (e.key === 'ArrowLeft') {
              onOpenByKeyboard(false);

              (e.currentTarget as HTMLElement).focus();
            }
          }

          onKeyDown?.(e);
        }}
        onFocus={(e) => {
          handleItemFocus?.();

          onFocus?.(e);
        }}
        onBlur={(e) => {
          handleItemBlur?.();

          onBlur?.(e);
        }}
        onClick={(e) => {
          if (mode === ContextMenuMode.CLICK || defaultOpen !== undefined) {
            e.preventDefault();
            e.stopPropagation();

            if (defaultOpen === undefined) {
              setOpen(!open);
            }
          }

          onClick?.(e);
        }}
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
        {children}
      </RadixDropdownMenuSubTrigger>
    );
  }
);

SubTrigger.displayName = DISPLAY_NAME;
