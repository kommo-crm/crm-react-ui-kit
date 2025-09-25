import { useEffect, useId, useRef, useState } from 'react';

import { useInheritedArrowColor, useIsTouchDevice } from '..';

import { ContextMenuMode } from '../../ContextMenu.enums';

import { contextMenuBus } from '../../utils';

import { UseContextMenuOptions } from './useContextMenu.types';

export const useContextMenu = ({
  mode: rootMode,
  defaultOpen,
  animationDuration,
  hoverCloseDelay,
  onOpen,
  onAnimatedOpen,
}: UseContextMenuOptions) => {
  const id = useId();

  const [open, setOpen] = useState(defaultOpen || false);
  const [animatedOpen, setAnimatedOpen] = useState(false);
  const [isInsideContent, setIsInsideContent] = useState(false);
  const [openedByKeyboard, setOpenedByKeyboard] = useState(false);
  const [temporaryHoverClose, setTemporaryHoverClose] = useState(false);
  const [isChildClickOpen, setIsChildClickOpen] = useState(false);

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
    setTemporaryHoverClose(false);
  };

  /**
   * Requests the close of the menu.
   */
  const requestClose = () => {
    clearTimers();

    if (mode === ContextMenuMode.HOVER || temporaryHoverClose) {
      if (isChildClickOpen) {
        return;
      }

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
  const closeMenuImmediately = () => {
    clearTimers();
    setAnimatedOpen(false);
    setOpen(false);
    onOpen?.(false);
    setIsInsideContent(false);
    setTemporaryHoverClose(false);
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

      if (mode === ContextMenuMode.HOVER || temporaryHoverClose) {
        setAnimatedOpen(true);
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
   * Handles the mouse enter event.
   */
  const handleMouseEnter = () => {
    if (mode !== ContextMenuMode.HOVER && !temporaryHoverClose) {
      return;
    }

    setOpenedByKeyboard(false);

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
      setOpen(true);
      onOpen?.(true);
      setIsInsideContent(true);

      setTimeout(() => contextMenuBus.emit(id), 0);
    }
  };

  /**
   * Handles the mouse leave event.
   */
  const handleMouseLeave = () => {
    if (mode !== ContextMenuMode.HOVER && !temporaryHoverClose) {
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
   * Enables the temporary hover close.
   */
  const enableTemporaryHoverClose = () => {
    setAnimatedOpen(true);
    setIsInsideContent(true);
    setTemporaryHoverClose(true);
  };

  /**
   * The callback function to be called when the menu is opened by child click.
   */
  const handleChildClickOpen = (value: boolean) => {
    setIsChildClickOpen(value);
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
    if (!open || (mode !== ContextMenuMode.HOVER && !temporaryHoverClose)) {
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
  }, [
    mode,
    open,
    isInsideContent,
    temporaryHoverClose,
    hoverCloseDelay,
    openedByKeyboard,
  ]);

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

  return {
    open,
    mode,
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
    onChildClickOpen: handleChildClickOpen,
  };
};
