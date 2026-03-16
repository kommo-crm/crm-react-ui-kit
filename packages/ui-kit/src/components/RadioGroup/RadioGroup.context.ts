import { createComponentContext } from 'src/lib/react';

import { type RadioContextProps } from './RadioGroup.props';

const DISPLAY_NAME = 'RadioGroup';

const [RadioGroupProvider, useRadioGroupContext] =
  createComponentContext<RadioContextProps>(DISPLAY_NAME);

export { RadioGroupProvider, useRadioGroupContext, DISPLAY_NAME };
