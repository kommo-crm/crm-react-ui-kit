import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { CanvasCentered } from '@storybook-utils/constants';

import { Text, TextPrimaryTheme } from 'src/components/Text';

import SpinnerIcon from '/src/icons/spinner.svg';
import SettingsIcon from '/src/icons/settings.svg';
import CalendarIcon from '/src/icons/calendar.svg';

import {
  Accordion,
  AccordionItemTheme,
  AccordionProps,
  AccordionTheme,
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
    before: <SpinnerIcon style={{ width: '20px', height: '20px' }} />,
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
    before: <SettingsIcon style={{ width: '20px', height: '20px' }} />,
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
    before: <CalendarIcon style={{ width: '20px', height: '20px' }} />,
    theme: AccordionItemTheme,
  },
];

const USAGE = `
import { Text, TextPrimaryTheme } from '@kommo-crm/crm-react-ui-kit/Text';

import {
  Accordion,
  AccordionItemTheme,
  AccordionTheme,
} from '@kommo-crm/crm-react-ui-kit/Accordion';

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
  },
];

function App() {
  return (
    <Accordion
      theme={AccordionTheme}
      defaultValue={items[0].value}
      type="single"
    >
      {items.map(({ value, ...rest }) => {
        return (
          <Accordion.Item
            key={value}
            value={value}
            theme={AccordionItemTheme}
            {...rest}
          />
        );
      })}
    </Accordion>
  );
}
`;

const meta = {
  title: 'Components/Accordion',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: {
        code: USAGE,
        language: 'jsx',
      },
    },
  },
  component: Accordion,
  args: {
    theme: AccordionTheme,
    defaultValue: items[0].value,
    children: <></>,
  },
  render: (props: AccordionProps) => {
    return (
      <Accordion {...props}>
        {items.map(({ value, ...rest }) => {
          return <Accordion.Item key={value} value={value} {...rest} />;
        })}
      </Accordion>
    );
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'single',
  },
};
