import React, { forwardRef } from 'react';

import { Checkbox } from 'src/components/Checkbox/Checkbox';
import { type CheckedStyleType } from 'src/components/Checkbox/Checkbox.props';

import { type CheckboxProps } from '../Checkbox/Checkbox.props';
import { useCheckboxGroupContext } from '../../CheckboxGroup.context';

import { useCheckboxItemRootSelectAllContext } from './ItemRootSelectAll.context';

type I = HTMLInputElement;

const DISPLAY_NAME = 'CheckboxGroup.CheckboxSelectAll';
const SELECT_ALL = 'selectAll';

export const CheckboxSelectAll = forwardRef<I, CheckboxProps>((props, ref) => {
  const { theme, className, ...rest } = props;

  const { values, isDisabled: isGlobalDisabled } =
    useCheckboxGroupContext(DISPLAY_NAME);

  const { onChange, isDisabled } =
    useCheckboxItemRootSelectAllContext(DISPLAY_NAME);

  const handleChange = () => {
    onChange({ type: SELECT_ALL, name: SELECT_ALL });
  };

  const getPropsBasedOnInternalState = () => {
    const allChecked = Array.from(values.values()).every(
      (checkbox) => checkbox.isChecked
    );
    const checkedStyle: CheckedStyleType = allChecked
      ? 'mark'
      : 'indeterminate';

    return {
      isChecked: Array.from(values.values()).some(
        (checkbox) => checkbox.isChecked
      ),
      checkedStyle,
    };
  };

  return (
    <Checkbox
      ref={ref}
      className={className}
      onChange={handleChange}
      theme={theme}
      value={SELECT_ALL}
      isDisabled={isGlobalDisabled || isDisabled}
      {...getPropsBasedOnInternalState()}
      {...rest}
    />
  );
});

CheckboxSelectAll.displayName = DISPLAY_NAME;
