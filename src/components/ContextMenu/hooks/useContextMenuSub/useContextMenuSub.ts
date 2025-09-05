import { useState, useRef, useEffect, useCallback, useId } from 'react';

import { useContextMenuContext } from '../../ContextMenu.context';
import { ContextMenuModeType } from '../../ContextMenu.types';
import { useLevelContext } from '../../providers/LevelProvider';
import { ContextMenuMode } from '../../ContextMenu.enums';

export function useContextMenuSub(
  displayName: string,
  mode: ContextMenuModeType,
  defaultOpen?: boolean
) {
  const triggerId = useId();

  const [open, setOpen] = useState(defaultOpen || false);
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

    if (mode === ContextMenuMode.CLICK) {
      setOpen(false);
      setPendingOpen(false);

      return;
    }

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    closeTimeoutRef.current = window.setTimeout(
      () => setOpen(false),
      animationDuration
    );
  }, [animationDuration]);

  /**
   * Handles the mouse enter event.
   */
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (mode === ContextMenuMode.CLICK || defaultOpen !== undefined) {
        e.preventDefault();
        e.stopPropagation();

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
    },
    [defaultOpen, rootMode, animatedFullOpen, open, clearTimers]
  );

  /**
   * Handles the mouse leave event.
   */
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (mode === ContextMenuMode.CLICK || defaultOpen !== undefined) {
        e.preventDefault();
        e.stopPropagation();

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
    },
    [defaultOpen, open, hoverCloseDelay, clearTimers, requestClose]
  );

  /**
   * Handles the open state change.
   */
  const handleOpenChange = useCallback(
    (val: boolean) => {
      if (defaultOpen !== undefined) {
        setOpen(defaultOpen);
        setAnimatedOpen(defaultOpen);
        setPendingOpen(false);

        return;
      }

      if (mode === ContextMenuMode.CLICK) {
        setOpen(val);
        setAnimatedOpen(val);
        setPendingOpen(false);

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
    [defaultOpen, rootMode, animatedFullOpen, clearTimers, requestClose]
  );

  /**
   * Closes the submenu when the active item id changes.
   */
  useEffect(() => {
    if (activeItemId !== triggerId && open && defaultOpen === undefined) {
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
   * Handles the open state change when the mode is click.
   *
   * This is necessary because we prescribe custom behavior for ContextMenuMode.CLICK
   * that does not interfere with this default method.
   */
  useEffect(() => {
    if (mode === ContextMenuMode.CLICK) {
      handleOpenChange(open);
    }
  }, [open, handleOpenChange]);

  return {
    open,
    setOpen,
    animatedOpen,
    startAnimation: () => setAnimatedOpen(true),
    handleMouseEnter,
    handleMouseLeave,
    handleOpenChange,
    triggerId,
  };
}
