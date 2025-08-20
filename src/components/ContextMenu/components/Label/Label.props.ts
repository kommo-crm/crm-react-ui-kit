import type { ComponentPropsWithoutRef, ReactElement } from 'react';
import type { Label as RadixDropdownMenuLabel } from '@radix-ui/react-dropdown-menu';

type RadixLabelProps = Omit<
  ComponentPropsWithoutRef<typeof RadixDropdownMenuLabel>,
  'disabled' | 'textValue'
>;

export type LabelProps = RadixLabelProps & {
  /**
   * Icon to the left of the text.
   */
  icon?: ReactElement;
  /**
   * Child text element. Use the Text component.
   */
  text?: ReactElement;
};
