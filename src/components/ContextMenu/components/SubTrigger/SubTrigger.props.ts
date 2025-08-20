import type { ComponentPropsWithoutRef, ReactElement } from 'react';
import type { SubTrigger as RadixDropdownMenuSubTrigger } from '@radix-ui/react-dropdown-menu';

type RadixSubTriggerProps = Omit<
  ComponentPropsWithoutRef<typeof RadixDropdownMenuSubTrigger>,
  'disabled' | 'textValue' | 'asChild'
>;

export type SubTriggerProps = RadixSubTriggerProps & {
  /**
   * Icon to the left of the text.
   */
  icon?: ReactElement;
  /**
   * Child text element. Use the Text component.
   */
  text?: ReactElement;
  /**
   * An element indicating the presence of a nested submenu.
   * Pass `null` to disable the chevron indicator entirely.
   */
  chevron?: ReactElement | null;
  /**
   * Whether the SubTrigger is disabled.
   */
  isDisabled?: boolean;
};
