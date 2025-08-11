import React, { forwardRef } from 'react';
import { SubTrigger as RadixDropdownMenuSubTrigger } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import ChevronRightIcon from 'src/icons/chevronRight.svg';

import { useLevelContext } from '../../providers/LevelProvider';

import type { SubTriggerProps } from './SubTrigger.props';

import s from './SubTrigger.module.css';

const DISPLAY_NAME = 'ContextMenu.SubTrigger';

export const SubTrigger = forwardRef<HTMLDivElement, SubTriggerProps>(
  (
    {
      theme,
      className,
      children,
      icon,
      text,
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
        className={cx(s.sub_trigger, themeClassName, className)}
        disabled={isDisabled}
        data-no-icon-align={icon || !hasItemWithIcon ? '' : undefined}
        {...props}
      >
        {icon}
        {text}
        {children}
        {chevron &&
          React.cloneElement(chevron, {
            className: cx(s.chevron, chevron.props.className),
          })}
      </RadixDropdownMenuSubTrigger>
    );
  }
);

SubTrigger.displayName = DISPLAY_NAME;
