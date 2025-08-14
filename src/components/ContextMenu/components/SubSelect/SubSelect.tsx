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
>(
  (
    {
      value,
      sortDirection,
      onChange,
      children,
      mode = ContextMenuMode.HOVER,
      open: initialOpen,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useState(
      initialOpen === undefined ? false : initialOpen
    );
    const [animatedOpen, setAnimatedOpen] = useState(false);
    const [pendingOpen, setPendingOpen] = useState(false);

    const openTimeoutRef = useRef<number | null>(null);
    const closeTimeoutRef = useRef<number | null>(null);

    const {
      hoverCloseDelay,
      animationDuration,
      animatedOpen: animatedFullOpen,
      mode: rootMode,
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
      if (mode === ContextMenuMode.CLICK) {
        return;
      }

      clearTimers();

      if (open) {
        setAnimatedOpen(true);

        return;
      }

      if (rootMode !== ContextMenuMode.CLICK && !animatedFullOpen) {
        setPendingOpen(true);

        return;
      }

      setOpen(true);
    };

    const handleMouseLeave = () => {
      if (mode === ContextMenuMode.CLICK) {
        return;
      }

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
      if (mode === ContextMenuMode.CLICK) {
        if (initialOpen === undefined) {
          setOpen(val);
          setAnimatedOpen(val);
          setPendingOpen(false);
        }

        return;
      }

      if (val) {
        clearTimers();

        if (rootMode !== ContextMenuMode.CLICK && !animatedFullOpen) {
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
        mode={mode}
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
  }
) as ContextMenuSubSelectType;

SubSelect.displayName = DISPLAY_NAME;

SubSelect.Root = SubSelect;
SubSelect.Trigger = Trigger;
SubSelect.Content = Content;
SubSelect.Item = Item;
SubSelect.Value = Value;
