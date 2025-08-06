import type { ComponentPropsWithoutRef, ReactElement } from 'react';
import type { SubTrigger as RadixDropdownMenuSubTrigger } from '@radix-ui/react-dropdown-menu';

import type { ContextMenuSubSelectTriggerThemeType } from './Trigger.theme';

type RadixSubTriggerProps = Omit<
  ComponentPropsWithoutRef<typeof RadixDropdownMenuSubTrigger>,
  'disabled' | 'textValue'
>;

export type SubSelectTriggerProps = RadixSubTriggerProps & {
  /**
   * Theme.
   */
  theme: ContextMenuSubSelectTriggerThemeType;
  /**
   * Icon to the left of the text.
   */
  icon?: ReactElement;
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
