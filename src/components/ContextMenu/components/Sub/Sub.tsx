import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { Sub as RadixDropdownMenuSub } from '@radix-ui/react-dropdown-menu';

import { useContextMenuContext } from '../../ContextMenu.context';
import { ContextMenuMode } from '../../ContextMenu.enums';

import { SubProps } from './Sub.props';
import { ContextMenuSubProvider } from './Sub.context';

const DISPLAY_NAME = 'ContextMenu.Sub';

export const Sub = forwardRef<HTMLDivElement, SubProps>(
  ({ children, ...props }, ref) => {
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

    const handleOpenChange = (value: boolean) => {
      if (value) {
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
      <ContextMenuSubProvider
        animatedOpen={animatedOpen}
        startAnimation={() => setAnimatedOpen(true)}
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
      </ContextMenuSubProvider>
    );
  }
);

Sub.displayName = DISPLAY_NAME;
