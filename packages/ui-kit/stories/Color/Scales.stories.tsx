import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { color } from '@kommo-crm/crm-tokens/primitives';

const SCALES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

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

const styles = `
  .color-swatch {
    position: relative;
    height: 48px;
    flex: 1 1 0;
    min-width: 0;
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
  @keyframes tooltipFadeIn {
    from { opacity: 0; transform: translateX(-50%) translateY(2px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
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
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback(async () => {
    const ok = await copyTokenName(tokenName);

    if (ok) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      setCopied(true);
      timerRef.current = setTimeout(() => setCopied(false), 1500);
    }
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
      className={`color-swatch${isDark ? ' color-swatch-dark' : ''}`}
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
      {copied && (
        <div
          className={`color-swatch-tooltip${isDark ? ' color-swatch-tooltip-dark' : ''}`}
        >
          Copied!
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
      style={{
        padding: '32px 40px',
        fontFamily: "'PT Sans', 'Nunito Sans', sans-serif",
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
      style={{
        padding: '32px 40px',
        fontFamily: "'PT Sans', 'Nunito Sans', sans-serif",
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
