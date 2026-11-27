import type React from 'react';
import type { TabsTriggerProps as RadixTabsTriggerProps } from '@radix-ui/react-tabs';

/**
 * Where a tab is rendered.
 */
export type TabPlacement = 'panel' | 'menu' | 'measure';

/**
 * Focus and keyboard events happen on the tab trigger or the menu item, which
 * wrap the element that gets the props, so these handlers would never fire.
 */
type FocusAndKeyboardHandlers =
  | 'onFocus'
  | 'onFocusCapture'
  | 'onBlur'
  | 'onBlurCapture'
  | 'onKeyDown'
  | 'onKeyDownCapture'
  | 'onKeyUp'
  | 'onKeyUpCapture'
  | 'onKeyPress'
  | 'onKeyPressCapture';

export interface TabProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, FocusAndKeyboardHandlers> {
  /**
   * The value of the tab. Values must be unique within the list.
   */
  value: RadixTabsTriggerProps['value'];
  /**
   * Number in the badge after the content; no badge without it or at zero,
   * `99+` above 99.
   */
  counter?: number;
}
