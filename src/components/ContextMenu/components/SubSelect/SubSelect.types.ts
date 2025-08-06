import { SubSelectProps } from './SubSelect.props';

import { SubSelectTriggerProps } from './components/Trigger/Trigger.props';
import { SubSelectContentProps } from './components/Content/Content.props';
import { SubSelectItemProps } from './components/Item/Item.props';
import { SubSelectValueProps } from './components/Value/Value.props';

export type SubSelectOption = {
  /**
   * Display name of the option.
   */
  option: string;
  /**
   * Unique string identifier used as the internal value.
   */
  value: string;
  /**
   * Whether the option supports sorting.
   * If true, it will cycle through sort directions when selected.
   */
  sortable?: boolean;
};

export type SubSelectComponentType = React.FC<SubSelectProps>;

export interface SubSelectType extends SubSelectComponentType {
  Root: SubSelectComponentType;
  Trigger: React.FC<SubSelectTriggerProps>;
  Value: React.FC<SubSelectValueProps>;
  Content: React.FC<SubSelectContentProps>;
  Item: React.FC<SubSelectItemProps>;
}
