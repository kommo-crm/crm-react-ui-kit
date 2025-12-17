import { useEffect } from 'react';

import { KeyboardKey } from 'src/lib/keyboard';

import { focusFirstFocusableItem } from '../../utils';

import { ContextMenuMode } from '../../ContextMenu.enums';

import { UseContextMenuKeyboardNavigationOptions } from './useContextMenuKeyboardNavigation.types';

/**
 * Finds the menu content element inside a menu container.
 * The content is RadixDropdownMenuContent or RadixDropdownMenuSubContent.
 */
const findMenuContent = (container: HTMLElement): HTMLElement | null => {
  // Find Radix content element inside the container
  const content =
    container.querySelector<HTMLElement>(
      '[data-radix-dropdown-menu-content], [data-radix-dropdown-menu-sub-content]'
    ) ||
    container.querySelector<HTMLElement>('[role="menu"]') ||
    (container.firstElementChild as HTMLElement | null);

  return content;
};

/**
 * Finds the deepest open menu container and focuses its first item.
 * Falls back to root menu if no submenus are found.
 * If there's a highlighted item, focuses it and simulates key press.
 */
const focusDeepestMenuNecessaryItem = (
  rootContentElement: HTMLElement,
  key: string
): void => {
  // Find all menu containers with data-menu-level attribute
  const menuContainers = Array.from(
    document.querySelectorAll<HTMLElement>('[data-menu-level]')
  );

  let targetMenuContent: HTMLElement | null = null;

  if (menuContainers.length === 0) {
    // No submenus, use root menu
    targetMenuContent =
      findMenuContent(rootContentElement) || rootContentElement;
  } else {
    // Find the menu with maximum level
    let maxLevel = -1;
    let deepestMenuContainer: HTMLElement | null = null;

    for (const container of menuContainers) {
      const level = Number(container.getAttribute('data-menu-level')) || 0;

      if (level > maxLevel) {
        maxLevel = level;
        deepestMenuContainer = container;
      }
    }

    if (deepestMenuContainer) {
      targetMenuContent =
        findMenuContent(deepestMenuContainer) || deepestMenuContainer;
    } else {
      // Fallback to root menu
      targetMenuContent =
        findMenuContent(rootContentElement) || rootContentElement;
    }
  }

  if (!targetMenuContent) {
    return;
  }

  // Check if there's a highlighted item in the target menu
  const highlightedItem = targetMenuContent.querySelector<HTMLElement>(
    '[data-item][data-highlighted]'
  );

  if (highlightedItem) {
    // Focus the highlighted item
    highlightedItem.focus();

    // Simulate key press after focus
    requestAnimationFrame(() => {
      const syntheticEvent = new KeyboardEvent('keydown', {
        key,
        bubbles: true,
        cancelable: true,
        code: key,
      });

      highlightedItem.dispatchEvent(syntheticEvent);
    });
  } else {
    // No highlighted item, focus first item
    focusFirstFocusableItem(targetMenuContent);
  }
};

/**
 * Checks if the currently focused element is inside the menu content
 * or any of its child menus.
 */
const isFocusInsideMenu = (
  contentElement: HTMLElement,
  activeElement: Element | null
): boolean => {
  if (!activeElement) {
    return false;
  }

  // Check if active element is inside root menu content
  if (
    contentElement === activeElement ||
    contentElement.contains(activeElement)
  ) {
    return true;
  }

  // Check if active element is inside any child menu (submenu)
  // Find all menu containers (including submenus)
  const allMenuContainers = Array.from(
    document.querySelectorAll<HTMLElement>('[data-menu-level]')
  );

  // Check if active element is inside any menu container
  for (const container of allMenuContainers) {
    if (container === activeElement || container.contains(activeElement)) {
      return true;
    }
  }

  return false;
};

/**
 * Hook for tracking global ArrowDown key press in ContextMenu.
 *
 * This hook monitors keyboard events globally and only handles ArrowDown
 * when the menu or its child elements are focused.
 */
export const useContextMenuKeyboardNavigation = (
  options: UseContextMenuKeyboardNavigationOptions
) => {
  const { isOpen, isAnimatedOpen, contentRef, mode } = options;

  /**
   * Handles global keyboard events.
   */
  useEffect(() => {
    if ((!isOpen && !isAnimatedOpen) || mode === ContextMenuMode.CLICK) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle navigation keys: arrows, space, enter
      const navigationKeys = [
        KeyboardKey.ARROW_DOWN,
        KeyboardKey.ARROW_UP,
        KeyboardKey.ARROW_LEFT,
        KeyboardKey.ARROW_RIGHT,
        KeyboardKey.SPACE,
        KeyboardKey.ENTER,
      ];

      if (!navigationKeys.includes(e.key as KeyboardKey)) {
        return;
      }

      const contentElement = contentRef.current;

      if (!contentElement) {
        return;
      }

      // Check if menu or its child elements are focused
      const activeElement = document.activeElement;

      if (!isFocusInsideMenu(contentElement, activeElement)) {
        e.preventDefault();

        focusDeepestMenuNecessaryItem(contentElement, e.key);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isAnimatedOpen, contentRef]);

  return {};
};
