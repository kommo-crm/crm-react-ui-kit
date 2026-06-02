import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { color } from '@tokens/primitives';
import { Appearance } from '@ui-kit/lib/appearance';

import { PrimitivePalette } from '@storybook-utils/components';

type RawPalette = Record<
  string,
  Record<string, { value: string; cssVar: string }>
>;

function makeGroups(palette: RawPalette) {
  return Object.entries(palette).map(([name, shades]) => ({
    name,
    shades: Object.entries(shades).map(([shade, token]) => ({ shade, token })),
  }));
}

const lightGroups = makeGroups(
  (color as unknown as { light: RawPalette; dark: RawPalette }).light
);
const darkGroups = makeGroups(
  (color as unknown as { light: RawPalette; dark: RawPalette }).dark
);

function PrimitivesPage({ groups }: { groups: ReturnType<typeof makeGroups> }) {
  return (
    <div style={{ padding: 24 }}>
      <PrimitivePalette groups={groups} />
    </div>
  );
}

const meta: Meta = {
  title: 'Tokens/Primitives',
  parameters: {
    layout: 'fullscreen',
    docs: { canvas: { sourceState: 'none' } },
    backgrounds: { disable: true },
  },
};

export default meta;

type Story = StoryObj;

export const Light: Story = {
  parameters: { fixedAppearance: Appearance.DEFAULT },
  render: () => <PrimitivesPage groups={lightGroups} />,
};

export const Dark: Story = {
  parameters: { fixedAppearance: Appearance.ALTERNATIVE },
  render: () => <PrimitivesPage groups={darkGroups} />,
};
