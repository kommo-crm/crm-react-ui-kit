import React from 'react';
import { useState, useRef, useEffect } from 'react';

import { SubMenuProvider } from '../../providers';

import { UseSubMenuOptions } from './useSubMenu.types';

export const useSubMenu = ({ onKeyDown }: UseSubMenuOptions) => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [hasSubmenu, setHasSubmenu] = useState(false);

  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemRef.current) {
      return;
    }

    const trigger = itemRef.current.querySelector('[data-submenu-trigger]');

    setHasSubmenu(Boolean(trigger));
  }, [itemRef]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (hasSubmenu && e.key === 'ArrowRight') {
      setSubMenuOpen(true);
    }

    onKeyDown?.(e);
  };

  const withProvider = (children: React.ReactNode) => (
    <SubMenuProvider
      hasSubmenu={hasSubmenu}
      subMenuOpen={subMenuOpen}
      setSubMenuOpen={setSubMenuOpen}
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
