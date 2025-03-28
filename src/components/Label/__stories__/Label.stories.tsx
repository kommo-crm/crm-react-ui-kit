import React, { FC } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { TextArea, TextareaLightTheme } from 'src/components/TextArea';

import { CanvasCentered } from '@storybook-utils/constants';

import { Switcher, SwitcherPrimaryTheme } from 'src/components/Switcher';
import {
  Text,
  TextPrimaryTheme,
  TextSecondaryLightTheme,
} from 'src/components/Text';

import { i18n } from '@i18n';

import { Label, LabelGroupTheme, LabelTheme } from '..';

const Container: FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ width: '100%' }}>{children}</div>
);

const USAGE = `
import { Text, TextPrimaryTheme } from '@kommo-crm/crm-react-ui-kit/Text';
import {
  TextArea,
  TextareaLightTheme,
} from '@kommo-crm/crm-react-ui-kit/TextArea';

import { Label, LabelTheme } from '@kommo-crm/crm-react-ui-kit/Label';

function App() {
  return (
    <Label
      theme={LabelTheme}
      text={
        <Text isEllipsis size="l" theme={TextPrimaryTheme}>
          ${i18n.t('How can our partners help you?')}
        </Text>
      }
    >
      <TextArea
        theme={TextareaLightTheme}
        placeholder="${i18n.t('How can our partners help you?')}"
      />
    </Label>
  );
}
`;

const meta = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    ...CanvasCentered,
    docs: {
      source: {
        code: USAGE,
        language: 'jsx',
      },
    },
  },
  args: {
    theme: LabelTheme,
    text: (
      <Text isEllipsis size="l" theme={TextPrimaryTheme}>
        {i18n.t('How can our partners help you?')}
      </Text>
    ),
    children: (
      <TextArea
        theme={TextareaLightTheme}
        placeholder={i18n.t('How can our partners help you?')}
      />
    ),
  },
  render: (props) => {
    return (
      <Container>
        <Label {...props}>{props.children}</Label>
      </Container>
    );
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const elements = [
  {
    text: i18n.t('Tell us about yourself'),
    children: (
      <Switcher isDefaultChecked={false} theme={SwitcherPrimaryTheme} />
    ),
  },
  {
    text: i18n.t('Provide more information'),
    children: (
      <Switcher isDefaultChecked={false} theme={SwitcherPrimaryTheme} />
    ),
  },
];

export const Group: Story = {
  args: {
    description: (
      <Text isEllipsis maxRows={3} size="s" theme={TextSecondaryLightTheme}>
        {i18n.t('Minimize chat apps within a single button')}
      </Text>
    ),
  },
  render: (props) => {
    return (
      <Container>
        <Label.Group theme={LabelGroupTheme}>
          {elements.map((element) => (
            <Label
              {...props}
              key={element.text}
              text={
                <Text size="l" theme={TextPrimaryTheme}>
                  {element.text}
                </Text>
              }
            >
              {element.children}
            </Label>
          ))}
        </Label.Group>
      </Container>
    );
  },
};

export const WithDescription: Story = {
  args: {
    textPlacement: 'right',
    text: (
      <Text size="l" theme={TextPrimaryTheme}>
        {i18n.t('Label text')}
      </Text>
    ),
    description: (
      <Text size="s" theme={TextSecondaryLightTheme}>
        {i18n.t('Minimize chat apps within a single button')}
      </Text>
    ),
    children: (
      <Switcher isDefaultChecked={false} theme={SwitcherPrimaryTheme} />
    ),
  },
};
