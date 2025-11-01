import type { ForwardRefExoticComponent, RefAttributes } from 'react';

import { Arrow } from './components/Arrow';
import { CheckboxItem } from './components/CheckboxItem/CheckboxItem';
import { Content } from './components/Content';
import { FocusBlocker } from './components/FocusBlocker';
import { Group } from './components/Group/Group';
import { Item } from './components/Item';
import { ItemIcon } from './components/ItemIcon/ItemIcon';
import { ItemIndicator } from './components/ItemIndicator/ItemIndicator';
import { ItemRightSlot } from './components/ItemRightSlot/ItemRightSlot';
import { Label } from './components/Label';
import { Portal } from './components/Portal/Portal';
import { RadioGroup } from './components/RadioGroup/RadioGroup';
import { RadioItem } from './components/RadioItem/RadioItem';
import { Separator } from './components/Separator/Separator';
import { Sub } from './components/Sub/Sub';
import { SubContent } from './components/SubContent/SubContent';
import { SubRoot } from './components/SubRoot/SubRoot';
import { SubTrigger } from './components/SubTrigger/SubTrigger';
import { Trigger } from './components/Trigger';

import { ContextMenuMode } from './ContextMenu.enums';
import { ContextMenuRootProps } from './ContextMenu.props';

/**
 * String literal type version of ContextMenuMode
 */
export type ContextMenuModeType = `${ContextMenuMode}`;

export interface ContextMenuHandle {
  /**
   * Closes the menu immediately.
   */
  closeMenuImmediately: () => void;
  /**
   * Enables the temporary hover close.
   */
  enableTemporaryHoverClose: () => void;
  /**
   * The callback function to be called when the menu is opened by keyboard.
   */
  onOpenByKeyboard: (value: boolean) => void;
}

export type ContextMenuComponentType = ForwardRefExoticComponent<
  ContextMenuRootProps & RefAttributes<ContextMenuHandle>
>;

export interface ContextMenuType extends ContextMenuComponentType {
  Root: ContextMenuComponentType;
  Arrow: typeof Arrow;
  CheckboxItem: typeof CheckboxItem;
  Content: typeof Content;
  Group: typeof Group;
  Item: typeof Item;
  ItemIcon: typeof ItemIcon;
  ItemIndicator: typeof ItemIndicator;
  ItemRightSlot: typeof ItemRightSlot;
  Label: typeof Label;
  Portal: typeof Portal;
  RadioGroup: typeof RadioGroup;
  RadioItem: typeof RadioItem;
  Separator: typeof Separator;
  Sub: typeof Sub;
  SubContent: typeof SubContent;
  experimental_SubRoot: typeof SubRoot;
  SubTrigger: typeof SubTrigger;
  Trigger: typeof Trigger;
  FocusBlocker: typeof FocusBlocker;
}
