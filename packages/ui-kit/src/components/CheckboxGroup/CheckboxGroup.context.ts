import { createComponentContext } from 'src/lib/react';

import { type CheckboxContextProps } from './CheckboxGroup.props';

const DISPLAY_NAME = 'CheckboxGroup';

const [CheckboxGroupProvider, useCheckboxGroupContext] =
  createComponentContext<CheckboxContextProps>(DISPLAY_NAME);

export { CheckboxGroupProvider, useCheckboxGroupContext, DISPLAY_NAME };
