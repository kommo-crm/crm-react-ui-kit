import React, { forwardRef } from 'react';
import { Trigger as RadixDropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { useContextMenuContext } from '../../ContextMenu.context';

import type { TriggerProps } from './Trigger.props';

import s from './Trigger.module.css';

const DISPLAY_NAME = 'ContextMenu.Trigger';

export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  ({ theme, className, children, ...props }, ref) => {
    const { triggerRef } = useContextMenuContext(DISPLAY_NAME);

    const themeClassName = useThemeClassName(theme);

    return (
      <div ref={triggerRef}>
        <RadixDropdownMenuTrigger {...props} asChild>
          <button ref={ref} className={cx(s.button, themeClassName, className)}>
            {children}
          </button>
        </RadixDropdownMenuTrigger>
      </div>
    );
  }
);

Trigger.displayName = DISPLAY_NAME;
