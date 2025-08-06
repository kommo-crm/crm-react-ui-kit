import React, { forwardRef, useEffect } from 'react';
import { SubTrigger as RadixDropdownMenuSubTrigger } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import ChevronRightIcon from 'src/icons/chevronRight.svg';

import { useContextMenuContext } from 'src/components/ContextMenu/ContextMenu.context';

import { useLevelProviderContext } from '../../../LevelProvider';

import type { SubSelectTriggerProps } from './Trigger.props';

import s from './Trigger.module.css';

const DISPLAY_NAME = 'ContextMenu.SubSelect.Trigger';

export const Trigger = forwardRef<HTMLDivElement, SubSelectTriggerProps>(
  (
    {
      theme,
      className,
      children,
      icon,
      chevron = <ChevronRightIcon />,
      isDisabled,
      ...props
    },
    ref
  ) => {
    const { disableItemIconAlign } = useContextMenuContext(DISPLAY_NAME);
    const { hasItemWithIcon, registerItemWithItem } =
      useLevelProviderContext(DISPLAY_NAME);

    const themeClassName = useThemeClassName(theme);

    useEffect(() => {
      if (icon) {
        registerItemWithItem();
      }
    }, [icon]);

    return (
      <RadixDropdownMenuSubTrigger
        ref={ref}
        className={cx(s.trigger, themeClassName, className)}
        disabled={isDisabled}
        data-no-icon-align={
          icon || (!disableItemIconAlign && !hasItemWithIcon) ? '' : undefined
        }
        {...props}
      >
        {icon}
        {children}
        {chevron &&
          React.cloneElement(chevron, {
            className: cx(s.chevron, chevron.props.className),
          })}
      </RadixDropdownMenuSubTrigger>
    );
  }
);

Trigger.displayName = DISPLAY_NAME;
