import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { Sub as RadixDropdownMenuSub } from '@radix-ui/react-dropdown-menu';

import { useContextMenuContext } from '../../ContextMenu.context';
import { ContextMenuMode } from '../../ContextMenu.enums';

import { SubProps } from './Sub.props';
import { ContextMenuSubProvider } from './Sub.context';

const DISPLAY_NAME = 'ContextMenu.Sub';

export const Sub = forwardRef<HTMLDivElement, SubProps>(
  (
    { children, mode = ContextMenuMode.HOVER, open: initialOpen, ...rest },
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
      <ContextMenuSubProvider
        animatedOpen={animatedOpen}
        startAnimation={() => setAnimatedOpen(true)}
        mode={mode}
        open={open}
      >
        <RadixDropdownMenuSub
          open={open}
          onOpenChange={handleOpenChange}
          {...rest}
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
      </ContextMenuSubProvider>
    );
  }
);

Sub.displayName = DISPLAY_NAME;
