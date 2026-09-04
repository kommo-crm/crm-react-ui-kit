import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';

import { useIsTouchDevice } from '@kommo-crm/react-hooks';

import { focusFirstFocusableItem } from '@ui-kit/components/ContextMenu/utils';

import { ContextMenuMode } from '../../../../ContextMenu.enums';

import { useLevelContext, useSubMenuContext } from '../../../../providers';

import {
  useContextMenuContext,
  useContextMenuRootContext,
} from '../../../../ContextMenu.context';

import { ContextMenuModeType } from '../../../../ContextMenu.types';

import { focusParentItem } from '../../components/Content/utils';

import { UseContextMenuSubMenuOptions } from './useContextMenuSubMenu.types';

export const useContextMenuSubMenu = (
  options: UseContextMenuSubMenuOptions
) => {
  const {
    displayName,
    mode: rootMode,
    isDefaultOpen,
    isOpen: isOpenForcefully,
    onOpen,
    onAnimatedOpen,
  } = options;

  const triggerId = useId();

  const {
    isSubMenuOpen,
    isOpenedByKeyboard,
    setIsSubMenuOpen,
    setIsOpenedByKeyboard,
    setSubMenuTriggerId,
  } = useSubMenuContext(displayName);

  /**
   * The submenu is controlled when the `isOpen` prop is passed.
   * In this case the open state belongs to the consumer and the internal state
   * is never used, so an interaction can't close (or open) the submenu on its
   * own - it only notifies the consumer via `onOpen`.
   */
  const isControlled = isOpenForcefully !== undefined;

  const [uncontrolledOpen, setUncontrolledOpen] = useState(
    isSubMenuOpen || isDefaultOpen || false
  );
  const [uncontrolledIsAnimatedOpen, setUncontrolledIsAnimatedOpen] =
    useState(false);

  const open = isControlled ? isOpenForcefully : uncontrolledOpen;
  const isAnimatedOpen = isControlled
    ? isOpenForcefully
    : uncontrolledIsAnimatedOpen;

  /**
   * Updates the internal open state.
   * Does nothing in controlled mode, where the state is owned by the consumer.
   */
  const setOpen = (value: boolean) => {
    if (isControlled) {
      return;
    }

    setUncontrolledOpen(value);
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

  const [isInsideContent, setIsInsideContent] = useState(false);
  const [isChildOpen, setIsChildOpen] = useState(false);
  const [childMode, setChildMode] = useState<ContextMenuModeType | null>(null);
  const [itemWithFocusedInput, setItemWithFocusedInput] = useState<
    string | null
  >(null);

  const {
    level,
    isAnimatedOpen: parentIsAnimatedOpen,
    onChildOpen,
    onSubRootOpen,
    isAiming: parentIsAiming,
    isChildAiming: parentIsChildAiming,
    setActiveItemId,
  } = useLevelContext(displayName);

  const { onSubmenuOpen, animationDuration, hoverCloseDelay } =
    useContextMenuContext(displayName);

  const { closeRootMenuImmediately } = useContextMenuRootContext(displayName);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);
  const isParentAnimatedOpenFirstRun = useRef(true);

  const isTouchDevice = useIsTouchDevice();

  /**
   * The mode of the ContextMenu.Root.
   */
  const mode = isTouchDevice ? ContextMenuMode.CLICK : rootMode;

  /**
   * The open state of the submenu.
   */
  const isOpen = isControlled ? isOpenForcefully : isSubMenuOpen || open;

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
    setIsSubMenuOpen?.(false);
    setOpen(false);
    emitOpen(false);
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
  /**
   * Sets the open state and notifies the consumer.
   * Used by the trigger, which changes the state directly in click mode.
   */
  const changeOpen = (value: boolean) => {
    emitOpen(value);
    setOpen(value);
    setIsSubMenuOpen?.(value);
  };

  const closeMenuImmediately = () => {
    focusParentItem(triggerRef.current);

    clearTimers();
    setIsAnimatedOpen(false);
    setIsSubMenuOpen?.(false);
    setOpen(false);
    emitOpen(false);
    setIsInsideContent(false);
    setIsOpenedByKeyboard(false);
  };

  /**
   * Handles the open state change.
   */
  const handleOpenChange = (value: boolean) => {
    if (mode === ContextMenuMode.CLICK && !value) {
      focusParentItem(triggerRef.current);
    }

    if (value) {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }

      if (mode === ContextMenuMode.HOVER) {
        setIsAnimatedOpen(true);
      }

      setIsSubMenuOpen?.(true);
      setOpen(true);
      emitOpen(true);
    } else {
      requestClose();
    }
  };

  /**
   * The callback function to be called when the menu is opened by keyboard.
   */
  const onOpenByKeyboard = (value: boolean) => {
    handleOpenChange?.(value);
  };

  /**
   * Handles entering the submenu content area.
   * Keeps the submenu open in hover mode by canceling close timers.
   * Does not open if parent menu is in aiming state (cursor moving toward Sub).
   */
  const handleContentEnter = () => {
    setIsOpenedByKeyboard(false);

    if (mode !== ContextMenuMode.HOVER) {
      return;
    }

    /**
     * Don't open SubRoot if parent menu is in aiming state.
     * This prevents SubRoot from opening when cursor is moving toward Sub.
     * Also check isChildAiming to prevent opening when aiming at another child.
     */
    if ((parentIsAiming?.() || parentIsChildAiming?.()) && !open) {
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
      setIsSubMenuOpen?.(true);
      setOpen(true);
      emitOpen(true);
      setIsInsideContent(true);
    }
  };

  /**
   * Handles leaving the submenu content area.
   * Allows the submenu to close in hover mode.
   */
  const handleContentLeave = () => {
    setIsOpenedByKeyboard(false);

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
    if (isSubMenuOpen !== undefined) {
      setIsAnimatedOpen(isSubMenuOpen);
    }
  }, [isSubMenuOpen]);

  /**
   * Handles the hover close delay.
   */
  useEffect(() => {
    if (
      (!open && !isAnimatedOpen) ||
      mode === ContextMenuMode.CLICK ||
      isOpenedByKeyboard
    ) {
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

  /**
   * In the case of keyboard navigation, manually focus the first element.
   */
  useEffect(() => {
    if (isOpenedByKeyboard) {
      onOpenByKeyboard(true);

      if (contentRef.current) {
        focusFirstFocusableItem(contentRef.current);
      }
    }
  }, [isOpenedByKeyboard, contentRef.current]);

  /**
   * Sets the submenu trigger id.
   */
  useEffect(() => {
    setSubMenuTriggerId(triggerId);
  }, [triggerId]);

  /**
   * Reports the open state changed outside of the handlers above
   * (for example by the parent menu via the submenu context).
   */
  useEffect(() => {
    if (mode === ContextMenuMode.CLICK) {
      emitOpen(isOpen);

      /**
       * It is necessary for instant closure of menus located
       * at the same level as the SubRoot
       */
      if (isOpen) {
        setActiveItemId(triggerId);
      }
    }
  }, [isOpen, mode]);

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
    setIsSubMenuOpen: changeOpen,
  };
};
