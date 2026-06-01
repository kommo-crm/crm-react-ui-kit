import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import { Text, TextPrimaryTheme } from 'src/components/Text';

import {
  Accordion,
  AccordionProps,
  AccordionTheme,
  AccordionItemTheme,
} from '..';

const items = [
  {
    value: '1',
    title: 'Item 1',
    children: (
      <Text theme={TextPrimaryTheme} size="l">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id asperiores
        voluptatum delectus, itaque soluta distinctio eos iure incidunt quod est
        cumque tenetur aut aspernatur excepturi ipsam pariatur perferendis
        libero? Facere reiciendis cumque numquam aperiam architecto sed non
        voluptate molestias distinctio exercitationem est voluptatem debitis,
        ducimus similique ipsum quibusdam error placeat.
      </Text>
    ),
    theme: AccordionItemTheme,
  },
  {
    value: '2',
    title: 'Item 2',
    children: (
      <Text theme={TextPrimaryTheme} size="l">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id asperiores
        voluptatum delectus, itaque soluta distinctio eos iure incidunt quod est
        cumque tenetur aut aspernatur excepturi ipsam pariatur perferendis
        libero? Facere reiciendis cumque numquam aperiam architecto sed non
        voluptate molestias distinctio exercitationem est voluptatem debitis,
        ducimus similique ipsum quibusdam error placeat.
      </Text>
    ),
    theme: AccordionItemTheme,
  },
  {
    value: '3',
    title: 'Item 3',
    children: (
      <Text theme={TextPrimaryTheme} size="l">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id asperiores
        voluptatum delectus, itaque soluta distinctio eos iure incidunt quod est
        cumque tenetur aut aspernatur excepturi ipsam pariatur perferendis
        libero? Facere reiciendis cumque numquam aperiam architecto sed non
        voluptate molestias distinctio exercitationem est voluptatem debitis,
        ducimus similique ipsum quibusdam error placeat.
      </Text>
    ),
    theme: AccordionItemTheme,
  },
];

interface AccordionTestProps {
  type: 'single' | 'multiple';
  defaultValue?: string | string[];
  isCollapsible?: boolean;
}

export const AccordionPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<AccordionTestProps>) => (
  <ComponentPlayground<AccordionTestProps>
    appearance={appearance}
    props={props}
  >
    {(p) => (
      <div style={{ margin: '0 20px' }}>
        <Accordion {...(p as AccordionProps)} theme={AccordionTheme}>
          {items.map(({ value, ...restProps }) => (
            <Accordion.Item value={value} key={value} {...restProps} />
          ))}
        </Accordion>
      </div>
    )}
  </ComponentPlayground>
);
