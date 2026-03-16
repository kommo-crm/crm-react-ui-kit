import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { tokens } from '@kommo-crm/design-tokens';

const SCALES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

type ThemeColorPalette = Record<string, Record<string, string>>;

const lightPalette = tokens.light.primitives
  .color as unknown as ThemeColorPalette;
const darkPalette = tokens.dark.primitives
  .color as unknown as ThemeColorPalette;

const lightFamilies = Object.keys(lightPalette);
const darkFamilies = Object.keys(darkPalette);

function Swatch({
  color,
  scale,
  isDark,
}: {
  color: string;
  scale: number;
  isDark?: boolean;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div
        title={color}
        style={{
          height: 40,
          borderRadius: 6,
          backgroundColor: color,
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)',
        }}
      />
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: isDark ? '#cdd2da' : 'var(--crm-ui-kit-color-onyx, #363b44)',
        }}
      >
        {scale}
      </span>
      <span style={{ fontSize: 10, color: '#888', fontFamily: 'monospace' }}>
        {color}
      </span>
    </div>
  );
}

function ColorScales() {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: 32 }}
    >
      {lightFamilies.map((family) => (
        <div key={family}>
          <div
            style={{
              marginBottom: 12,
              fontSize: 14,
              fontWeight: 600,
              textTransform: 'capitalize',
              color: 'var(--crm-ui-kit-color-onyx, #363b44)',
            }}
          >
            {family}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(10, 1fr)',
              gap: 8,
            }}
          >
            {SCALES.map((scale) => (
              <Swatch
                key={scale}
                scale={scale}
                color={lightPalette[family][scale]}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ColorScalesDark() {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 32, padding: 32 }}
    >
      {darkFamilies.map((family) => (
        <div key={family}>
          <div
            style={{
              marginBottom: 12,
              fontSize: 14,
              fontWeight: 600,
              textTransform: 'capitalize',
              color: '#fff',
            }}
          >
            {family}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(10, 1fr)',
              gap: 8,
            }}
          >
            {SCALES.map((scale) => (
              <Swatch
                key={scale}
                scale={scale}
                color={darkPalette[family][scale]}
                isDark
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const meta = {
  title: 'Color/Display scales',
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: { code: null },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  parameters: {
    appearance: 'default',
  },
  render: () => <ColorScales />,
};

export const Dark: Story = {
  parameters: {
    appearance: 'alternative',
  },
  render: () => (
    <div style={{ background: '#1a2332', minHeight: '100vh' }}>
      <ColorScalesDark />
    </div>
  ),
};
