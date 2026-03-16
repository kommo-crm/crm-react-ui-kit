import { Dispatch, SetStateAction } from 'react';

export interface UseItemInnerFocusOptions {
  /**
   * The id of the item.
   */
  id: string;
  /**
   * Whether the item is selectable.
   */
  isSelectable: boolean | undefined;
  /**
   * The name of the display.
   */
  displayName: string;
}

export interface UseItemInnerFocusResult {
  /**
   * Whether the item is selectable considering the input focus.
   */
  isSelectableConsideringInputFocus: boolean;
  /**
   * Sets the selectable state of the item.
   */
  setIsSelectable: Dispatch<SetStateAction<boolean>>;
  /**
   * The callback function to be called when the node ref is changed.
   */
  handleNodeRef: (newNode: HTMLDivElement | null) => void;
}
