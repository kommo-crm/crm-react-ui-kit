import React, { forwardRef } from 'react';
import { Trigger as RadixDropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { useContextMenuContext } from '../../ContextMenu.context';

import { ContextMenuMode } from '../../ContextMenu.enums';

import type { TriggerProps } from './Trigger.props';

import s from './Trigger.module.css';

const DISPLAY_NAME = 'ContextMenu.Trigger';

export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  ({ className, children, ...rest }, ref) => {
    const { triggerRef, mode } = useContextMenuContext(DISPLAY_NAME);

    return (
      <RadixDropdownMenuTrigger
        ref={ref}
        className={cx(s.button, className)}
        asChild
        onPointerDown={(e) => {
          if (mode === ContextMenuMode.HOVER) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        {...rest}
      >
        <button ref={mergeRefs(triggerRef, ref)}>{children}</button>
      </RadixDropdownMenuTrigger>
    );
  }
);

Trigger.displayName = DISPLAY_NAME;
