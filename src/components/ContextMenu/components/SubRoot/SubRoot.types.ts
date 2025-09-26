import type { ForwardRefExoticComponent, RefAttributes } from 'react';

import { ContextMenuHandle } from '../../ContextMenu.types';

import { ContentProps } from '../Content/Content.props';

import { TriggerProps } from './components/Trigger/Trigger.props';

import { ContextMenuSubRootProps } from './SubRoot.props';

export type ContextMenuSubRootComponentType = ForwardRefExoticComponent<
  ContextMenuSubRootProps & RefAttributes<ContextMenuHandle>
>;

export interface ContextMenuSubRootType
  extends ContextMenuSubRootComponentType {
  Root: ContextMenuSubRootComponentType;
  Content: ForwardRefExoticComponent<
    ContentProps & RefAttributes<HTMLDivElement>
  >;
  Trigger: ForwardRefExoticComponent<
    TriggerProps & RefAttributes<HTMLButtonElement>
  >;
}
