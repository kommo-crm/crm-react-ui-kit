import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { color } from '@tokens/primitives';
import type { Palette, ColorShade, Token } from '@tokens/primitives';
import { Appearance } from '@ui-kit/lib/appearance';

import { PrimitivePalette } from '@storybook-utils/components';

type ShadeTuple = [ColorShade, Token];

type ShadeGroups = ReturnType<typeof makeGroups>;

function makeGroups(palette: Palette) {
  return Object.entries(palette).map(([name, shades]) => ({
    name,
    shades: (Object.entries(shades) as ShadeTuple[]).map(([shade, token]) => ({
      shade,
      token,
    })),
  }));
}

const lightGroups = makeGroups(color.light);
const darkGroups = makeGroups(color.dark);

function PrimitivesPage({ groups }: { groups: ShadeGroups }) {
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
