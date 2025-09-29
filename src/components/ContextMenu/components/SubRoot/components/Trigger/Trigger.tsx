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
      isOpen,
      triggerRef,
      mode,
      onMouseEnter: onMouseEnterContext,
      onMouseLeave: onMouseLeaveContext,
      triggerId,
    } = useContextMenuContext(DISPLAY_NAME);

    const {
      dataHighlighted,
      onFocus: handleItemFocus,
      onMouseEnter: handleItemMouseEnter,
      onBlur: handleItemBlur,
      onMouseLeave: handleItemMouseLeave,
    } = useContextMenuItemFocus({
      displayName: DISPLAY_NAME,
      id: triggerId || '',
      isDisabled: false,
      onMouseEnter: (e) => {
        onMouseEnterContext(e);
        // TODO: fix this
        onMouseEnter?.(e as unknown as React.MouseEvent<HTMLButtonElement>);
      },
      onMouseLeave: (e) => {
        onMouseLeaveContext(e);
        onMouseLeave?.(e as unknown as React.MouseEvent<HTMLButtonElement>);
      },
      onFocus: (e) => {
        onFocus?.(e as unknown as React.FocusEvent<HTMLButtonElement>);
      },
      onBlur: (e) => {
        onBlur?.(e as unknown as React.FocusEvent<HTMLButtonElement>);
      },
    });

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
        className={cx(s.trigger, className)}
        data-highlighted={dataHighlighted || isOpen ? '' : undefined}
        onPointerDown={
          handlePointerDown as unknown as React.PointerEventHandler<HTMLButtonElement>
        }
        onFocus={
          handleItemFocus as unknown as React.FocusEventHandler<HTMLButtonElement>
        }
        onMouseEnter={
          handleItemMouseEnter as unknown as React.MouseEventHandler<HTMLButtonElement>
        }
        onBlur={
          handleItemBlur as unknown as React.FocusEventHandler<HTMLButtonElement>
        }
        onMouseLeave={
          handleItemMouseLeave as unknown as React.MouseEventHandler<HTMLButtonElement>
        }
        data-submenu-trigger
        {...rest}
      >
        {children}
      </RadixDropdownMenuTrigger>
    );
  }
);

Trigger.displayName = DISPLAY_NAME;
