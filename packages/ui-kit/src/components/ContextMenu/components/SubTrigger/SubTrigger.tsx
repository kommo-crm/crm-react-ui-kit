import React, { forwardRef } from 'react';
import { SubTrigger as RadixDropdownMenuSubTrigger } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';
import { KeyboardKey } from 'src/lib/keyboard';

import { useContextMenuSubContext } from '../Sub/Sub.context';

import { useContextMenuItemFocus } from '../../hooks';

import { ContextMenuMode } from '../../ContextMenu.enums';

import type { SubTriggerProps } from './SubTrigger.props';

import s from './SubTrigger.module.css';

const DISPLAY_NAME = 'ContextMenu.SubTrigger';

type El = HTMLDivElement;

export const SubTrigger = forwardRef<El, SubTriggerProps>((props, ref) => {
  const {
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
    onMouseMove,
    onMouseLeave,

    ...rest
  } = props;

  const {
    mode,
    isOpen,
    defaultOpen,
    triggerId,
    triggerRef,
    setIsOpen,
    onContentEnter,
    onContentLeave,
    onOpenByKeyboard,
  } = useContextMenuSubContext(DISPLAY_NAME);

  const {
    dataHighlighted,
    onFocus: handleItemFocus,
    onMouseEnter: handleItemMouseEnter,
    onBlur: handleItemBlur,
    onMouseLeave: handleItemMouseLeave,
    onPointerEnter: handleItemPointerEnter,
    onPointerLeave: handleItemPointerLeave,
    onPointerMove: handleItemPointerMove,
  } = useContextMenuItemFocus({
    displayName: DISPLAY_NAME,
    id: triggerId,
    isDisabled,
    onMouseEnter: (e) => {
      onContentEnter(e);
      onMouseEnter?.(e);
    },
    onMouseLeave: (e) => {
      onContentLeave(e);
      onMouseLeave?.(e);
    },
    onFocus,
    onBlur,
    onPointerEnter,
    onPointerLeave,
    onPointerMove,
  });

  const handleKeyDownSubTrigger = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (mode === ContextMenuMode.HOVER) {
      if (
        [
          KeyboardKey.ENTER,
          KeyboardKey.SPACE,
          KeyboardKey.ARROW_RIGHT,
        ].includes(e.key as KeyboardKey)
      ) {
        onOpenByKeyboard(true);
      } else if (e.key === KeyboardKey.ARROW_LEFT) {
        onOpenByKeyboard(false);
      }
    }

    onKeyDown?.(e);
  };

  /**
   * In click/controlled mode, prevent Radix's default hover-based submenu
   * behavior. We manage submenu open state manually.
   */
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (mode === ContextMenuMode.CLICK || defaultOpen !== undefined) {
      e.preventDefault();
      e.stopPropagation();

      if (defaultOpen === undefined) {
        setIsOpen(!isOpen);
      }
    }

    onClick?.(e);
  };

  const handleItemMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handleItemMouseEnter?.(e);

    onMouseMove?.(e);
  };

  return (
    <RadixDropdownMenuSubTrigger
      ref={mergeRefs(ref, triggerRef)}
      className={cx(s.sub_trigger, className)}
      disabled={isDisabled}
      data-highlighted={
        isOpen ||
        dataHighlighted === '' ||
        (mode === ContextMenuMode.CLICK && isOpen)
          ? ''
          : undefined
      }
      data-item
      data-submenu-trigger
      onKeyDown={handleKeyDownSubTrigger}
      onClick={handleClick}
      onFocus={handleItemFocus}
      onMouseEnter={handleItemMouseEnter}
      onMouseMove={handleItemMouseMove}
      onBlur={handleItemBlur}
      onMouseLeave={handleItemMouseLeave}
      onPointerEnter={handleItemPointerEnter}
      onPointerMove={handleItemPointerMove}
      onPointerLeave={handleItemPointerLeave}
      {...rest}
    >
      {children}
    </RadixDropdownMenuSubTrigger>
  );
});

SubTrigger.displayName = DISPLAY_NAME;
