import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Sub as RadixDropdownMenuSub } from '@radix-ui/react-dropdown-menu';

import { ContextMenuMode } from '../../ContextMenu.enums';

import { useContextMenuContext } from '../../ContextMenu.context';

import { ContextMenuSubSelectProvider } from './SubSelect.context';
import { ContextMenuSubSelectRootProps } from './SubSelect.props';

import { Trigger } from './components/Trigger/Trigger';
import { Content } from './components/Content/Content';
import { Item } from './components/Item/Item';
import { Value } from './components/Value/Value';
import { ContextMenuSubSelectType } from './SubSelect.types';

const DISPLAY_NAME = 'ContextMenu.SubSelect';

export const SubSelect = forwardRef<
  HTMLDivElement,
  ContextMenuSubSelectRootProps
>(({ value, sortDirection, onChange, children, ...props }, ref) => {
  const [open, setOpen] = useState(false);
  const [animatedOpen, setAnimatedOpen] = useState(false);
  const [pendingOpen, setPendingOpen] = useState(false);

  const openTimeoutRef = useRef<number | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  const {
    hoverCloseDelay,
    animationDuration,
    animatedOpen: animatedFullOpen,
    mode,
  } = useContextMenuContext(DISPLAY_NAME);

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

  const requestClose = () => {
    setAnimatedOpen(false);

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    closeTimeoutRef.current = window.setTimeout(
      () => setOpen(false),
      animationDuration
    );
  };

  useEffect(() => {
    if (pendingOpen && animatedFullOpen) {
      setOpen(true);
      setPendingOpen(false);
    }
  }, [pendingOpen, animatedFullOpen]);

  const handleMouseEnter = () => {
    clearTimers();

    if (open) {
      setAnimatedOpen(true);

      return;
    }

    if (mode !== ContextMenuMode.CLICK && !animatedFullOpen) {
      setPendingOpen(true);

      return;
    }

    setOpen(true);
  };

  const handleMouseLeave = () => {
    clearTimers();
    setPendingOpen(false);

    if (open) {
      closeTimeoutRef.current = window.setTimeout(
        requestClose,
        hoverCloseDelay
      );
    }
  };

  const handleOpenChange = (val: boolean) => {
    if (val) {
      clearTimers();

      if (mode !== ContextMenuMode.CLICK && !animatedFullOpen) {
        setPendingOpen(true);

        return;
      }

      setOpen(true);
    } else {
      requestClose();
    }
  };

  return (
    <ContextMenuSubSelectProvider
      value={value}
      sortDirection={sortDirection}
      onChange={onChange}
      animatedOpen={animatedOpen}
      startAnimation={() => setAnimatedOpen(true)}
      open={open}
    >
      <RadixDropdownMenuSub
        open={open}
        onOpenChange={handleOpenChange}
        {...props}
      >
        <div
          ref={ref}
          data-wrapper
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </div>
      </RadixDropdownMenuSub>
    </ContextMenuSubSelectProvider>
  );
}) as ContextMenuSubSelectType;

SubSelect.displayName = DISPLAY_NAME;

SubSelect.Root = SubSelect;
SubSelect.Trigger = Trigger;
SubSelect.Content = Content;
SubSelect.Item = Item;
SubSelect.Value = Value;
