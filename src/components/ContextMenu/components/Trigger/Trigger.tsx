import React, { forwardRef } from 'react';
import { Trigger as RadixDropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { useContextMenuContext } from '../../ContextMenu.context';
import { ContextMenuMode } from '../../ContextMenu.enums';

import type { TriggerProps } from './Trigger.props';

import s from './Trigger.module.css';

const DISPLAY_NAME = 'ContextMenu.Trigger';

export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  ({ theme, className, children, style, onClick, ...props }, ref) => {
    const { triggerRef, mode } = useContextMenuContext(DISPLAY_NAME);
    const themeClassName = useThemeClassName(theme);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (mode === ContextMenuMode.HOVER) {
        return;
      }

      onClick?.(event);
    };

    const combinedStyle =
      mode === ContextMenuMode.CLICK ? { cursor: 'pointer', ...style } : style;

    return (
      <div ref={triggerRef}>
        <RadixDropdownMenuTrigger
          {...props}
          onClick={handleClick}
          style={combinedStyle}
          asChild
        >
          <button ref={ref} className={cx(s.button, themeClassName, className)}>
            {children}
          </button>
        </RadixDropdownMenuTrigger>
      </div>
    );
  }
);

Trigger.displayName = DISPLAY_NAME;
