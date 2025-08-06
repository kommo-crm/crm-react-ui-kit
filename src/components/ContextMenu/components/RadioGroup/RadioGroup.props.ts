import type { ComponentPropsWithoutRef } from 'react';
import type { RadioGroup as RadixDropdownMenuRadioGroup } from '@radix-ui/react-dropdown-menu';

type RadixRadioGroupProps = Omit<
  ComponentPropsWithoutRef<typeof RadixDropdownMenuRadioGroup>,
  'onValueChange'
>;

export type RadioGroupProps = RadixRadioGroupProps & {
  /**
   * Callback that fires when the selected radio value changes.
   * Replaces Radix `onValueChange` with native-like `onChange`.
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
