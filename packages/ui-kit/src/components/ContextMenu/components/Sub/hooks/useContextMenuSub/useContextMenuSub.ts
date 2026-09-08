import { useEffect, useId, useRef, useState } from 'react';

import { useIsTouchDevice, useIsAiming } from '@kommo-crm/react-hooks';

import { ContextMenuMode } from '../../../../ContextMenu.enums';
import { useContextMenuContext } from '../../../../ContextMenu.context';
import { useLevelContext } from '../../../../providers/LevelProvider';

import { ContextMenuModeType } from '../../../../ContextMenu.types';

import { PointerDownOutsideEvent } from '../../../SubContent/SubContent.types';

import {
  UseContextMenuSubOptions,
  UseContextMenuSubResult,
} from './useContextMenuSub.types';

export const useContextMenuSub = (
  options: UseContextMenuSubOptions
): UseContextMenuSubResult => {
  const {
    displayName,
    mode: initialMode,
    isDefaultOpen,
    isOpen: isOpenForcefully,
    onOpen,
    onAiming,
    aimingTolerance,
    aimingIdleTimeout,
  } = options;

  const {
    activeItemId,
    onChildOpen,
    onSubRootOpen,
    isAnimatedOpen: parentIsAnimatedOpen,
    onChildAiming: parentOnChildAiming,
    isChildAiming: parentIsChildAiming,
  } = useLevelContext(displayName);

  const triggerId = useId();

  /**
   * The submenu is controlled when the `isOpen` prop is passed.
   * In this case the open state belongs to the consumer and the internal state
   * is never used, so an interaction can't close (or open) the submenu on its
   * own - it only notifies the consumer via `onOpen`.
   */
  const isControlled = isOpenForcefully !== undefined;

  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(
    isDefaultOpen ?? false
  );
  const [uncontrolledIsAnimatedOpen, setUncontrolledIsAnimatedOpen] =
    useState(false);
  const [isInsideContent, setIsInsideContent] = useState(false);
  const [isOpenedByKeyboard, setIsOpenedByKeyboard] = useState(false);
  const [isChildOpen, setIsChildOpen] = useState(false);
  const [childMode, setChildMode] = useState<ContextMenuModeType | null>(null);
  const [isSubRootOpen, setIsSubRootOpen] = useState(false);
  const [itemWithFocusedInput, setItemWithFocusedInput] = useState<
    string | null
  >(null);

  const isOpen = isControlled ? isOpenForcefully : uncontrolledIsOpen;
  const isAnimatedOpen = isControlled
    ? isOpenForcefully
    : uncontrolledIsAnimatedOpen;

  /**
   * Updates the internal open state.
   * Does nothing in controlled mode, where the state is owned by the consumer.
   */
  const setIsOpen = (value: boolean) => {
    if (isControlled) {
      return;
    }

    setUncontrolledIsOpen(value);
  };

  /**
   * Updates the internal animated open state.
   * Does nothing in controlled mode, where it follows the `isOpen` prop.
   */
  const setIsAnimatedOpen = (value: boolean) => {
    if (isControlled) {
      return;
    }

    setUncontrolledIsAnimatedOpen(value);
  };

  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const isParentAnimatedOpenFirstRun = useRef(true);
  const syncCursorPresenceRef = useRef<(() => void) | null>(null);
  const isActiveItemFirstRun = useRef(true);
  const pendingCloseRef = useRef(false);
  /**
   * Use ref to track isInsideContent for use in intervals
   */
  const isInsideContentRef = useRef(false);
  const onOpenCallbackRef = useRef(onOpen);
  const lastReportedOpenRef = useRef(isOpen);

  /**
   * The ref is kept in sync on every render, so the callback called from
   * timers is never stale.
   */
  onOpenCallbackRef.current = onOpen;

  /**
   * Notifies the consumer about the open state change.
   *
   * The same value is never reported twice in a row, which prevents duplicated
   * calls from the overlapping open/close paths.
   *
   * In controlled mode the actual state is the `isOpen` prop, so the callback
   * reports every interaction that requests a different state, even if the
   * consumer keeps the prop unchanged.
   */
  const emitOpen = (value: boolean) => {
    if (isControlled) {
      if (value !== isOpenForcefully) {
        onOpenCallbackRef.current?.(value);
      }

      return;
    }

    if (lastReportedOpenRef.current === value) {
      return;
    }

    lastReportedOpenRef.current = value;

    onOpenCallbackRef.current?.(value);
  };

  /**
   * Sets the open state and notifies the consumer.
   * Used by the trigger, which changes the state directly in click mode.
   */
  const changeOpen = (value: boolean) => {
    setIsOpen(value);
    emitOpen(value);
  };

  const isTouchDevice = useIsTouchDevice();

  const { hoverCloseDelay, animationDuration } =
    useContextMenuContext(displayName);

  /**
   * The mode of the submenu.
   */
  const mode = isTouchDevice ? ContextMenuMode.CLICK : initialMode;

  const handleSubmenuOpen = (isSubmenuOpen: boolean) => {
    /**
     * Important for the case of Sub -> SubRoot nesting.
     */
    setTimeout(() => onSubRootOpen?.(isSubmenuOpen), 0);
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
   * Closes the submenu.
   */
  const handleClose = () => {
    clearTimers();
    pendingCloseRef.current = false;
    setIsOpen(false);
    emitOpen(false);
    handleSubmenuOpen(false);
    setIsInsideContent(false);
    isInsideContentRef.current = false;
    setIsOpenedByKeyboard(false);
  };

  /**
   * Closes the submenu immediately.
   */
  const handleCloseImmediate = () => {
    clearTimers();
    setIsAnimatedOpen(false);
    setIsOpen(false);
    emitOpen(false);
    handleSubmenuOpen(false);
    setIsInsideContent(false);
    isInsideContentRef.current = false;
    setIsOpenedByKeyboard(false);
  };

  /**
   * Handler that notifies both the consumer (onAiming) and the parent level
   * (parentOnChildAiming) when aiming state changes.
   * Also handles pending close when aiming stops.
   */
  const handleAimingChange = (aiming: boolean) => {
    onAiming?.(aiming);
    parentOnChildAiming?.(aiming);

    if (!aiming) {
      syncCursorPresenceRef.current?.();
    }

    /**
     * When aiming stops and there's a pending close request,
     * proceed with closing the submenu (if cursor is not inside content).
     */
    if (!aiming && pendingCloseRef.current && !isInsideContentRef.current) {
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
       * If not currently aiming, proceed with close immediately.
       */
      if (!isAiming()) {
        pendingCloseRef.current = false;
        setIsAnimatedOpen(false);

        closeTimerRef.current = setTimeout(() => {
          handleClose();
        }, animationDuration);
      }
    } else {
      handleCloseImmediate();
    }
  };

  /**
   * Handles the open state change.
   */
  const handleOpenChange = (value: boolean) => {
    if (mode === ContextMenuMode.CLICK || isOpenedByKeyboard) {
      setIsOpen(value);
      emitOpen(value);
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
      emitOpen(true);
      setIsAnimatedOpen(true);
      handleSubmenuOpen(true);
    } else {
      requestClose();
    }
  };

  /**
   * The callback function to be called when the submenu is opened by keyboard.
   */
  const onOpenByKeyboard = (isOpenByKeyboard: boolean) => {
    setIsOpenedByKeyboard(isOpenByKeyboard);
  };

  /**
   * Handles entering the submenu content area.
   * Keeps the submenu open in hover mode by canceling close timers.
   * Does not open if parent is aiming at another child submenu.
   */
  const handleContentEnter = () => {
    /**
     * Don't open if:
     * - Not in hover mode
     * - Current submenu is being aimed at (and it's not this trigger)
     * - Parent is aiming at another child (prevents opening new submenu while aiming)
     */
    if (
      mode !== ContextMenuMode.HOVER ||
      (isAiming() && activeItemId !== triggerId) ||
      (parentIsChildAiming?.() && !isOpen)
    ) {
      return;
    }

    setIsOpenedByKeyboard(false);

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
      emitOpen(true);
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

    /**
     * When leaving content, if there's a pending close and not aiming,
     * proceed with close. If aiming, handleAimingChange will handle it.
     */
    if (pendingCloseRef.current && !isAiming()) {
      pendingCloseRef.current = false;
      setIsAnimatedOpen(false);

      closeTimerRef.current = setTimeout(() => {
        handleClose();
      }, animationDuration);
    }
  };

  /**
   * Returns whether the cursor is still over the submenu or its trigger.
   *
   * `:hover` is used instead of the tracked state, since it always reflects
   * the real cursor position. Environments that don't track it (jsdom, a device
   * without a pointer) report no hovered element at all - the cursor is then
   * considered to be inside, so the state is never dropped by mistake.
   */
  const isCursorInsideSubmenu = () => {
    if (!document.querySelector(':hover')) {
      return true;
    }

    return Boolean(
      triggerRef.current?.matches(':hover') ||
        contentRef.current?.matches(':hover')
    );
  };

  /**
   * Replays the mouse leave event that was swallowed while aiming was active.
   *
   * `useContextMenuItemFocus` drops the leave event on the trigger during
   * aiming, so the submenu keeps thinking that the cursor is inside it and
   * never schedules the close. Once aiming stops, the real cursor position
   * becomes the source of truth again.
   */
  const syncCursorPresence = () => {
    if (
      mode !== ContextMenuMode.HOVER ||
      isChildOpen ||
      !isInsideContentRef.current ||
      isCursorInsideSubmenu()
    ) {
      return;
    }

    handleContentLeave();
  };

  syncCursorPresenceRef.current = syncCursorPresence;

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
  const handlePointerDownOutside = (e: PointerDownOutsideEvent) => {
    const isClickOnTrigger =
      triggerRef.current &&
      e.target instanceof Node &&
      triggerRef.current.contains(e.target);

    if (!isSubRootOpen && !isClickOnTrigger) {
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
    /**
     * Skipped on mount, otherwise a submenu opened with `isDefaultOpen`
     * is closed right away, since no item is active yet.
     */
    if (isActiveItemFirstRun.current) {
      isActiveItemFirstRun.current = false;

      return;
    }

    if (
      (activeItemId !== triggerId || isSubRootOpen) &&
      isOpen &&
      !isControlled
    ) {
      handleCloseImmediate();
    }
  }, [activeItemId, isOpen, isControlled]);

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

    if (!isOpen) {
      parentOnChildAiming?.(false);
    }
  }, [isOpen]);

  /**
   * Closes the submenu when the parent menu is closed.
   *
   * It is necessary for the case when the click disappeared from the child,
   * after which we focused on the distant parent.
   */
  useEffect(() => {
    /**
     * Skipped on mount, otherwise a submenu opened with `isDefaultOpen`
     * is closed right away under a parent that never animates (click mode).
     */
    if (isParentAnimatedOpenFirstRun.current) {
      isParentAnimatedOpenFirstRun.current = false;

      return;
    }

    if (!parentIsAnimatedOpen) {
      requestClose();
    }
  }, [parentIsAnimatedOpen]);

  return {
    isOpen,
    setIsOpen: changeOpen,
    isAnimatedOpen,
    handleContentEnter,
    handleContentLeave,
    handleOpenChange,
    handlePointerDownOutside,
    onOpenByKeyboard,
    triggerId,
    contentRef,
    triggerRef,
    onChildOpen: handleChildOpen,
    onSubRootOpen: handleSubRootOpen,
    closeMenuImmediately: handleCloseImmediate,
    itemWithFocusedInput,
    setItemWithFocusedInput,
    isAiming,
    mode,
  };
};
