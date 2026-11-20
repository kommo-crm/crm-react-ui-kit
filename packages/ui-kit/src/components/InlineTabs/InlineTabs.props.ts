import type React from 'react';
import type { TabsProps as RadixTabsProps } from '@radix-ui/react-tabs';

import { type InlineTabsThemeType } from './InlineTabs.themes';
import { type ListProps } from './components/List';
import { type TabProps } from './components/Tab';
import { type TabLabelProps } from './components/TabLabel';
import { type TabMenuIconProps } from './components/TabMenuIcon';
import { type ContentProps } from './components/Content';

export interface InlineTabsProps
  extends Omit<RadixTabsProps, 'onValueChange' | 'onChange' | 'orientation'> {
  /**
   * Object with CSS theme properties.
   */
  theme: InlineTabsThemeType;
  /**
   * The value of the selected tab when it is stored by the parent
   * (controlled mode).
   */
  value?: RadixTabsProps['value'];
  /**
   * The value of the tab that is selected on the first render in
   * uncontrolled mode.
   */
  defaultValue?: RadixTabsProps['defaultValue'];
  /**
   * When a tab is selected while focus moves with the arrow keys: on focus
   * (`automatic`) or on Enter/Space (`manual`). `manual` keeps a hybrid tab
   * from firing `onChange` during arrow navigation.
   *
   * @default manual
   */
  activationMode?: RadixTabsProps['activationMode'];
  /**
   * Called when a tab other than the selected one is clicked or activated.
   */
  onChange?: RadixTabsProps['onValueChange'];
  /**
   * `InlineTabs.List` and `InlineTabs.Content` elements.
   */
  children?: RadixTabsProps['children'];
}

export type InlineTabsType = React.ForwardRefExoticComponent<
  InlineTabsProps & React.RefAttributes<HTMLDivElement>
> & {
  /**
   * Root of the tabs, the same component as `InlineTabs`.
   */
  Root: InlineTabsType;
  /**
   * Panel of the tabs.
   */
  List: React.ForwardRefExoticComponent<
    ListProps & React.RefAttributes<HTMLDivElement>
  >;
  /**
   * Tab of the panel, declared inside `List`.
   */
  Tab: React.ForwardRefExoticComponent<
    TabProps & React.RefAttributes<HTMLDivElement>
  >;
  /**
   * Label of a tab, truncated with an ellipsis.
   */
  TabLabel: React.ForwardRefExoticComponent<
    TabLabelProps & React.RefAttributes<HTMLSpanElement>
  >;
  /**
   * Icon of a tab shown only in the overflow menu.
   */
  TabMenuIcon: React.ForwardRefExoticComponent<
    TabMenuIconProps & React.RefAttributes<HTMLSpanElement>
  >;
  /**
   * Panel of the tab.
   */
  Content: React.ForwardRefExoticComponent<
    ContentProps & React.RefAttributes<HTMLDivElement>
  >;
};
