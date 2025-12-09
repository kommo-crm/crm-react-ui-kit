import { useEffect, useId, useRef, useState } from 'react';

import { useClickOutside, useIsTouchDevice } from '../../../../hooks';
import { ContextMenuMode } from '../../../../ContextMenu.enums';
import { useContextMenuContext } from '../../../../ContextMenu.context';
import { useLevelContext } from '../../../../providers/LevelProvider';

import { ContextMenuModeType } from '../../../../ContextMenu.types';

import { UseContextMenuSubOptions } from './useContextMenuSub.types';

export const useContextMenuSub = (options: UseContextMenuSubOptions) => {
  const { displayName, mode: initialMode, defaultOpen, onOpen } = options;

  const triggerId = useId();

  const [open, setOpen] = useState(defaultOpen || false);
  const [isAnimatedOpen, setIsAnimatedOpen] = useState(false);
  const [isInsideContent, setIsInsideContent] = useState(false);
  const [openedByKeyboard, setOpenedByKeyboard] = useState(false);
  const [isChildOpen, setIsChildOpen] = useState(false);
  const [childMode, setChildMode] = useState<ContextMenuModeType | null>(null);
  const [isSubRootOpen, setIsSubRootOpen] = useState(false);
  const [itemWithFocusedInput, setItemWithFocusedInput] = useState<
    string | null
  >(null);

  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const isTouchDevice = useIsTouchDevice();

  const { hoverCloseDelay, animationDuration } =
    useContextMenuContext(displayName);

  const {
    activeItemId,
    onChildOpen,
    onSubRootOpen,
    isAnimatedOpen: parentIsAnimatedOpen,
  } = useLevelContext(displayName);

  const handleSubmenuOpen = (value: boolean) => {
    /**
     * Important for the case of Sub -> SubRoot nesting.
     */
    setTimeout(() => onSubRootOpen?.(value), 0);
  };

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
    setIsAnimatedOpen(false);
    setOpen(false);
    onOpen?.(false);
    handleSubmenuOpen(false);
    setIsInsideContent(false);
    setOpenedByKeyboard(false);
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

      setIsAnimatedOpen(false);

      closeTimerRef.current = setTimeout(() => {
        setOpen(false);
        onOpen?.(false);
        handleSubmenuOpen(false);
        setIsInsideContent(false);
        setOpenedByKeyboard(false);
      }, animationDuration);
    } else {
      handleCloseImmediate();
    }
  };

  /**
   * Handles the open state change.
   */
  const handleOpenChange = (value: boolean) => {
    if (defaultOpen !== undefined) {
      setOpen(defaultOpen);
      onOpen?.(defaultOpen);
      handleSubmenuOpen(defaultOpen);
      setIsAnimatedOpen(defaultOpen);
      setOpenedByKeyboard(false);

      return;
    }

    if (mode === ContextMenuMode.CLICK) {
      setOpen(value);
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

      setOpen(true);
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
    setOpenedByKeyboard(value);
  };

  /**
   * Handles entering the submenu content area.
   * Keeps the submenu open in hover mode by canceling close timers.
   */
  const handleContentEnter = () => {
    if (mode !== ContextMenuMode.HOVER) {
      return;
    }

    setOpenedByKeyboard(false);

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
      onOpen?.(true);
      handleSubmenuOpen(true);
      setOpen(true);
      setIsInsideContent(true);
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

    setOpenedByKeyboard(false);

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    setIsInsideContent(false);
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
    if (activeItemId !== triggerId && open && defaultOpen === undefined) {
      handleCloseImmediate();
    }
  }, [activeItemId, open, defaultOpen]);

  /**
   * Handles the hover close delay.
   */
  useEffect(() => {
    if (!open || mode !== ContextMenuMode.HOVER || openedByKeyboard) {
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
   * This effect is used to call the onChildOpen callback function
   * when the submenu is opened or closed by click.
   */
  useEffect(() => {
    onChildOpen?.(open, mode);
  }, [open, mode]);

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
      onChildOpen?.(open, mode);
    }
  }, [isChildOpen, childMode]);

  /**
   * Handles the open state change when the open state changes.
   */
  useEffect(() => {
    handleOpenChange(open);
  }, [open]);

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

  return {
    isOpen: open,
    setOpen,
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
  };
};
