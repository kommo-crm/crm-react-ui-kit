import React, { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useGlobals } from '@storybook/preview-api';

import { CanvasCentered, IconsMap } from '@storybook-utils/constants';

import { noop } from 'src/utils';
import { Appearance } from 'src/lib/appearance';

import { i18n } from '@i18n';

import {
  Button,
  ButtonNeutralTheme,
  ButtonPrimaryTheme,
  ButtonSecondaryTheme,
} from '..';

const ThemesMap = {
  ButtonNeutralTheme,
  ButtonPrimaryTheme,
  ButtonSecondaryTheme,
};

const USAGE = `
import { Button, ButtonPrimaryTheme } from "@kommo-crm/crm-react-ui-kit/Button";

function App() {
  return (
    <Button theme={ButtonPrimaryTheme}>${i18n.t('Go to Dashboard')}</Button>
  );
}
`;

const meta = {
  title: 'Components/Button',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: {
        code: USAGE,
        language: 'jsx',
      },
    },
  },
  component: Button,
  args: {
    children: i18n.t('Go to Dashboard'),
    theme: ThemesMap.ButtonPrimaryTheme,
  },
  argTypes: {
    theme: { table: { disable: true } },
    before: {
      control: 'select',
      mapping: IconsMap,
      options: Object.keys(IconsMap),
    },
    after: {
      control: 'select',
      mapping: IconsMap,
      options: Object.keys(IconsMap),
    },
  },
  render: (props) => (
    <div>
      {(Object.keys(ThemesMap) as Array<keyof typeof ThemesMap>).map((key) => (
        <Button key={key} {...props} theme={ThemesMap[key]} />
      ))}
    </div>
  ),
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const Icons: Story = {
  args: {
    before: IconsMap.CopyIcon,
    after: IconsMap.CalendarIcon,
  },
};

export const Refs: Story = {
  args: {
    successfulStateText: i18n.t('Saved'),
  },
  argTypes: {
    theme: {
      table: { disable: false },
      control: 'select',
      mapping: ThemesMap,
      options: Object.keys(ThemesMap),
    },
    successfulStateText: {
      control: 'text',
    },
  },
  render: (props) => {
    const [{ appearance }] = useGlobals();
    const labelColor =
      appearance === Appearance.ALTERNATIVE ? 'white' : 'black';

    const successRef = useRef(noop);
    const invalidRef = useRef(noop);

    const handleSuccessClick = () => {
      if (successRef) {
        successRef?.current();
      }
    };

    const handleInvalidClick = () => {
      if (invalidRef.current) {
        invalidRef.current();
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <div style={{ color: labelColor }}>{i18n.t('Success Ref')}</div>
          <Button
            {...props}
            onClick={handleSuccessClick}
            showSuccessfulStateRef={successRef}
          />
        </div>
        <div>
          <div style={{ color: labelColor }}>{i18n.t('Invalid Ref')}</div>
          <Button
            {...props}
            showInvalidAnimationRef={invalidRef}
            onClick={handleInvalidClick}
          />
        </div>
      </div>
    );
  },
};

export const ButtonNeutral: Story = {
  tags: ['!dev'],
  args: { theme: ButtonNeutralTheme },
  render: (props) => <Button {...props} />,
};

export const ButtonPrimary: Story = {
  tags: ['!dev'],
  args: { theme: ButtonPrimaryTheme },
  render: (props) => <Button {...props} />,
};

export const ButtonSecondary: Story = {
  tags: ['!dev'],
  args: { theme: ButtonSecondaryTheme },
  render: (props) => <Button {...props} />,
};
