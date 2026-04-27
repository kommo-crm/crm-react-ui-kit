import { createComponentContext } from '@/lib/react';

import { type CheckboxItemContextProps } from './ItemRoot.props';

const DISPLAY_NAME = 'CheckboxGroup.ItemRoot';

const [CheckboxItemRootProvider, useCheckboxItemRootContext] =
  createComponentContext<CheckboxItemContextProps>(DISPLAY_NAME);

export { CheckboxItemRootProvider, useCheckboxItemRootContext, DISPLAY_NAME };
