import React, { forwardRef, useImperativeHandle } from 'react';
import { Sub as RadixDropdownMenuSub } from '@radix-ui/react-dropdown-menu';

import { useContextMenuSub } from '../../hooks';
import { ContextMenuMode } from '../../ContextMenu.enums';

import { SubProps } from './Sub.props';
import { ContextMenuSubProvider, DISPLAY_NAME } from './Sub.context';
import { ContextMenuSubHandle } from './Sub.types';

export const Sub = forwardRef<ContextMenuSubHandle, SubProps>(
  (
    {
      children,
      mode = ContextMenuMode.HOVER,
      onOpen,
      defaultOpen,
      shouldCloseRootMenuOnClick = true,
      isCloseOnClick = true,

      ...rest
    },
    ref
  ) => {
    const {
      isOpen,
      setOpen,
      animatedOpen,
      handleMouseEnter,
      handleMouseLeave,
      handleOpenChange,
      triggerId,
      onOpenByKeyboard,
      contentRef,
      triggerRef,
      onChildOpen,
      onSubRootOpen,
      closeMenuImmediately,
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
        isOpen={isOpen}
        setOpen={setOpen}
        animatedOpen={animatedOpen}
        defaultOpen={defaultOpen}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onOpenByKeyboard={onOpenByKeyboard}
        triggerId={triggerId}
        contentRef={contentRef}
        triggerRef={triggerRef}
        onChildOpen={onChildOpen}
        onSubRootOpen={onSubRootOpen}
        shouldCloseRootMenuOnClick={shouldCloseRootMenuOnClick}
        isCloseOnClick={isCloseOnClick}
        closeMenuImmediately={closeMenuImmediately}
      >
        <RadixDropdownMenuSub
          open={isOpen}
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
