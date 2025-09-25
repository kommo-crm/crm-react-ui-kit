import React, { forwardRef, useImperativeHandle } from 'react';
import { Sub as RadixDropdownMenuSub } from '@radix-ui/react-dropdown-menu';

import { useContextMenuSub } from '../../hooks';
import { ContextMenuMode } from '../../ContextMenu.enums';

import { SubProps } from './Sub.props';
import { ContextMenuSubProvider, DISPLAY_NAME } from './Sub.context';
import { ContextMenuSubHandle } from './Sub.types';

export const Sub = forwardRef<ContextMenuSubHandle, SubProps>(
  (
    { children, mode = ContextMenuMode.HOVER, onOpen, defaultOpen, ...rest },
    ref
  ) => {
    const {
      open,
      setOpen,
      animatedOpen,
      startAnimation,
      handleMouseEnter,
      handleMouseLeave,
      handleOpenChange,
      triggerId,
      onOpenByKeyboard,
    } = useContextMenuSub({
      displayName: DISPLAY_NAME,
      mode,
      defaultOpen,
      onOpen,
    });

    useImperativeHandle(ref, () => ({
      setOpen,
    }));

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
        onOpenByKeyboard={onOpenByKeyboard}
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
  }
);

Sub.displayName = DISPLAY_NAME;
