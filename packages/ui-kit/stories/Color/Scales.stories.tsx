import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import primitives from '@kommo-crm/tokens/primitives';

const SCALES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

function contrastColor(hex: string): string {
  const normalized =
    hex.length === 4
      ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
      : hex;
  const r = parseInt(normalized.slice(1, 3), 16);
  const g = parseInt(normalized.slice(3, 5), 16);
  const b = parseInt(normalized.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.8)';
}

const lightPalette = primitives.color.light;
const darkPalette = primitives.color.dark;

function ColorColumn({
  family,
  palette,
  labelColor,
}: {
  family: string;
  palette: Record<string, Record<number, string>>;
  labelColor: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          marginBottom: 8,
          fontSize: 12,
          fontWeight: 600,
          textTransform: 'capitalize',
          color: labelColor,
        }}
      >
        {family}
      </div>
      {SCALES.map((scale) => {
        const color = palette[family as keyof typeof palette][scale];

        return (
          <div
            key={scale}
            title={`${scale} · ${color}`}
            style={{
              position: 'relative',
              height: 36,
              backgroundColor: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontFamily: 'monospace',
                color: contrastColor(color),
              }}
            >
              {color}
            </span>
            <span
              style={{
                position: 'absolute',
                top: 3,
                left: 5,
                fontSize: 9,
                fontWeight: 600,
                fontFamily: 'monospace',
                color: contrastColor(color),
                opacity: 0.6,
              }}
            >
              {scale}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function ColorScales() {
  return (
    <div
      style={{ padding: 32, fontFamily: 'PT Sans, Nunito Sans, sans-serif' }}
    >
      <div
        style={{
          marginBottom: 24,
          fontSize: 20,
          fontWeight: 700,
          color: 'var(--crm-ui-kit-color-onyx, #363b44)',
        }}
      >
        Light
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Object.keys(lightPalette).length}, 1fr)`,
          gap: 16,
        }}
      >
        {Object.keys(lightPalette).map((family) => (
          <ColorColumn
            key={family}
            family={family}
            palette={lightPalette as Record<string, Record<number, string>>}
            labelColor="var(--crm-ui-kit-color-onyx, #363b44)"
          />
        ))}
      </div>
    </div>
  );
}

function ColorScalesDark() {
  return (
    <div
      style={{ padding: 32, fontFamily: 'PT Sans, Nunito Sans, sans-serif' }}
    >
      <div
        style={{
          marginBottom: 24,
          fontSize: 20,
          fontWeight: 700,
          color: '#cdd2da',
        }}
      >
        Dark
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Object.keys(darkPalette).length}, 1fr)`,
          gap: 16,
        }}
      >
        {Object.keys(darkPalette).map((family) => (
          <ColorColumn
            key={family}
            family={family}
            palette={darkPalette as Record<string, Record<number, string>>}
            labelColor="#cdd2da"
          />
        ))}
      </div>
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
