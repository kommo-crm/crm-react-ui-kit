import { useEffect, useId, useRef, useState } from 'react';

import {
  useClickOutside,
  useIsTouchDevice,
  useMenuAim,
} from '../../../../hooks';
import { ContextMenuMode } from '../../../../ContextMenu.enums';
import { useContextMenuContext } from '../../../../ContextMenu.context';
import { useLevelContext } from '../../../../providers/LevelProvider';

import { MenuAimDirection } from '../../../../hooks/useMenuAim/useMenuAim.types';

import { ContextMenuModeType } from '../../../../ContextMenu.types';

import { UseContextMenuSubOptions } from './useContextMenuSub.types';

export const useContextMenuSub = (options: UseContextMenuSubOptions) => {
  const {
    displayName,
    mode: initialMode,
    defaultOpen,
    onOpen,
    onAiming,
  } = options;

  const {
    activeItemId,
    onChildOpen,
    onSubRootOpen,
    isAnimatedOpen: parentIsAnimatedOpen,
    isMovingTowardMenuRef: isMovingTowardMenuContextRef,
  } = useLevelContext(displayName);

  const triggerId = useId();

  const [isOpen, setIsOpen] = useState(defaultOpen || false);
  const [isAnimatedOpen, setIsAnimatedOpen] = useState(false);
  const [isInsideContent, setIsInsideContent] = useState(false);
  const [isOpenedByKeyboard, setIsOpenedByKeyboard] = useState(false);
  const [isChildOpen, setIsChildOpen] = useState(false);
  const [childMode, setChildMode] = useState<ContextMenuModeType | null>(null);
  const [isSubRootOpen, setIsSubRootOpen] = useState(false);
  const [itemWithFocusedInput, setItemWithFocusedInput] = useState<
    string | null
  >(null);

  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const movementCheckIntervalRef = useRef<ReturnType<
    typeof setInterval
  > | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const pendingCloseRef = useRef(false);
  // Use ref to track isInsideContent for use in intervals
  const isInsideContentRef = useRef(false);

  const isTouchDevice = useIsTouchDevice();

  const { hoverCloseDelay, animationDuration } =
    useContextMenuContext(displayName);

  /**
   * The mode of the submenu.
   */
  const mode = isTouchDevice ? ContextMenuMode.CLICK : initialMode;

  /**
   * Direction for menu aim, determined from Radix's data-side attribute.
   */
  const [menuAimDirection, setMenuAimDirection] = useState<MenuAimDirection>(
    MenuAimDirection.RIGHT
  );

  /**
   * Read direction from Radix's data-side attribute on content element.
   * Uses MutationObserver to detect when Radix sets the attribute after positioning.
   */
  useEffect(() => {
    if (!isOpen || !contentRef.current) {
      return;
    }

    const element = contentRef.current;

    const updateDirection = () => {
      const dataSide = element.getAttribute(
        'data-side'
      ) as MenuAimDirection | null;

      if (dataSide) {
        setMenuAimDirection(dataSide);
      }
    };

    // Check immediately
    updateDirection();

    // Observe changes to data-side attribute
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-side'
        ) {
          updateDirection();
        }
      }
    });

    observer.observe(element, {
      attributes: true,
      attributeFilter: ['data-side'],
    });

    return () => {
      observer.disconnect();
    };
  }, [isOpen, contentRef.current]);

  const { isMovingTowardMenuRef } = useMenuAim({
    contentRef,
    direction: menuAimDirection,
    enabled: isOpen && mode === ContextMenuMode.HOVER,
    externalRef: isMovingTowardMenuContextRef || undefined,
  });

  const handleSubmenuOpen = (value: boolean) => {
    /**
     * Important for the case of Sub -> SubRoot nesting.
     */
    setTimeout(() => onSubRootOpen?.(value), 0);
  };

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

    if (movementCheckIntervalRef.current) {
      clearInterval(movementCheckIntervalRef.current);
      movementCheckIntervalRef.current = null;
    }
  };

  /**
   * Closes the submenu immediately.
   */
  const handleCloseImmediate = () => {
    clearTimers();
    setIsAnimatedOpen(false);
    setIsOpen(false);
    onOpen?.(false);
    handleSubmenuOpen(false);
    setIsInsideContent(false);
    isInsideContentRef.current = false;
    setIsOpenedByKeyboard(false);
  };

  /**
   * Requests the close of the submenu.
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

      // If cursor is inside content, close immediately
      if (isInsideContent) {
        setIsAnimatedOpen(false);
        closeTimerRef.current = setTimeout(() => {
          setIsOpen(false);
          onOpen?.(false);
          handleSubmenuOpen(false);
          setIsInsideContent(false);
          isInsideContentRef.current = false;
          setIsOpenedByKeyboard(false);
        }, animationDuration);

        return;
      }

      // Mark that we have a pending close request
      pendingCloseRef.current = true;

      // Start checking movement periodically
      if (!movementCheckIntervalRef.current) {
        movementCheckIntervalRef.current = setInterval(() => {
          // If cursor entered content, stop checking and cancel close
          if (isInsideContentRef.current) {
            clearTimers();
            pendingCloseRef.current = false;
            setIsAnimatedOpen(true);

            return;
          }

          // Check if still moving toward menu
          if (isMovingTowardMenuRef.current) {
            // Still moving toward menu, keep delaying close
            return;
          }

          // Not moving toward menu anymore, proceed with close
          clearTimers();
          pendingCloseRef.current = false;
          setIsAnimatedOpen(false);

          closeTimerRef.current = setTimeout(() => {
            setIsOpen(false);
            onOpen?.(false);
            handleSubmenuOpen(false);
            setIsInsideContent(false);
            isInsideContentRef.current = false;
            setIsOpenedByKeyboard(false);
          }, animationDuration);
        }, 50);
      }
    } else {
      handleCloseImmediate();
    }
  };

  /**
   * Handles the open state change.
   */
  const handleOpenChange = (value: boolean) => {
    if (defaultOpen !== undefined) {
      setIsOpen(defaultOpen);
      onOpen?.(defaultOpen);
      handleSubmenuOpen(defaultOpen);
      setIsAnimatedOpen(defaultOpen);
      setIsOpenedByKeyboard(false);

      return;
    }

    if (mode === ContextMenuMode.CLICK || isOpenedByKeyboard) {
      setIsOpen(value);
      onOpen?.(value);
      handleSubmenuOpen(value);
      /**
       * It is necessary for correct standard keyboard navigation.
       * Removes the jump from the positioning hook.
       */
      setTimeout(() => setIsAnimatedOpen(value), 0);

      return;
    }

    if (value) {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }

      setIsOpen(true);
      onOpen?.(true);
      setIsAnimatedOpen(true);
      handleSubmenuOpen(true);
    } else {
      requestClose();
    }
  };

  /**
   * The callback function to be called when the submenu is opened by keyboard.
   */
  const onOpenByKeyboard = (value: boolean) => {
    setIsOpenedByKeyboard(value);
  };

  /**
   * Handles entering the submenu content area.
   * Keeps the submenu open in hover mode by canceling close timers.
   */
  const handleContentEnter = () => {
    if (
      mode !== ContextMenuMode.HOVER ||
      (isMovingTowardMenuRef.current && activeItemId !== triggerId)
    ) {
      return;
    }

    setIsOpenedByKeyboard(false);

    // Clear all timers and stop movement checking when entering content
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
      onOpen?.(true);
      handleSubmenuOpen(true);
      setIsOpen(true);
      setIsInsideContent(true);
      isInsideContentRef.current = true;
    }
  };

  /**
   * Handles leaving the submenu content area.
   * Allows the submenu to close in hover mode.
   */
  const handleContentLeave = () => {
    if (mode !== ContextMenuMode.HOVER) {
      return;
    }

    setIsOpenedByKeyboard(false);
    setIsInsideContent(false);
    isInsideContentRef.current = false;

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    // When leaving content, if there's a pending close, restart the check
    if (pendingCloseRef.current && !movementCheckIntervalRef.current) {
      movementCheckIntervalRef.current = setInterval(() => {
        // If cursor re-entered content, stop checking and cancel close
        if (isInsideContentRef.current) {
          clearTimers();
          pendingCloseRef.current = false;
          setIsAnimatedOpen(true);

          return;
        }

        // Check if still moving toward menu
        if (isMovingTowardMenuRef.current) {
          // Still moving toward menu, keep delaying close
          return;
        }

        // Not moving toward menu anymore, proceed with close
        clearTimers();
        pendingCloseRef.current = false;
        setIsAnimatedOpen(false);

        closeTimerRef.current = setTimeout(() => {
          setIsOpen(false);
          onOpen?.(false);
          handleSubmenuOpen(false);
          setIsInsideContent(false);
          isInsideContentRef.current = false;
          setIsOpenedByKeyboard(false);
        }, animationDuration);
      }, 50);
    }
  };

  /**
   * The callback function to be called when the submenu is opened by child click.
   */
  const handleChildOpen = (
    value: boolean,
    childModeValue: ContextMenuModeType
  ) => {
    setIsChildOpen(value);
    setChildMode(childModeValue);
  };

  /**
   * Handles the click outside event.
   */
  const handleClickOutside = () => {
    if (!isSubRootOpen) {
      handleCloseImmediate();
    }
  };

  /**
   * The callback function to be called when the subroot is opened.
   */
  const handleSubRootOpen = (value: boolean) => {
    setIsSubRootOpen(value);
  };

  /**
   * Closes the submenu when the active item id changes.
   */
  useEffect(() => {
    if (activeItemId !== triggerId && isOpen && defaultOpen === undefined) {
      handleCloseImmediate();
    }
  }, [activeItemId, isOpen, defaultOpen]);

  /**
   * Handles the hover close delay.
   */
  useEffect(() => {
    if (!isOpen || mode !== ContextMenuMode.HOVER || isOpenedByKeyboard) {
      return;
    }

    if (isInsideContent) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }

      return;
    }

    if (!hoverTimeoutRef.current) {
      hoverTimeoutRef.current = setTimeout(() => {
        requestClose();
      }, hoverCloseDelay);
    }

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
    };
  }, [mode, isOpen, isInsideContent, hoverCloseDelay, isOpenedByKeyboard]);

  /**
   * This effect is used to call the onChildOpen callback function
   * when the submenu is opened or closed by click.
   */
  useEffect(() => {
    onChildOpen?.(isOpen, mode);
  }, [isOpen, mode]);

  /**
   * This effect is used to call the onChildOpen callback function
   * when the item with the focused input is opened.
   */
  useEffect(() => {
    if (itemWithFocusedInput !== null) {
      onChildOpen?.(true, ContextMenuMode.CLICK);
    }
  }, [itemWithFocusedInput]);

  /**
   * onChildOpen states propagation.
   *
   * Important for the cases like Root (hover) -> Sub (hover) -> SubRoot (click) nesting.
   */
  useEffect(() => {
    if (childMode === null) {
      return;
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;

      return;
    }

    if (isChildOpen && childMode === ContextMenuMode.CLICK) {
      onChildOpen?.(true, childMode);
    } else {
      onChildOpen?.(isOpen, mode);
    }
  }, [isChildOpen, childMode]);

  /**
   * Handles the open state change when the open state changes.
   */
  useEffect(() => {
    handleOpenChange(isOpen);
  }, [isOpen]);

  /**
   * Handles the click outside event.
   */
  useClickOutside({
    refs: [contentRef, triggerRef],
    handler: handleClickOutside,
  });

  /**
   * Closes the submenu when the parent menu is closed.
   *
   * It is necessary for the case when the click disappeared from the child,
   * after which we focused on the distant parent.
   */
  useEffect(() => {
    if (!parentIsAnimatedOpen) {
      requestClose();
    }
  }, [parentIsAnimatedOpen]);

  /**
   * Handles the aiming state change.
   */
  useEffect(() => {
    onAiming?.(isMovingTowardMenuRef.current);
  }, [isMovingTowardMenuRef.current, onAiming]);

  return {
    isOpen,
    setIsOpen,
    isAnimatedOpen,
    handleContentEnter,
    handleContentLeave,
    handleOpenChange,
    onOpenByKeyboard,
    triggerId,
    contentRef,
    triggerRef,
    onChildOpen: handleChildOpen,
    onSubRootOpen: handleSubRootOpen,
    closeMenuImmediately: handleCloseImmediate,
    itemWithFocusedInput,
    setItemWithFocusedInput,
    isMovingTowardMenuRef,
  };
};
