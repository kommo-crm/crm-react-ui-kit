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

export const AccordionPlayground = (
  props: ComponentPlaygroundProps<AccordionProps>
) => {
  const items = [
    {
      value: '1',
      title: 'Item 1',
      children: (
        <Text theme={TextPrimaryTheme} size="l">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id asperiores
          voluptatum delectus, itaque soluta distinctio eos iure incidunt quod
          est cumque tenetur aut aspernatur excepturi ipsam pariatur perferendis
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
          voluptatum delectus, itaque soluta distinctio eos iure incidunt quod
          est cumque tenetur aut aspernatur excepturi ipsam pariatur perferendis
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
          voluptatum delectus, itaque soluta distinctio eos iure incidunt quod
          est cumque tenetur aut aspernatur excepturi ipsam pariatur perferendis
          libero? Facere reiciendis cumque numquam aperiam architecto sed non
          voluptate molestias distinctio exercitationem est voluptatem debitis,
          ducimus similique ipsum quibusdam error placeat.
        </Text>
      ),
      theme: AccordionItemTheme,
    },
  ];

  return (
    <ComponentPlayground<AccordionProps>
      {...props}
      propSets={[
        {
          children: [
            items.map(({ value, ...restProps }) => (
              <Accordion.Item value={value} key={value} {...restProps} />
            )),
          ],
          type: ['single'],
          defaultValue: [items[0].value],
        },
        {
          children: [
            items.map(({ value, ...restProps }) => (
              <Accordion.Item value={value} key={value} {...restProps} />
            )),
          ],
          type: ['multiple'],
          defaultValue: [[items[0].value, items[1].value]],
        },
        {
          children: [
            items.map(({ value, ...restProps }) => (
              <Accordion.Item value={value} key={value} {...restProps} />
            )),
          ],
          type: ['multiple'],
          defaultValue: [[]],
          isCollapsible: [true],
        },
      ]}
    >
      {(itemProps: AccordionProps) => (
        <div style={{ margin: '0 20px' }}>
          <Accordion {...itemProps} theme={AccordionTheme} />
        </div>
      )}
    </ComponentPlayground>
  );
};
