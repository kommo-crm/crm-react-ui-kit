import React, { forwardRef } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { Label } from '../Label';

import { useCheckboxGroupState } from './hooks';
import { CheckboxGroupProvider, DISPLAY_NAME } from './CheckboxGroup.context';

import {
  type CheckboxGroupProps,
  type CheckboxGroupType,
} from './CheckboxGroup.props';
import { type CheckboxGroupThemeType } from './CheckboxGroup.themes';

import { Checkbox } from './components/Checkbox';
import {
  CheckboxSelectAll,
  ItemRootSelectAll,
} from './components/CheckboxSelectAll';
import { ItemRoot } from './components/ItemRoot';

import s from './CheckboxGroup.module.css';

type D = HTMLDivElement;

export const CheckboxGroup = forwardRef<D, CheckboxGroupProps>((props, ref) => {
  const {
    className,
    isDisabled = false,
    theme,
    children,
    orientation = 'vertical',
    onChange,
    ...rest
  } = props;

  const themeClassName = useThemeClassName<CheckboxGroupThemeType>(theme);
  const { register, state } = useCheckboxGroupState({ onChange, isDisabled });

  return (
    <CheckboxGroupProvider
      values={state}
      register={register}
      isDisabled={isDisabled}
    >
      <div
        className={cx(s.checkbox_group, themeClassName, className, {
          [s.horizontal]: orientation === 'horizontal',
        })}
        ref={ref}
        {...rest}
      >
        {children}
      </div>
    </CheckboxGroupProvider>
  );
}) as CheckboxGroupType;

CheckboxGroup.displayName = DISPLAY_NAME;

CheckboxGroup.ItemRoot = ItemRoot;
CheckboxGroup.Checkbox = Checkbox;
CheckboxGroup.Label = Label;
CheckboxGroup.CheckboxSelectAll = CheckboxSelectAll;
CheckboxGroup.ItemRootSelectAll = ItemRootSelectAll;
