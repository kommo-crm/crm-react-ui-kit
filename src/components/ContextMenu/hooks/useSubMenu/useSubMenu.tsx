import React from 'react';
import { useState, useRef, useEffect } from 'react';

import { KeyboardKey } from 'src/lib/keyboard';

import { SubMenuProvider } from '../../providers';

import { UseSubMenuOptions, UseSubMenuResult } from './useSubMenu.types';

/**
 * This hook is necessary for correct keyboard navigation
 * and SubRoot operation inside some context menu items.
 *
 * Provides the necessary context for the SubRoot.
 */
export const useSubMenu = (options: UseSubMenuOptions): UseSubMenuResult => {
  const { children: itemChildren } = options;

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [hasSubmenu, setHasSubmenu] = useState(false);
  const [isOpenedByKeyboard, setIsOpenedByKeyboard] = useState(false);
  const [subMenuTriggerId, setSubMenuTriggerId] = useState<string | undefined>(
    undefined
  );

  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemRef.current) {
      return;
    }

    const trigger = itemRef.current.querySelector('[data-submenu-trigger]');

    setHasSubmenu(Boolean(trigger));
  }, [itemRef, itemChildren]);

  const handleSubMenuOpenByKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (hasSubmenu && e.key === KeyboardKey.ARROW_RIGHT) {
      setIsSubMenuOpen(true);
      setIsOpenedByKeyboard(true);
    }
  };

  const withProvider = (children: React.ReactNode) => (
    <SubMenuProvider
      hasSubmenu={hasSubmenu}
      isSubMenuOpen={isSubMenuOpen}
      setIsSubMenuOpen={setIsSubMenuOpen}
      isOpenedByKeyboard={isOpenedByKeyboard}
      setIsOpenedByKeyboard={setIsOpenedByKeyboard}
      setSubMenuTriggerId={setSubMenuTriggerId}
    >
      {children}
    </SubMenuProvider>
  );

  return {
    itemRef,
    hasSubmenu,
    isSubMenuOpen,
    setIsSubMenuOpen,
    handleSubMenuOpenByKeyDown,
    withProvider,
    subMenuTriggerId,
  };
};
