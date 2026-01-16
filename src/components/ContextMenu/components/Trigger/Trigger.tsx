import React, { forwardRef } from 'react';
import { Trigger as RadixDropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { KeyboardKey } from 'src/lib/keyboard';

import { useContextMenuContext } from '../../ContextMenu.context';

import { ContextMenuMode } from '../../ContextMenu.enums';

import { focusFirstFocusableItem } from '../../utils';

import type { TriggerProps } from './Trigger.props';

import s from './Trigger.module.css';

const DISPLAY_NAME = 'ContextMenu.Trigger';

type El = HTMLButtonElement;

export const Trigger = forwardRef<El, TriggerProps>((props, ref) => {
  const {
    className,
    children,
    onKeyDown,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onPointerDown,
    onPointerUp,

    ...rest
  } = props;

  const {
    triggerRef,
    contentRef,
    mode,
    isOpen,
    onContentEnter,
    onContentLeave,
    onOpenByKeyboard,
  } = useContextMenuContext(DISPLAY_NAME);

  /**
   * Handles pointer down on SubRoot trigger.
   * Prevents default behavior to emulate onClick behavior where state changes
   * on pointer up rather than pointer down.
   * stopPropagation prevents bubbling to parent menu items,
   * since SubRoot trigger is nested inside a parent menu item.
   */
  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

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
        [KeyboardKey.ENTER, KeyboardKey.SPACE, KeyboardKey.ARROW_DOWN].includes(
          e.key as KeyboardKey
        )
      ) {
        onOpenByKeyboard(true);

        /**
         * It is necessary to focus the first focusable item after the menu is opened,
         * otherwise the first item will not be focused in hover mode.
         *
         * In order for the content to be rendered and linked to, a timeout is required.
         */
        setTimeout(() => {
          focusFirstFocusableItem(contentRef.current);
        }, 0);
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

  /**
   * Handles pointer up on Root trigger.
   * Changes state on pointer up to emulate onClick behavior.
   */
  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (mode === ContextMenuMode.CLICK) {
      onOpenByKeyboard?.(!isOpen);
    }

    onPointerUp?.(e);
  };

  return (
    <RadixDropdownMenuTrigger
      ref={mergeRefs(triggerRef, ref)}
      className={cx(className, s.trigger)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      {...rest}
    >
      {children}
    </RadixDropdownMenuTrigger>
  );
});

Trigger.displayName = DISPLAY_NAME;
