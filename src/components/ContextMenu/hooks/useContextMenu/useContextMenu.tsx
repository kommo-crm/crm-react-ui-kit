import React, {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { createRoot } from 'react-dom/client';

import { useInheritedArrowColor, useIsTouchDevice } from '..';

import { ContextMenuMode } from '../../ContextMenu.enums';

import { contextMenuBus } from '../../utils';

import { ContextMenuModeType } from '../../ContextMenu.types';

import { FocusBlocker } from '../../components/FocusBlocker';

import { UseContextMenuOptions } from './useContextMenu.types';

export const useContextMenu = ({
  mode: rootMode,
  defaultOpen,
  animationDuration,
  hoverCloseDelay,
  onOpen,
  onAnimatedOpen,
  isOpen,
  enableInnerInputFocus,
  backgroundFocusBlockerContainers,
  backgroundFocusBlockerClassName,
}: UseContextMenuOptions) => {
  const id = useId();

  const [open, setOpen] = useState(isOpen ?? defaultOpen ?? false);
  const [animatedOpen, setAnimatedOpen] = useState(false);
  const [isInsideContent, setIsInsideContent] = useState(false);
  const [openedByKeyboard, setOpenedByKeyboard] = useState(false);
  const [temporaryHoverClose, setTemporaryHoverClose] = useState(false);
  const [isChildOpen, setIsChildOpen] = useState(false);
  const [childMode, setChildMode] = useState<ContextMenuModeType | null>(null);
  const [isRootContentBlocked, setIsRootContentBlocked] = useState(false);
  const [itemWithFocusedInput, setItemWithFocusedInput] = useState<
    string | null
  >(null);

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
    setIsRootContentBlocked(false);
  };

  /**
   * Requests the close of the menu.
   */
  const requestClose = () => {
    clearTimers();

    if (mode === ContextMenuMode.HOVER || temporaryHoverClose) {
      if (
        (isChildOpen && childMode === ContextMenuMode.CLICK) ||
        itemWithFocusedInput !== null
      ) {
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
   * Handles the submenu open state change.
   */
  const handleSubmenuOpen = (value: boolean) => {
    setIsRootContentBlocked(value);
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
  const handleChildOpen = (
    value: boolean,
    childModeValue: ContextMenuModeType
  ) => {
    if (!value) {
      setIsRootContentBlocked(false);
    }

    setIsChildOpen(value);
    setChildMode(childModeValue);
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

  useLayoutEffect(() => {
    if (
      !enableInnerInputFocus ||
      !backgroundFocusBlockerContainers ||
      itemWithFocusedInput === null
    ) {
      return;
    }

    const containers = backgroundFocusBlockerContainers
      .map((c) => (typeof c === 'function' ? c() : c))
      .filter(Boolean) as HTMLElement[];

    const mounted: {
      root: ReturnType<typeof createRoot>;
      mountNode: HTMLDivElement;
    }[] = [];

    containers.forEach((container) => {
      const mountNode = document.createElement('div');

      container.appendChild(mountNode);

      const root = createRoot(mountNode);

      root.render(
        <FocusBlocker
          className={backgroundFocusBlockerClassName}
          onClick={() => {
            setItemWithFocusedInput(null);
            (document.activeElement as HTMLElement)?.blur();
          }}
        />
      );

      mounted.push({ root, mountNode });
    });

    return () => {
      mounted.forEach(({ root, mountNode }) => {
        queueMicrotask(() => {
          root.unmount();
          mountNode.remove();
        });
      });
    };
  }, [
    backgroundFocusBlockerContainers,
    enableInnerInputFocus,
    itemWithFocusedInput,
    setItemWithFocusedInput,
  ]);

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
    onChildOpen: handleChildOpen,
    onSubmenuOpen: handleSubmenuOpen,
    isRootContentBlocked,
    isChildOpen,
    itemWithFocusedInput,
    setItemWithFocusedInput,
  };
};
