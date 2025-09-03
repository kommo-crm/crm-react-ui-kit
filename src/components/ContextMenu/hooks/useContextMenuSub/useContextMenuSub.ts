import { useState, useRef, useEffect, useCallback, useId } from 'react';

import { useContextMenuContext } from '../../ContextMenu.context';
import { ContextMenuMode } from '../../ContextMenu.enums';
import { useLevelContext } from '../../providers/LevelProvider';

export function useContextMenuSub(
  displayName: string,
  mode: ContextMenuMode,
  initialOpen?: boolean
) {
  const triggerId = useId();

  const [open, setOpen] = useState(
    initialOpen === undefined ? false : initialOpen
  );
  const [animatedOpen, setAnimatedOpen] = useState(false);
  const [pendingOpen, setPendingOpen] = useState(false);

  const openTimeoutRef = useRef<number | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  const {
    hoverCloseDelay,
    animationDuration,
    animatedOpen: animatedFullOpen,
    mode: rootMode,
  } = useContextMenuContext(displayName);

  const { activeItemId } = useLevelContext(displayName);

  /**
   * Clears the timers.
   */
  const clearTimers = useCallback(() => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  /**
   * Requests the close of the submenu.
   */
  const requestClose = useCallback(() => {
    setAnimatedOpen(false);

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    closeTimeoutRef.current = window.setTimeout(
      () => setOpen(false),
      animationDuration
    );
  }, [animationDuration]);

  /**
   * Closes the submenu when the active item id changes.
   */
  useEffect(() => {
    if (activeItemId !== triggerId && open) {
      clearTimers();
      setAnimatedOpen(false);
      setOpen(false);
      setPendingOpen(false);
    }
  }, [activeItemId, open, clearTimers]);

  /**
   * Handles the pending open state change.
   */
  useEffect(() => {
    if (pendingOpen && animatedFullOpen) {
      setOpen(true);
      setPendingOpen(false);
    }
  }, [pendingOpen, animatedFullOpen]);

  /**
   * Handles the mouse enter event.
   */
  const handleMouseEnter = useCallback(() => {
    if (mode === ContextMenuMode.CLICK) {
      return;
    }

    clearTimers();

    if (open) {
      setAnimatedOpen(true);

      return;
    }

    if (rootMode !== ContextMenuMode.CLICK && !animatedFullOpen) {
      setPendingOpen(true);

      return;
    }

    setOpen(true);
  }, [mode, rootMode, animatedFullOpen, open, clearTimers]);

  /**
   * Handles the mouse leave event.
   */
  const handleMouseLeave = useCallback(() => {
    if (mode === ContextMenuMode.CLICK) {
      return;
    }

    clearTimers();
    setPendingOpen(false);

    if (open) {
      closeTimeoutRef.current = window.setTimeout(
        requestClose,
        hoverCloseDelay
      );
    }
  }, [mode, open, hoverCloseDelay, clearTimers, requestClose]);

  /**
   * Handles the open state change.
   */
  const handleOpenChange = useCallback(
    (val: boolean) => {
      if (mode === ContextMenuMode.CLICK) {
        if (initialOpen === undefined) {
          setOpen(val);
          setAnimatedOpen(val);
          setPendingOpen(false);
        }

        return;
      }

      if (val) {
        clearTimers();

        if (rootMode !== ContextMenuMode.CLICK && !animatedFullOpen) {
          setPendingOpen(true);

          return;
        }

        setOpen(true);
      } else {
        requestClose();
      }
    },
    [mode, initialOpen, rootMode, animatedFullOpen, clearTimers, requestClose]
  );

  return {
    open,
    animatedOpen,
    startAnimation: () => setAnimatedOpen(true),
    handleMouseEnter,
    handleMouseLeave,
    handleOpenChange,
    triggerId,
  };
}
