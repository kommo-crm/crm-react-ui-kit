import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';

import { useIsTouchDevice } from '../../../../hooks';

import { ContextMenuMode } from '../../../../ContextMenu.enums';

import { useLevelContext } from '../../../../providers';

import {
  useContextMenuContext,
  useContextMenuRootContext,
} from '../../../../ContextMenu.context';

import { ContextMenuModeType } from '../../../../ContextMenu.types';

import { UseContextMenuSubMenuOptions } from './useContextMenuSubMenu.types';

export const useContextMenuSubMenu = (
  options: UseContextMenuSubMenuOptions
) => {
  const {
    displayName,
    mode: rootMode,
    defaultOpen,
    animationDuration,
    subMenuOpen,
    hoverCloseDelay,
    onOpen,
    setSubMenuOpen,
    onAnimatedOpen,
  } = options;

  const triggerId = useId();

  const [open, setOpen] = useState(subMenuOpen || defaultOpen || false);
  const [isAnimatedOpen, setIsAnimatedOpen] = useState(false);
  const [isInsideContent, setIsInsideContent] = useState(false);
  const [openedByKeyboard, setOpenedByKeyboard] = useState(false);
  const [isChildOpen, setIsChildOpen] = useState(false);
  const [childMode, setChildMode] = useState<ContextMenuModeType | null>(null);
  const [itemWithFocusedInput, setItemWithFocusedInput] = useState<
    string | null
  >(null);

  const {
    activeItemId,
    level,
    isAnimatedOpen: parentIsAnimatedOpen,
    onChildOpen,
    onSubRootOpen,
  } = useLevelContext(displayName);

  const { onSubmenuOpen } = useContextMenuContext(displayName);

  const { closeRootMenuImmediately } = useContextMenuRootContext(displayName);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);

  const isTouchDevice = useIsTouchDevice();

  /**
   * The mode of the ContextMenu.Root.
   */
  const mode = isTouchDevice ? ContextMenuMode.CLICK : rootMode;

  /**
   * The open state of the submenu.
   */
  const isOpen = subMenuOpen || open;

  const handleSubmenuOpen = (value: boolean) => {
    /**
     * Not necessary in case of Root -> SubRoot nesting.
     */
    if (level > 1) {
      onSubmenuOpen?.(value);
    }

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
  };

  /**
   * Closes the menu.
   */
  const handleClose = (closeRootMenu: boolean = false) => {
    setSubMenuOpen?.(false);
    setOpen(false);
    onOpen?.(false);
    setIsInsideContent(false);

    if (closeRootMenu) {
      closeRootMenuImmediately?.();
    }
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
    setSubMenuOpen?.(false);
    onOpen?.(false);
    setIsInsideContent(false);
  };

  /**
   * Handles the open state change.
   */
  const handleOpenChange = (value: boolean) => {
    if (mode === ContextMenuMode.CLICK) {
      if (defaultOpen !== undefined) {
        setOpen(defaultOpen);

        return;
      }
    }

    if (value) {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }

      if (mode === ContextMenuMode.HOVER) {
        setIsAnimatedOpen(true);
      }

      setSubMenuOpen?.(true);
      onOpen?.(true);
    } else {
      requestClose();
    }
  };

  /**
   * The callback function to be called when the menu is opened by keyboard.
   */
  const onOpenByKeyboard = (value: boolean) => {
    setOpenedByKeyboard(value);
    handleOpenChange?.(value);
  };

  /**
   * Handles entering the submenu content area.
   * Keeps the submenu open in hover mode by canceling close timers.
   */
  const handleContentEnter = () => {
    setOpenedByKeyboard(false);

    if (mode !== ContextMenuMode.HOVER) {
      return;
    }

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
      setSubMenuOpen?.(true);
      onOpen?.(true);
      setIsInsideContent(true);
    }
  };

  /**
   * Handles leaving the submenu content area.
   * Allows the submenu to close in hover mode.
   */
  const handleContentLeave = () => {
    setOpenedByKeyboard(false);

    if (mode !== ContextMenuMode.HOVER) {
      return;
    }

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    setIsInsideContent(false);
  };

  /**
   * The callback function to be called when the menu is opened by child click.
   */
  const handleChildOpen = (
    value: boolean,
    childModeValue: ContextMenuModeType
  ) => {
    setIsChildOpen(value);
    setChildMode(childModeValue);
  };

  /**
   * Synchronizes the local open state with the submenu open state.
   */
  useLayoutEffect(() => {
    if (subMenuOpen !== undefined) {
      setIsAnimatedOpen(subMenuOpen);
    }
  }, [subMenuOpen]);

  /**
   * Closes the submenu when the active item id changes.
   */
  useEffect(() => {
    if (activeItemId !== triggerId && (open || subMenuOpen)) {
      closeMenuImmediately();
    }
  }, [activeItemId, open, triggerId]);

  /**
   * Handles the hover close delay.
   */
  useEffect(() => {
    if ((!open && !isAnimatedOpen) || mode !== ContextMenuMode.HOVER) {
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
  }, [mode, open, isInsideContent, hoverCloseDelay]);

  /**
   * Handles the animated open state change.
   */
  useEffect(() => {
    onAnimatedOpen?.(isAnimatedOpen);
  }, [isAnimatedOpen]);

  /**
   * This effect is used to call the onChildOpen callback function
   * when the submenu is opened or closed by child click.
   */
  useEffect(() => {
    onChildOpen(isOpen, mode);
    handleSubmenuOpen(isOpen);
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

  return {
    mode,
    isOpen,
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
    triggerId,
    onChildOpen: handleChildOpen,
    itemWithFocusedInput,
    setItemWithFocusedInput,
  };
};
