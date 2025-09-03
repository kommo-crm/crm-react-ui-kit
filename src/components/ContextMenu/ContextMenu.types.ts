import type { ForwardRefExoticComponent, RefAttributes } from 'react';

import { ContextMenuRootProps } from './ContextMenu.props';

import { Portal } from './components/Portal/Portal';
import { Sub } from './components/Sub/Sub';
import { Group } from './components/Group/Group';
import { RadioGroup } from './components/RadioGroup/RadioGroup';

import { TriggerProps } from './components/Trigger/Trigger.props';
import { SubTriggerProps } from './components/SubTrigger/SubTrigger.props';
import { ContentProps } from './components/Content/Content.props';
import { ArrowProps } from './components/Arrow/Arrow.props';
import { ItemProps } from './components/Item/Item.props';
import { LabelProps } from './components/Label/Label.props';
import { CheckboxItemProps } from './components/CheckboxItem/CheckboxItem.props';
import { ItemIndicatorProps } from './components/ItemIndicator/ItemIndicator.props';
import { RadioItemProps } from './components/RadioItem/RadioItem.props';
import { SubContentProps } from './components/SubContent/SubContent.props';
import { SeparatorProps } from './components/Separator/Separator.props';
import { ItemRightSlotProps } from './components/ItemRightSlot/ItemRightSlot.props';
import { ItemIconProps } from './components/ItemIcon/ItemIcon.props';

import { ContextMenuMode } from './ContextMenu.enums';

/**
 * String literal type version of ContextMenuMode
 */
export type ContextMenuModeType = `${ContextMenuMode}`;

export type ContextMenuComponentType = ForwardRefExoticComponent<
  ContextMenuRootProps & RefAttributes<HTMLDivElement>
>;

export interface ContextMenuType extends ContextMenuComponentType {
  Root: ContextMenuComponentType;
  Portal: typeof Portal;
  Sub: typeof Sub;
  Group: typeof Group;
  RadioGroup: typeof RadioGroup;
  Trigger: React.FC<TriggerProps>;
  SubTrigger: React.FC<SubTriggerProps>;
  Content: React.FC<ContentProps>;
  Arrow: React.FC<ArrowProps>;
  Item: React.FC<ItemProps>;
  Label: React.FC<LabelProps>;
  CheckboxItem: React.FC<CheckboxItemProps>;
  ItemIndicator: React.FC<ItemIndicatorProps>;
  RadioItem: React.FC<RadioItemProps>;
  SubContent: React.FC<SubContentProps>;
  Separator: React.FC<SeparatorProps>;
  ItemRightSlot: React.FC<ItemRightSlotProps>;
  ItemIcon: React.FC<ItemIconProps>;
}
