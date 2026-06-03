import { createComponentContext } from 'src/lib/react';

import { AccordionContextProps } from './Accordion.props';

const DISPLAY_NAME = 'Accordion';

const [AccordionProvider, useAccordionContext] =
  createComponentContext<AccordionContextProps>(DISPLAY_NAME);

export { AccordionProvider, useAccordionContext, DISPLAY_NAME };
