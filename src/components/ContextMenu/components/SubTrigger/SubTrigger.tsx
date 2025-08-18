import React, { forwardRef, useState } from 'react';
import { SubTrigger as RadixDropdownMenuSubTrigger } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import ChevronRightIcon from 'src/icons/chevronRight.svg';

import { useLevelContext } from '../../providers/LevelProvider';

import { useContextMenuSubContext } from '../Sub/Sub.context';

import { ContextMenuMode } from '../../ContextMenu.enums';

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
      ...rest
    },
    ref
  ) => {
    const themeClassName = useThemeClassName(theme);

    const [isActive, setIsActive] = useState(false);

    const { hasItemWithIcon } = useLevelContext(DISPLAY_NAME);
    const { animatedOpen, mode, open } = useContextMenuSubContext(DISPLAY_NAME);

    return (
      <RadixDropdownMenuSubTrigger
        ref={ref}
        className={cx(s.sub_trigger, themeClassName, className)}
        disabled={isDisabled}
        data-item
        data-no-icon-align={icon || !hasItemWithIcon ? '' : undefined}
        data-highlighted={
          animatedOpen || isActive || (mode === ContextMenuMode.CLICK && open)
            ? ''
            : undefined
        }
        onFocus={() => setIsActive(true)}
        onMouseEnter={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        onMouseLeave={() => setIsActive(false)}
        {...rest}
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
