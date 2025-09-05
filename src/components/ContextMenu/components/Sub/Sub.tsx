import React from 'react';
import { Sub as RadixDropdownMenuSub } from '@radix-ui/react-dropdown-menu';

import { useContextMenuSub } from '../../hooks';

import { ContextMenuMode } from '../../ContextMenu.enums';

import { SubProps } from './Sub.props';
import { ContextMenuSubProvider, DISPLAY_NAME } from './Sub.context';

export const Sub = ({
  children,
  mode = ContextMenuMode.HOVER,
  defaultOpen,
  ...rest
}: SubProps) => {
  const {
    open,
    setOpen,
    animatedOpen,
    startAnimation,
    handleMouseEnter,
    handleMouseLeave,
    handleOpenChange,
    triggerId,
  } = useContextMenuSub(DISPLAY_NAME, mode, defaultOpen);

  return (
    <ContextMenuSubProvider
      mode={mode}
      open={open}
      setOpen={setOpen}
      animatedOpen={animatedOpen}
      defaultOpen={defaultOpen}
      startAnimation={startAnimation}
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
