import { useEffect, useId, useRef, useState } from 'react';

import { useInheritedArrowColor, useIsTouchDevice } from '..';

import { ContextMenuMode } from '../../ContextMenu.enums';

import { contextMenuBus } from '../../utils';

import { UseContextMenuOptions } from './useContextMenu.types';

export const useContextMenu = ({
  mode: rootMode,
  initialOpen,
  animationDuration,
  hoverCloseDelay,
  onOpen,
}: UseContextMenuOptions) => {
  const id = useId();

  const [open, setOpen] = useState(initialOpen || false);
  const [animatedOpen, setAnimatedOpen] = useState(false);
  const [isInsideContent, setIsInsideContent] = useState(false);
  const [temporaryHoverClose, setTemporaryHoverClose] = useState(false);

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
  const requestClose = () => {
    clearTimers();

    if (mode === ContextMenuMode.HOVER || temporaryHoverClose) {
      setAnimatedOpen(false);

      closeTimerRef.current = setTimeout(() => {
        setOpen(false);
        setIsInsideContent(false);
        setTemporaryHoverClose(false);
      }, animationDuration);
    } else {
      setOpen(false);
      setIsInsideContent(false);
      setTemporaryHoverClose(false);
    }
  };

  /**
   * Closes the menu immediately.
   */
  const closeMenuImmediately = () => {
    clearTimers();
    setAnimatedOpen(false);
    setOpen(false);
    setIsInsideContent(false);
    setTemporaryHoverClose(false);
  };

  /**
   * Closes the menu when the context menu bus emits an event.
   */
  useEffect(() => {
    if (rootMode === ContextMenuMode.CLICK) {
      return;
    }

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
   * Handles the open state change.
   */
  const handleOpenChange = (value: boolean) => {
    if (mode === ContextMenuMode.CLICK && initialOpen !== undefined) {
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
   * Handles the mouse enter event.
   */
  const handleMouseEnter = () => {
    if (mode !== ContextMenuMode.HOVER && !temporaryHoverClose) {
      return;
    }

    if (open) {
      setIsInsideContent(true);
    } else {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
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
        setIsInsideContent(true);

        setTimeout(() => contextMenuBus.emit(id), 0);
      }
    }
  };

  /**
   * Handles the mouse leave event.
   */
  const handleMouseLeave = () => {
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
   * Updates the inherited arrow color when the menu is open.
   */
  const inheritedArrowColor = useInheritedArrowColor(open, contentRef);

  return {
    open,
    mode,
    onOpenChange: handleOpenChange,
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
  };
};
