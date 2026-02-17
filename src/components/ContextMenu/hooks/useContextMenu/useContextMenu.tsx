import { useEffect, useId, useRef, useState } from 'react';

import { useIsTouchDevice, useIsAiming } from '@kommo-crm/react-hooks';

import { useFocusChange, FocusChangeEvent } from 'src/hooks';

import { ContextMenuMode } from '../../ContextMenu.enums';

import { ContextMenuModeType } from '../../ContextMenu.types';

import { contextMenuBus } from './utils';

import {
  UseContextMenuOptions,
  UseContextMenuResult,
} from './useContextMenu.types';

/**
 * The hook is necessary to manage the open state of the context menu and
 * the related events.
 */
export const useContextMenu = (
  options: UseContextMenuOptions
): UseContextMenuResult => {
  const {
    mode: rootMode,
    defaultOpen,
    animationDuration,
    hoverCloseDelay,
    isOpen: isOpenForcefully,
    onOpen,
    onAnimatedOpen,
    onAiming,
    onFocusOutside,
    aimingTolerance,
    aimingIdleTimeout,
  } = options;

  const id = useId();

  const [isOpen, setIsOpen] = useState(
    isOpenForcefully ?? defaultOpen ?? false
  );
  const [isAnimatedOpen, setIsAnimatedOpen] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);
  const [isInsideContent, setIsInsideContent] = useState(false);
  const [openedByKeyboard, setOpenedByKeyboard] = useState(false);
  const [isChildOpen, setIsChildOpen] = useState(false);
  const [childMode, setChildMode] = useState<ContextMenuModeType | null>(null);
  const [isRootContentBlocked, setIsRootContentBlocked] = useState(false);
  const [itemWithFocusedInput, setItemWithFocusedInput] = useState<
    string | null
  >(null);

  /**
   * Use ref to track isInsideContent for use in intervals
   */
  const isInsideContentRef = useRef(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldPreventFocusRestoreRef = useRef(false);
  const pendingCloseRef = useRef(false);
  const deferredEmitRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isChildAimingRef = useRef(false);
  const onFocusOutsideCallbackRef = useRef(onFocusOutside);

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

    if (deferredEmitRef.current) {
      clearTimeout(deferredEmitRef.current);
      deferredEmitRef.current = null;
    }
  };

  /**
   * Closes the menu.
   */
  const handleClose = () => {
    clearTimers();
    pendingCloseRef.current = false;
    setIsOpen(false);
    onOpen?.(false);
    setIsInsideContent(false);
    isInsideContentRef.current = false;
    setIsRootContentBlocked(false);
  };

  const handleAimingChange = (aiming: boolean) => {
    onAiming?.(aiming);

    /**
     * When aiming stops and there's a pending close request,
     * proceed with closing the menu (if cursor is not inside content
     * and no child submenu is being aimed at).
     */
    if (
      !aiming &&
      pendingCloseRef.current &&
      !isInsideContentRef.current &&
      !isChildAimingRef.current
    ) {
      pendingCloseRef.current = false;
      setIsAnimatedOpen(false);

      closeTimerRef.current = setTimeout(() => {
        handleClose();
      }, animationDuration);
    }
  };

  const { isAiming, ref: contentRef } = useIsAiming<HTMLDivElement>({
    isEnabled: isOpen && mode === ContextMenuMode.HOVER,
    onChange: handleAimingChange,
    tolerance: aimingTolerance,
    idleTimeout: aimingIdleTimeout,
  });

  /**
   * Returns whether any child submenu is being aimed at.
   */
  const isChildAiming = () => isChildAimingRef.current;

  /**
   * Called by child submenus (via LevelProvider) when their aiming state changes.
   * Also triggers pending close when child aiming stops.
   */
  const handleChildAimingChange = (aiming: boolean) => {
    isChildAimingRef.current = aiming;

    if (
      !aiming &&
      pendingCloseRef.current &&
      !isInsideContentRef.current &&
      !isAiming()
    ) {
      pendingCloseRef.current = false;
      setIsAnimatedOpen(false);

      closeTimerRef.current = setTimeout(() => {
        handleClose();
      }, animationDuration);
    }
  };

  /**
   * Requests the close of the menu.
   */
  const requestClose = () => {
    clearTimers();

    /**
     * Reset skipAnimation for normal close (not via contextMenuBus)
     * to ensure animation plays on timeout-based closure
     */
    setSkipAnimation(false);

    if (mode === ContextMenuMode.HOVER) {
      if (
        (isChildOpen && childMode === ContextMenuMode.CLICK) ||
        itemWithFocusedInput !== null
      ) {
        return;
      }

      /**
       * If cursor is inside content, close immediately
       */
      if (isInsideContent) {
        setIsAnimatedOpen(false);
        closeTimerRef.current = setTimeout(() => {
          handleClose();
        }, animationDuration);

        return;
      }

      /**
       * Mark that we have a pending close request.
       * If currently aiming, handleAimingChange will handle close when aiming stops.
       */
      pendingCloseRef.current = true;

      /**
       * If not currently aiming (own or child), proceed with close immediately.
       * Otherwise, handleAimingChange or handleChildAimingChange will handle it.
       */
      if (!isAiming() && !isChildAimingRef.current) {
        pendingCloseRef.current = false;
        setIsAnimatedOpen(false);

        closeTimerRef.current = setTimeout(() => {
          handleClose();
        }, animationDuration);
      }
    } else {
      handleClose();
    }
  };

  /**
   * Closes the menu immediately.
   * Used when closing via contextMenuBus or other immediate close scenarios.
   * @param preventFocusRestore - If true, prevents Radix from restoring focus to trigger.
   * @param skipAnimationFlag - If true, skips animation when closing or opening.
   */
  const closeMenuImmediately = ({
    preventFocusRestore = false,
    skipAnimationFlag = false,
  }: {
    preventFocusRestore?: boolean;
    skipAnimationFlag?: boolean;
  }) => {
    shouldPreventFocusRestoreRef.current = preventFocusRestore;
    clearTimers();
    pendingCloseRef.current = false;
    setSkipAnimation(skipAnimationFlag);
    setIsAnimatedOpen(false);
    setIsOpen(false);
    onOpen?.(false);
    setIsInsideContent(false);
    isInsideContentRef.current = false;
    setIsRootContentBlocked(false);
  };

  /**
   * Resets the focus restore prevention flag when menu closes.
   */
  useEffect(() => {
    if (!isOpen) {
      shouldPreventFocusRestoreRef.current = false;
    }
  }, [isOpen]);

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

      /**
       * Cancel any pending close when opening
       */
      if (pendingCloseRef.current) {
        clearTimers();
        pendingCloseRef.current = false;
      }

      if (mode === ContextMenuMode.HOVER) {
        setIsAnimatedOpen(true);
      }

      setIsOpen(true);
      onOpen?.(true);

      if (isOpenForcefully !== false) {
        contextMenuBus.emit({
          id,
          isAiming,
        });
      }

      return;
    }

    /**
     * Don't immediately set isOpen to false in HOVER mode.
     * Let requestClose handle the state change after checking aiming.
     */
    if (mode === ContextMenuMode.HOVER) {
      requestClose();
    } else {
      handleClose();
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
    if (
      mode !== ContextMenuMode.HOVER ||
      (contextMenuBus.isAiming?.() && contextMenuBus.activeMenuId !== id)
    ) {
      return;
    }

    setOpenedByKeyboard(false);

    /**
     * Clear all timers and stop movement checking when entering content
     */
    clearTimers();
    pendingCloseRef.current = false;

    if (isOpen) {
      setIsInsideContent(true);
      isInsideContentRef.current = true;
      setIsAnimatedOpen(true);
    } else {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }

      setIsAnimatedOpen(true);
      setIsOpen(true);
      onOpen?.(true);
      setIsInsideContent(true);
      isInsideContentRef.current = true;

      deferredEmitRef.current = setTimeout(() => {
        deferredEmitRef.current = null;

        if (isOpenForcefully !== false) {
          contextMenuBus.emit({
            id,
            isAiming,
          });
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
    isInsideContentRef.current = false;

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    /**
     * When leaving content, if there's a pending close and not aiming,
     * proceed with close. If aiming, handleAimingChange will handle it.
     */
    if (pendingCloseRef.current && !isAiming() && !isChildAimingRef.current) {
      pendingCloseRef.current = false;
      setIsAnimatedOpen(false);

      closeTimerRef.current = setTimeout(() => {
        handleClose();
      }, animationDuration);
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
   * Prevents focus restore to avoid triggering focus-outside handlers
   * on the newly opened menu.
   */
  useEffect(() => {
    if (isOpenForcefully === false) {
      return;
    }

    const unsubscribe = contextMenuBus.subscribe(({ id: openedId }) => {
      if (openedId !== id) {
        closeMenuImmediately({
          preventFocusRestore: true,
          skipAnimationFlag: true,
        });
      }
    });

    return unsubscribe;
  }, [id, isOpenForcefully]);

  /**
   * Handles the hover close delay.
   */
  useEffect(() => {
    if (!isOpen || mode !== ContextMenuMode.HOVER) {
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
  }, [mode, isOpen, isInsideContent, hoverCloseDelay, openedByKeyboard]);

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

    /**
     * Add root menu content
     */
    if (contentRef.current) {
      elements.push(contentRef.current);
    }

    /**
     * Add all submenu containers
     */
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
    elements: isOpen ? [contentRef, triggerRef] : [],
    enabled: isOpen,
    onFocusOutside: (event) => {
      const focusedElement = event.target;

      if (!isOpen || focusedElement === document.body) {
        return;
      }

      /**
       * Get current menu elements dynamically to include newly opened submenus
       */
      const currentMenuElements = getMenuElements();

      /**
       * Check if focus is actually outside all menu elements
       */
      const isInsideAnyMenu = currentMenuElements.some((menuElement) => {
        if (!focusedElement) {
          return false;
        }

        return (
          menuElement === focusedElement || menuElement.contains(focusedElement)
        );
      });

      /**
       * Only close if focus is truly outside all menus
       */
      if (!isInsideAnyMenu) {
        /**
         * Create event object for onFocusOutside callback.
         * Allows preventing menu closure via preventDefault().
         */
        let isPrevented = false;
        const focusEvent = {
          target: focusedElement,
          preventDefault: () => {
            isPrevented = true;
          },
          get defaultPrevented() {
            return isPrevented;
          },
        };

        onFocusOutsideCallbackRef.current?.(focusEvent);

        if (isPrevented) {
          return;
        }

        /**
         * Prevent focus restoration when closing due to focus loss
         */
        closeMenuImmediately({ preventFocusRestore: true });
      }
    },
  });

  /**
   * Checks if focus restoration should be prevented.
   */
  const shouldPreventFocusRestore = () => {
    return shouldPreventFocusRestoreRef.current;
  };

  /**
   * Sets the callback for when focus moves outside the menu.
   */
  const setOnFocusOutside = (
    callback: ((event: FocusChangeEvent) => void) | undefined
  ) => {
    onFocusOutsideCallbackRef.current = callback;
  };

  const handleCloseMenuImmediately = (preventFocusRestore?: boolean) => {
    closeMenuImmediately({ preventFocusRestore });
  };

  return {
    isOpen,
    mode,
    onOpenChange: handleOpenChange,
    onOpenByKeyboard,
    triggerRef,
    contentRef,
    isAnimatedOpen,
    skipAnimation,
    animationDuration,
    hoverCloseDelay,
    closeMenuImmediately: handleCloseMenuImmediately,
    onContentEnter: handleContentEnter,
    onContentLeave: handleContentLeave,
    onChildOpen: handleChildOpen,
    onSubmenuOpen: handleSubmenuOpen,
    isRootContentBlocked,
    isChildOpen,
    itemWithFocusedInput,
    setItemWithFocusedInput,
    shouldPreventFocusRestore,
    setOnFocusOutside,
    isChildAiming,
    onChildAiming: handleChildAimingChange,
  };
};
