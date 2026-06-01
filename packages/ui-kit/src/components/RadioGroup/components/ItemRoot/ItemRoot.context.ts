import { createComponentContext } from '@ui-kit/lib/react';

import { type RadioItemContextProps } from './ItemRoot.props';

const DISPLAY_NAME = 'RadioGroup.ItemRoot';

const [RadioItemRootProvider, useRadioItemRootContext] =
  createComponentContext<RadioItemContextProps>(DISPLAY_NAME);

export { RadioItemRootProvider, useRadioItemRootContext, DISPLAY_NAME };
