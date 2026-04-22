import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { color } from '@kommo-crm/crm-tokens/primitives';

import { i18n } from '@kommo-crm/storybook/i18n';
import classNames from 'classnames';

const SCALES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

const lightPalette = color.light;
const darkPalette = color.dark;

type CopyStatus = 'copied' | 'error';

async function copyTokenName(tokenName: string): Promise<CopyStatus> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(tokenName);

      return 'copied';
    } catch {
      return 'error';
    }
  }

  return 'error';
}

const styles = `
  .color-swatch {
    position: relative;
    height: 48px;
    flex: 1 1 0;
    min-width: 64px;
    cursor: pointer;
    border-radius: 3px;
    transition: box-shadow 0.1s ease;
    outline: none;
  }
  .color-swatch:hover {
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.35), 0 0 0 3px rgba(255,255,255,0.6);
    z-index: 1;
  }
  .color-swatch-dark:hover {
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5), 0 0 0 3px rgba(0,0,0,0.4);
    z-index: 1;
  }
  .color-swatch-tooltip {
    position: absolute;
    bottom: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
    background: #1a1a1a;
    color: #fff;
    font-size: 10px;
    font-family: 'SF Mono', 'Fira Code', monospace;
    white-space: nowrap;
    padding: 3px 7px;
    border-radius: 4px;
    pointer-events: none;
    z-index: 100;
    animation: tooltipFadeIn 0.12s ease;
  }
  .color-swatch-tooltip-dark {
    background: #e8eaed;
    color: #1a1a1a;
  }
  .color-swatch-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: #1a1a1a;
  }
  .color-swatch-tooltip-dark::after {
    border-top-color: #e8eaed;
  }
  .color-swatch-tooltip-error {
    background: #d93025;
  }
  .color-swatch-tooltip-error::after {
    border-top-color: #d93025;
  }
  @keyframes tooltipFadeIn {
    from { opacity: 0; transform: translateX(-50%) translateY(2px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
  .color-palette-light {
    height: 100vh;
    overflow-y: hidden;
    scrollbar-color: #c1c9d2 #f1f3f5;
    scrollbar-width: thin;
  }
  .color-palette-light::-webkit-scrollbar {
    height: 6px;
  }
  .color-palette-light::-webkit-scrollbar-track {
    background: #f1f3f5;
  }
  .color-palette-light::-webkit-scrollbar-thumb {
    background: #c1c9d2;
    border-radius: 3px;
  }
  .color-palette-light::-webkit-scrollbar-thumb:hover {
    background: #a0aab4;
  }
  .color-palette-dark {
    height: 100vh;
    box-sizing: border-box;
    overflow-y: hidden;
    scrollbar-color: #3d5068 #1e2d3d;
    scrollbar-width: thin;
  }
  .color-palette-dark::-webkit-scrollbar {
    height: 6px;
  }
  .color-palette-dark::-webkit-scrollbar-track {
    background: #1e2d3d;
  }
  .color-palette-dark::-webkit-scrollbar-thumb {
    background: #3d5068;
    border-radius: 3px;
  }
  .color-palette-dark::-webkit-scrollbar-thumb:hover {
    background: #5a7090;
  }
`;

function Swatch({
  hex,
  tokenName,
  isDark,
}: {
  hex: string;
  tokenName: string;
  isDark?: boolean;
}) {
  const [status, setStatus] = useState<CopyStatus | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback(async () => {
    const result = await copyTokenName(tokenName);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setStatus(result);
    timerRef.current = setTimeout(() => setStatus(null), 1500);
  }, [tokenName]);

  useEffect(
    () => () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    },
    []
  );

  return (
    <div
      className={classNames('color-swatch', {
        'color-swatch-dark': isDark,
      })}
      style={{ backgroundColor: hex }}
      title={`${tokenName} · ${hex}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      {status && (
        <div
          className={classNames('color-swatch-tooltip', {
            'color-swatch-tooltip-dark': isDark,
            'color-swatch-tooltip-error': status === 'error',
          })}
        >
          {status === 'copied'
            ? i18n.t('Copied!')
            : i18n.t('Failed to copy to clipboard')}
        </div>
      )}
    </div>
  );
}

function ColorRow({
  family,
  palette,
  labelColor,
  isDark,
}: {
  family: string;
  palette: Record<string, Record<number, string>>;
  labelColor: string;
  isDark?: boolean;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        marginBottom: 3,
      }}
    >
      <div
        style={{
          width: 80,
          flexShrink: 0,
          fontSize: 12,
          fontWeight: 500,
          fontFamily: "'PT Sans', 'Nunito Sans', sans-serif",
          textTransform: 'capitalize',
          color: labelColor,
          letterSpacing: '0.01em',
        }}
      >
        {family}
      </div>
      <div style={{ display: 'flex', flex: 1, gap: 2 }}>
        {SCALES.map((scale) => {
          const hex = palette[family][scale];

          return (
            <Swatch
              key={scale}
              hex={hex}
              tokenName={`color-${family}-${scale}`}
              isDark={isDark}
            />
          );
        })}
      </div>
    </div>
  );
}

function ScaleHeaders({ labelColor }: { labelColor: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        marginBottom: 8,
      }}
    >
      <div style={{ width: 80, flexShrink: 0 }} />
      <div style={{ display: 'flex', flex: 1, gap: 2 }}>
        {SCALES.map((scale) => (
          <div
            key={scale}
            style={{
              flex: 1,
              minWidth: 64,
              textAlign: 'center',
              fontSize: 11,
              fontWeight: 600,
              fontFamily: "'SF Mono', 'Fira Code', monospace",
              color: labelColor,
              letterSpacing: '0.02em',
            }}
          >
            {scale}
          </div>
        ))}
      </div>
    </div>
  );
}

function ColorScales() {
  const families = Object.keys(lightPalette);

  return (
    <div
      className="color-palette-light"
      style={{
        padding: '32px 40px',
        fontFamily: "'PT Sans', 'Nunito Sans', sans-serif",
        overflowX: 'auto',
      }}
    >
      <style>{styles}</style>
      <ScaleHeaders labelColor="#69768d" />
      {families.map((family) => (
        <ColorRow
          key={family}
          family={family}
          palette={lightPalette as Record<string, Record<number, string>>}
          labelColor="#363b44"
        />
      ))}
    </div>
  );
}

function ColorScalesDark() {
  const families = Object.keys(darkPalette);

  return (
    <div
      className="color-palette-dark"
      style={{
        padding: '32px 40px',
        fontFamily: "'PT Sans', 'Nunito Sans', sans-serif",
        overflowX: 'auto',
      }}
    >
      <style>{styles}</style>
      <ScaleHeaders labelColor="rgba(205,210,218,0.6)" />
      {families.map((family) => (
        <ColorRow
          key={family}
          family={family}
          palette={darkPalette as Record<string, Record<number, string>>}
          labelColor="rgba(205,210,218,0.9)"
          isDark
        />
      ))}
    </div>
  );
}

const meta = {
  title: 'Color/Tokens',
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
