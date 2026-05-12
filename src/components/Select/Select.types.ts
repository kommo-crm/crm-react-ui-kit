import { ReactElement } from 'react';

interface SelectItemBase {
  /**
   * Value of the element.
   */
  value: number | string;
}

export type StringSelectItem = SelectItemBase & {
  /**
   * Visual label shown in the list and in the trigger when the item is selected.
   */
  option: string;
  /**
   * Native tooltip text shown on hover.
   * Defaults to `option` when omitted.
   */
  title?: string;
};

export type ReactElementSelectItem = SelectItemBase & {
  /**
   * Visual label shown in the list and in the trigger when the item is selected.
   */
  option: ReactElement;
  /**
   * Native tooltip text shown on hover.
   * Required because `option` is not a string and cannot be used as a fallback.
   */
  title: string;
};

export type SelectItem = StringSelectItem | ReactElementSelectItem;

/**
 * Resolves the tooltip text for a `SelectItem`. Uses the explicit `title` when
 * provided, otherwise falls back to `option` if it is a string.
 */
export const getSelectItemTitle = (item: SelectItem): string | undefined => {
  if (item.title) {
    return item.title;
  }

  if (typeof item.option === 'string') {
    return item.option;
  }

  return undefined;
};
