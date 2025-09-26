import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';

import { useInheritedArrowColor, useIsTouchDevice } from '..';

import { ContextMenuMode } from '../../ContextMenu.enums';

import { useLevelContext } from '../../providers';

import { useContextMenuRootContext } from '../../ContextMenu.context';

import { UseContextMenuSubMenuOptions } from './useContextMenuSubMenu.types';

export const useContextMenuSubMenu = ({
  displayName,
  mode: rootMode,
  defaultOpen,
  animationDuration,
  subMenuOpen,
  setSubMenuOpen,
  hoverCloseDelay,
  closeRootMenuImmediately,
  onOpen,
  onAnimatedOpen,
}: UseContextMenuSubMenuOptions) => {
  const triggerId = useId();

  const [open, setOpen] = useState(subMenuOpen || defaultOpen || false);
  const [animatedOpen, setAnimatedOpen] = useState(false);
  const [isInsideContent, setIsInsideContent] = useState(false);
  const [openedByKeyboard, setOpenedByKeyboard] = useState(false);
  const [temporaryHoverClose, setTemporaryHoverClose] = useState(false);

  const { activeItemId } = useLevelContext(displayName);

  const { onChildClickOpen } = useContextMenuRootContext(displayName);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isTouchDevice = useIsTouchDevice();

  /**
   * The mode of the ContextMenu.Root.
   */
  const mode = isTouchDevice ? ContextMenuMode.CLICK : rootMode;

  const isOpen = subMenuOpen || open;

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
    setTemporaryHoverClose(false);

    if (closeRootMenu) {
      closeRootMenuImmediately?.();
    }
  };

  /**
   * Requests the close of the menu.
   */
  const requestClose = () => {
    clearTimers();

    if (mode === ContextMenuMode.HOVER || temporaryHoverClose) {
      setAnimatedOpen(false);

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
  const closeMenuImmediately = (closeRootMenu: boolean = false) => {
    clearTimers();
    setAnimatedOpen(false);
    setSubMenuOpen?.(false);
    onOpen?.(false);
    setIsInsideContent(false);
    setTemporaryHoverClose(false);

    if (closeRootMenu) {
      closeRootMenuImmediately?.();
    }
  };

  /**
   * Handles the open state change.
   */
  const handleOpenChange = (value: boolean) => {
    if (mode === ContextMenuMode.CLICK) {
      if (defaultOpen !== undefined) {
        return;
      }
    }

    if (value) {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }

      if (mode === ContextMenuMode.HOVER || temporaryHoverClose) {
        setAnimatedOpen(true);
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
   * Handles the mouse enter event.
   */
  const handleMouseEnter = () => {
    setOpenedByKeyboard(false);

    if (mode !== ContextMenuMode.HOVER && !temporaryHoverClose) {
      return;
    }

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
      setAnimatedOpen(true);
    }

    if (open) {
      setIsInsideContent(true);
    } else {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }

      setAnimatedOpen(true);
      setSubMenuOpen?.(true);
      onOpen?.(true);
      setIsInsideContent(true);
    }
  };

  /**
   * Handles the mouse leave event.
   */
  const handleMouseLeave = () => {
    setOpenedByKeyboard(false);

    if (mode !== ContextMenuMode.HOVER && !temporaryHoverClose) {
      return;
    }

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    setIsInsideContent(false);
  };

  /**
   * Enables the temporary hover close.
   */
  const enableTemporaryHoverClose = () => {
    setAnimatedOpen(true);
    setIsInsideContent(true);
    setTemporaryHoverClose(true);
  };

  /**
   * Synchronizes the local open state with the submenu open state.
   */
  useLayoutEffect(() => {
    if (subMenuOpen !== undefined) {
      setAnimatedOpen(subMenuOpen);
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
    if (
      (!open && !animatedOpen) ||
      (mode !== ContextMenuMode.HOVER && !temporaryHoverClose)
    ) {
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
  }, [mode, open, isInsideContent, temporaryHoverClose, hoverCloseDelay]);

  /**
   * Handles the animated open state change.
   */
  useEffect(() => {
    onAnimatedOpen?.(animatedOpen);
  }, [animatedOpen]);

  /**
   * Updates the inherited arrow color when the menu is open.
   */
  const inheritedArrowColor = useInheritedArrowColor(open, contentRef);

  /**
   * This effect is used to call the onChildClickOpen callback function
   * when the submenu is opened or closed by child click.
   */
  useEffect(() => {
    if (mode === ContextMenuMode.CLICK && isOpen) {
      onChildClickOpen?.(true);
    } else if (mode === ContextMenuMode.CLICK && !isOpen) {
      onChildClickOpen?.(false);
    }
  }, [isOpen, mode]);

  return {
    mode,
    isOpen,
    onOpenChange: handleOpenChange,
    onOpenByKeyboard,
    inheritedArrowColor,
    triggerRef,
    contentRef,
    animatedOpen,
    animationDuration,
    hoverCloseDelay,
    temporaryHoverClose,
    closeMenuImmediately,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    enableTemporaryHoverClose,
    triggerId,
  };
};
