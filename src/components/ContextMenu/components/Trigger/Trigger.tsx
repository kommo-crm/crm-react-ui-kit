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
    const themeClassName = useThemeClassName(theme);

    const { triggerRef } = useContextMenuContext(DISPLAY_NAME);

    return (
      <RadixDropdownMenuTrigger
        ref={ref}
        className={cx(s.button, themeClassName, className)}
        asChild
        {...props}
      >
        <button ref={triggerRef}>{children}</button>
      </RadixDropdownMenuTrigger>
    );
  }
);

Trigger.displayName = DISPLAY_NAME;
