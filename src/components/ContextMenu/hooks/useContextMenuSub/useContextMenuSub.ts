import { useEffect, useId, useRef, useState } from 'react';

import { useClickOutside, useIsTouchDevice } from '..';
import { ContextMenuMode } from '../../ContextMenu.enums';
import {
  useContextMenuContext,
  useContextMenuRootContext,
} from '../../ContextMenu.context';
import { useLevelContext } from '../../providers/LevelProvider';

import { UseContextMenuSubOptions } from './useContextMenuSub.types';

export function useContextMenuSub({
  displayName,
  mode: initialMode,
  defaultOpen,
  onOpen,
}: UseContextMenuSubOptions) {
  const triggerId = useId();

  const [open, setOpen] = useState(defaultOpen || false);
  const [animatedOpen, setAnimatedOpen] = useState(false);
  const [isInsideContent, setIsInsideContent] = useState(false);
  const [openedByKeyboard, setOpenedByKeyboard] = useState(false);

  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const isTouchDevice = useIsTouchDevice();

  const { hoverCloseDelay, animationDuration } =
    useContextMenuContext(displayName);

  const { onChildClickOpen } = useContextMenuRootContext(displayName);

  const { activeItemId } = useLevelContext(displayName);

  /**
   * The mode of the submenu.
   */
  const mode = isTouchDevice ? ContextMenuMode.CLICK : initialMode;

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
   * Closes the submenu immediately.
   */
  const handleCloseImmediate = () => {
    clearTimers();
    setAnimatedOpen(false);
    setOpen(false);
    onOpen?.(false);
    setIsInsideContent(false);
    setOpenedByKeyboard(false);
  };

  /**
   * Requests the close of the submenu.
   */
  const requestClose = () => {
    clearTimers();

    if (mode === ContextMenuMode.HOVER) {
      setAnimatedOpen(false);

      closeTimerRef.current = setTimeout(() => {
        setOpen(false);
        onOpen?.(false);
        setIsInsideContent(false);
        setOpenedByKeyboard(false);
      }, animationDuration);
    } else {
      setOpen(false);
      onOpen?.(false);
      setIsInsideContent(false);
      setOpenedByKeyboard(false);
    }
  };

  /**
   * Handles the open state change.
   */
  const handleOpenChange = (value: boolean) => {
    if (defaultOpen !== undefined) {
      setOpen(defaultOpen);
      onOpen?.(defaultOpen);
      setAnimatedOpen(defaultOpen);
      setOpenedByKeyboard(false);

      return;
    }

    if (mode === ContextMenuMode.CLICK) {
      setOpen(value);
      onOpen?.(value);
      setAnimatedOpen(value);

      return;
    }

    if (value) {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }

      if (mode === ContextMenuMode.HOVER) {
        setAnimatedOpen(true);
      }

      setOpen(true);
      onOpen?.(true);
    } else {
      requestClose();
    }
  };

  /**
   * The callback function to be called when the submenu is opened by keyboard.
   */
  const onOpenByKeyboard = (value: boolean) => {
    setOpenedByKeyboard(value);
    handleOpenChange(value);
  };

  /**
   * Handles the mouse enter event.
   */
  const handleMouseEnter = () => {
    if (mode !== ContextMenuMode.HOVER) {
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
      onOpen?.(true);
      setOpen(true);
      setIsInsideContent(true);
    }
  };

  /**
   * Handles the mouse leave event.
   */
  const handleMouseLeave = () => {
    if (mode !== ContextMenuMode.HOVER) {
      return;
    }

    setOpenedByKeyboard(false);

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    setIsInsideContent(false);
  };

  /**
   * Closes the submenu when the active item id changes.
   */
  useEffect(() => {
    if (activeItemId !== triggerId && open && defaultOpen === undefined) {
      handleCloseImmediate();
    }
  }, [activeItemId, open, defaultOpen]);

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
  }, [mode, open, isInsideContent, hoverCloseDelay, openedByKeyboard]);

  /**
   * This effect is used to call the onChildClickOpen callback function
   * when the submenu is opened or closed by child click.
   */
  useEffect(() => {
    if (mode === ContextMenuMode.CLICK && open) {
      onChildClickOpen?.(true);
    } else if (mode === ContextMenuMode.CLICK && !open) {
      onChildClickOpen?.(false);
    }
  }, [open, mode]);

  useClickOutside({
    refs: [contentRef, triggerRef],
    handler: handleCloseImmediate,
  });

  return {
    open,
    setOpen,
    animatedOpen,
    startAnimation: () => setAnimatedOpen(true),
    handleMouseEnter,
    handleMouseLeave,
    handleOpenChange,
    onOpenByKeyboard,
    triggerId,
    contentRef,
    triggerRef,
  };
}
