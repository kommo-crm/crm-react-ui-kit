import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';

import { focusFirstFocusableItem } from 'src/components/ContextMenu/utils';

import { useIsTouchDevice } from '../../../../hooks';

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
    defaultOpen,
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

  const [open, setOpen] = useState(isSubMenuOpen || defaultOpen || false);
  const [isAnimatedOpen, setIsAnimatedOpen] = useState(false);
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
  } = useLevelContext(displayName);

  const { onSubmenuOpen, animationDuration, hoverCloseDelay } =
    useContextMenuContext(displayName);

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
  const isOpen = isSubMenuOpen || open;

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
    focusParentItem(triggerRef.current);

    clearTimers();
    setIsAnimatedOpen(false);
    setIsSubMenuOpen?.(false);
    onOpen?.(false);
    setIsInsideContent(false);
    setIsOpenedByKeyboard(false);
  };

  /**
   * Handles the open state change.
   */
  const handleOpenChange = (value: boolean) => {
    if (mode === ContextMenuMode.CLICK) {
      if (defaultOpen !== undefined) {
        setOpen(defaultOpen);

        return;
      } else if (!value) {
        focusParentItem(triggerRef.current);
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

      setIsSubMenuOpen?.(true);
      onOpen?.(true);
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
   */
  const handleContentEnter = () => {
    setIsOpenedByKeyboard(false);

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
      setIsSubMenuOpen?.(true);
      onOpen?.(true);
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
   * Calls the onOpen callback function when the submenu is opened or closed.
   */
  useEffect(() => {
    if (mode === ContextMenuMode.CLICK) {
      onOpen?.(isOpen);
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
    setIsSubMenuOpen,
  };
};
