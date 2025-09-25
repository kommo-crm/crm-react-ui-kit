import { createComponentContext } from 'src/lib/react';

import { RadioGroupContextProps } from './RadioGroup.props';

const DISPLAY_NAME = 'ContextMenu.RadioGroup';

const [RadioGroupProvider, useRadioGroupContext] =
  createComponentContext<RadioGroupContextProps>(DISPLAY_NAME);

export { RadioGroupProvider, useRadioGroupContext, DISPLAY_NAME };
