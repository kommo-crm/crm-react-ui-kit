import { createComponentContext } from 'src/lib/react';

import { type CheckboxItemSelectAllContextValue } from './ItemRootSelectAll.props';

const DISPLAY_NAME = 'CheckboxGroup.ItemRootSelectAll';

const [CheckboxItemRootSelectAllProvider, useCheckboxItemRootSelectAllContext] =
  createComponentContext<CheckboxItemSelectAllContextValue>(DISPLAY_NAME);

export {
  CheckboxItemRootSelectAllProvider,
  useCheckboxItemRootSelectAllContext,
  DISPLAY_NAME,
};
