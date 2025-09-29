import React, { forwardRef } from 'react';
import { Trigger as RadixDropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { useContextMenuContext } from '../../ContextMenu.context';

import { ContextMenuMode } from '../../ContextMenu.enums';

import type { TriggerProps } from './Trigger.props';

const DISPLAY_NAME = 'ContextMenu.Trigger';

export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (
    {
      className,
      children,
      onKeyDown,
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
      onOpenByKeyboard,
    } = useContextMenuContext(DISPLAY_NAME);

    return (
      <RadixDropdownMenuTrigger
        ref={mergeRefs(triggerRef, ref)}
        className={cx(className)}
        onPointerDown={(e) => {
          if (mode === ContextMenuMode.HOVER) {
            e.preventDefault();
            e.stopPropagation();
          }

          onPointerDown?.(e);
        }}
        onKeyDown={(e) => {
          if (mode === ContextMenuMode.HOVER) {
            e.stopPropagation();

            if (['Enter', ' ', 'ArrowDown'].includes(e.key)) {
              onOpenByKeyboard(true);
            } else if (e.key === 'Escape') {
              onOpenByKeyboard(false);
            }
          }

          onKeyDown?.(e);
        }}
        onMouseEnter={(e) => {
          onMouseEnterContext(e);

          onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          onMouseLeaveContext(e);

          onMouseLeave?.(e);
        }}
        {...rest}
      >
        {children}
      </RadixDropdownMenuTrigger>
    );
  }
);

Trigger.displayName = DISPLAY_NAME;
