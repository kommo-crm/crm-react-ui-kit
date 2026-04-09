import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { color } from '@kommo-crm/tokens/primitives';

import { i18n } from '@i18n';

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

const lightPalette = color.light;
const darkPalette = color.dark;

function copyTokenNameLegacy(tokenName: string): boolean {
  const textArea = document.createElement('textarea');

  textArea.value = tokenName;
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'fixed';
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.opacity = '0';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    return document.execCommand('copy');
  } finally {
    document.body.removeChild(textArea);
  }
}

async function copyTokenName(tokenName: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(tokenName);

      return true;
    } catch {
      return copyTokenNameLegacy(tokenName);
    }
  }

  return copyTokenNameLegacy(tokenName);
}

function ColorColumn({
  family,
  palette,
  labelColor,
  helperTextColor,
}: {
  family: string;
  palette: Record<string, Record<number, string>>;
  labelColor: string;
  helperTextColor: string;
}) {
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    if (!status) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setStatus(null);
    }, 1500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [status]);

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
        const hex = palette[family as keyof typeof palette][scale];
        const tokenName = `color-${family}-${scale}`;

        return (
          <div
            key={scale}
            title={`${tokenName} · ${hex}`}
            onClick={async () => {
              const isCopied = await copyTokenName(tokenName);

              setStatus(isCopied ? 'success' : 'error');
            }}
            style={{
              position: 'relative',
              height: 36,
              backgroundColor: hex,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontFamily: 'monospace',
                color: contrastColor(hex),
              }}
            >
              {hex}
            </span>
            <span
              style={{
                position: 'absolute',
                top: 3,
                left: 5,
                fontSize: 9,
                fontWeight: 600,
                fontFamily: 'monospace',
                color: contrastColor(hex),
                opacity: 0.6,
              }}
            >
              {scale}
            </span>
          </div>
        );
      })}
      <div
        aria-live="polite"
        style={{
          minHeight: 18,
          marginTop: 8,
          fontSize: 12,
          color: helperTextColor,
        }}
      >
        {status === 'success' && i18n.t('Copied token name.')}
        {status === 'error' && i18n.t('Failed to copy token name.')}
      </div>
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
            helperTextColor="var(--crm-ui-kit-color-dusk-gray, #69768d)"
          />
        ))}
      </div>
      <div
        style={{
          marginTop: 16,
          fontSize: 13,
          color: 'var(--crm-ui-kit-color-dusk-gray, #69768d)',
        }}
      >
        {i18n.t('Click any color swatch to copy its token name.')}
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
            helperTextColor="rgba(205, 210, 218, 0.8)"
          />
        ))}
      </div>
      <div
        style={{
          marginTop: 16,
          fontSize: 13,
          color: 'rgba(205, 210, 218, 0.8)',
        }}
      >
        {i18n.t('Click any color swatch to copy its token name.')}
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
