import React, { useEffect, useId, useMemo, useRef, useState } from 'react';

import { createPortal } from 'react-dom';

import cx from 'classnames';

import { useIsTouchDevice } from '..';

import { ContextMenuMode } from '../../ContextMenu.enums';

import { ContextMenuModeType } from '../../ContextMenu.types';

import { FocusBlocker } from '../../components/FocusBlocker';

import { contextMenuBus } from './utils';

import { UseContextMenuOptions } from './useContextMenu.types';

/**
 * The hook is necessary to manage the open state of the context menu and
 * the related events.
 */
export const useContextMenu = (options: UseContextMenuOptions) => {
  const {
    mode: rootMode,
    defaultOpen,
    animationDuration,
    hoverCloseDelay,
    onOpen,
    onAnimatedOpen,
    isOpen,
    enableInnerInputFocus,
    backgroundFocusBlockerContainers,
    backgroundFocusBlockerClassName,
    backgroundInputFocusBlockerClassName,
  } = options;

  const id = useId();

  const [open, setOpen] = useState(isOpen ?? defaultOpen ?? false);
  const [isAnimatedOpen, setIsAnimatedOpen] = useState(false);
  const [isInsideContent, setIsInsideContent] = useState(false);
  const [openedByKeyboard, setOpenedByKeyboard] = useState(false);
  const [isChildOpen, setIsChildOpen] = useState(false);
  const [childMode, setChildMode] = useState<ContextMenuModeType | null>(null);
  const [isRootContentBlocked, setIsRootContentBlocked] = useState(false);
  const [itemWithFocusedInput, setItemWithFocusedInput] = useState<
    string | null
  >(null);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isTouchDevice = useIsTouchDevice();

  /**
   * The mode of the ContextMenu.Root.
   */
  const mode = isTouchDevice ? ContextMenuMode.CLICK : rootMode;

  /**
   * Clears the timers.
   */
  const clearTimers = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  /**
   * Closes the menu.
   */
  const handleClose = () => {
    setOpen(false);
    onOpen?.(false);
    setIsInsideContent(false);
    setIsRootContentBlocked(false);
  };

  /**
   * Requests the close of the menu.
   */
  const requestClose = () => {
    clearTimers();

    if (mode === ContextMenuMode.HOVER) {
      if (
        (isChildOpen && childMode === ContextMenuMode.CLICK) ||
        itemWithFocusedInput !== null
      ) {
        return;
      }

      setIsAnimatedOpen(false);

      closeTimerRef.current = setTimeout(() => {
        handleClose();
      }, animationDuration);
    } else {
      handleClose();
    }
  };

  /**
   * Closes the menu immediately.
   */
  const closeMenuImmediately = () => {
    clearTimers();
    setIsAnimatedOpen(false);
    setOpen(false);
    onOpen?.(false);
    setIsInsideContent(false);
  };

  /**
   * Handles the submenu open state change.
   */
  const handleSubmenuOpen = (value: boolean) => {
    setIsRootContentBlocked(value);
  };

  /**
   * Handles the open state change.
   */
  const handleOpenChange = (value: boolean) => {
    if (mode === ContextMenuMode.CLICK && defaultOpen !== undefined) {
      return;
    }

    if (value) {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }

      if (mode === ContextMenuMode.HOVER) {
        setIsAnimatedOpen(true);
      }

      setOpen(true);
      onOpen?.(true);

      setTimeout(() => contextMenuBus.emit(id), 0);
    } else {
      requestClose();
    }
  };

  /**
   * The callback function to be called when the menu is opened by keyboard.
   */
  const onOpenByKeyboard = (value: boolean) => {
    setOpenedByKeyboard(value);
    handleOpenChange(value);
  };

  /**
   * Handles entering the menu content area.
   * Keeps the menu open in hover mode by canceling close timers.
   */
  const handleContentEnter = () => {
    if (mode !== ContextMenuMode.HOVER) {
      return;
    }

    setOpenedByKeyboard(false);

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
      setIsAnimatedOpen(true);
    }

    if (open) {
      setIsInsideContent(true);
    } else {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }

      setIsAnimatedOpen(true);
      setOpen(true);
      onOpen?.(true);
      setIsInsideContent(true);

      setTimeout(() => contextMenuBus.emit(id), 0);
    }
  };

  /**
   * Handles leaving the menu content area.
   * Allows the menu to close in hover mode.
   */
  const handleContentLeave = () => {
    if (mode !== ContextMenuMode.HOVER) {
      return;
    }

    setOpenedByKeyboard(false);
    setIsInsideContent(false);

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  /**
   * The callback function to be called when the menu is opened by child click.
   */
  const handleChildOpen = (
    value: boolean,
    childModeValue: ContextMenuModeType
  ) => {
    if (!value) {
      setIsRootContentBlocked(false);
    }

    setIsChildOpen(value);
    setChildMode(childModeValue);
  };

  /**
   * Closes the menu when the context menu bus emits an event.
   */
  useEffect(() => {
    const unsubscribe = contextMenuBus.subscribe((openedId) => {
      if (openedId !== id) {
        closeMenuImmediately();
      }
    });

    return unsubscribe;
  }, [id]);

  /**
   * Handles the hover close delay.
   */
  useEffect(() => {
    if (!open || mode !== ContextMenuMode.HOVER) {
      return;
    }

    if (openedByKeyboard) {
      return;
    }

    if (isInsideContent) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
    } else if (!hoverTimeoutRef.current) {
      hoverTimeoutRef.current = setTimeout(() => {
        requestClose();
      }, hoverCloseDelay);
    }
  }, [mode, open, isInsideContent, hoverCloseDelay, openedByKeyboard]);

  /**
   * Handles the animated open state change.
   */
  useEffect(() => {
    onAnimatedOpen?.(isAnimatedOpen);
  }, [isAnimatedOpen]);

  /**
   * The portals of the focus blockers.
   *
   * It is necessary to mount global background blockers to isolate
   * the possibility of other elements intercepting focus.
   */
  const focusBlockerPortals = useMemo(() => {
    if (!enableInnerInputFocus || !backgroundFocusBlockerContainers || !open) {
      return null;
    }

    const containers = backgroundFocusBlockerContainers
      .map((c) => (typeof c === 'function' ? c() : c))
      .filter(Boolean) as HTMLElement[];

    return containers.map((container, index) =>
      createPortal(
        <FocusBlocker
          key={index}
          className={cx(
            backgroundFocusBlockerClassName,
            itemWithFocusedInput !== null &&
              backgroundInputFocusBlockerClassName
          )}
          onClick={() => {
            (document.activeElement as HTMLElement)?.blur();
          }}
          disabledHandlers={['onPointerDown']}
        />,
        container
      )
    );
  }, [
    enableInnerInputFocus,
    backgroundFocusBlockerContainers,
    backgroundFocusBlockerClassName,
    backgroundInputFocusBlockerClassName,
    open,
    itemWithFocusedInput,
  ]);

  return {
    open,
    mode,
    onOpenChange: handleOpenChange,
    onOpenByKeyboard,
    triggerRef,
    contentRef,
    isAnimatedOpen,
    animationDuration,
    hoverCloseDelay,
    closeMenuImmediately,
    onContentEnter: handleContentEnter,
    onContentLeave: handleContentLeave,
    onChildOpen: handleChildOpen,
    onSubmenuOpen: handleSubmenuOpen,
    isRootContentBlocked,
    isChildOpen,
    itemWithFocusedInput,
    setItemWithFocusedInput,
    focusBlockerPortals,
  };
};
