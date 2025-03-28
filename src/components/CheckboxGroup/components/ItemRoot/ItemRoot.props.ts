import { type InternalCheckboxGroupChangeEvent } from '../../CheckboxGroup.props';

import { type ItemRootThemeType } from './ItemRoot.themes';

export type ItemRootProps = {
  /**
   * The unique name used to identify the `checkbox` element.
   */
  name: string;
  /**
   * The value associated with the `value` attribute.
   */
  value: string;
  /**
   * An attribute indicating whether the element is disabled.
   * If `true', the user will not be able to interact with the component.
   */
  isDisabled?: boolean;
  /**
   * Checkbox status: whether it is selected.
   */
  isDefaultChecked?: boolean;
  /**
   * An additional CSS class that can be used to style the component.
   */
  className?: string;
  /**
   * Child elements that will be displayed inside the component.
   */
  children?: React.ReactNode;
  /**
   * The theme of the component.
   * Defines the appearance or styling through predefined themes.
   */
  theme: ItemRootThemeType;
};

export type CheckboxItemContextProps = Omit<
  ItemRootProps,
  'theme' | 'children' | 'className'
> & {
  /**
   * Change state handler function.
   */
  onChange: (option: InternalCheckboxGroupChangeEvent) => void;
};
