import React, { forwardRef } from 'react';
import { SubTrigger as RadixDropdownMenuSubTrigger } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useLevelContext } from '../../providers/LevelProvider';

import { useContextMenuSubContext } from '../Sub/Sub.context';

import { ContextMenuMode } from '../../ContextMenu.enums';

import { hasItemIcon } from '../../utils';

import { useContextMenuItemFocus } from '../../hooks';

import type { SubTriggerProps } from './SubTrigger.props';

import s from './SubTrigger.module.css';

const DISPLAY_NAME = 'ContextMenu.SubTrigger';

export const SubTrigger = forwardRef<HTMLDivElement, SubTriggerProps>(
  ({ className, children, isDisabled, ...rest }, ref) => {
    const { hasItemWithIcon } = useLevelContext(DISPLAY_NAME);
    const { animatedOpen, mode, open, onMouseEnter, onMouseLeave, triggerId } =
      useContextMenuSubContext(DISPLAY_NAME);
    const {
      dataHighlighted,
      onFocus,
      onMouseEnter: handleMouseEnter,
      onBlur,
      onMouseLeave: handleMouseLeave,
    } = useContextMenuItemFocus({
      displayName: DISPLAY_NAME,
      id: triggerId,
      isDisabled,
      isNotSelectable: false,
      onMouseEnter,
      onMouseLeave,
    });

    return (
      <RadixDropdownMenuSubTrigger
        ref={ref}
        className={cx(s.sub_trigger, className)}
        disabled={isDisabled}
        data-item
        data-no-icon-align={
          hasItemIcon(children) || !hasItemWithIcon ? '' : undefined
        }
        data-highlighted={
          animatedOpen ||
          dataHighlighted === '' ||
          (mode === ContextMenuMode.CLICK && open)
            ? ''
            : undefined
        }
        data-submenu-trigger
        onFocus={onFocus}
        onMouseEnter={handleMouseEnter}
        onBlur={onBlur}
        onMouseLeave={handleMouseLeave}
        {...rest}
      >
        {children}
      </RadixDropdownMenuSubTrigger>
    );
  }
);

SubTrigger.displayName = DISPLAY_NAME;
