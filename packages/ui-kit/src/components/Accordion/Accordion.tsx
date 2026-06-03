import React, { forwardRef } from 'react';

import { AccordionType, type AccordionProps } from './Accordion.props';
import { AccordionSingleProps } from './components/AccordionSingle/AccordionSingle.props';
import { AccordionMultipleProps } from './components/AccordionMultiple/AccordionMultiple.props';
import { AccordionMultiple } from './components/AccordionMultiple/AccordionMultiple';
import { AccordionSingle } from './components/AccordionSingle/AccordionSingle';
import { Item } from './components/Item/Item';
import { DISPLAY_NAME } from './Accordion.context';

type D = HTMLDivElement;

export const Accordion = forwardRef<D, AccordionProps>((props, ref) => {
  const { type, ...restAccordionProps } = props;

  const accordionSingleProps = restAccordionProps as AccordionSingleProps;
  const accordionMultipleProps = restAccordionProps as AccordionMultipleProps;

  return type === 'multiple' ? (
    <AccordionMultiple {...accordionMultipleProps} ref={ref} />
  ) : (
    <AccordionSingle {...accordionSingleProps} ref={ref} />
  );
}) as AccordionType;

Accordion.displayName = DISPLAY_NAME;

Accordion.Item = Item;
