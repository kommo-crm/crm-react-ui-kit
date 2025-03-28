import { type CheckboxProps as CheckboxCoreProps } from 'src/components/Checkbox/Checkbox.props';

export type CheckboxProps = Omit<
  CheckboxCoreProps,
  'onChange' | 'value' | 'isDisabled' | 'isChecked' | 'isDefaultChecked'
>;
