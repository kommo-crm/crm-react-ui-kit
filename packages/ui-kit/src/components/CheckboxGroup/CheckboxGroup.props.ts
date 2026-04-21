import React, { type HTMLAttributes } from 'react';

import { type LabelProps } from '../Label';

import { type CheckboxGroupThemeType } from './CheckboxGroup.themes';
import { type CheckboxProps } from './components/Checkbox/Checkbox.props';
import { type ItemRootProps } from './components/ItemRoot';
import { type ItemRootSelectAllProps } from './components/CheckboxSelectAll/ItemRootSelectAll.props';

export type LabelGroupOrientation = 'horizontal' | 'vertical';

export type CheckboxGroupChangeEvent = (
  values: CheckboxStateType[],
  changedValue: InternalCheckboxGroupChangeEvent
) => void;

export type InternalCheckboxGroupChangeEvent =
  | {
      /**
       * Change type: 'selectAll' to select all.
       */
      type: 'selectAll';
      /**
       * The value of the elements.
       */
      name: 'selectAll';
    }
  | {
      /**
       * Change type: 'checkbox' to change the state of a specific checkbox.
       */
      type: 'checkbox';
      /**
       * Value for changing the state of one of the elements (if the type is 'checkbox').
       */
      name: string;
    };

export interface RegisterOptionsType {
  /**
   * An attribute indicating whether the element is disabled.
   * If `true', the user will not be able to interact with the component.
   */
  isDisabled?: boolean;
  /**
   * Checkbox state: whether it is selected by default.
   */
  isDefaultChecked?: boolean;
}

export interface CheckboxStateType {
  /**
   * Unique value for the Checkbox.
   */
  name: string;
  /**
   * Checkbox state: whether it is selected.
   */
  isChecked: boolean;
  /**
   * An attribute indicating whether the element is disabled.
   * If `true', IsChecked remains unchanged.
   */
  isDisabled?: boolean;
}

type CheckboxGroupBaseProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'disabled'
>;

export type RegisterHandlerResult = RegisterOptionsType & {
  /**
   * The value for registration (optional).
   */
  name: string;
  /**
   * The state change processing function.
   */
  onChange: (option: InternalCheckboxGroupChangeEvent) => void;
};

export type RegisterHandlerType = (
  name: string,
  options?: RegisterOptionsType
) => RegisterHandlerResult;

export type UseCheckboxGroupStateArgs = {
  /**
   * The state change processing function.
   */
  onChange: CheckboxGroupChangeEvent;
  /**
   * An attribute indicating whether the elements are disabled.
   */
  isDisabled?: boolean;
};

export interface CheckboxContextProps {
  /**
   * The initially selected value is Checkboxes.
   */
  values: Map<string, CheckboxStateType>;
  /**
   * The `disabled` attribute for `Checkboxes'.
   *
   * Automatically applied to all Checkbox buttons.
   */
  isDisabled?: boolean;
  /**
   * Registration of the checkbox.
   */
  register: RegisterHandlerType;
}

export type CheckboxGroupProps = CheckboxGroupBaseProps &
  Omit<CheckboxContextProps, 'onChange' | 'values' | 'register'> & {
    /**
     * Change state handler function.
     */
    onChange: CheckboxGroupChangeEvent;
    /**
     * Responsible for vertical or horizontal alignment of CheckboxGroup.
     */
    orientation?: LabelGroupOrientation;
    /**
     * Object with CSS theme properties.
     */
    theme: CheckboxGroupThemeType;
  };

export type CheckboxGroupType = React.ForwardRefExoticComponent<
  CheckboxGroupProps & React.RefAttributes<HTMLDivElement>
> & {
  /**
   * Checkbox component.
   */
  Checkbox: React.FC<CheckboxProps>;
  /**
   * Checkbox component.
   */
  CheckboxSelectAll: React.FC<CheckboxProps>;
  /**
   * ItemRootSelectAll component.
   */
  ItemRootSelectAll: React.FC<ItemRootSelectAllProps>;
  /**
   * ItemRoot component.
   */
  ItemRoot: React.FC<ItemRootProps>;
  /**
   * Label component.
   */
  Label: React.ForwardRefExoticComponent<
    LabelProps & React.RefAttributes<HTMLLabelElement>
  >;
};
