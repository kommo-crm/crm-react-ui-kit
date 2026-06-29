import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { CanvasCentered } from '@storybook-utils/constants';

import { i18n } from '@i18n';

import { useStoryLabel } from '@ui-kit/hooks/useStoryLabel';

import {
  Separator,
  SeparatorRoundedLightTheme,
  SeparatorSquaredLightTheme,
  SeparatorRoundedDarkTheme,
  SeparatorSquaredDarkTheme,
} from '..';

const themeMap = {
  SeparatorRoundedLightTheme,
  SeparatorSquaredLightTheme,
  SeparatorRoundedDarkTheme,
  SeparatorSquaredDarkTheme,
};

const USAGE = `
import {
  Separator,
  SeparatorRoundedLightTheme,
} from '@kommo-crm/crm-react-ui-kit/Separator';

function App() {
  return (
    <Separator
      theme={SeparatorRoundedLightTheme}
      orientation="horizontal"
    />
  );
}
`;

const HORIZONTAL_WRAPPER_STYLE: React.CSSProperties = {
  width: 240,
  display: 'flex',
};

const CARD_LIST_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  gap: 16,
};

const CARD_STYLE: React.CSSProperties = {
  width: '100%',
  minHeight: 96,
  padding: '0 32px',
  display: 'flex',
  alignItems: 'center',
  borderRadius: 'var(--crm-ui-kit-border-radius-default)',
  boxSizing: 'border-box',
};

const VERTICAL_WRAPPER_STYLE: React.CSSProperties = {
  height: 80,
  display: 'flex',
};

const meta = {
  title: 'Components/Separator',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: { code: USAGE, language: 'jsx' },
    },
  },
  component: Separator,
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themeMap),
      mapping: themeMap,
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
  args: {
    theme: SeparatorRoundedLightTheme,
    orientation: 'horizontal',
  },
  render: (props) => (
    <div
      style={
        props.orientation === 'vertical'
          ? VERTICAL_WRAPPER_STYLE
          : HORIZONTAL_WRAPPER_STYLE
      }
    >
      <Separator {...props} />
    </div>
  ),
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const lightBgRender: Story['render'] = (props) => (
  <div
    style={{
      ...CARD_STYLE,
      justifyContent: 'center',
      background: 'var(--crm-ui-kit-palette-background-primary)',
    }}
  >
    <div style={HORIZONTAL_WRAPPER_STYLE}>
      <Separator {...props} />
    </div>
  </div>
);

const darkBgRender: Story['render'] = (props) => (
  <div
    style={{
      ...CARD_STYLE,
      justifyContent: 'center',
      background: 'var(--crm-ui-kit-palette-background-default)',
    }}
  >
    <div style={HORIZONTAL_WRAPPER_STYLE}>
      <Separator {...props} />
    </div>
  </div>
);

export const SeparatorRoundedLight: Story = {
  tags: ['!dev'],
  args: { theme: SeparatorRoundedLightTheme },
  render: lightBgRender,
};

export const SeparatorSquaredLight: Story = {
  tags: ['!dev'],
  args: { theme: SeparatorSquaredLightTheme },
  render: lightBgRender,
};

export const SeparatorRoundedDark: Story = {
  tags: ['!dev'],
  args: { theme: SeparatorRoundedDarkTheme },
  render: darkBgRender,
};

export const SeparatorSquaredDark: Story = {
  tags: ['!dev'],
  args: { theme: SeparatorSquaredDarkTheme },
  render: darkBgRender,
};

export const HowToUse: Story = {
  render: (props) => {
    const isVertical = props.orientation === 'vertical';
    const wrapperStyle = isVertical
      ? VERTICAL_WRAPPER_STYLE
      : HORIZONTAL_WRAPPER_STYLE;
    const cardStyle: React.CSSProperties = isVertical
      ? { ...CARD_STYLE, justifyContent: 'center', minHeight: 120 }
      : CARD_STYLE;

    const darkThemeLabel = useStoryLabel(
      i18n.t('...DarkTheme for dark background')
    );
    const lightThemeLabel = useStoryLabel(
      i18n.t('...LightTheme for light background')
    );

    return (
      <div style={CARD_LIST_STYLE}>
        <div>
          {darkThemeLabel}
          <div
            style={{
              ...cardStyle,
              background: 'var(--crm-ui-kit-palette-background-default)',
            }}
          >
            <div style={wrapperStyle}>
              <Separator {...props} theme={SeparatorRoundedDarkTheme} />
            </div>
          </div>
        </div>

        <div>
          {lightThemeLabel}
          <div
            style={{
              ...cardStyle,
              background: 'var(--crm-ui-kit-palette-background-primary)',
            }}
          >
            <div style={wrapperStyle}>
              <Separator {...props} theme={SeparatorRoundedLightTheme} />
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    controls: {
      exclude: /theme/,
    },
  },
};
