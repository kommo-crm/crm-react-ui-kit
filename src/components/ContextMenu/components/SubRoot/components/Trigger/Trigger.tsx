import React, { forwardRef } from 'react';
import { Trigger as RadixDropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

import { mergeRefs } from 'src/lib/utils';

import { useContextMenuContext } from '../../../../ContextMenu.context';

import { ContextMenuMode } from '../../../../ContextMenu.enums';

import { useContextMenuItemFocus } from '../../../../hooks';

import type { TriggerProps } from './Trigger.props';

const DISPLAY_NAME = 'ContextMenu.Trigger';

export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (
    {
      className,
      children,
      onFocus,
      onBlur,
      onMouseEnter,
      onMouseLeave,
      onPointerDown,
      ...rest
    },
    ref
  ) => {
    const {
      triggerRef,
      mode,
      onMouseEnter: onMouseEnterContext,
      onMouseLeave: onMouseLeaveContext,
      triggerId,
    } = useContextMenuContext(DISPLAY_NAME);

    const {
      onFocus: handleItemFocus,
      onMouseEnter: handleItemMouseEnter,
      onBlur: handleItemBlur,
      onMouseLeave: handleItemMouseLeave,
    } = useContextMenuItemFocus({
      displayName: DISPLAY_NAME,
      id: triggerId || '',
      isDisabled: false,
      onMouseEnter: onMouseEnterContext,
      onMouseLeave: onMouseLeaveContext,
    });

    return (
      <RadixDropdownMenuTrigger
        ref={mergeRefs(triggerRef, ref)}
        className={className}
        onPointerDown={(e) => {
          if (mode === ContextMenuMode.HOVER) {
            e.preventDefault();
          }

          e.stopPropagation();

          onPointerDown?.(e);
        }}
        onMouseEnter={(e) => {
          handleItemMouseEnter?.(e);

          onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          handleItemMouseLeave?.(e);

          onMouseLeave?.(e);
        }}
        onFocus={(e) => {
          e.preventDefault();
          e.stopPropagation();

          handleItemFocus?.();
          onFocus?.(e);
        }}
        onBlur={(e) => {
          handleItemBlur?.();

          onBlur?.(e);
        }}
        data-submenu-trigger
        {...rest}
      >
        {children}
      </RadixDropdownMenuTrigger>
    );
  }
);

Trigger.displayName = DISPLAY_NAME;
