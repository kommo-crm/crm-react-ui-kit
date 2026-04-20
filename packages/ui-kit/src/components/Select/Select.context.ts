import { createComponentContext } from '@/lib/react';

import { SelectContextProps } from './Select.props';

const DISPLAY_NAME = 'Select';

const [SelectProvider, useSelectContext] =
  createComponentContext<SelectContextProps>(DISPLAY_NAME);

export { SelectProvider, useSelectContext, DISPLAY_NAME };
