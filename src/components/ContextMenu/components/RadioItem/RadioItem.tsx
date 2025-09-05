import React, { forwardRef, useId, useMemo } from 'react';
import { RadioItem as RadixDropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useLevelContext } from '../../providers/LevelProvider';

import { useContextMenuContext } from '../../ContextMenu.context';

import { hasItemIcon } from '../../utils';

import { useContextMenuItemFocus } from '../../hooks';

import type { RadioItemProps } from './RadioItem.props';

import s from './RadioItem.module.css';

const DISPLAY_NAME = 'ContextMenu.RadioItem';

export const RadioItem = forwardRef<HTMLDivElement, RadioItemProps>(
  (
    { className, children, isDisabled, hasIconCheckFn = hasItemIcon, ...rest },
    ref
  ) => {
    const id = useId();

    const { hasItemWithIcon } = useLevelContext(DISPLAY_NAME);
    const { closeMenuImmediately } = useContextMenuContext(DISPLAY_NAME);

    const { dataHighlighted, onFocus, onMouseEnter, onBlur, onMouseLeave } =
      useContextMenuItemFocus({
        displayName: DISPLAY_NAME,
        id,
        isDisabled,
        isNotSelectable: false,
      });

    const hasIcon = useMemo(() => hasIconCheckFn(children), [children]);

    return (
      <RadixDropdownMenuRadioItem
        ref={ref}
        className={cx(s.radio_item, className)}
        disabled={isDisabled}
        data-item
        data-no-icon-align={hasIcon || !hasItemWithIcon ? '' : undefined}
        onSelect={() => closeMenuImmediately(true)}
        data-highlighted={dataHighlighted}
        onFocus={onFocus}
        onMouseEnter={onMouseEnter}
        onBlur={onBlur}
        onMouseLeave={onMouseLeave}
        {...rest}
      >
        {children}
      </RadixDropdownMenuRadioItem>
    );
  }
);

RadioItem.displayName = DISPLAY_NAME;
