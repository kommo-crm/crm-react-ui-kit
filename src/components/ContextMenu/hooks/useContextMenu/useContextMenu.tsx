import { useEffect, useId, useRef, useState } from 'react';

import { useFocusChange } from 'src/hooks';

import { useIsTouchDevice } from '..';

import { ContextMenuMode } from '../../ContextMenu.enums';

import { ContextMenuModeType } from '../../ContextMenu.types';

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
    isOpen: isOpenForcefully,
    enableCloseOnFocusLoss,
  } = options;

  const id = useId();

  const [open, setOpen] = useState(isOpenForcefully ?? defaultOpen ?? false);
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
  const shouldPreventFocusRestoreRef = useRef(false);

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
   * @param preventFocusRestore - If true, prevents Radix from restoring focus to trigger.
   */
  const closeMenuImmediately = (preventFocusRestore = false) => {
    shouldPreventFocusRestoreRef.current = preventFocusRestore;
    clearTimers();
    setIsAnimatedOpen(false);
    setOpen(false);
    onOpen?.(false);
    setIsInsideContent(false);
  };

  /**
   * Resets the focus restore prevention flag when menu closes.
   */
  useEffect(() => {
    if (!open) {
      // Reset flag after menu closes to allow normal behavior on next open
      const timeoutId = setTimeout(() => {
        shouldPreventFocusRestoreRef.current = false;
      }, 0);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [open]);

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

      setTimeout(() => {
        if (isOpenForcefully !== false) {
          contextMenuBus.emit(id);
        }
      }, 0);
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

      setTimeout(() => {
        if (isOpenForcefully !== false) {
          contextMenuBus.emit(id);
        }
      }, 0);
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
    if (isOpenForcefully === false) {
      return;
    }

    const unsubscribe = contextMenuBus.subscribe((openedId) => {
      if (openedId !== id) {
        closeMenuImmediately();
      }
    });

    return unsubscribe;
  }, [id, isOpenForcefully]);

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
   * Collects all menu elements dynamically when needed.
   * This ensures we always have the latest menu elements including newly opened submenus.
   */
  const getMenuElements = (): HTMLElement[] => {
    const elements: HTMLElement[] = [];

    // Add root menu content
    if (contentRef.current) {
      elements.push(contentRef.current);
    }

    // Add all submenu containers
    const submenuContainers = Array.from(
      document.querySelectorAll<HTMLElement>('[data-menu-level]')
    );

    elements.push(...submenuContainers);

    return elements;
  };

  /**
   * Tracks focus changes and closes menu when focus moves outside.
   */
  useFocusChange({
    elements: open ? [contentRef] : [],
    enabled: open,
    onFocusOutside: (focusedElement) => {
      if (!open || !enableCloseOnFocusLoss) {
        return;
      }

      // Get current menu elements dynamically to include newly opened submenus
      const currentMenuElements = getMenuElements();

      // Check if focus is actually outside all menu elements
      const isInsideAnyMenu = currentMenuElements.some((menuElement) => {
        if (!focusedElement) {
          return false;
        }

        return (
          menuElement === focusedElement || menuElement.contains(focusedElement)
        );
      });

      // Only close if focus is truly outside all menus
      if (!isInsideAnyMenu) {
        // Prevent focus restoration when closing due to focus loss
        closeMenuImmediately(true);
      }
    },
  });

  /**
   * Checks if focus restoration should be prevented.
   */
  const shouldPreventFocusRestore = () => {
    return shouldPreventFocusRestoreRef.current;
  };

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
    shouldPreventFocusRestore,
  };
};
