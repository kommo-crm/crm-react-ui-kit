import type React from 'react';
import type { TabsProps as RadixTabsProps } from '@radix-ui/react-tabs';

import { type TabsThemeType } from './Tabs.themes';
import { type ListProps } from './components/List';
import { type TriggerProps } from './components/Trigger';
import { type ContentProps } from './components/Content';

export interface TabsProps
  extends Omit<RadixTabsProps, 'onValueChange' | 'onChange' | 'orientation'> {
  /**
   * Object with CSS theme properties.
   */
  theme: TabsThemeType;
  /**
   * The value of the active tab when it is stored by the parent
   * (controlled mode).
   */
  value?: RadixTabsProps['value'];
  /**
   * The value of the tab that is active on the first render when the
   * component stores the active tab itself (uncontrolled mode).
   */
  defaultValue?: RadixTabsProps['defaultValue'];
  /**
   * Called when another tab is selected. Selecting the active tab
   * does not call it.
   */
  onChange?: (value: string) => void;
  /**
   * When a tab is selected while moving focus with the arrow keys:
   * right on focus (`automatic`) or by `Enter` / `Space` (`manual`).
   * @default automatic
   */
  activationMode?: RadixTabsProps['activationMode'];
  /**
   * `Tabs.List` and `Tabs.Content` elements.
   */
  children: React.ReactNode;
}

export type TabsType = React.ForwardRefExoticComponent<
  TabsProps & React.RefAttributes<HTMLDivElement>
> & {
  /**
   * Container of the tabs.
   */
  List: React.ForwardRefExoticComponent<
    ListProps & React.RefAttributes<HTMLDivElement>
  >;
  /**
   * Tab button.
   */
  Trigger: React.ForwardRefExoticComponent<
    TriggerProps & React.RefAttributes<HTMLButtonElement>
  >;
  /**
   * Panel of the tab.
   */
  Content: React.ForwardRefExoticComponent<
    ContentProps & React.RefAttributes<HTMLDivElement>
  >;
};
