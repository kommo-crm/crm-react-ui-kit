import React from 'react';
import { useState, useRef, useEffect } from 'react';

import { KeyboardKey } from 'src/lib/keyboard';

import { SubMenuProvider } from '../../providers';

import { UseSubMenuOptions } from './useSubMenu.types';

/**
 * This hook is necessary for correct keyboard navigation
 * and SubRoot operation inside some context menu items.
 *
 * Provides the necessary context for the SubRoot.
 */
export const useSubMenu = (options: UseSubMenuOptions) => {
  const { onKeyDown, children: itemChildren } = options;

  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [hasSubmenu, setHasSubmenu] = useState(false);
  const [isOpenedByKeyboard, setIsOpenedByKeyboard] = useState(false);

  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemRef.current) {
      return;
    }

    const trigger = itemRef.current.querySelector('[data-submenu-trigger]');

    setHasSubmenu(Boolean(trigger));
  }, [itemRef, itemChildren]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (hasSubmenu && e.key === KeyboardKey.ARROW_RIGHT) {
      setSubMenuOpen(true);
      setIsOpenedByKeyboard(true);
    }

    onKeyDown?.(e);
  };

  const withProvider = (children: React.ReactNode) => (
    <SubMenuProvider
      hasSubmenu={hasSubmenu}
      subMenuOpen={subMenuOpen}
      setSubMenuOpen={setSubMenuOpen}
      isOpenedByKeyboard={isOpenedByKeyboard}
      setIsOpenedByKeyboard={setIsOpenedByKeyboard}
    >
      {children}
    </SubMenuProvider>
  );

  return {
    itemRef,
    hasSubmenu,
    subMenuOpen,
    setSubMenuOpen,
    handleKeyDown,
    withProvider,
  };
};
