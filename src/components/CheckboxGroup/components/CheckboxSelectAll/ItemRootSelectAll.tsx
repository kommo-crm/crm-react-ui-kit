import React from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { useCheckboxGroupContext } from '../../CheckboxGroup.context';
import { type ItemRootThemeType } from '../ItemRoot';

import { type ItemRootSelectAllProps } from './ItemRootSelectAll.props';
import {
  CheckboxItemRootSelectAllProvider,
  DISPLAY_NAME,
} from './ItemRootSelectAll.context';

import s from '../ItemRoot/ItemRoot.module.css';

export const ItemRootSelectAll: React.FC<ItemRootSelectAllProps> = ({
  children,
  theme,
  className,
  isDisabled,
}) => {
  const themeClassName = useThemeClassName<ItemRootThemeType>(theme);

  const { isDisabled: isGlobalDisabled, register } =
    useCheckboxGroupContext(DISPLAY_NAME);

  return (
    <CheckboxItemRootSelectAllProvider
      isDisabled={isDisabled}
      {...register('selectAll')}
    >
      <div
        className={cx(s.item_root, themeClassName, className, {
          /**
           * If `isDisabled` was passed directly to the component
           * Blocking a specific Checkbox.
           *
           * If passed to the CheckboxGroup component
           * We block all Checkboxes.
           */
          [s.disabled]: isGlobalDisabled || isDisabled,
        })}
      >
        {children}
      </div>
    </CheckboxItemRootSelectAllProvider>
  );
};

ItemRootSelectAll.displayName = DISPLAY_NAME;
