import React, { forwardRef } from 'react';
import { Trigger as RadixDropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { KeyboardKey } from 'src/lib/keyboard';

import { useContextMenuContext } from '../../ContextMenu.context';

import { ContextMenuMode } from '../../ContextMenu.enums';

import type { TriggerProps } from './Trigger.props';

import s from './Trigger.module.css';

const DISPLAY_NAME = 'ContextMenu.Trigger';

export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const {
      className,
      children,
      onKeyDown,
      onMouseEnter,
      onMouseLeave,
      onMouseMove,
      onPointerDown,

      ...rest
    } = props;

    const {
      triggerRef,
      mode,
      isOpen,
      onContentEnter,
      onContentLeave,
      onOpenByKeyboard,
    } = useContextMenuContext(DISPLAY_NAME);

    /**
     * In hover mode, prevent Radix from handling pointer events.
     * We manage open/close state via mouse enter/leave instead.
     */
    const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
      if (mode === ContextMenuMode.HOVER) {
        e.preventDefault();
        e.stopPropagation();
      }

      onPointerDown?.(e);
    };

    /**
     * In hover mode, prevent keydown from bubbling to parent elements.
     * We handle keyboard navigation manually for hover menus.
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (mode === ContextMenuMode.HOVER) {
        e.stopPropagation();

        if (
          [
            KeyboardKey.ENTER,
            KeyboardKey.SPACE,
            KeyboardKey.ARROW_DOWN,
          ].includes(e.key as KeyboardKey)
        ) {
          onOpenByKeyboard(true);
        } else if (e.key === KeyboardKey.ESCAPE) {
          onOpenByKeyboard(false);
        }
      }

      onKeyDown?.(e);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      onContentEnter(e);

      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      onContentLeave(e);

      onMouseLeave?.(e);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      /**
       * It is necessary to fix the case when the menu closes
       * another menu with a SubRoot that works on a click
       */
      if (!isOpen) {
        onContentEnter(e);
      }

      onMouseMove?.(e);
    };

    return (
      <RadixDropdownMenuTrigger
        ref={mergeRefs(triggerRef, ref)}
        className={cx(className, s.trigger)}
        onPointerDown={handlePointerDown}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        {...rest}
      >
        {children}
      </RadixDropdownMenuTrigger>
    );
  }
);

Trigger.displayName = DISPLAY_NAME;
