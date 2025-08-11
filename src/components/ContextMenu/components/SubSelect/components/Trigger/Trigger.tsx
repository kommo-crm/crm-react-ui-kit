import React, { forwardRef } from 'react';
import { SubTrigger as RadixDropdownMenuSubTrigger } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import ChevronRightIcon from 'src/icons/chevronRight.svg';

import { useLevelContext } from '../../../../providers/LevelProvider';

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
    const themeClassName = useThemeClassName(theme);

    const { hasItemWithIcon } = useLevelContext(DISPLAY_NAME);

    return (
      <RadixDropdownMenuSubTrigger
        ref={ref}
        className={cx(s.trigger, themeClassName, className)}
        disabled={isDisabled}
        data-no-icon-align={icon || !hasItemWithIcon ? '' : undefined}
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
