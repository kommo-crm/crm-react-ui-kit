import { type TabProps, type Button } from '../Tab';

import { type ItemRootThemeType } from './ItemRoot.themes';

export type ItemRootProps = Omit<
  Button & TabProps,
  'theme' | 'onClick' | 'value'
> & {
  /**
   * Flag indicating whether the element is disabled.
   */
  isDisabled?: boolean;
  /**
   * Flag indicates whether the default tab is selected.
   */
  isDefaultActive?: boolean;
  /**
   * The value of the element.
   */
  name: string;
  /**
   * Object with CSS theme properties.
   */
  theme: ItemRootThemeType;
};

export type TabItemContextProps = Omit<
  ItemRootProps,
  'theme' | 'className' | 'isDefaultActive'
>;
