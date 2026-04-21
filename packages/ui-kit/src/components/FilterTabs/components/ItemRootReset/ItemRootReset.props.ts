import { type TabProps, type Button } from '../Tab';
import { type ItemRootThemeType } from '../ItemRoot/ItemRoot.themes';

export type ItemRootResetProps = Omit<
  Button & TabProps,
  'theme' | 'onClick' | 'value' | 'name'
> & {
  /**
   * A flag that determines whether the element is disabled.
   */
  isDisabled?: boolean;
  /**
   * Object with CSS theme properties.
   */
  theme: ItemRootThemeType;
};

export type TabItemResetContextProps = Omit<
  ItemRootResetProps,
  'theme' | 'className'
>;
