import React, { useState, useRef } from 'react';
import { Sub as RadixDropdownMenuSub } from '@radix-ui/react-dropdown-menu';

import { useContextMenuContext } from '../../ContextMenu.context';

import { SubProps } from './Sub.props';

const DISPLAY_NAME = 'ContextMenu.Sub';

export const Sub = ({ children, ...props }: SubProps) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const { autoCloseDelay } = useContextMenuContext(DISPLAY_NAME);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setOpen(false);
    }, autoCloseDelay);
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
