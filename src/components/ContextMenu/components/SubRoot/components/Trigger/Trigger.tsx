import React, { forwardRef } from 'react';
import { Trigger as RadixDropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { useContextMenuContext } from '../../../../ContextMenu.context';

import { ContextMenuMode } from '../../../../ContextMenu.enums';

import { useContextMenuItemFocus } from '../../../../hooks';

import type { TriggerProps } from './Trigger.props';

import s from './Trigger.module.css';

const DISPLAY_NAME = 'ContextMenu.SubRoot.Trigger';

export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const {
      className,
      children,
      onFocus,
      onBlur,
      onMouseEnter,
      onMouseLeave,
      onPointerDown,

      ...rest
    } = props;

    const {
      isOpen,
      triggerRef,
      mode,
      triggerId,
      onContentEnter,
      onContentLeave,
    } = useContextMenuContext(DISPLAY_NAME);

    const {
      dataHighlighted,
      onFocus: handleItemFocus,
      onMouseEnter: handleItemMouseEnter,
      onBlur: handleItemBlur,
      onMouseLeave: handleItemMouseLeave,
    } = useContextMenuItemFocus({
      displayName: DISPLAY_NAME,
      ref: triggerRef,
      id: triggerId || '',
      isDisabled: false,
      onMouseEnter: (e) => {
        onContentEnter(e);
        onMouseEnter?.(e);
      },
      onMouseLeave: (e) => {
        onContentLeave(e);
        onMouseLeave?.(e);
      },
      onFocus: (e) => {
        onFocus?.(e);
      },
      onBlur: (e) => {
        onBlur?.(e);
      },
    });

    /**
     * Handles pointer down on SubRoot trigger.
     *
     * - preventDefault (hover mode): menu is already open via hover, no toggle needed
     * - stopPropagation (always): prevent bubbling to parent menu items,
     *   since SubRoot trigger is nested inside a parent menu item
     */
    const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
      if (mode === ContextMenuMode.HOVER) {
        e.preventDefault();
      }

      e.stopPropagation();

      onPointerDown?.(e);
    };

    return (
      <RadixDropdownMenuTrigger
        ref={mergeRefs(triggerRef, ref)}
        className={cx(s.trigger, { [s.open]: isOpen }, className)}
        data-highlighted={dataHighlighted || isOpen ? '' : undefined}
        onPointerDown={handlePointerDown}
        onFocus={handleItemFocus}
        onMouseEnter={handleItemMouseEnter}
        onBlur={handleItemBlur}
        onMouseLeave={handleItemMouseLeave}
        data-submenu-trigger
        {...rest}
      >
        {children}
      </RadixDropdownMenuTrigger>
    );
  }
);

Trigger.displayName = DISPLAY_NAME;
