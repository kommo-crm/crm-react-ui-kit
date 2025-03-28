import { type InternalCheckboxGroupChangeEvent } from '../../CheckboxGroup.props';
import { type ItemRootProps } from '../ItemRoot';

export type ItemRootSelectAllProps = Omit<
  ItemRootProps,
  'name' | 'isDefaultChecked' | 'value'
>;

export type CheckboxItemSelectAllContextValue = Omit<
  ItemRootSelectAllProps,
  'theme' | 'children' | 'className'
> & {
  /**
   * Change state handler function.
   */
  onChange: (option: InternalCheckboxGroupChangeEvent) => void;
};
