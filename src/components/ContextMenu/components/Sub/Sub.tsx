import React, { useState, useRef } from 'react';
import { Sub as RadixDropdownMenuSub } from '@radix-ui/react-dropdown-menu';

import { useContextMenuContext } from '../../ContextMenu.context';

import { SubProps } from './Sub.props';

const DISPLAY_NAME = 'ContextMenu.Sub';

export const Sub = ({ children, ...props }: SubProps) => {
  const [open, setOpen] = useState(false);

  const openTimeoutRef = useRef<number | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  const { hoverOpenDelay, hoverCloseDelay } =
    useContextMenuContext(DISPLAY_NAME);

  const clearTimers = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    clearTimers();
    openTimeoutRef.current = window.setTimeout(() => {
      setOpen(true);
    }, hoverOpenDelay);
  };

  const handleMouseLeave = () => {
    clearTimers();
    closeTimeoutRef.current = window.setTimeout(() => {
      setOpen(false);
    }, hoverCloseDelay);
  };

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
  };

  return (
    <RadixDropdownMenuSub
      open={open}
      onOpenChange={handleOpenChange}
      {...props}
    >
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </div>
    </RadixDropdownMenuSub>
  );
};

Sub.displayName = DISPLAY_NAME;
