import React from 'react';
import { Sub as RadixDropdownMenuSub } from '@radix-ui/react-dropdown-menu';

import { ContextMenuMode } from '../../ContextMenu.enums';

import { useContextMenuSub } from '../../hooks';

import { SubProps } from './Sub.props';
import { ContextMenuSubProvider, DISPLAY_NAME } from './Sub.context';

export const Sub = ({
  children,
  mode = ContextMenuMode.HOVER,
  open: initialOpen,
  ...rest
}: SubProps) => {
  const {
    open,
    animatedOpen,
    startAnimation,
    handleMouseEnter,
    handleMouseLeave,
    handleOpenChange,
    triggerId,
  } = useContextMenuSub(DISPLAY_NAME, mode, initialOpen);

  return (
    <ContextMenuSubProvider
      animatedOpen={animatedOpen}
      startAnimation={startAnimation}
      mode={mode}
      open={open}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      triggerId={triggerId}
    >
      <RadixDropdownMenuSub
        open={open}
        onOpenChange={handleOpenChange}
        {...rest}
      >
        {children}
      </RadixDropdownMenuSub>
    </ContextMenuSubProvider>
  );
};

Sub.displayName = DISPLAY_NAME;
