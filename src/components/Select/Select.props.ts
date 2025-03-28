import React from 'react';

import { ItemProps } from './components/Item/Item.props';
import { ListProps } from './components/List/List.props';
import { SelectItem } from './Select.types';
import { ValueProps } from './components/Value/Value.props';
import { ArrowProps } from './components/Arrow/Arrow.props';
import { ButtonProps } from './components/Button/Button';
import { SelectRootThemeType } from './Select.theme';
import { IconProps } from './components/Icon/Icon.props';
import { OptionProps } from './components/Option/Option.props';

type BaseSelectProps = {
  /**
   * The current selected value.
   */
  value?: SelectItem;
  /**
   * Default value.
   * Used for Uncontrolled Select.
   */
  defaultValue?: SelectItem;
  /**
   * Flag determining if the Select is valid.
   */
  isInvalid?: boolean;
  /**
   * Determines if the Select is disabled.
   */
  isDisabled?: boolean;
  /**
   * Value change callback.
   */
  onChange?: (item: SelectItem) => void;
};

export type SelectProps = {
  /**
   * Theme.
   */
  theme: SelectRootThemeType;
  /**
   * The current selected value.
   */
  value?: SelectItem;
  /**
   * Default value
   * Used for Uncontrolled Select.
   */
  defaultValue?: SelectItem;
  /**
   * Flag whether the select is valid.
   */
  isInvalid?: boolean;
  /**
   * Whether the Select is blocked.
   */
  isDisabled?: boolean;
  /**
   * Callback for changing the value.
   */
  onChange?: (item: SelectItem) => void;
  /**
   * A callback that works out when opening/closing a select.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Custom classes for styling.
   */
  className?: string;
  /**
   * Child elements, Select components.
   */
  children?: React.ReactNode;
  /**
   * Flag whether the list is initially open.
   */
  isDefaultOpen?: boolean;
};

export type SelectContextProps = BaseSelectProps & {
  /**
   * Callback for the opening.
   */
  onOpen: (isOpen: boolean) => void;
  /**
   * A callback for changing the selected element.
   */
  onHoveredIndexChange: (index: number) => void;
  /**
   * The index of the selected element.
   */
  hoveredIndex: number;
  /**
   * Flag whether the list is open.
   */
  isOpened: boolean;
};

export type SelectType = React.ForwardRefExoticComponent<
  SelectProps & React.RefAttributes<HTMLDivElement>
> & {
  /**
   * List component.
   */
  List: React.ForwardRefExoticComponent<ListProps>;
  /**
   * Button component.
   */
  Button: React.ForwardRefExoticComponent<ButtonProps>;
  /**
   * ItemRoot component.
   */
  Item: React.ForwardRefExoticComponent<ItemProps>;
  /**
   * Root component.
   */
  Root: React.ForwardRefExoticComponent<
    SelectProps & React.RefAttributes<HTMLDivElement>
  >;
  /**
   * Value component.
   */
  Value: React.ForwardRefExoticComponent<ValueProps>;
  /**
   * Arrow component.
   */
  Arrow: React.ForwardRefExoticComponent<ArrowProps>;
  /**
   * Icon component.
   */
  Icon: React.ForwardRefExoticComponent<IconProps>;
  /**
   * Option component.
   */
  Option: React.ForwardRefExoticComponent<OptionProps>;
};
