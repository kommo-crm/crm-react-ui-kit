import type { ForwardRefExoticComponent, RefAttributes } from 'react';

import { ContentProps } from '../Content/Content.props';
import { TriggerProps } from '../Trigger/Trigger.props';

import { ContextMenuHandle } from '../../ContextMenu.types';

import { ContextMenuSubRootProps } from './SubRoot.props';

export type ContextMenuSubRootComponentType = ForwardRefExoticComponent<
  ContextMenuSubRootProps & RefAttributes<ContextMenuHandle>
>;

export interface ContextMenuSubRootType
  extends ContextMenuSubRootComponentType {
  Root: ContextMenuSubRootComponentType;
  Content: React.FC<ContentProps>;
  Trigger: React.FC<TriggerProps>;
}
