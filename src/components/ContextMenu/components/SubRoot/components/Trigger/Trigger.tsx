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

type El = HTMLButtonElement;

export const Trigger = forwardRef<El, TriggerProps>((props, ref) => {
  const {
    className,
    children,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    onPointerDown,
    onPointerUp,
    onPointerMove,

    ...rest
  } = props;

  const {
    isOpen,
    triggerRef,
    mode,
    isSubMenuOpen,
    setIsSubMenuOpen,
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
    onPointerMove: handleItemPointerMove,
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
    onPointerMove: (e) => {
      onContentEnter(e);
      onPointerMove?.(e);
    },
  });

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
   * Handles pointer up on SubRoot trigger.
   * Changes state on pointer up to emulate onClick behavior.
   */
  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (mode === ContextMenuMode.CLICK) {
      setIsSubMenuOpen?.(!isSubMenuOpen);
    }

    onPointerUp?.(e);
  };

  return (
    <RadixDropdownMenuTrigger
      ref={mergeRefs(triggerRef, ref)}
      className={cx(s.trigger, { [s.open]: isOpen }, className)}
      data-highlighted={dataHighlighted || isOpen ? '' : undefined}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onFocus={handleItemFocus}
      onMouseEnter={handleItemMouseEnter}
      onBlur={handleItemBlur}
      onMouseLeave={handleItemMouseLeave}
      onPointerMove={handleItemPointerMove}
      data-submenu-trigger
      {...rest}
    >
      {children}
    </RadixDropdownMenuTrigger>
  );
});

Trigger.displayName = DISPLAY_NAME;
