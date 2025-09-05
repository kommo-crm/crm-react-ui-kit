import React, { forwardRef } from 'react';
import { Trigger as RadixDropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { useContextMenuContext } from '../../../../ContextMenu.context';

import { ContextMenuMode } from '../../../../ContextMenu.enums';

import { useContextMenuItemFocus } from '../../../../hooks';

import type { TriggerProps } from './Trigger.props';

const DISPLAY_NAME = 'ContextMenu.Trigger';

export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  ({ className, children, ...rest }, ref) => {
    const { triggerRef, mode, onMouseEnter, onMouseLeave, triggerId } =
      useContextMenuContext(DISPLAY_NAME);

    const {
      onFocus,
      onMouseEnter: handleMouseEnter,
      onBlur,
      onMouseLeave: handleMouseLeave,
    } = useContextMenuItemFocus({
      displayName: DISPLAY_NAME,
      id: triggerId || '',
      isDisabled: false,
      isNotSelectable: false,
      onMouseEnter,
      onMouseLeave,
    });

    return (
      <RadixDropdownMenuTrigger
        ref={mergeRefs(triggerRef, ref)}
        className={cx(className)}
        onPointerDown={(e) => {
          if (mode === ContextMenuMode.HOVER) {
            e.preventDefault();
          }

          e.stopPropagation();
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={(e) => {
          e.preventDefault();
          e.stopPropagation();

          onFocus?.();
        }}
        onBlur={onBlur}
        data-submenu-trigger
        {...rest}
      >
        {children}
      </RadixDropdownMenuTrigger>
    );
  }
);

Trigger.displayName = DISPLAY_NAME;
